import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

// A release regression gate for reviewed Social Studies content. This validates
// data, answers, source contracts, routes, and delivery structure. It does not
// claim to replace primary-source research, an Angular build, or browser tests.
const appRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourceRoot = path.join(appRoot, 'src/app/pages/social-studies');
const require = createRequire(import.meta.url);
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    fileName: filename,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      importHelpers: false
    }
  });
  const errors = (result.diagnostics ?? []).filter(item => item.category === ts.DiagnosticCategory.Error);
  if (errors.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(errors, {
    getCurrentDirectory: () => appRoot,
    getCanonicalFileName: name => name,
    getNewLine: () => '\n'
  }));
  module._compile(result.outputText, filename);
};

const expectedGroups = {
  geography: ['3.1.1', '3.1.2'],
  'native-peoples': ['3.2.1', '3.2.2', '3.2.3', '3.2.4'],
  'community-history': ['3.3.1', '3.3.2', '3.3.3'],
  'government-citizenship': ['3.4.1', '3.4.2', '3.4.3', '3.4.4', '3.4.5', '3.4.6'],
  economics: ['3.5.1', '3.5.2', '3.5.3', '3.5.4']
};
const expectedCodes = Object.values(expectedGroups).flat();
const sourceKinds = new Set(['primary evidence', 'tribal account', 'institutional history', 'official guidance']);
const placeholder = /\[(?:name|place|answer|packaging detail|insert[^\]]*)\]|\b(?:TODO|TBD|lorem ipsum)\b|^\s*I would\b|^\s*answers? will vary[.!]?\s*$/i;

// Independently reviewed meaning of each legacy quick-check answer. These
// contracts reject a changed key or a replacement with an incorrect distractor.
const legacyAnswers = {
  '3.1.1': /read the map title and legend/i,
  '3.1.2': /road help.*habitat/i,
  '3.2.1': /use its name.*community-authored/i,
  '3.2.2': /locally available tule reeds.*knowledge/i,
  '3.2.3': /tribal governments exercise their own/i,
  '3.2.4': /newcomers build.*Native people affected/i,
  '3.3.1': /Anza explored.*Ng Shing Gung served/i,
  '3.3.2': /family organized skills and equipment/i,
  '3.3.3': /arrangement of streets and buildings/i,
  '3.4.1': /structure and powers of national government/i,
  '3.4.2': /listen to needs.*reasoned compromise/i,
  '3.4.3': /Declaration expressed independence.*Constitution organized government/i,
  '3.4.4': /^Judicial$/i,
  '3.4.5': /distinct government.*own authority/i,
  '3.4.6': /action.*risks.*effect on people/i,
  '3.5.1': /^An oven$/i,
  '3.5.2': /verified country-of-origin label/i,
  '3.5.3': /reading time you gave up/i,
  '3.5.4': /knowing how to repair clothing/i
};

