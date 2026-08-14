# Grade 3 Reading: Fact, Source, and Implementation Traceability

Date verified: 2026-08-13

Status: Controlling no-drift record

## Contract

- Every official educational claim needs a directly relevant source and a visible source link.
- Unit titles, order, weeks, selection titles, genres, publisher Lexile labels, reading focuses, word study, and writing focuses must come from the edition-matched publisher scope.
- The repository’s 150 daily drafts are separately authored supplements and are quarantined from the active Unit path; they are not Benchmark, Baker, or Moreland lessons.
- Draft practice records must remain unpublished until material-level validation is possible; structural reference checks do not constitute educational validation.
- Global generic phase prompts are prohibited.
- No official text, lesson title, answer, score, level, placement, schedule, or learner result may be invented.
- Reading changes must not modify the protected Eureka Math curriculum or lesson implementation.
- Every active Reading Unit route must visibly show its matching official publisher scope page before the guided view.
- Guided cards may reorganize verified publisher facts for a child and adult, but may not replace or conceal official columns that have not been fully transcribed.
- Daily lesson visuals, prompts, and answers require matching authorized student and Teacher Resource System pages; the year-level scope alone is not sufficient evidence.
- Source readiness is machine-recorded in `grade3-reading-source-manifest.json`; a missing component may not be bypassed with a standards list, scope title, search result, third-party supplement, or model-authored reconstruction.
- Run `npm run validate:reading-source-readiness` before any Reading lesson-authoring increment.

## Claim Matrix

