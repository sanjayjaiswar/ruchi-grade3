# Grade 3 Interactive Math App Planning Docs

Date: 2026-06-18

This folder is the planning and execution control center for the Grade 3 interactive Eureka Math learning app.

The app must be built inside this Grade3 workspace only:

```text
/Volumes/Data2/Tutorials/Eureka Math Grade 2 - Syllabus Videos Curriculum/Grade3
```

The EdZilla projects are references only. Do not edit them for this work:

```text
/Volumes/Data/EdZillaPrj/EdZilla/edzilla-gtm/
/Volumes/Data/EdZillaPrj/EdZilla/scratch-prjs/design-spec/
```

## Documents

- [requirements.md](requirements.md): Product, curriculum, interaction, scope, and acceptance requirements.
- [design-spec.md](design-spec.md): UI, UX, visual component, lesson screen, and interaction design requirements.
- [implementation-plan.md](implementation-plan.md): Technical architecture, phases, source ingestion approach, validation, and delivery plan.
- [component-reuse-map.md](component-reuse-map.md): Existing reference components and patterns to reuse conceptually.
- [curriculum-source-spec.md](curriculum-source-spec.md): Rules for extracting and using teacher-edition content.
- [source-audit.md](source-audit.md): Current source-alignment audit and fixes.
- [requirements-delivery-audit.md](requirements-delivery-audit.md): Pass/partial/gap audit for content and design delivery.
- [task-tracker.md](task-tracker.md): Task backlog, phase status, decisions, blockers, and validation log.
- [worktree-and-operations.md](worktree-and-operations.md): Workspace rules, branch/worktree expectations, commands, and operating discipline.

## Operating Principles

1. Curriculum truth comes from the Grade 3 Eureka teacher editions in `EurekaMath-Sources/`.
2. Prior chat in `tmp/req.txt` is tone and workflow guidance only.
3. EdZilla Angular and design-system projects are read-only references.
4. Build with existing Angular-style patterns and reusable components; do not reinvent UI primitives.
5. Every lesson should be visually driven and interactive.
6. Track work in these docs before and during implementation.
7. Do not modify `AGENTS.md` or other agent-control files unless explicitly authorized.