// Answer meanings reviewed separately from their authored indexes. A new check
// must receive an independent answer contract before it can pass this gate.
const planAnswers = {
  '3.1.1:west-feature': /^Santa Cruz Mountains$/i,
  '3.1.1:water-destination': /San Francisco Bay through Alviso Slough/i,
  '3.1.1:map-key': /that map.*own legend/i,
  '3.1.2:resource-change': /Water.*building a storage reservoir/i,
  '3.1.2:crissy-evidence': /protect.*Yelamu cultural site/i,
  '3.1.2:evaluate-impact': /needs.*each.*change.*creek bank/i,
  '3.2.1:named-narrative': /Muwekma co-created.*named community/i,
  '3.2.1:living-custom': /Tamien.*teach basketmaking.*next generation/i,
  '3.2.1:belief-evidence': /known.*unsupported detail unanswered/i,
  '3.2.2:climate': /warm cape.*cold-weather need/i,
  '3.2.2:season': /Acorns.*autumn/i,
  '3.2.2:skills': /boatmaking knowledge and work/i,
  '3.2.3:constitution-role': /government is organized/i,
  '3.2.3:state-relation': /Tribes and states.*cooperate.*environmental/i,
  '3.2.3:economy-evidence': /economic-development and business responsibilities/i,
  '3.2.4:already-here': /established Native homelands/i,
  '3.2.4:source-perspective': /whose perspective and experience/i,
  '3.2.4:continuity-evidence': /Tamien.*continuing cultural teaching/i,
  '3.3.1:arrivals': /^Anza, Ng Shing Gung, Welcoming Plan$/i,
  '3.3.1:contributions': /classroom.*religious altar/i,
  '3.3.1:continuing': /Welcoming newcomers.*community concern/i,
  '3.3.2:enterprise': /Organizing skills, equipment and money.*goods for sale/i,
  '3.3.2:property': /machine the owner bought/i,
  '3.3.2:link': /kinds of work changed.*skilled people and organized production/i,
  '3.3.3:founding': /grow grain for Spanish military settlements/i,
  '3.3.3:primary': /1869 bird.s-eye drawing/i,
  '3.3.3:limits': /arrangement of the streets and buildings depicted/i,
  '3.4.1:341-purpose': /helps everyone be heard/i,
  '3.4.1:341-citizens': /Asked the City Council.*tax-supported library/i,
  '3.4.1:341-rights': /still has rights.*fair procedures/i,
  '3.4.2:342-virtue': /book schedule fair for everyone/i,
  '3.4.2:342-setting': /evidence-based request to the council/i,
  '3.4.2:342-disagree': /Listening.*comparing reasons and effects/i,
  '3.4.3:343-dates': /^Event 1777; memorial 1997\.$/i,
  '3.4.3:343-stars': /^The states\.$/i,
  '3.4.3:343-ideal': /goal people expressed.*compare with events/i,
  '3.4.4:344-function': /^Judicial\.$/i,
  '3.4.4:344-city': /^The City Council\.$/i,
  '3.4.4:344-court': /California state court serving the county/i,
  '3.4.5:345-states': /state.s senators working on national laws/i,
  '3.4.5:345-tribe': /sovereign tribal nation/i,
  '3.4.5:345-contribution': /tribal knowledge.*cultural and land stewardship/i,
  '3.4.6:346-tubman': /captured during return journeys/i,
  '3.4.6:346-douglass': /autobiography in 1845/i,
  '3.4.6:346-evidence': /different actions.*risks.*expand freedom/i,
  '3.5.1:351-capital': /shovel used for gardening/i,
  '3.5.1:351-service': /helper explaining how to find information/i,
  '3.5.1:351-history': /Prusch.*dairy farm.*now.*park gardens/i,
  '3.5.2:352-local': /Bread baked in San Jos[eé]/i,
  '3.5.2:352-abroad': /toy made in Japan/i,
  '3.5.2:352-missing': /sale location is known.*production is still unknown/i,
  '3.5.3:353-next': /^Drawing\.$/i,
  '3.5.3:353-math': /^2\.$/,
  '3.5.3:353-goal': /goal, benefit, and trade-off/i,
  '3.5.4:354-skill': /Knowing how to explain a map key/i,
  '3.5.4:354-evidence': /new example without copying/i,
  '3.5.4:354-guarantee': /build skills and expand choices/i
};

const reviewedSequences = {
  '3.1.2': ['plan', 'discovery', 'consult', 'redesign'],
  '3.2.4': ['before', 'colonial', 'continuing'],
  '3.4.1': ['problem', 'listen', 'agree', 'review'],
  '3.4.6': ['douglass-escape', 'douglass-book', 'tubman-escape', 'tubman-returns'],
  '3.5.3': ['goal', 'limit', 'compare', 'explain'],
  '3.5.4': ['choose', 'practice', 'demonstrate', 'apply']
};