| Displayed claim | Governing source | UI location | Required treatment |
| --- | --- | --- | --- |
| Moreland adopted Benchmark Advance for TK–5 ELA in 2017–18. | [Moreland curriculum](https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021541&type=d&uREC_ID=427284) | Year overview; Sources | State directly and link beside the claim. |
| Grade 3 has the 10 displayed units in the displayed order. | [2017 Grade 3 scope](https://static1.squarespace.com/static/64cae4391e09f2159371a541/t/64e660c923b355487a21356e/1692819670477/ELA%2B3rd%2BGrade%2BScope%2B%26%2BSequence.pdf) | Year map; Unit pages | Preserve exact titles and order. |
| Each unit has 3 publisher weeks and the displayed selections/focuses. | [2017 Grade 3 scope](https://static1.squarespace.com/static/64cae4391e09f2159371a541/t/64e660c923b355487a21356e/1692819670477/ELA%2B3rd%2BGrade%2BScope%2B%26%2BSequence.pdf) | Unit and lesson pages | Preserve the source data; do not create official lesson claims. |
| Benchmark Advance appears in California’s adopted-program list. | [CDE adoption record](https://www.cde.ca.gov/ci/rl/im/sbeadoptedelaeldprogs.asp) | Sources | Present as state context, not local adoption evidence. |
| SCCOE provides California standards information and linked family/educator resources. | [SCCOE standards context](https://www.sccoe.org/resources/standards/Pages/default.aspx) | Sources | Present as county context; do not treat it as Moreland’s curriculum adoption or a Baker daily sequence. |
| Baker publicly names the Benchmark program. | [Baker About page](https://baker.moreland.org/apps/pages/index.jsp?pREC_ID=990480&type=d&uREC_ID=456713) | Sources | Present as school context; keep Moreland as authority. |
| F&P Early Literacy is listed for TK–2. | [Moreland assessments](https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021540&type=d&uREC_ID=427284) | Sources | Do not assign a Grade 3 F&P level. |
| SRI is listed for grades 3–8 twice yearly. | [Moreland assessments](https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021540&type=d&uREC_ID=427284) | Sources | Do not infer a score or placement. |
| ELA benchmarks are listed for grades 3–8 three times yearly. | [Moreland assessments](https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021540&type=d&uREC_ID=427284) | Sources | Do not infer dates or results. |
| CAASPP / Smarter Balanced ELA is listed for grades 3–8 yearly. | [Moreland assessments](https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021540&type=d&uREC_ID=427284) | Sources | Do not estimate a performance level. |
| California publishes 44 Grade 3 ELA standards records across six domains. | [CDE Grade 3 standards](https://www2.cde.ca.gov/cacs/ela?dl=0&maxgrade=3&mingrade=3&order=0&page=0&perpage=50) | Standards map; Sources | Preserve every numbered record, including the explicit RL.3.8 and W.3.9 non-expectations. Explain codes in plain language. |
| Grade 3 year-end reading means independently and proficiently reading literature and informational text at the high end of the Grades 2–3 text-complexity band. | [CDE RL.3.10 and RI.3.10](https://www2.cde.ca.gov/cacs/ela?dl=0&maxgrade=3&mingrade=3&order=0&page=0&perpage=50) | Assessments: Reading levels | Do not convert the expectation into an invented F&P, SRI, or learner Lexile target. |
| The updated Grades 2–3 quantitative Lexile text band is 420L–820L. | [California ELA/ELD Framework, Chapter 2](https://www.cde.ca.gov/ci/rl/cf/documents/elaeldfwchapter2.pdf) | Assessments: Reading levels | Present only as one text-complexity measure, not as a learner placement or complete definition of complexity. |
| Baker’s 2025–26 school plan uses CAASPP, iReady, F&P, SRI, and classroom evidence in schoolwide ELA planning and local-assessment strategy. | [Baker 2025–26 SPSA](https://4.files.edl.io/8b0c/11/12/25/163836-0e42c10d-39b5-4494-a1bb-290af8913064.pdf) | Assessments; Sources | State the evidence and its limit. Do not conclude that every Grade 3 learner receives every named measure. |
| Current CAASPP ELA reporting uses an overall result plus Reading and Listening and Writing and Research/Inquiry composite areas. | [CDE February 2026 ELA score guide](https://www.caaspp-elpac.org/s/docs/scoresmeanela.pdf) | Assessments | Do not promise individual four-claim reporting or invent a score. |
| 150 supplemental drafts exist in the repository. | Repository-authored product decision | Not published in the active Unit path | Do not publish until checked against authorized school materials. Never attribute them to Moreland or Benchmark. |

## Removed Unsupported Structures

| Removed item | Reason |
| --- | --- |
| Home / Learn / Library / Levels as the year architecture | It did not represent Moreland’s adopted Grade 3 curriculum. |
| Three invented starter texts | They were presented where the official year sequence belonged. |
| 25-minute and 5/10/5/5 routine | No governing source supported it. |
| Seven generic literacy strands as curriculum modules | Standards areas are not the adopted unit sequence. |
| Learner-facing standards-code shorthand as navigation | It was cryptic and did not explain the year sequence. |
| F&P, Lexile, i-Ready, or other level systems as primary navigation | Assessment and leveling systems do not define the adopted year curriculum. |

## Route Traceability

| Route | Content boundary |
| --- | --- |
| `/ruchika/grade3/reading` | Publisher-documented 10-unit year overview plus direct adoption and scope links. |
| `/ruchika/grade3/reading/sources` | Source hierarchy, edition limit, copyright boundary, and Moreland assessment context. |
| `/ruchika/grade3/reading/standards` | All 44 California Grade 3 ELA records in six plain-language domains, each linked to its CDE domain source. |
| `/ruchika/grade3/reading/assessments` | Moreland cadence, Baker school-plan evidence, reading-level distinctions, CAASPP composite areas, and explicit unknowns. |
| `/ruchika/grade3/reading/units/:unitId` | One publisher unit with its visible official source page, 3 weeks, 7 named selections, and a four-lane guided view of verified source columns. Complete official columns remain visible in the source image. No daily practice links. |
| `/ruchika/grade3/reading/units/:unitId/lessons/:lessonNumber` | Compatibility redirect to the verified Unit scope; supplemental drafts are not reachable. |
| `/ruchika/grade3/reading/learn` | Compatibility redirect to the year overview. |
| `/ruchika/grade3/reading/library` | Compatibility redirect to the year overview. |
| `/ruchika/grade3/reading/levels` | Compatibility redirect to Curriculum sources. |
| `/ruchika/grade3/math/...` | Protected Math baseline; Reading work must not change Math content or behavior. |

## Required Validation

1. Confirm the curriculum registry has 10 units, 30 publisher weeks, and 70 publisher-named selections.
2. Confirm the draft registry remains separately identified as quarantined and active Unit pages publish no practice links.
3. Compare all 70 selection titles to the publisher PDF extraction.
4. Open every active Unit route and verify the visible page-specific source image, limitation text, and absence of daily practice links.
5. Exercise Unit, source, and `R` portal controls.
6. Confirm source links appear where official claims are displayed.
7. Build and rerun the unchanged Math search baseline.
8. Visually inspect the Reading overview, Unit 3 source treatment, and sealed Math home.
9. Record the evidence and final result in `design-qa.md`.
10. Confirm the standards registry contains exactly 44 unique ordered records and the assessment UI retains the no-placement guardrail.
11. Confirm source readiness reports `yearMap: READY`, `dailyLessonAuthoring: BLOCKED`, and `officialAssessmentAuthoring: BLOCKED` until the admitted local source manifest proves otherwise.
