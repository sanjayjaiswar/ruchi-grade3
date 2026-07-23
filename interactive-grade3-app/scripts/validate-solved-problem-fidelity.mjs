import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

require.extensions['.ts'] = function loadTypeScript(module, filename) {
  const source = readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      importHelpers: false,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022
    }
  });
  module._compile(output.outputText, filename);
};

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const { findLessonRuntime } = require(join(root, 'src/app/data/lessons/lesson-registry.ts'));

const lessonCounts = { m1: 21, m2: 21, m3: 21, m4: 16, m5: 30, m6: 9, m7: 34 };
const expectedProblemCounts = { m1: 111, m2: 93, m3: 93, m4: 68, m5: 158, m6: 24, m7: 127 };

const exactSolvedEvidence = {
  'm1-2-1': {
    require: [/4 x 2 = 8/, /4 rows with 2 cars/, /8 cars total/],
    forbid: [/4 x 3 = 12/, /4 rows with 3 cars/]
  },
  'm1-2-4': {
    require: [/5 x 4 = 20/, /4 triangles in each row/, /20 triangles total/],
    forbid: [/5 x 3 = 15/, /3 triangles in each row/]
  },
  'm1-3-2': {
    require: [/6 x 3 = 18/, /3 candies in each box/, /18 candies altogether/],
    forbid: [/6 x 4 = 24/, /4 candies in each box/]
  },
  'm1-7-5': {
    require: [/4 x 2 = 8/, /2 x 4 = 8/]
  },
  'm1-13-2': {
    require: [/12 divided by 3 = 4/, /4 x 3 = 12/, /4 bags/],
    forbid: [/15 divided by 3 = 5/, /5 bags/]
  },
  'm5-11-3': { require: [/\b1\/10\b/] },
  'm5-11-4': { require: [/\b1\/12\b/] },
  'm5-11-5': { require: [/\b1\/8\b/] },
  'm5-11-6': { require: [/\b1\/9\b/] },
  'm5-11-7': { require: [/\b1\/12\b/] },
  'm5-15-1': {
    require: [
      /2\/3 \+ 1\/3 = 1/,
      /3\/4 \+ 1\/4 = 1/,
      /3\/5 \+ 2\/5 = 1/,
      /5\/6 \+ 1\/6 = 1/,
      /3\/10 \+ 7\/10 = 1/
    ]
  },
  'm5-17-4': {
    require: [/2 inches is 8\/4 inches/, /8\/4 is greater than 7\/4/],
    forbid: [/7\/4 inches is longer than 2\/4/]
  },
  'm5-18-2': { require: [/2\/6 < 3\/6/, /circle 2\/6/] },
  'm5-18-3': {
    require: [/1\/2 > 1\/4/, /circle 1\/4/],
    forbid: [/2\/6 and 3\/6/]
  },
  'm5-18-4': {
    require: [/2\/3 > 2\/6/, /circle 2\/6/],
    forbid: [/1\/2 and 2\/4/]
  },
  'm5-18-5': {
    require: [/11\/8 < 7\/4/, /circle 11\/8/],
    forbid: [/place 7\/8 and 7\/4/]
  },
  'm5-18-6': { require: [/5\/6 < 7\/8/, /JoAnn walks less/i] },
  'm5-18-7': { require: [/4\/5 is less than 1 whole/, /5\/4 is greater than 1 whole/] },
  'm5-18-8': {
    require: [/7\/8 < 7\/4 < 4\/2/],
    forbid: [/7\/8 < 7\/4 < 7\/2/]
  },
  'm5-21-1': {
    require: [/fourths line/, /sixths line/, /8\/4/, /12\/6/]
  },
  'm5-21-2': {
    require: [/shade blue/i, /shade yellow/i, /shade green/i, /shade red/i, /9\/6/, /12\/6/]
  },
  'm5-21-3': {
    require: [/2\/4 = 3\/6/, /6\/6 = 2\/2 = 4\/4/, /3\/2 = 9\/6 = 6\/4/]
  },
  'm5-23-4': {
    require: [/7\/2 = 14\/4 = 28\/8/],
    forbid: [/1\/3 and 2\/6/]
  },
  'm5-23-5': {
    require: [/1\/3 = 2\/6/, /2\/4 = 1\/2/, /5\/4 = 10\/8/, /10\/5 = 2\/1/],
    forbid: [/7\/2 = 14\/4 = 28\/8/]
  },
  'm5-23-6': {
    require: [/Cameron rests after 2\/3/, /Terrance rests after 2\/6 = 1\/3/, /2\/3 > 2\/6/],
    forbid: [/1 half = 1\/2/, /2 fourths = 2\/4/]
  },
  'm5-25-1': {
    require: [/3\/3/, /3\/2/, /3\/1/, /4\/4/, /4\/2/, /4\/1/, /6\/6/, /6\/3/, /6\/1/]
  },
  'm5-25-2': {
    require: [/missing whole numbers 2 3 5 and 6/i, /0\/1/, /6\/1/],
    forbid: [/complete the equivalent whole-number fractions: 3\/3/]
  },
  'm5-25-3': {
    require: [/2\/1 means 2 wholes/, /2\/2 means 1 whole/],
    forbid: [/1 half = 1\/2/, /2 fourths = 2\/4/]
  },
  'm5-27-1': { require: [/4\/6/, /2\/3/, /1\/2/, /4\/8/] },
  'm5-27-2': { require: [/1\/2 = 2\/4 = 3\/6/, /each friend receives 1\/2/i] },
  'm5-27-3': { require: [/6\/8 = 3\/4/, /each fourth is equal to two eighths/] },
  'm5-27-5': { require: [/1\/4 = 2\/8/, /4\/4 = 8\/8/] },
  'm6-1-4': { require: [/1 and 1\/2 symbols/, /7 symbols x 2 students = 14 students/] },
  'm6-3-1': { require: [/each bar-graph square represents 2 students/i, /9 \+ 16 \+ 13 \+ 18 = 56/, /22 - 16 = 6/] },
  'm6-3-5': { require: [/Monday Tuesday and Thursday/i, /50 minutes/, /70 - 40 = 30/] }
};