// Clause-preservation guards run against teaching and practice, excluding the
// requirement label. They prevent known omissions from returning; semantic
// coverage still requires independent curriculum review.
const clauseGuards = {
  '3.1.1': [/map|geograph/i, /mountain|valley|hill|coast|peninsula/i, /water|river|bay|ocean|lake/i],
  '3.1.2': [/resource|water|land/i, /change|restor|irrigat|build/i, /effect|protect|harm|impact/i],
  '3.2.1': [/Tamien|Muwekma|Ohlone|Yelamu/i, /religio|spiritual|belief|Creator/i, /folklore|stor(?:y|ies)|Coyote/i, /custom|tradition|acorn|basket/i],
  '3.2.2': [/geograph|environment|climate|season/i, /food|fish|acorn/i, /cloth|cape|hide|bark/i, /tool|boat|basket/i],
  '3.2.3': [/econom|trade|exchang|resource/i, /constitution/i, /federal/i, /state|California/i],
  '3.2.4': [/Native|Ohlone|Tamien/i, /settler|newcomer|Spanish/i, /disease|labor|displace|mission|loss/i, /today|continu|living/i],
  '3.3.1': [/explor|Anza/i, /migra|newcomer|immigra|welcoming/i, /cultur/i, /religio|altar|Holy Ghost/i, /today|2025|continu/i],
  '3.3.2': [/cann|Dawson|orchard|settler/i, /private property|ownership|owned|owner/i, /entrepreneur/i, /today|present|later/i],
  '3.3.3': [/1777/i, /Moraga|Prusch|Dawson|famil/i, /primary|map|letter|photograph/i, /chronolog|timeline|order|change/i],
  '3.4.1': [/Constitution/i, /rule|law/i, /consequence|repair|return|restore/i, /vote|elect|particip|citizen/i],
  '3.4.2': [/responsib|virtue|civic/i, /listen|cooperat|particip/i, /community|school|classroom/i],
  '3.4.3': [/landmark|memorial/i, /symbol|flag|Statue/i, /Declaration|Constitution/i],
  '3.4.4': [/legislative|lawmaking/i, /executive|carr(?:y|ies)/i, /judicial|court/i, /San Jos|local|council/i],
  '3.4.5': [/California/i, /state/i, /tribal|tribe/i, /federal|national/i, /particip|represent|contribut|Senat|Congress/i],
  '3.4.6': [/Tubman/i, /King|Douglass|Lincoln|Hutchinson|Franklin|Jefferson|Madison/i, /risk|danger|arrest|capture/i, /freedom|rights|liberty/i],
  '3.5.1': [/natural/i, /human|labor|worker/i, /capital|equipment/i, /goods?|bread|fruit/i, /service/i, /past|histor|earlier/i, /present|today|now/i],
  '3.5.2': [/local/i, /United States|U\.S\.|Oregon/i, /abroad|overseas|Japan|another country/i, /made|produced|grown|origin/i],
  '3.5.3': [/cost/i, /benefit/i, /choice|choose/i, /next-best|next best|alternative/i],
  '3.5.4': [/human capital|knowledge|skill/i, /school|educat|learn/i, /work|job|capabil|practice/i]
};

function loadBundle() {
  const load = file => require(path.join(sourceRoot, file));
  const readiness = load('social-studies.readiness.ts');
  return {
    chapters: load('social-studies.data.ts').SOCIAL_STUDIES_CHAPTERS,
    lessons: load('social-studies.lessons.ts').SOCIAL_STUDIES_LESSONS,
    explorations: load('social-studies.explorations.ts').SOCIAL_STUDIES_EXPLORATIONS,
    activities: load('social-studies.activities.ts').SOCIAL_STUDIES_ACTIVITIES,
    timelines: load('social-studies.activities.ts').SOCIAL_STUDIES_HISTORY_TIMELINES,
    plans: readiness.SOCIAL_STUDIES_READINESS,
    daily: readiness.SOCIAL_STUDIES_DAILY_PLAN
  };
}

