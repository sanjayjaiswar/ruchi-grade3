# Grade 3 Reading Source Readiness Audit

Date audited: 2026-08-13

Decision: **The Reading year map is source-verified. One bounded Unit 1 Week 1 lesson is admitted from an official Benchmark Education public sample; all other daily lesson authoring remains blocked.**

This audit answers a narrower question than visual or interaction QA: does the repository contain an edition-matched official source package strong enough to control Grade 3 Reading lessons in the same way that the Eureka Math Teacher Editions control Math lessons?

The answer is no. The current ten-page Benchmark Advance scope is legitimate evidence for the year, units, weeks, named selections, and published instructional columns. It is not a Teacher Resource System, student text, assessment book, answer key, or daily lesson source.

## Readiness Verdict

| Layer | Status | What the evidence can control |
| --- | --- | --- |
| Moreland program adoption | Verified | Benchmark Advance is Moreland's TK–5 ELA program; the district lists a 2017–18 adoption year. |
| California program adoption | Verified | Benchmark Advance Program 2 was reviewed and adopted as a K–6 basic ELA/ELD program. |
| Grade 3 year sequence | Verified with provenance caveat | Ten units, three weeks per unit, 70 named selections, genres, publisher Lexile labels, and the printed scope columns. |
| Baker current classroom pacing | Not verified | No public Baker Grade 3 calendar or current unit dates were found. |
| Unit 1 Week 1 Lesson 1 teaching sequence | Bounded pilot ready | An official Benchmark Education Advancing Language Learning sample supplies “Working Together,” its student source/pages, objective, vocabulary, teacher sequence, and after-reading question. It does not supply the full student passage. |
| All other daily lesson sequences and teacher moves | Blocked | The Grade 3 Teacher Resource System is not in the repository. |
| Student reading and page evidence | Blocked | The Grade 3 Texts for Close Reading/student materials are not in the repository. |
| Official questions, tasks, answers, and rubrics | Blocked | The matching teacher/student lesson pages and answer resources are not in the repository. |
| Official weekly/unit assessment practice | Blocked | The Grade 3 Weekly and Unit Assessments and scoring material are not in the repository. |
| Learner placement or reading level | Blocked by design | Public program sources do not provide an individual learner result; no level may be inferred. |

## Why Math Is Lesson-Authoring Ready

The Eureka Math source chain is complete enough to fail closed at lesson level:

- seven local official Teacher Edition PDFs;
- matching Student Workbooks and supporting materials;
- edition/versioned filenames and SHA-256 fingerprints;
- all 152 lessons mapped to exact Teacher Edition page ranges;
- problem-set and answer-key pages identified separately;
- rendered source pages for visual comparison;
- extracted objectives, lesson structures, mathematical models, prompts, and source contracts;
- source-layout and solved-answer validation before a lesson is accepted.

For example, the local Module 3 Teacher Edition does not merely name Lesson 4. It provides the exact objective, suggested structure, fluency work, teacher prompts, concept development, Problem Set, debrief, and related source pages. That is the evidence depth required before the portal adds a child-friendly explanation or interactive model.

## What The Current Reading Scope Actually Proves

The audited file is a ten-page **Benchmark Advance Grade 3 Skills and Strategies Scope and Sequence**. It was visually inspected, text-extracted, and checked at the file level.

| Property | Audited value |
| --- | --- |
| Pages | 10 |
| PDF creation date | 2016-12-29 |
| Creating application | Adobe InDesign CC 2015 |
| SHA-256 | `11b8c623819067ea07b226d616ddea718bad4d72949841bf048b44b151e7fb6c` |
| Printed pages represented | 68–87 |
| Units | 10 |
| Publisher weeks | 30 |
| Named selections | 70 |

Visual review confirmed that each page pair contains the unit title and rows for Student Reads, genre, publisher Lexile label, standards focus, reading, word study/spelling, fluency, writing, speaking/listening, conventions, vocabulary, and English Language Development.

The file itself bears Benchmark Education Company authorship/copyright and matches Moreland's adoption era. The public copy is hosted on a third-party Squarespace site rather than a current Benchmark or Moreland domain. Its content is therefore accepted for the bounded year-map claim only because it is also reconciled with Moreland's adoption record, California's program record, the state review findings, and edition-era component references. It must not be promoted to a complete Teacher Edition.

## Bounded Official Lesson Sample Admitted

Benchmark Education publicly publishes an eight-page Advancing Language Learning program guide. Its Grade 3 component page includes a readable sample of the **Grade 3 Unit 1 Week 1 Guide to Build, Transfer, and Apply**. The sample is edition-aligned to the verified Unit 1 topic and names the same Week 1 selection recorded in the publisher scope.