const exactSourcePromptEvidence = {
  'm5-17-1': [/0\/6/, /6\/6/, /12\/6/, /3\/6/, /9\/6/],
  'm5-17-2': [/8\/4/, /6\/4/, /12\/4/, /16\/4/, /4\/4/],
  'm5-17-3': [/18\/3/, /14\/3/, /9\/3/, /11\/3/, /6\/3/],
  'm5-17-4': [/2 inches/, /7\/4 inches/],
  'm5-17-5': [/7\/5 kilometer/, /12\/5 kilometers/],
  'm5-18-1': [/1\/4/, /3\/4/],
  'm5-18-2': [/2\/6/, /3\/6/],
  'm5-18-3': [/1\/2/, /1\/4/],
  'm5-18-4': [/2\/3/, /2\/6/],
  'm5-18-5': [/11\/8/, /7\/4/],
  'm5-18-6': [/5\/6 mile/, /7\/8 mile/],
  'm5-18-7': [/5\/4 meters/, /4\/5 meter/],
  'm5-18-8': [/7\/8 foot/, /7\/4 feet/, /4\/2 feet/],
  'm5-21-1': [/halves with fourths/, /halves with sixths/],
  'm5-21-3': [/2\/4 = ___\/6/, /6\/6 = ___\/2 = ___\/4/, /3\/2 = ___\/6 = ___\/4/],
  'm5-21-4': [/2\/4 inch/, /marked in eighths/],
  'm5-21-5': [/1\/2 inch/, /2\/4 inch/, /4\/8 inch/],
  'm5-23-4': [/equal to 7\/2/],
  'm5-23-6': [/2 of 3 equal race parts \(2\/3\)/, /2 of 6 equal race parts \(2\/6\)/],
  'm5-25-2': [/missing whole numbers 2, 3, 5, and 6/, /denominator 1/],
  'm5-25-3': [/difference between 2\/1 and 2\/2/]
};