function validateBundle(bundle) {
  const failures = [];
  const fail = (where, reason) => failures.push(`${where}: ${reason}`);
  const text = (value, where, min = 12) => {
    if (typeof value !== 'string' || value.trim().length < min) fail(where, `requires substantive text (${min}+ characters)`);
    if (typeof value === 'string' && placeholder.test(value)) fail(where, 'contains a placeholder or procedural answer instead of a worked answer');
  };
  const array = (value, where, min) => {
    if (!Array.isArray(value) || value.length < min) { fail(where, `requires at least ${min} entries`); return []; }
    return value;
  };
  const source = (value, where, typed = false) => {
    if (!value || typeof value !== 'object') { fail(where, 'missing source'); return; }
    text(value.label, `${where}.label`, 4);
    try {
      const url = new URL(value.url);
      if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) fail(where, 'source must be credential-free HTTPS');
    } catch { fail(where, 'invalid source URL'); }
    if (typed && !sourceKinds.has(value.kind)) fail(where, 'source kind must distinguish primary evidence, tribal account, institutional history, or official guidance');
  };
  const task = (value, where) => {
    if (!value || typeof value !== 'object') { fail(where, 'missing task'); return; }
    text(value.prompt, `${where}.prompt`);
    text(value.answer, `${where}.answer`);
  };
  const exactKeys = (value, where) => {
    const keys = Object.keys(value ?? {}).sort();
    if (JSON.stringify(keys) !== JSON.stringify([...expectedCodes].sort())) fail(where, `must contain exactly the 19 California substandards; found ${keys.join(', ')}`);
  };
  for (const key of ['lessons', 'explorations', 'activities', 'plans']) exactKeys(bundle[key], key);
  const chapters = array(bundle.chapters, 'chapters', 5);
  if (chapters.length !== 5) fail('chapters', 'must preserve exactly five chapters');
  if (new Set(chapters.map(chapter => chapter.id)).size !== chapters.length) fail('chapters', 'duplicate chapter identifiers');
  for (const [id, codes] of Object.entries(expectedGroups)) {
    const chapter = chapters.find(item => item.id === id);
    if (!chapter) { fail(id, 'missing chapter'); continue; }
    if (JSON.stringify(chapter.expectations?.map(item => item.code)) !== JSON.stringify(codes)) fail(id, 'chapter contains wrong, missing, or reordered standards');
    source({label:'CDE standards',url:chapter.source}, `${id}.source`);
    source({label:'CDE framework',url:chapter.frameworkSource}, `${id}.frameworkSource`);
  }

  for (const code of expectedCodes) {
    const lesson = bundle.lessons?.[code];
    const exploration = bundle.explorations?.[code];
    const activity = bundle.activities?.[code];
    const plan = bundle.plans?.[code];
    if (lesson) {
      for (const field of ['question', 'introduction', 'takeaway']) text(lesson[field], `${code}.lesson.${field}`);
      array(lesson.sections, `${code}.lesson.sections`, 2).forEach((section, index) => {
        text(section.text, `${code}.lesson.sections[${index}]`);
        if (section.source) source(section.source, `${code}.lesson.sections[${index}].source`);
      });
      text(lesson.example?.text, `${code}.lesson.example`);
    }
    if (exploration) array(exploration.sections, `${code}.exploration.sections`, 2).forEach((section, index) => {
      text(section.text, `${code}.exploration.sections[${index}]`);
      if (section.source) source(section.source, `${code}.exploration.sections[${index}].source`);
    });
    if (activity) {
      for (const field of ['objective', 'observe', 'observeAnswer', 'question', 'explanation', 'misconception', 'independent', 'sample']) text(activity[field], `${code}.activity.${field}`);
      array(activity.vocabulary, `${code}.activity.vocabulary`, 2).forEach((word, index) => {
        text(word.term, `${code}.activity.vocabulary[${index}].term`, 2);
        text(word.meaning, `${code}.activity.vocabulary[${index}].meaning`);
      });
      const options = array(activity.options, `${code}.activity.options`, 3);
      if (!Number.isInteger(activity.correctIndex) || activity.correctIndex < 0 || activity.correctIndex >= options.length) fail(`${code}.activity.correctIndex`, 'answer index out of range');
      if (!legacyAnswers[code].test(options[activity.correctIndex] ?? '')) fail(`${code}.activity.answer`, 'selected answer violates the independently reviewed answer contract');
      source(activity.source, `${code}.activity.source`);
      (activity.additionalSources ?? []).forEach((item, index) => source(item, `${code}.activity.additionalSources[${index}]`));
    }
    if (!plan) continue;
    for (const field of ['objective', 'requirement', 'prerequisite', 'nextPreparation']) text(plan[field], `${code}.plan.${field}`);
    task(plan.warmup, `${code}.warmup`);
    task(plan.model, `${code}.model`);
    array(plan.model?.reasoning, `${code}.model.reasoning`, 2).forEach((item, index) => text(item, `${code}.model.reasoning[${index}]`));
    task(plan.guided, `${code}.guided`);
    text(plan.guided?.hint, `${code}.guided.hint`);
    for (const level of ['support', 'core', 'challenge']) task(plan.practice?.[level], `${code}.practice.${level}`);
    task(plan.independent, `${code}.independent`);
    array(plan.independent?.criteria, `${code}.independent.criteria`, 2).forEach((item, index) => text(item, `${code}.independent.criteria[${index}]`));
    array(plan.misconceptions, `${code}.misconceptions`, 1).forEach((item, index) => text(item, `${code}.misconceptions[${index}]`));
    const sources = array(plan.sources, `${code}.sources`, 1);
    sources.forEach((item, index) => source(item, `${code}.sources[${index}]`, true));
    const evidence = array(plan.evidence, `${code}.evidence`, 2);
    evidence.forEach((item, index) => {
      text(item.title, `${code}.evidence[${index}].title`, 4);
      text(item.text, `${code}.evidence[${index}].text`);
      if (item.source) source(item.source, `${code}.evidence[${index}].source`, true);
      else if (/\b(?:17|18|19|20)\d{2}\b|\b(?:Anza|Moraga|Prusch|Dawson|Tubman|Graton|Muwekma|Tamien)\b/.test(item.text) && !/fictional|imagined|original example/i.test(item.title + item.text)) fail(`${code}.evidence[${index}]`, 'dated/named factual evidence needs an adjacent source');
    });
    if (code === '3.3.2') {
      // Comparing old and new work does not establish historical influence.
      // Keep the reviewed museum evidence of later site reuse in instruction
      // AND in the learner's independent assessment, not only in a label.
      const laterInfluence = evidence.find(item =>
        /Monte Vista/i.test(item.text) &&
        /Plant (?:Number )?3/i.test(item.text) &&
        /housing|residential/i.test(item.text) &&
        /wall fragments/i.test(item.text) && /water tower/i.test(item.text) &&
        /retain/i.test(item.text) &&
        item.source?.url === 'https://historysanjose.org/plan-your-visit/exhibits-activities/online-exhibits/cannery-life-del-monte-in-the-santa-clara-valley/'
      );
      if (!laterInfluence) fail(`${code}.laterInfluence`, 'instruction must retain the sourced Monte Vista/Plant 3 reuse and retained structures as documented later influence');
      const assessment = plan.independent ?? {};
      if (!/influence/i.test(assessment.prompt ?? '') || !/later|present|today/i.test(assessment.prompt ?? '') || !/land use|site|community/i.test(assessment.prompt ?? '')) fail(`${code}.laterInfluence`, 'independent prompt must ask for documented later community influence');
      if (!/housing|residential/i.test(assessment.answer ?? '') || !/Plant (?:Number )?3|cannery site/i.test(assessment.answer ?? '') || !/retain/i.test(assessment.answer ?? '')) fail(`${code}.laterInfluence`, 'independent model must explain the documented site reuse and retained industrial structures');
      if (!(assessment.criteria ?? []).some(item => /influence/i.test(item) && /site reuse|later/i.test(item) && /retain/i.test(item))) fail(`${code}.laterInfluence`, 'assessment criteria must require the documented influence, not just an old/new comparison');
    }
    const checks = array(plan.checks, `${code}.checks`, 3);
    if (new Set(checks.map(check => check.id)).size !== checks.length) fail(`${code}.checks`, 'duplicate check IDs');
    checks.forEach((check, index) => {
      const where = `${code}.checks[${index}]`;
      text(check.id, `${where}.id`, 2);
      text(check.prompt, `${where}.prompt`);
      text(check.explanation, `${where}.explanation`);
      text(check.retry, `${where}.retry`);
      const options = array(check.options, `${where}.options`, 3);
      options.forEach((option, optionIndex) => text(option, `${where}.options[${optionIndex}]`, 1));
      if (new Set(options.map(option => String(option).trim().toLowerCase())).size !== options.length) fail(where, 'answer choices must be distinct');
      if (!Number.isInteger(check.correctIndex) || check.correctIndex < 0 || check.correctIndex >= options.length) fail(where, 'answer index out of range');
      const answerContract = planAnswers[`${code}:${check.id}`];
      if (!answerContract) fail(where, 'check has no independent answer review contract');
      else if (!answerContract.test(options[check.correctIndex] ?? '')) fail(where, 'selected answer violates the independently reviewed meaning');
      if (options.some(option => /^(?:option|answer)\s*[ABC123]$/i.test(option))) fail(where, 'answer choices must contain meaningful content');
    });
    const visual = plan.visual;
    if (!visual || !['map', 'timeline', 'comparison', 'process'].includes(visual.kind)) fail(`${code}.visual`, 'missing or unknown teaching visual');
    else {
      text(visual.title, `${code}.visual.title`, 4);
      text(visual.caption, `${code}.visual.caption`);
      const nodes = array(visual.nodes, `${code}.visual.nodes`, 2);
      const ids = nodes.map(node => node.id);
      if (new Set(ids).size !== ids.length) fail(`${code}.visual`, 'duplicate visual node IDs');
      nodes.forEach((node, index) => {
        text(node.id, `${code}.visual.nodes[${index}].id`, 1);
        text(node.label, `${code}.visual.nodes[${index}].label`, 2);
        text(node.detail, `${code}.visual.nodes[${index}].detail`);
        if (node.source) source(node.source, `${code}.visual.nodes[${index}].source`, true);
      });
      if (visual.kind === 'timeline' || visual.correctOrder) {
        if (!Array.isArray(visual.correctOrder) || visual.correctOrder.length !== ids.length || new Set(visual.correctOrder).size !== ids.length || visual.correctOrder.some(id => !ids.includes(id))) fail(`${code}.visual.correctOrder`, 'ordering task must use each visual node exactly once');
        const numericDates = nodes.map(node => ({id:node.id, year:Number(node.label.match(/^\s*(\d{4})\b/)?.[1])}));
        if (numericDates.every(item => Number.isFinite(item.year))) {
          const independentlyOrdered = numericDates.sort((left, right) => left.year - right.year).map(item => item.id);
          if (JSON.stringify(visual.correctOrder) !== JSON.stringify(independentlyOrdered)) fail(`${code}.visual.correctOrder`, 'timeline answer does not follow the dated evidence');
        }
        if (reviewedSequences[code] && JSON.stringify(visual.correctOrder) !== JSON.stringify(reviewedSequences[code])) fail(`${code}.visual.correctOrder`, 'sequence differs from the independently reviewed process');
      }
    }
    const teachingText = JSON.stringify({ evidence: plan.evidence, model: plan.model, guided: plan.guided, practice: plan.practice, independent: plan.independent, visual: plan.visual });
    for (const pattern of clauseGuards[code]) if (!pattern.test(teachingText)) fail(`${code}.scope`, `reviewed instructional clause disappeared: ${pattern}`);
  }

  const expectedDaily = [
    ['recap','3.2.3'], ['recap','3.2.4'], ['current','3.3.1'],
    ['upcoming','3.3.2'], ['upcoming','3.3.3'], ['upcoming','3.4.1'], ['upcoming','3.4.2']
  ];
  const daily = array(bundle.daily, 'daily', 7);
  if (daily.length !== 7) fail('daily', 'must contain two recaps, one current topic, and four upcoming topics');
  if (new Set(daily.map(item => item.code)).size !== daily.length) fail('daily', 'duplicate daily topics');
  daily.forEach((item, index) => {
    if (JSON.stringify([item.role,item.code]) !== JSON.stringify(expectedDaily[index])) fail(`daily[${index}]`, 'planning anchor changed without a reviewed progress update');
    const chapter = Object.entries(expectedGroups).find(([,codes]) => codes.includes(item.code))?.[0];
    const expectedHref = `/ruchika/grade3/social-studies/chapters/${chapter}?standard=${item.code}`;
    if (item.href !== expectedHref) fail(`daily[${index}].href`, 'link must open the exact standard in its chapter');
  });
  return failures;
}

