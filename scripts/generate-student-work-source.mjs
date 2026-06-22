import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const repoRoot = process.cwd();

const modules = [
  {
    id: 'm1',
    number: 1,
    student: 'EurekaMath-Sources/Module_1/g3_m1_student_wkbook_v1_3_1.pdf',
    teacher: 'EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf'
  },
  {
    id: 'm2',
    number: 2,
    student: 'EurekaMath-Sources/Module_2/g3_m2_student_wkbook_v1_3_0.pdf',
    teacher: 'EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf'
  },
  {
    id: 'm3',
    number: 3,
    student: 'EurekaMath-Sources/Module_3/g3_m3_student_wkbook_v1_3_0.pdf',
    teacher: 'EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf'
  },
  {
    id: 'm4',
    number: 4,
    student: 'EurekaMath-Sources/Module_4/g3_m4_student_wkbook_v1_3_0.pdf',
    teacher: 'EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf'
  },
  {
    id: 'm5',
    number: 5,
    student: 'EurekaMath-Sources/Module_5/g3_m5_student_wkbook_v1_3_1.pdf',
    teacher: 'EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf'
  },
  {
    id: 'm6',
    number: 6,
    student: 'EurekaMath-Sources/Module_6/g3_m6_student_wkbook_v1_3_1.pdf',
    teacher: 'EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf'
  },
  {
    id: 'm7',
    number: 7,
    student: 'EurekaMath-Sources/Module_7/g3_m7_student_wkbook_v1_3_1.pdf',
    teacher: 'EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf'
  }
];

const sectionPreference = ['Problem Set', 'Homework', 'Summer Calendar', 'Template'];
const generatedPath = path.join(repoRoot, 'interactive-grade3-app/src/app/data/student-work-source.generated.ts');

function extractObjectLiteral(source, marker) {
  const start = source.indexOf(marker);
  if (start < 0) {
    throw new Error(`Could not find ${marker}`);
  }
  const assignment = source.indexOf('=', start);
  if (assignment < 0) {
    throw new Error(`Could not find assignment for ${marker}`);
  }
  const open = source.indexOf('{', assignment);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    const char = source[index];
    if (char === '{') {
      depth += 1;
    }
    if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(open, index + 1);
      }
    }
  }
  throw new Error(`Could not parse object for ${marker}`);
}

function curriculumRanges() {
  const source = readFileSync(path.join(repoRoot, 'interactive-grade3-app/src/app/data/curriculum.data.ts'), 'utf8');
  const objectSource = extractObjectLiteral(source, 'const LESSON_PAGE_RANGES');
  return vm.runInNewContext(`(${objectSource})`);
}

