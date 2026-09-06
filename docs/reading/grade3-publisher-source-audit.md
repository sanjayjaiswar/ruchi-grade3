# Additional official publisher source audit

Reviewed 2026-09-05. The existing portal inventory was not treated as the boundary of available evidence.

Discovery started at the [publisher's official Grade 3 virtual sampler](https://info.benchmarkeducation.com/advancing-language-learning-view-virtual-samples). Its published links lead directly to the following resources. No account, form submission, or browser session was used.

| Publisher resource | Pages reviewed and rendered |
| --- | ---: |
| [Grade 3 language-development pacing guide](https://s3.us-east-2.amazonaws.com/onlinepublications/PacingGuides/Y40507_TR_G3_PacingGuide_BK/index.html) | 35 |
| [Unit 4 · English language development teacher guide](https://onlinepublications.s3.us-east-2.amazonaws.com/Advancing-Language-Learning/G3/GR3_ELD_TRS_Unit_4/index.html) | 41 |
| [Unit 4 · English language development student text](https://onlinepublications.s3.us-east-2.amazonaws.com/Advancing-Language-Learning/G3/GR3_ELD_Student_Book_Unit_4/index.html) | 23 |
| [Unit 4 · Texts for Close Reading](https://onlinepublications.s3.us-east-2.amazonaws.com/Advancing-Language-Learning/G3/GR3_Texts_for_Close_Reading/index.html) | 36 |
| [Unit 1 Week 1 · Guide to Apply and Transfer](https://s3.us-east-2.amazonaws.com/onlinepublications/GuideApplyTransfer/Y40524_TGC_G3U1_W1/index.html) | 4 |

All 139 pages were downloaded from the publisher's configured PDF URLs and inspected in complete-page contact sheets. Final images are direct 2200-pixel renders, saved as lossless WebP; the generator verifies every image pixel-for-pixel against its PNG. Covers, copyright lines, original printer marks, and blank divider pages are preserved. The original 50 images remain available, bringing the combined asset inventory to 189.

## Source identity and scope

- The Unit 4 reader's contents, printed pages, selection titles, and back-cover Grade 3/Unit 4 identification match the existing unit. It supplies the actual complete student passages for that unit.
- The 41-page teacher document is explicitly the **English Language Development Teacher's Resource System**, with Unit 4 printed pages 105–139 following its front matter. It is not labeled as the core ELA teacher edition.
- The 23-page language student sample includes its cover followed by printed pages 68–89. Its adapted passages are distinct from the complete Texts for Close Reading passages.
- The 35-page pacing document includes front matter, all 30 unit/week planning pages, and a back cover. Printed pages 4–33 correspond to Units 1–10, Weeks 1–3. It describes publisher-suggested language-development pacing, not a verified Baker classroom calendar.
- The four-page Unit 1 Week 1 Guide to Apply and Transfer supplies the original teaching card that had previously been enlarged from a brochure. Pages 1–2 cover Working Together; p. 3 covers Election Day; p. 4 covers Robert's Rules of Order.
- The sampler's Grade 3 assessment link actually points to a Grade 1 teaching card. It was excluded rather than relabeled as Grade 3 assessment material.
- Newer Benchmark Advance samplers found in search identify different editions. They were not substituted for the verified unit sequence.

The five documents are additional reference evidence. This work does not invent answers, publish new daily lessons, or claim that all ten core teacher/student volumes have been obtained.

## Exact student passage mapping

The Unit 4 student reader has a two-page offset: printed page 4 is PDF/viewer page 6.

| Official Unit 4 questions | Student printed pages included | Reason |
| --- | --- | --- |
| 1–2 | 4–5 | Complete Cinderella's Very Bad Day selection |
| 3 | 4–9 | Both Cinderella selections required for comparison |
| 4 | 6–9 | Complete Cinderella, Too Much for Words selection |
| 5–7 | 12–19 | Complete Jack and the Beanstalk selection |
| 8 | 22–29 | Complete The True Jack? selection |
| 9–10 | 12–19 and 22–29 | Both Jack selections required by the prompts |

All seven named Unit 4 selections, the student vocabulary page, and the reader's other supporting pages remain available through the complete unit reader reference.

## App behavior

Teaching remains the default, with the existing visual strategy stages retained. The optional Official source view contains the official question, matching student pages when available, unit scope, and verified teaching-card references. Unit pages offer the complete relevant publisher books and three weekly language-pacing pages on demand. The source library exposes all five complete documents.

The original full-size Unit 1 teaching card and its continuation replace the brochure enlargement in lesson references. Working Together receives pages 1–2; Election Day questions receive p. 3. Language-development teacher/student books are separately labeled on Unit 4. Longer references use Previous/Next and a page selector instead of dozens of buttons.

## Reproduction and verification

- Original document URLs, publisher viewer URLs, page counts, and individual PDF fingerprints: `grade3-publisher-source-discovery.json`.
- Generator: `interactive-grade3-app/scripts/build-reading-publisher-assets.py`.
- App catalog: `interactive-grade3-app/src/app/data/reading-publisher-pages.data.json`.
- App integration: `reading-home.ts`, `reading-home.html`, and `reading-source-viewer.ts`.
- All 139 source pages inspected; each final WebP verified lossless. Final teacher-card and student-passage images also inspected individually at full size.
- Existing curriculum validator now checks all additional document pages, image hashes, original page URLs, thirty week mappings, and reader printed-page coverage.
- Local PDFs and intermediate renders stay in the repository's existing ignored `tmp/reading-source-page-audit/` directory.

## Live validation — September 5, 2026

Validated in an agent-owned Chrome Gemini session against `127.0.0.1:4220`:

- Resolved a stale development-server missing-catalog error by triggering recompilation after the generated catalog existed.
- Unit 4 Question 1 defaults to teaching. Learn, Watch, Practice, and Respond remain usable; switching to sources and back preserves the selected teaching stage.
- The student page preview opens a separate image tab. Native click-to-zoom changes its displayed width from 738 to its full 1729 pixels (2200 pixels high).
- Unit 4 Question 9 exposes all 19 mapped references; selecting Student p. 29 and advancing to Scope p. 74 updates both image and original-page links correctly.
- Unit 4's 41-page language-development teacher guide selects printed p. 108 correctly and loads its 1732 × 2200 image.
- Unit 1 Question 1 defaults to teaching and exposes its official question, two scope pages, both original teacher apply-guide pages, and the matching language-pacing page only in the optional source view. The teacher continuation page was visually checked.
- All 189 served images passed HTTP, `image/webp` content type, no attachment disposition, and byte-for-byte comparison against local assets. The curriculum validator reports no failures.

These are representative live interaction checks plus exhaustive asset checks; they do not claim manual browser testing of every question route or acquisition of all ten complete teacher/student volumes.