const exactSolvedGeometry = {
  'm5-17-4': (problem) => [
    [
      problem.numberLineModels?.[0]?.tickLabels?.length === 9,
      'pinky-finger number line must contain all 9 quarter-inch ticks from 0 to 2'
    ],
    [
      problem.numberLineModels?.[0]?.tickLabels?.includes('7/4 in') &&
        problem.numberLineModels?.[0]?.tickLabels?.includes('8/4 = 2 in'),
      'pinky-finger number line must locate 7/4 and 2 inches (= 8/4) on the same fourths scale'
    ]
  ],
  'm5-18-3': (problem) => [
    [
      problem.numberLineModels?.[0]?.label === 'Halves and fourths comparison',
      'comparison must use the Teacher Edition halves-and-fourths scale'
    ],
    [
      sameValues(problem.numberLineModels?.[0]?.tickLabels, ['0/4 = 0', '1/4', '2/4', '3/4', '4/4 = 1']),
      'comparison must show every fourth from 0 to 1'
    ]
  ],
  'm5-18-4': (problem) => [
    [
      problem.numberLineModels?.[0]?.label === 'Thirds and sixths comparison',
      'comparison must use the Teacher Edition thirds-and-sixths scale'
    ],
    [
      problem.numberLineModels?.[0]?.tickLabels?.length === 7 &&
        problem.numberLineModels?.[0]?.tickLabels?.includes('2/6') &&
        problem.numberLineModels?.[0]?.tickLabels?.includes('4/6'),
      'comparison must show 2/6 and 4/6 (= 2/3) on a complete sixths scale'
    ]
  ],
  'm5-18-5': (problem) => [
    [
      problem.numberLineModels?.[0]?.tickLabels?.length === 9,
      'comparison must contain all eighth ticks from 1 to 2'
    ],
    [
      problem.numberLineModels?.[0]?.tickLabels?.includes('11/8') &&
        problem.numberLineModels?.[0]?.tickLabels?.includes('14/8'),
      'comparison must locate 11/8 and 14/8 (= 7/4)'
    ],
    [
      !problem.numberLineModels?.[0]?.tickLabels?.includes('7/8'),
      'comparison must not substitute 7/8 for the Teacher Edition value 11/8'
    ]
  ],
  'm5-18-8': (problem) => [
    [
      problem.numberLineModels?.[0]?.tickLabels?.length === 17,
      'spaghetti number line must contain all eighth ticks from 0 to 2'
    ],
    [
      sameValues(problem.numberLineModels?.[0]?.targetNumerators, [7, 14, 16]),
      'spaghetti number line must target 7/8, 14/8 (= 7/4), and 16/8 (= 4/2)'
    ],
    [
      sameFractionModels(problem.fractionModels, [
        ['first noodle: 7/8 foot', 7, 8],
        ['second noodle: 7/4 feet', 7, 4],
        ['third noodle: 4/2 feet', 4, 2]
      ]),
      'spaghetti fraction models must contain only the three Teacher Edition noodle lengths'
    ]
  ],
  'm5-21-1': (problem) => [
    [
      problem.numberLineModels?.[0]?.tickLabels?.length === 9 &&
        problem.numberLineModels?.[1]?.tickLabels?.length === 13,
      'equivalent-fraction models must show complete fourths and sixths scales from 0 to 2'
    ],
    [
      sameFractionModels(problem.fractionModels, [
        ['0/2', 0, 2],
        ['3/2', 3, 2],
        ['1/4', 1, 4],
        ['2/4', 2, 4],
        ['4/4', 4, 4],
        ['6/4', 6, 4],
        ['8/4', 8, 4],
        ['1/6', 1, 6],
        ['3/6', 3, 6],
        ['6/6', 6, 6],
        ['9/6', 9, 6],
        ['12/6', 12, 6]
      ]),
      'equivalent-fraction cards must use the exact Teacher Edition labels without autogenerated substitutes'
    ]
  ],
  'm5-23-4': (problem) => [
    [
      problem.numberLineModels?.[0]?.tickLabels?.includes('7/2 = 14/4 = 28/8'),
      'equivalence number line must mark 7/2 = 14/4 = 28/8 at one point'
    ],
    [
      sameFractionModels(problem.fractionModels, [
        ['7/2', 7, 2],
        ['14/4', 14, 4],
        ['28/8', 28, 8]
      ]),
      'equivalence cards must contain the three Teacher Edition forms'
    ]
  ],
  'm5-23-6': (problem) => [
    [
      problem.numberLineModels?.[0]?.tickLabels?.length === 4 &&
        problem.numberLineModels?.[1]?.tickLabels?.length === 7,
      'race model must use complete thirds and sixths number lines'
    ],
    [
      sameFractionModels(problem.fractionModels, [
        ['Cameron: 2/3 of the race', 2, 3],
        ['Terrance: 2/6 of the race', 2, 6]
      ]),
      'race model must compare Cameron at 2/3 with Terrance at 2/6'
    ]
  ],
  'm5-25-1': (problem) => [
    [
      problem.numberLineModels?.length === 0,
      'whole-number fraction task must use area/fraction models rather than an invented number line'
    ],
    [
      sameFractionModels(problem.fractionModels, [
        ['3/3', 3, 3],
        ['3/2', 3, 2],
        ['3/1', 3, 1],
        ['4/4', 4, 4],
        ['4/2', 4, 2],
        ['4/1', 4, 1],
        ['6/6', 6, 6],
        ['6/3', 6, 3],
        ['6/1', 6, 1]
      ]),
      'whole-number fraction task must preserve all nine Teacher Edition models'
    ]
  ],
  'm5-25-2': (problem) => [
    [
      sameFractionModels(problem.fractionModels, [
        ['0/1', 0, 1],
        ['1/1', 1, 1],
        ['2/1', 2, 1],
        ['3/1', 3, 1],
        ['4/1', 4, 1],
        ['5/1', 5, 1],
        ['6/1', 6, 1]
      ]),
      'whole-number number line must not inherit unrelated halves/fourths fraction cards'
    ]
  ],
  'm5-25-3': (problem) => [
    [
      sameFractionModels(problem.fractionModels, [
        ['2/1: two wholes', 2, 1],
        ['2/2: one whole', 2, 2]
      ]),
      'comparison must model the source fractions 2/1 and 2/2'
    ],
    [
      problem.numberLineModels?.length === 0,
      'source comparison requests words and pictures, not an invented halves/fourths number line'
    ]
  ],
  'm5-27-1': (problem) => [
    [
      sameFractionModels(problem.fractionModels, [
        ['4/6', 4, 6],
        ['2/3', 2, 3],
        ['1/2', 1, 2],
        ['4/8', 4, 8]
      ]),
      'equivalence models must show 4/6 = 2/3 and 1/2 = 4/8'
    ]
  ],
  'm5-27-5': (problem) => [
    [
      sameFractionModels(problem.fractionModels, [
        ['original whole: 4/4', 4, 4],
        ['after doubling parts: 8/8', 8, 8],
        ['one original fourth: 1/4', 1, 4],
        ['same amount in eighths: 2/8', 2, 8]
      ]),
      'magic-wand model must visibly double fourths to eighths'
    ]
  ]
};