| Property | Audited value |
| --- | --- |
| Publisher | Benchmark Education Company |
| Public file | `B8107_ALL_Flyer_lores.pdf` |
| PDF creation date | 2020-03-10 |
| Pages | 8 |
| SHA-256 | `191111faa89f9e32fc429d4a5ea5ab630c5b509764d45a6498f788f491ca2a84` |
| Admitted lesson | Grade 3 Unit 1 Week 1, Lesson 1, “Working Together” |
| Student source | Texts for Close Reading, pages 4–5 |
| Admitted fields | lesson identity, reading objective, seven key-vocabulary words, three cognates, teacher read-aloud/reread sequence, and after-reading question |

The PDF was downloaded into the ignored repository `tmp/` area, metadata-checked, fingerprinted, text-extracted, rendered, and visually inspected. The full student passage is not present in the sample. The interactive layer therefore requires the school-provided Texts for Close Reading book and does not supply a passage, answer, or passage-specific fact.

Official public sample: [Advancing Language Learning program guide](https://onlinepublications.s3.us-east-2.amazonaws.com/BEC-eCom/B8107_ALL_Flyer_lores.pdf)

This admission unlocks only `u1-w1-l1`. It does not change the global `dailyLessonAuthoringReady: false` result and does not authorize Lesson 2, other Unit 1 lessons, other units, assessment answers, or Baker pacing.

## What California Reviewed

The California Department of Education's 2015 report is the strongest official component-level evidence found. It identifies Benchmark Advance Program 2 as including:

- Teacher Resource System (TRS);
- Leveled Text Teacher's Guides;
- Reader's Theater Handbook;
- Language Mini-Lesson Handbook;
- Texts for Close Reading (TCR).

The same report cites additional program materials, including the ELD Teacher Resource System, Student Interactive E-Book, Informal Assessments, an oral-reading Level Screener, Weekly and Unit Assessments, and lesson-level Teacher Resource System pages. Its Grade 3 citations reach specific units and pages. This proves that the adopted program has a much deeper lesson and assessment source system than the public ten-page scope.

The report also required specific Grade 3 corrections in the TRS, ELD TRS, ELD Student Edition, and TCR. Therefore, any acquired copy must be checked for edition, copyright year, and incorporated corrections before it becomes controlling evidence. A matching title alone is insufficient.

Official references:

- [Moreland board-adopted curriculum](https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021541&type=d&uREC_ID=427284)
- [California 2015 ELA/ELD adopted programs](https://www.cde.ca.gov/ci/rl/im/sbeadoptedelaeldprogs.asp)
- [California 2015 review reports](https://www.cde.ca.gov/ci/rl/im/elaeld2015adoptrpts.asp)
- [Benchmark Advance Program 2 report of findings](https://www.cde.ca.gov/ci/rl/im/documents/benchmarkprogram2.doc)
- [Benchmark's edition-era access explanation](https://cacopilot.benchmarkeducation.com/2015/09/questions/)

## Required Source Package Before Daily Lessons

The following are admission requirements, not optional enhancements.

### Core lesson authority

1. **Grade 3 Teacher Resource System for all ten units.** The edition-matched set is organized as five unit-pair volumes. Each volume must show its title page, copyright/imprint, unit coverage, and complete page sequence.
2. **Grade 3 Texts for Close Reading for Units 1–10 or the exact authorized digital student equivalents.** These must supply the named readings and stable page references used by the Teacher Resource System.
3. **Any student workbook/activity book directly assigned by the Teacher Resource System.** The blank learner task and teacher-facing answer/source treatment must be distinguishable.
4. **Teacher answer resources and Additional Resources referenced by each lesson.** A prompt cannot be authored from a title or standards list alone.

### Assessment authority

5. **Grade 3 Weekly and Unit Assessments with the matching teacher scoring/answer material.** This is required before the portal presents official-looking test practice or answer feedback.
6. **Grade 3 Informal Assessments, including the oral-reading Level Screener, if the portal explains or practices those measures.**
7. **Current Moreland assessment directions or calendar** before claiming local dates, administration rules, or school-specific scoring.

### Conditional authority

8. **Grade 3 ELD Teacher Resource System and student material** before building the program's ELD lesson layer.
9. **Leveled Text Teacher's Guides and the matching leveled texts** before building small-group or level-specific instruction.
10. **Reader's Theater, Language Mini-Lesson, Read-Aloud, word-study, writing/language, or intervention resources** whenever a source lesson points to them.
11. **A Baker or Moreland Grade 3 pacing artifact** before claiming the current classroom's dates or departures from the publisher sequence.

## Edition Identification Leads

Public catalogs and district bid lists consistently identify the edition-era Grade 3 Teacher Resource System as five unit-pair volumes. These identifiers are useful acquisition leads but are not governing sources until the actual title/copyright pages are reviewed:

| Units | Title pair | ISBN lead |
| --- | --- | --- |
| 1–2 | Government for the People / Ways Characters Shape Stories | `9781512522990` |
| 3–4 | Animal Adaptations / Comparing Points of View | `9781512523003` |
| 5–6 | Advancements in Technology / Making Decisions | `9781512523010` |
| 7–8 | Communities Then and Now / Weather and Climate | `9781512523027` |
| 9–10 | Spending Time and Money / Forces and Interactions | `9781512523034` |

The portal must reject a newer sequence, a national/state variant with different content, an incomplete unit volume, a teacher-created supplement, or an unauthorized copy even if it uses the Benchmark name.

## Source Admission Checklist

Each acquired source must pass all applicable checks before use:

1. Publisher is Benchmark Education Company.
2. Grade is exactly Grade 3.
3. Unit titles and order match the verified 2017-era sequence.
4. Copyright/imprint and edition are visible and recorded.
5. Volume/unit coverage is complete.
6. Page count and pagination are recorded.
7. A SHA-256 fingerprint is stored in the source manifest.
8. Text extraction succeeds or the source is explicitly marked image-only.
9. Representative pages are rendered and visually inspected.
10. State-required corrections relevant to the material are checked.
11. Student pages, teacher directions, answers, and assessment material are classified separately.
12. The source is legally obtained and locally authorized for this project.
13. No student-specific data is present in the curriculum source package.

## Lesson Release Gate

A Reading lesson may be released only when its contract records:

- unit, week, and official lesson/mini-lesson identity from the Teacher Resource System;
- exact Teacher Resource System PDF/page range;
- exact student-text title and page range;
- exact objective or instructional target;
- teacher model, guided work, and independent task boundaries;
- vocabulary/word-study and writing/language links actually present in the source;
- official assessment or answer evidence when feedback is shown;
- rendered source pages used for visual comparison;
- an explicit list of what the portal paraphrases, transforms, or creates;
- a reviewer result confirming that the creative teaching layer changes presentation, not curriculum facts.

Until that contract can be completed, a route may show the verified year/unit scope but must not present a made-up daily lesson, official-looking assessment, answer key, pacing claim, or learner level. The sole current exception is `u1-w1-l1`, limited to the official fields named in the bounded sample above.

## Final Audit Result

- **Safe now:** Moreland adoption context, the ten-unit year map, thirty publisher weeks, seventy named selections, official standards reference, clearly bounded assessment-system context, and the source-faithful `u1-w1-l1` pilot used with the school text.
- **Not safe now:** any other daily Reading lesson, reproduced student passage, official answer, official assessment, or current Baker pacing.
- **Next action:** obtain and admit the edition-matched Grade 3 Teacher Resource System and student/assessment materials, then expand only in source-controlled batches.

## Live Math-Parity And Interaction Review

The desktop app was re-reviewed visually against the live Eureka Math Module 3 Lesson 4 experience, not only against source code. The Math reference establishes the required pattern: exact lesson identity and objective, visible Teacher Edition provenance, an instructional sequence derived from that source, visual models, learner work, checks for understanding, and direct access to the controlling pages.

The admitted Reading pilot now follows that pattern within the smaller boundary allowed by its source:

- the exact Unit 1 Week 1 Lesson 1 identity, objective, student book/pages, key vocabulary, cognates, teacher read/reread sequence, and after-reading question come from the fingerprinted official Benchmark sample;
- the school text is required because the public sample does not reproduce the passage;
- portal-created prediction and sandbag organizers are visibly labeled as teaching organizers, not publisher pictures;
- every response remains open-ended and must be completed from the school text; the portal supplies no invented passage fact or official-looking answer;
- all other daily lesson URLs fail closed and return to their verified unit source page.

The live browser review exercised all four lesson-stage buttons, every lesson checkbox and response field, the source jump, the Reading overview and five reference areas, Unit 1, the Grade 3 portal return, and a blocked Unit 3 lesson URL. The completed source-step counter reached 4 of 4. All audited desktop routes had the expected page heading, no horizontal overflow, and no Reading runtime warning or error. Source-readiness validation, curriculum validation, the unchanged Math local-search validation, and the production build passed.