function pdfText(relativePath, options = {}) {
  const args = ['-layout'];
  if (options.pageStart && options.pageEnd) {
    args.push('-f', String(options.pageStart), '-l', String(options.pageEnd));
  }
  args.push(path.join(repoRoot, relativePath), '-');
  return execFileSync('pdftotext', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

function cleanText(value) {
  return value
    .replace(/\f/g, '\n')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/→/g, '->')
    .replace(//g, '->')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

function cleanWorkbookLine(line, lessonNumber) {
  const compact = cleanText(line);
  if (!compact) {
    return '';
  }
  if (/^A STORY OF UNITS/i.test(compact)) {
    return '';
  }
  if (/^Name\s+Date$/i.test(compact) || /^Name$/i.test(compact) || /^Date$/i.test(compact)) {
    return '';
  }
  if (/^©/.test(compact) || /eureka-math\.org/i.test(compact)) {
    return '';
  }
  if (/^G\s*\d-M\d-/i.test(compact) || /G\s*\d-M\d-TE/i.test(compact)) {
    return '';
  }
  if (/^\d+\.\d+\s+\d+\s+\d+$/.test(compact)) {
    return '';
  }
  if (new RegExp(`^Lesson ${lessonNumber}:`, 'i').test(compact)) {
    return '';
  }
  if (/^\d+$/.test(compact)) {
    return '';
  }
  return compact;
}

function splitWorkbookSections(text) {
  const lines = text.replace(/\f/g, '\n\f').split('\n');
  const headingRegex = /Lesson\s+(\d+)\s+(Problem Set|Homework|Exit Ticket|Template|Summer Calendar)\b/i;
  const sections = [];

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(headingRegex);
    if (!match) {
      continue;
    }

    const lessonNumber = Number(match[1]);
    const section = titleCaseSection(match[2]);
    const start = index + 1;
    let end = lines.length;
    for (let next = start; next < lines.length; next += 1) {
      if (lines[next].match(headingRegex)) {
        end = next;
        break;
      }
    }
    sections.push({
      lessonNumber,
      section,
      lines: lines.slice(start, end)
    });
  }

  return sections;
}

function titleCaseSection(value) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

function selectedWorkbookSection(sections, lessonNumber) {
  const candidates = sections.filter((section) => section.lessonNumber === lessonNumber);
  for (const preferred of sectionPreference) {
    const selected = candidates.filter((section) => section.section === preferred);
    if (selected.length) {
      return {
        section: preferred,
        lines: selected.flatMap((section) => section.lines)
      };
    }
  }
  return undefined;
}

function extractProblemsFromLines(lines, lessonNumber) {
  const cleanedLines = lines
    .map((line) => cleanWorkbookLine(line, lessonNumber))
    .filter(Boolean);
  const joined = normalizePrompt(cleanedLines.join(' '));
  const markerRegex = /(?<!\S)(\d{1,2})\.\s+/g;
  const rawMarkers = Array.from(joined.matchAll(markerRegex))
    .filter((match) => match.index !== undefined)
    .map((match) => ({
      number: Number(match[1]),
      start: match.index ?? 0,
      contentStart: (match.index ?? 0) + match[0].length
    }))
    .filter((marker) => !/^\d{1,2}\.\s+/.test(joined.slice(marker.contentStart).trimStart()));
  const markers = [];
  for (const marker of rawMarkers) {
    const previous = markers[markers.length - 1];
    if (!previous) {
      if (marker.number === 1) {
        markers.push(marker);
      }
      continue;
    }
    if (marker.number === previous.number + 1) {
      markers.push(marker);
    }
  }

  if (markers.length) {
    return markers
      .map((marker, index) => {
        const next = markers[index + 1];
        const prompt = normalizePrompt(joined.slice(marker.contentStart, next?.start ?? joined.length));
        return {
          number: marker.number,
          prompt,
          equations: extractEquations(prompt)
        };
      })
      .filter((problem) => problem.prompt.length > 8);
  }

  const problems = [];
  let current;

  const flush = () => {
    if (!current) {
      return;
    }
    const prompt = normalizePrompt(current.parts.join(' '));
    if (prompt.length > 8) {
      problems.push({
        number: current.number,
        prompt,
        equations: extractEquations(prompt)
      });
    }
    current = undefined;
  };

  for (const line of cleanedLines) {
    const match = line.match(/^(\d+)\.\s*(.*)$/);
    if (match) {
      flush();
      current = { number: Number(match[1]), parts: [match[2]] };
      continue;
    }
    if (current) {
      current.parts.push(line);
    }
  }
  flush();

  if (problems.length) {
    return problems;
  }

  return fallbackParagraphProblems(cleanedLines);
}

function fallbackParagraphProblems(lines) {
  const paragraphs = [];
  let current = [];
  for (const line of lines) {
    if (!line.trim()) {
      if (current.length) {
        paragraphs.push(current.join(' '));
        current = [];
      }
      continue;
    }
    current.push(line);
  }
  if (current.length) {
    paragraphs.push(current.join(' '));
  }

  return paragraphs
    .map(normalizePrompt)
    .filter((prompt) => prompt.length > 20)
    .slice(0, 8)
    .map((prompt, index) => ({
      number: index + 1,
      prompt,
      equations: extractEquations(prompt)
    }));
}

function normalizePrompt(value) {
  return value
    .replace(/\bG\s*\d-M\s*\d-[A-Z]+-[\d. -]+/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/_{3,}/g, '____')
    .replace(/\s+([?.!,;:])/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim();
}

function extractEquations(prompt) {
  const equations = [];
  const token = '(?:_{2,}|\\?|\\d+)';
  const regex = new RegExp(`${token}\\s*(?:[×÷+\\-=]|\\s+x\\s+)\\s*${token}(?:\\s*=\\s*${token})?`, 'g');
  let match;
  while ((match = regex.exec(prompt)) !== null) {
    const equation = match[0].replace(/\s+/g, ' ').trim();
    if (equation.length > 2 && !equations.includes(equation)) {
      equations.push(equation);
    }
  }
  return equations.slice(0, 4);
}

function cleanTeacherSnippet(value) {
  return cleanText(value)
    .split('\n')
    .map((line) => cleanText(line))
    .filter((line) => {
      if (!line) {
        return false;
      }
      if (/^A STORY OF UNITS/i.test(line)) {
        return false;
      }
      if (/^Lesson \d+:/i.test(line)) {
        return false;
      }
      if (/^©/.test(line) || /eureka-math\.org/i.test(line)) {
        return false;
      }
      return true;
    })
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function snippetBetween(text, startPattern, endPatterns, maxLength) {
  const match = text.match(startPattern);
  if (!match || match.index === undefined) {
    return '';
  }
  const start = match.index;
  const rest = text.slice(start);
  const endIndexes = endPatterns
    .map((pattern) => {
      const endMatch = rest.slice(match[0].length).match(pattern);
      return endMatch?.index === undefined ? -1 : endMatch.index + match[0].length;
    })
    .filter((index) => index > 0);
  const end = endIndexes.length ? Math.min(...endIndexes) : rest.length;
  const snippet = cleanTeacherSnippet(rest.slice(0, end));
  if (snippet.length <= maxLength) {
    return snippet;
  }
  return `${snippet.slice(0, maxLength - 1).trim()}…`;
}

function teacherReferences(moduleConfig, lessonNumber, range) {
  const text = pdfText(moduleConfig.teacher, range);
  const problemSet = snippetBetween(
    text,
    /Problem Set\s*\([^)]*\)/i,
    [/Student Debrief\s*\(/i, /Exit Ticket\s*\(/i],
    560
  );
  const debrief = snippetBetween(
    text,
    /Student Debrief\s*\([^)]*\)/i,
    [/Exit Ticket\s*\(/i, /Lesson \d+ Problem Set/i],
    620
  );
  const concept = snippetBetween(
    text,
    /Problem\s+1\s*:/i,
    [/Problem\s+2\s*:/i, /Problem Set\s*\(/i],
    560
  );

  return {
    teacherEditionReference:
      problemSet ||
      concept ||
      `Use the Teacher Edition lesson pages ${range.pageStart}-${range.pageEnd} for the exact teacher explanation and support sequence.`,
    teacherDebrief:
      debrief ||
      'Use the Teacher Edition Student Debrief and Exit Ticket guidance to check how the student explains the model, equation, and answer.'
  };
}

function lessonCounts(ranges) {
  return Object.fromEntries(
    Object.entries(ranges).map(([moduleId, lessons]) => [
      moduleId,
      Math.max(...Object.keys(lessons).map(Number))
    ])
  );
}

function generate() {
  const ranges = curriculumRanges();
  const counts = lessonCounts(ranges);
  const output = {};
  const missing = [];

  for (const moduleConfig of modules) {
    const studentText = pdfText(moduleConfig.student);
    const sections = splitWorkbookSections(studentText);
    for (let lessonNumber = 1; lessonNumber <= counts[moduleConfig.id]; lessonNumber += 1) {
      const key = `${moduleConfig.id}-l${lessonNumber}`;
      const workbook = selectedWorkbookSection(sections, lessonNumber);
      const range = ranges[moduleConfig.id]?.[lessonNumber];
      if (!range) {
        missing.push(`${key}: no teacher page range`);
        continue;
      }
      const teacher = teacherReferences(moduleConfig, lessonNumber, range);
      const problems = workbook ? extractProblemsFromLines(workbook.lines, lessonNumber) : [];
      if (!workbook || !problems.length) {
        missing.push(`${key}: no workbook problem section`);
      }

      output[key] = {
        section: workbook?.section ?? 'Teacher Edition',
        studentWorkbookSource: workbook
          ? `Module ${moduleConfig.number} student workbook, Lesson ${lessonNumber} ${workbook.section}.`
          : `No separate Module ${moduleConfig.number} student workbook Problem Set section was detected for Lesson ${lessonNumber}; use the Teacher Edition lesson pages.`,
        teacherEditionSource: `Module ${moduleConfig.number} Teacher Edition, lesson pages ${range.pageStart}-${range.pageEnd}.`,
        teacherEditionReference: teacher.teacherEditionReference,
        teacherDebrief: teacher.teacherDebrief,
        problems: problems.length
          ? problems
          : [
              {
                number: 1,
                prompt: teacher.teacherEditionReference,
                equations: []
              }
            ]
      };
    }
  }

  const file = `// Generated by scripts/generate-student-work-source.mjs from local Eureka Math source PDFs.\n` +
    `// Do not edit manually; rerun the generator after source PDF changes.\n\n` +
    `export type StudentWorkSourceProblem = {\n` +
    `  number: number;\n` +
    `  prompt: string;\n` +
    `  equations: string[];\n` +
    `};\n\n` +
    `export type StudentWorkLessonSource = {\n` +
    `  section: string;\n` +
    `  studentWorkbookSource: string;\n` +
    `  teacherEditionSource: string;\n` +
    `  teacherEditionReference: string;\n` +
    `  teacherDebrief: string;\n` +
    `  problems: StudentWorkSourceProblem[];\n` +
    `};\n\n` +
    `export const STUDENT_WORK_SOURCE: Record<string, StudentWorkLessonSource> = ${JSON.stringify(output, null, 2)};\n`;

  writeFileSync(generatedPath, file);
  console.log(`Generated ${Object.keys(output).length} lesson student-work entries.`);
  if (missing.length) {
    console.log('Missing or fallback entries:');
    for (const item of missing) {
      console.log(`- ${item}`);
    }
  }
}

generate();