function sameValues(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function sameFractionModels(actual, expected) {
  return sameValues(
    (actual ?? []).map(({ label, numerator, denominator }) => [label, numerator, denominator]),
    expected
  );
}

function normalizedSolvedText(problem) {
  return [
    problem.solvedAnswer,
    problem.explanation,
    ...(problem.equations ?? []),
    JSON.stringify(problem.solvedVisual ?? {}),
    JSON.stringify(problem.solvedDataDisplay ?? {})
  ]
    .join(' ')
    .replace(/[×·]/g, 'x')
    .replace(/[÷]/g, 'divided by')
    .replace(/[–—−]/g, '-')
    .replace(/,/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

const failures = [];
let totalProblems = 0;

for (const [moduleId, lessonCount] of Object.entries(lessonCounts)) {
  let moduleProblems = 0;
  for (let lessonNumber = 1; lessonNumber <= lessonCount; lessonNumber += 1) {
    const runtime = findLessonRuntime(moduleId, lessonNumber);
    const lesson = runtime?.problemSetCenteredLesson;
    assert(Boolean(lesson), `${moduleId.toUpperCase()} L${lessonNumber}: missing problemSetCenteredLesson`, failures);
    if (!lesson) continue;

    const contractPath = join(
      root,
      'teacher-edition-baseline',
      'contracts',
      moduleId,
      `lesson-${String(lessonNumber).padStart(2, '0')}.json`
    );
    const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
    assert(
      Boolean(contract.problemSet?.problemSetText?.trim()),
      `${moduleId.toUpperCase()} L${lessonNumber}: Teacher Edition Problem Set text is empty`,
      failures
    );
    assert(
      Boolean(contract.problemSet?.answerKeyProblemSetText?.trim()) || contract.problemSet?.permitsVariableResponses,
      `${moduleId.toUpperCase()} L${lessonNumber}: no answer-key text and variable responses are not permitted`,
      failures
    );

    for (const problem of lesson.problems ?? []) {
      totalProblems += 1;
      moduleProblems += 1;
      const label = `${moduleId.toUpperCase()} L${lessonNumber} P${problem.number}`;
      const text = normalizedSolvedText(problem);

      assert(Boolean(problem.sourcePrompt?.trim()), `${label}: missing source prompt`, failures);
      assert(Boolean(problem.solvedAnswer?.trim()), `${label}: missing solved answer`, failures);
      assert(Boolean(problem.explanation?.trim()), `${label}: missing reasoning explanation`, failures);
      assert(Boolean(problem.solvedVisual?.sections?.length), `${label}: missing solved mathematical visual`, failures);
      assert(
        JSON.stringify(problem.blankVisual) !== JSON.stringify(problem.solvedVisual),
        `${label}: Blank and Solved visuals are identical`,
        failures
      );
      assert(
        !/solved view uses the authored module/i.test(text),
        `${label}: generic authored-module claim remains in solved evidence`,
        failures
      );

      const evidence = exactSolvedEvidence[`${moduleId}-${lessonNumber}-${problem.number}`];
      for (const pattern of evidence?.require ?? []) {
        assert(pattern.test(text), `${label}: missing required Teacher Edition evidence ${pattern}`, failures);
      }
      for (const pattern of evidence?.forbid ?? []) {
        assert(!pattern.test(text), `${label}: forbidden drift remains ${pattern}`, failures);
      }

      const sourceText = problem.sourcePrompt.replace(/\s+/g, ' ').trim();
      for (const pattern of exactSourcePromptEvidence[`${moduleId}-${lessonNumber}-${problem.number}`] ?? []) {
        assert(pattern.test(sourceText), `${label}: source prompt lost Teacher Edition evidence ${pattern}`, failures);
      }

      const geometryChecks = exactSolvedGeometry[`${moduleId}-${lessonNumber}-${problem.number}`]?.(problem) ?? [];
      for (const [condition, message] of geometryChecks) {
        assert(condition, `${label}: ${message}`, failures);
      }
    }
  }

  assert(
    moduleProblems === expectedProblemCounts[moduleId],
    `${moduleId.toUpperCase()}: expected ${expectedProblemCounts[moduleId]} delivered problems, found ${moduleProblems}`,
    failures
  );
}

assert(totalProblems === 674, `Expected 674 delivered problems, found ${totalProblems}`, failures);

if (failures.length) {
  console.error(`Solved-problem fidelity validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Solved-problem fidelity validation passed: ${totalProblems} problems across 152 lessons.`);
  console.log(`Exact Teacher Edition regression assertions passed for ${Object.keys(exactSolvedEvidence).length} high-risk solved items.`);
  console.log(`Exact source-prompt regression assertions passed for ${Object.keys(exactSourcePromptEvidence).length} stacked-fraction items.`);
  console.log(`Exact mathematical-geometry assertions passed for ${Object.keys(exactSolvedGeometry).length} high-risk solved items.`);
}