function validateDelivery() {
  const failures = [];
  const read = file => fs.readFileSync(path.join(sourceRoot, file), 'utf8');
  const page = read('social-studies.html');
  const teaching = read('social-studies-teaching.html');
  const logic = read('social-studies-teaching.ts');
  const routes = fs.readFileSync(path.join(appRoot, 'src/app/app.routes.ts'), 'utf8');
  if (!routes.includes("path: 'ruchika/grade3/social-studies'") || !routes.includes("path: 'ruchika/grade3/social-studies/chapters/:chapterId'")) failures.push('delivery: existing Social Studies routes missing');
  for (const [name, markup] of [['page',page], ['teaching',teaching]]) {
    if (/<(?:iframe|embed|object)\b/i.test(markup)) failures.push(`delivery.${name}: embedded document must not replace the teaching interface`);
  }
  for (const marker of ['teaching.sections', 'exploration()', 'extraImages()', 'task.options', 'social-reflection', 'social-teacher-guide', 'chapter-nav']) if (!page.includes(marker)) failures.push(`delivery: original content/interaction missing: ${marker}`);
  if (!page.includes('additionalSources')) failures.push('delivery: multi-source activity evidence is not rendered');
  for (const marker of ['warmup', 'model', 'guided', 'practice', 'checks', 'independent', 'misconceptions']) if (!teaching.includes(marker)) failures.push(`delivery: teaching interface omits ${marker}`);
  if (!/<textarea\b/i.test(teaching)) failures.push('delivery: independent student response control missing');
  if (!/aria-live|role="status"/.test(teaching)) failures.push('delivery: answer feedback needs an announced status');
  if (!/original|supplemental/i.test(teaching)) failures.push('delivery: original supplemental authorship label missing');
  if (/localStorage|sessionStorage|fetch\s*\(|XMLHttpRequest|sendBeacon/.test(logic)) failures.push('delivery: new teaching logic must preserve in-memory-only student state');
  if (/\b(?:independent|response|reflection)\w*\s*\([^)]*\)\s*={2,3}\s*[^;\n]*\.answer|\.answer\s*={2,3}\s*[^;\n]*(?:response|reflection)/i.test(logic)) failures.push('delivery: open-ended response must not be exact-string graded');
  if (!/planning|suggested|not confirmed/i.test(page)) failures.push('delivery: daily anchor must be labeled as planning, not confirmed learning progress');
  return failures;
}

