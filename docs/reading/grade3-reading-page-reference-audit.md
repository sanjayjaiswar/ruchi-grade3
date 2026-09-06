# Reading curriculum page-reference audit

Reviewed: 2026-09-05 (America/Los_Angeles).

Expanded publisher discovery: see [additional publisher source audit](grade3-publisher-source-audit.md). The completed reference collection now includes 167 source pages across eight documents, rendered into 189 images. The initial three-document review below is retained as an audit record; its missing-material findings are superseded where the additional audit supplies material.

All 28 pages of the three existing Reading curriculum source PDFs were downloaded from their recorded source URLs, fingerprint-checked, rendered, and visually inspected. The review covered complete documents, not only the images previously displayed in the app. The downloaded bytes match the existing source manifest exactly.

This audit covers the curriculum references used by units, questions, and the admitted lesson. District adoption, state standards, school plans, assessment-policy pages, and general research links remain contextual citations; they are not presented as student books or teacher lesson pages.

## Document coverage

| Source | PDF pages inspected | Prepared references | Authority and limits |
| --- | --- | --- | --- |
| [Benchmark Grade 3 Skills and Strategies](https://static1.squarespace.com/static/64cae4391e09f2159371a541/t/64e660c923b355487a21356e/1692819670477/ELA%2B3rd%2BGrade%2BScope%2B%26%2BSequence.pdf) | 1-10 | 20 separate printed pages, plus 10 complete spreads | Publisher-authored scope, hosted by a third party. Supplies unit/week/selection and skill context, not full lessons. |
| [Grade 3 Text Evidence Questions](https://ruskin.berryessa.k12.ca.us/subsites/Lan-Pham/documents/3rd%20reading%20closely.pdf) | 1-10 | 10 complete question-page images | Publisher-authored, school-district-hosted copy. All 100 numbered questions and the selection groupings remain visible. Does not supply complete passages or an answer key. |
| [Advancing Language Learning program sample](https://onlinepublications.s3.us-east-2.amazonaws.com/BEC-eCom/B8107_ALL_Flyer_lores.pdf) | 1-8 | 8 full document images, plus 2 Grade 3 details from p. 7 | Official publisher sample. The enlarged details are labeled as sample material, not a complete Teacher Resource System. |

The resulting catalog contains 50 lossless WebP assets. Each has its source document, PDF page, label, dimensions, SHA-256, and direct original-document page link. Scope records additionally retain the printed page and crop coordinates; enlarged details retain their PDF crop coordinates.

## Unit-by-unit visual review

| Unit | Scope PDF page | Printed scope pages | Question PDF page | Review |
| --- | --- | --- | --- | --- |
| 1 | 1 | 68-69 | 1 | Complete scope columns, selection groupings, and questions 1-10 visible |
| 2 | 2 | 70-71 | 2 | Complete scope columns, selection groupings, and questions 1-10 visible |
| 3 | 3 | 72-73 | 3 | Complete scope columns, selection groupings, and questions 1-10 visible |
| 4 | 4 | 74-75 | 4 | Complete scope columns, selection groupings, and questions 1-10 visible |
| 5 | 5 | 76-77 | 5 | Complete scope columns, selection groupings, and questions 1-10 visible |
| 6 | 6 | 78-79 | 6 | Complete scope columns, selection groupings, and questions 1-10 visible |
| 7 | 7 | 80-81 | 7 | Complete scope columns, selection groupings, and questions 1-10 visible |
| 8 | 8 | 82-83 | 8 | Complete scope columns, selection groupings, and questions 1-10 visible |
| 9 | 9 | 84-85 | 9 | Complete scope columns, selection groupings, and questions 1-10 visible |
| 10 | 10 | 86-87 | 10 | Complete scope columns, selection groupings, and questions 1-10 visible |

The scope consists of two-page spreads. Splitting at the exact midpoint preserves every column, page footer, and copyright line. Each unit can display both printed pages individually and open the complete spread separately. The question document is a scanned source: its grain and miniature passage thumbnails are inherent to the PDF. Rendering preserves the original information without reconstructing text or inventing clearer passage illustrations.

## Sample-document page review

| PDF page | Actual content | Reference treatment |
| --- | --- | --- |
| 1 | Program cover | Complete page in the source library |
| 2 | Introduction and program overview | Complete page; program context |
| 3 | Continuation of the introduction spread | Complete page; program context |
| 4 | Language-learning model and an illustrated example | Complete page; general model, not a Grade 3 lesson |
| 5 | Transfer/apply illustration and Grade 4 resource examples | Complete page, explicitly identified as Grade 4 context |
| 6 | Kindergarten, Grade 1, and Grade 2 components | Complete page, identified by grade coverage |
| 7 | Grade 3-6 component overview, including Grade 3 pacing and teaching-card miniatures | Complete page plus both enlarged Grade 3 details |
| 8 | Back cover | Complete page in the source library |

The former lesson image included brochure headings, neighboring book art, and substantial empty space. Its replacement is a direct high-resolution render of the complete Grade 3 teaching card: PDF p. 7, crop `[425,139,462,187]` in top-left PDF points. The companion pacing detail uses `[94,156,144,195]`. Both were visually checked, including all borders and the bottom printed page number. Text is readable; the publisher's tiny raster illustrations remain pixelated. The full p. 7 is available beside both details so the original context is reviewable.

## App mapping and teaching boundary

- Every interactive question opens in **Teaching**. Existing Learn, Watch, Practice, Respond, and visual strategy content remain intact.
- **Official source** selects the question's complete source page followed by both scope pages for its unit.
- Only questions for the verified Unit 1 "Working Together" selection receive the corresponding Grade 3 teaching/pacing sample and full document p. 7.
- The admitted official lesson offers the teaching card, pacing sample, and full p. 7 in its existing optional source stage.
- Unit pages retain compact previews; **Review both source pages** opens the two-page scope reference on demand. Closing the reference restores the compact presentation.
- The source library exposes all 20 printed scope pages, all 10 question pages, all 8 program pages, and the enlarged details. Full spreads remain linked from their individual page records and unit previews.
- The sample's existence does not supply full student passages, other daily lessons, or official answers. This work changes reference coverage and presentation, not lesson admission or educational content.

Implementation: `interactive-grade3-app/src/app/data/reading-source-pages.data.json`, `interactive-grade3-app/src/app/pages/reading-home/reading-home.ts`, `reading-home.html`, and `reading-source-viewer.ts`.

Reproduce: `python3 interactive-grade3-app/scripts/build-reading-source-assets.py`. Source PDFs and intermediate PNGs stay under the existing ignored `tmp/reading-source-page-audit/`. The generator checks all source fingerprints and page counts before writing app assets.

## Validation

- Visually inspected all 28 original document pages and the final enlarged Grade 3 details and split-page layout.
- Verified all 50 final WebP images pixel-for-pixel against their rendered PNG pages/crops; conversion is lossless.
- Validated complete PDF-page coverage, all 20 printed scope pages, all 100 question-number mappings, original-document links, and every image fingerprint.
- Reading curriculum and source-readiness validators passed; Angular development build passed.
- No browser or screen capture was used for this source-document audit.
