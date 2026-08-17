# Work Item: Grade 3 i-Ready Math

Last updated: 2026-08-16
Status: Active — current-program workspace and official Grade 3 syllabus are established; exact publisher lesson authoring waits for the Grade 3 worktext contents or authorized school access

## Goal

Create a useful i-Ready Math workspace for Ruchika's current Grade 3 program without changing or deleting the complete Eureka Math reference. Distinguish the core book, assessment, personalized instruction, California syllabus, state test, and access boundaries. Reuse lesson architecture only after the new curriculum's exact units, lessons, sessions, and source pages are available.

## Current Result

- The portal now presents current i-Ready Math first in blue, Reading & Language Arts second, and Eureka Math last in red with a visible `Discontinued` label.
- Eureka Math remains internally unchanged at `/ruchika/grade3/math` with all seven modules and 152 lessons.
- `/ruchika/grade3/iready` is the current Math workspace; the old `/classroom-math` URL redirects there.
- Six clickable i-Ready sections separate Overview, Official Curriculum, Grade 3 Syllabus, Assessment & My Path, Access, and Sources.
- The workspace identifies Classroom Mathematics California as the official core program inside the broader i-Ready ecosystem.
- It distinguishes the core book from i-Ready Inform/Diagnostic, Personalized Instruction/My Path, and California's Smarter Balanced assessment.
- It presents the five official California Grade 3 mathematics domains and MP1–MP8 without claiming they are the publisher's unit order.
- It documents the shared California-standards target without inventing a Eureka-to-i-Ready lesson crosswalk.
- It records that Moreland's public pages still show the older Eureka adoption while the current workspace relies on official state and publisher sources for program facts.
- It keeps the current lesson layer fail-closed until authorized Grade 3 materials and the school-provisioned digital account are available.

## Verified Claims and Sources

| Claim | Primary source | Portal location |
| --- | --- | --- |
| Classroom Mathematics California was adopted by the California SBE for K–8 on November 6, 2025. | [CDE adopted programs](https://www.cde.ca.gov/ci/ma/im/2025mathpublishers.asp) | Current Math overview and readiness sections |
| The program is a 2026 print/digital core curriculum with two student-worktext volumes organized by units, lessons, and sessions. | [Curriculum Associates program page](https://www.curriculumassociates.com/programs/i-ready-learning/classroom-mathematics-california) | Overview and Official Curriculum |
| California's K–8 review found the program aligned and identifies Student Worktext Volumes 1–2, Teacher Guide Volumes 1–2, Digital Teacher Toolbox, and Digital Success Central. | [CDE Report of Findings](https://www.cde.ca.gov/ci/ma/im/documents/currassociatesk82025.docx) | Official Curriculum and Sources |
| i-Ready Inform is an adaptive assessment; Personalized Instruction/My Path is a separate lesson pathway. | [Curriculum Associates family page](https://www.curriculumassociates.com/family) | Overview and Assessment & My Path |
| i-Ready software is not licensed directly for personal or homeschool use. | [Curriculum Associates support](https://www.curriculumassociates.com/support?sc_lang=en) | Access |
| California Grade 3 standards comprise five content domains plus the mathematical practices; they are not a required textbook order. | [CDE Grade 3 mathematics standards](https://www2.cde.ca.gov/cacs/math?dl=0&maxgrade=3&mingrade=3&order=0&page=0&perpage=100) | Grade 3 Syllabus |
| Local education agencies select among standards-aligned instructional materials. | [California Mathematics Framework, Chapter 13](https://www.cde.ca.gov/ci/ma/cf/documents/mathframeworkch13.pdf) | Overview and Sources |
| Grade 3 Smarter Balanced mathematics testing is separate from the core book and i-Ready assessment. | [CDE California Assessment System](https://www.cde.ca.gov/TA/TG/ai/caassessmentsystem.asp) | Assessment & My Path |
| Moreland's public math page still presents the 2016–17 Eureka adoption. | [Moreland Math Curriculum](https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1132411&type=d&uREC_ID=718172) | Transition caution and source list |
| Moreland was already using i-Ready Diagnostic in Grades 1–8 mathematics before the core-program transition. | [Anderson Elementary / Moreland](https://anderson.moreland.org/apps/news/article/1952561?categoryId=6720) | Source list |

## Source Gate Before Lesson Authoring

Do not create official-looking Classroom Mathematics California units or lessons until all of the following are available and reviewed:

1. Grade 3 Volume 1 and Volume 2 tables of contents.
2. Exact edition, copyright, and identifying information.
3. School-provisioned student access and an inventory of enabled i-Ready components.
4. Moreland or teacher guidance for home use and classroom pacing.
5. Authorized lesson-level student materials sufficient to establish the exact sequence and page mappings.

Public product descriptions, state standards, and the old Eureka sequence are not substitutes for those sources.

## Reuse Boundary

May be reused after new-source validation:

- portal and lesson-shell architecture;
- visual representations such as arrays, number lines, fraction models, clocks, area models, and graphs;
- answer-checking and progressive explanation interactions;
- accessibility and desktop layout patterns.

Must not be transferred or relabeled:

- Eureka module and lesson order;
- Eureka objectives, problem sets, homework, answer keys, or page citations;
- assumptions that one shared standard creates a one-to-one lesson mapping;
- Baker or Moreland pacing not established by a current primary source.

## Next Inputs

- Photograph or scan the contents pages of both Grade 3 worktext volumes when available.
- Record which products appear after the student account is enabled.
- Add the teacher's home-use guidance without publishing credentials or private correspondence.
- Build the first bounded unit only after its controlling sources pass the same source-fidelity checks used elsewhere in the portal.

## Validation

- Production Angular build passed after the i-Ready routes, six-section workspace, source registry, Grade 3 syllabus, and reordered portal cards were added.
- The Eureka local-search baseline remains unchanged: 7 modules, 35 topics, 152 lessons, and 673 Blank activities.
- The Reading curriculum validator remains unchanged: 10 units, 30 weeks, 70 named selections, 100 official questions, and no failures.
- Live Gemini-profile Chrome review at 1920×996 clicked through the reordered portal and all six i-Ready sections.
- Visual review confirmed the overview hierarchy, official curriculum cards, five-domain syllabus, assessment comparison, access guidance, and 11-link source register.
- The retained Eureka route was reopened visually and still reports its original title and seven module-navigation groups.
- Reading was reopened visually and still reports its 10-unit curriculum.
- The complete click-through produced no browser console warnings or errors.