function selfTest(bundle) {
  const fixtures = [
    ['missing standard', copy => { delete copy.plans['3.2.3']; }],
    ['wrong standard', copy => { copy.plans['3.9.9'] = copy.plans['3.1.1']; }],
    ['invalid answer index', copy => { copy.plans['3.1.1'].checks[0].correctIndex = 99; }],
    ['changed correct answer', copy => { copy.activities['3.3.3'].correctIndex = 0; }],
    ['changed readiness answer', copy => { copy.plans['3.1.1'].checks[0].correctIndex = 0; }],
    ['wrong chronological answer', copy => { copy.plans['3.3.3'].visual.correctOrder.reverse(); }],
    ['wrong process answer', copy => { copy.plans['3.1.2'].visual.correctOrder.reverse(); }],
    ['removed documented later influence', copy => {
      const plan = copy.plans['3.3.2'];
      plan.evidence = plan.evidence.filter(item => !/Monte Vista/i.test(item.text));
      plan.independent.prompt = 'Compare a historical business with a present-day business. Name a similarity and a difference.';
      plan.independent.answer = 'Canneries and modern businesses both organize skilled work and equipment, although their products differ.';
      plan.independent.criteria = ['Names historical and present-day work.', 'Explains one similarity and one difference.'];
      // Leave the objective and visual intact: those cannot satisfy this gate.
    }],
    ['missing choice', copy => { copy.plans['3.1.1'].checks[0].options = ['One choice']; }],
    ['insecure source', copy => { copy.plans['3.1.1'].sources[0].url = 'http://example.com'; }],
    ['missing source', copy => { copy.plans['3.1.1'].sources = []; }],
    ['unknown source type', copy => { copy.plans['3.1.1'].sources[0].kind = 'verified because present'; }],
    ['placeholder model answer', copy => { copy.plans['3.1.1'].model.answer = '[insert answer here]'; }],
    ['procedural answer', copy => { copy.activities['3.2.1'].sample = 'I would name the community and cite a source.'; }],
    ['wrong daily route', copy => { copy.daily[2].href = '/ruchika/grade3/social-studies/chapters/community-history?standard=3.3.2'; }],
    ['missing teacher prerequisite', copy => { copy.plans['3.1.1'].prerequisite = ''; }]
  ];
  for (const [name, mutate] of fixtures) {
    const candidate = structuredClone(bundle);
    mutate(candidate);
    if (validateBundle(candidate).length === 0) throw new Error(`Negative fixture was incorrectly accepted: ${name}`);
  }
  return fixtures.length;
}

try {
  const bundle = loadBundle();
  const failures = [...validateBundle(bundle), ...validateDelivery()];
  if (failures.length) {
    console.error('Social Studies release validation FAILED:');
    failures.forEach(item => console.error(`- ${item}`));
    process.exitCode = 1;
  } else {
    const checks = Object.values(bundle.plans).reduce((count, plan) => count + plan.checks.length, 0);
    console.log(`PASS: five chapters, 19 legacy lessons/explorations/activities, 19 complete teaching plans, ${checks} lesson checks, and seven exact daily links.`);
    console.log('PASS: reviewed legacy answers, scope-preservation contracts, source types/HTTPS, visuals, teacher models, and no-PDF delivery structure.');
    if (process.argv.includes('--self-test')) console.log(`PASS: ${selfTest(bundle)} deliberately invalid fixtures rejected; valid candidate accepted first.`);
    console.log('LIMIT: this script does not replace independent curriculum/source review, an optimized Angular build, or live browser validation.');
  }
} catch (error) {
  console.error(`Social Studies release validation BLOCKED: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
