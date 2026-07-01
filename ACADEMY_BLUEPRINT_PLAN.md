# ISO Academy — Product Roadmap

> **Current Vision**
>
> ISO Academy is a premium educational platform dedicated exclusively to ISO 20022.
>
> Our goal is not to build the largest financial knowledge base.
>
> Our goal is to build the best place on the internet to understand, explore, and experiment with ISO 20022.
>
> Every feature should answer one of four questions:
>
> * **History** → Why does ISO 20022 exist?
> * **Library** → How does it work?
> * **Playground** → Can I work with it?
> * **Glossary** → What does this term mean?

---

# How This Document Is Used

This file is the project's memory across sessions — Claude Design does not remember
previous sessions, so this file is what carries context forward instead.

Rules for any session, for both Revanth and Claude:

* **One session = one numbered Session below** (e.g. "Session 3.2"), never a
  whole Phase. Phases are too big to finish — and verify — in one sitting.
* **Only touch the files listed under that session's "Touches."** If a file
  isn't listed, leave it alone unless the session explicitly requires it.
* **Don't make unscheduled structural or visual changes.** If something
  occurs to you mid-session, add it to the Backlog at the bottom instead of
  acting on it now.
* **At the end of every session:** update the Session Log — status, date,
  what shipped, anything deferred — then commit. A session isn't done until
  the log is updated.
* **If a session is dragging** (several rounds of "no, I meant…"), stop.
  Write a one-paragraph handoff note in the log and start fresh next time
  rather than pushing through a degraded context window.
* **At the end of every session, hand back a bundle of the modified files.**
  After updating the Session Log, package the files that changed (plus this
  plan) as a downloadable bundle so the changes can be moved back into the
  repo as the source of truth.

A typical session kickoff looks like:

> "Read ACADEMY_BLUEPRINT_PLAN.md. Run Session 3.2 exactly as scoped. Only
> touch the files listed for it."

---

# Current Status

The project is currently undergoing a complete product redesign.

Phase 1 (Product Foundation) is **complete and signed off** (Session 1.4, 2026-06-28): philosophy, navigation/IA, design tokens, component inventory, and the shared page shell are all locked, and every planned Phase 2–5 page has been validated against the shell. Next up: Phase 2 — History.

This roadmap replaces the previous implementation plan.

Completed work from earlier iterations may be reused where appropriate, but no previous UI or information architecture should be treated as final.

The priority is to establish a clean, scalable foundation before expanding content.

---

# Phase 1 — Product Foundation (Current)

Status: 🟡 Complete — signed off Session 1.4 (2026-06-28)

Goal:

Define the identity, structure, and user experience of ISO Academy.

Deliverables:

* Finalize product philosophy
* Finalize navigation architecture
* Establish design system
* Define reusable UI components
* Create consistent page templates
* Validate information architecture

Outcome:

A stable foundation that every future feature can build upon.

## Session Plan

### Session 1.1 — Philosophy & Navigation
**Goal:** Lock the four-question framing (History/Library/Playground/Glossary) into a short written philosophy, and finalize top-level nav + URL/route structure.
**Touches:** new `PHILOSOPHY.md`; nav scaffold only — no visual build yet.
**DoD:** Philosophy doc exists; nav structure is written down with routes named, ready for Session 1.3 to implement.
**Note:** this is mostly decision-making and writing — light enough to do in a regular chat instead of Claude Design if you want to save quota for the heavier sessions below.

### Session 1.2 — Design System
**Goal:** Define color/type/spacing/motion tokens and inventory the reusable components (nav, cards, detail panel, buttons, etc.) every future page will share.
**Touches:** design tokens file (CSS variables or equivalent); a component spec doc.
**DoD:** Every token has a value; every component has a name, props, and one example.

### Session 1.3 — Page Templates
**Goal:** Build the shared page shell (header, content area, footer) that History/Library/Playground/Glossary will all extend.
**Touches:** the shell/template file(s); wires in tokens + components from 1.2.
**DoD:** One working template renders with placeholder content; nothing section-specific yet.

### Session 1.4 — IA Validation & Sign-off
**Goal:** Walk every planned page from Phases 2–5 through the Phase 1 template and components. Fix gaps. Close out Phase 1.
**Touches:** whatever 1.2/1.3 produced — patch, don't rebuild.
**DoD:** Phase 1 marked ✅ in Current Status; Session Log updated for 1.1–1.4.

---

# Phase 2 — History

Status: ✅ Complete — signed off Session 2.3 (2026-06-28)

Purpose:

Create a cinematic introduction to ISO 20022.

Focus areas:

* Evolution of Payments
* SWIFT & MT Messages
* Problems with Legacy Standards
* Birth of ISO 20022
* Global Migration Timeline

History is a storytelling experience, not documentation.

## Session Plan

### Session 2.1 — Evolution of Payments + SWIFT & MT Messages
**Goal:** First two chapters, written and rendering on the History page template from Phase 1.
**Touches:** history content + route (path finalized in 1.3).
**DoD:** Both chapters read end-to-end without a tag, acronym, or "XML" in the opening line.

### Session 2.2 — Problems with Legacy Standards + Birth of ISO 20022
**Goal:** Next two chapters — the "what broke, what was invented" pivot of the story.
**Touches:** same as 2.1.
**DoD:** The ISO 20022 origin reads as a consequence of 2.1–2.2's problems, not a standalone fact.

### Session 2.3 — Global Migration Timeline + polish pass
**Goal:** Final chapter, plus whatever motion/transition polish the cinematic framing needs.
**Touches:** same content area; light CSS/motion only here, not earlier.
**DoD:** History reads as one continuous story; Phase 2 marked ✅.

---

# Phase 3 — Library

Status: ✅ Complete — signed off Session 3.7 (2026-06-29)

Purpose:

Build the educational heart of ISO Academy.

Initial architecture:

100 Fundamentals

* What is Money?
* What is a Payment?
* Payment Lifecycle
* Clearing vs Settlement
* Payment Participants

200 Architecture

* Payment Systems
* Payment Gateway
* Payment Hub
* Payment Switch
* Real-Time Payments

300 ISO 20022 Messages

* pain Family
* pacs Family
* camt Family
* head & admi
* Message Lifecycle

400 Exceptions

* Reject
* Return
* Recall
* Reversal
* Investigations

500 Case Studies

* Customer Transfer
* Payroll
* Cross-border Payment
* Treasury
* End-to-End Payment Flow

The Library should scale naturally as new content is created.

## Session Plan

### Session 3.1 — 100 Fundamentals
**Goal:** All five Fundamentals topics, written and indexed.
**Touches:** Library content area + TOC/index entry for level 100.
**DoD:** All five render; each readable with zero finance background.

### Session 3.2 — 200 Architecture
**Goal:** All five Architecture topics.
**Touches:** same content area; TOC entry for level 200.
**DoD:** All five render and cross-link back to relevant 100-level terms.

### Session 3.3 — 300 Messages, part A (pain + pacs)
**Goal:** pain and pacs family write-ups.
**Touches:** Library content area; links out to whatever Explorer/Playground surface already exists for these messages.
**DoD:** Each family page explains purpose + lifecycle before showing a sample message.

### Session 3.4 — 300 Messages, part B (camt + head & admi + Message Lifecycle)
**Goal:** Remaining message families + the lifecycle overview tying 300 together.
**Touches:** same as 3.3.
**DoD:** Level 300 is complete; Message Lifecycle page links to all four families.

### Session 3.5 — 400 Exceptions
**Goal:** Reject, Return, Recall, Reversal, Investigations — all five.
**Touches:** Library content area; TOC entry for level 400.
**DoD:** Each exception type states which message(s) trigger it and what the resolution flow looks like.

### Session 3.6 — 500 Case Studies, part A
**Goal:** First 2–3 case studies (e.g. Customer Transfer, Payroll, Cross-border).
**Touches:** Library content area; TOC entry for level 500.
**DoD:** Each case study walks an end-to-end flow referencing real message types from 300.

### Session 3.7 — 500 Case Studies, part B
**Goal:** Remaining case studies + cross-links across the whole Library.
**Touches:** same as 3.6.
**DoD:** Level 500 complete; Phase 3 marked ✅.

---

# Phase 4 — Playground

Status: ✅ Complete — signed off Session 4.6 (2026-06-30)

Purpose:

Transform learning into experimentation.

Core tools:

* XML Viewer
* Message Transformer
* Schema Validator
* Message Comparator
* Sample Message Library

The Playground should feel like professional software rather than documentation.

## Session Plan

### Session 4.1 — XML Viewer
**Goal:** Standalone viewer — paste/load an ISO 20022 XML message, see it rendered readably (collapsible tree, plain-English labels toggle).
**Touches:** new Playground tool module.
**DoD:** Viewer handles at least one message from each family in 300.

### Session 4.2 — Message Transformer
**Goal:** Format conversion tool (e.g. MT ⇄ MX), live as you edit.
**Touches:** new Playground tool module; may reuse logic from the Viewer.
**DoD:** At least one transformation pair works end-to-end with live updates.

### Session 4.3 — Schema Validator
**Goal:** Standalone validator — checks a pasted/loaded message against real failure modes (bad BIC, truncated fields, missing required elements, etc.).
**Touches:** new Playground tool module.
**DoD:** Validator catches at least 4–5 concrete, named failure modes with clear error messages.

### Session 4.4 — Message Comparator
**Goal:** Side-by-side diff of two messages (e.g. before/after a transformation, or two versions of the same message type).
**Touches:** new Playground tool module.
**DoD:** Diff highlights field-level differences, not just raw text diff.

### Session 4.5 — Sample Message Library
**Goal:** A browsable set of real, valid sample messages per family, loadable directly into the other four tools.
**Touches:** sample data file(s); light UI to browse/select.
**DoD:** At least 2–3 samples per message family, each loadable into Viewer/Transformer/Validator.

### Session 4.6 — Integration & polish
**Goal:** Wire the five tools together (load a sample → view → transform → validate → compare) so Playground feels like one workspace, not five separate pages.
**Touches:** whatever connects the tool modules; no new tools.
**DoD:** A user can move a message through all five tools without re-pasting it; Phase 4 marked ✅.

---

# Phase 5 — Glossary

Status: ⏳ Planned

Purpose:

Provide a fast, searchable reference.

Categories:

* Business Terms
* ISO 20022 Terms
* Message Elements
* Technical Terms
* Acronyms

## Session Plan

### Session 5.1 — Data model + categorization + filter UI
**Goal:** Define the term schema (term, definition, category, related links) and build category filtering + search on top of the Phase 1 template.
**Touches:** glossary data file; glossary page/template.
**DoD:** Filtering and search both work against a handful of seed terms in each category.

### Session 5.2 — Populate terms
**Goal:** Fill out the full term set across all five categories, cross-linking to Library/Playground where relevant.
**Touches:** glossary data file only.
**DoD:** Every category has a meaningful term count; no term is an orphan (each links to at least one related page where applicable). Phase 5 marked ✅.

---

# Design Principles

Every decision should reinforce these principles:

* Simplicity over feature count
* Learning before implementation
* Consistency over novelty
* Typography before decoration
* Motion with purpose
* Quality over quantity

---

# Long-Term Direction

The platform should evolve gradually.

Expand only after the existing experience reaches production quality.

Avoid feature creep.

Protect the clarity of the product.

The objective is not to become a general financial education platform.

The objective is to become the definitive learning platform for ISO 20022.

---

# Backlog

*(Unscheduled ideas or visual/structural urges that came up mid-session —
log them here instead of acting on them. Revisit when planning a future
session, not during the current one.)*

- **Disposition of the current "Learning Journey" page** (`navigate('journey')`).
  ~~The new four-question IA has no fifth top-level section...~~ **Resolved in
  Session 1.3 — disposition (c):** retired from the global nav, kept as a non-nav
  deep route (still reachable from in-page CTAs; `PAGES.journey` / `renderRoadmapView()`
  untouched).
- **Hash-route sync for non-History sections.** Session 2.1 wired deep-linkable hash routing for History (`#/history/<chapter-slug>`) only. `navigate()` for Library / Playground / Glossary still does not sync `location.hash`, so those sections aren't yet shareable / reload-safe at `#/library` etc. Wire each one in its own phase (3 / 4 / 5) against NAVIGATION.md §2 rather than as a one-off now.

  **✅ Resolved (Session 6.1, 2026-07-01).** `navigate()` now reflects every top-level section into the hash (`#/library`, `#/playground`, `#/glossary`, `#/history`) via write-only `replaceState`, and `routeOnLoad` + a single `hashchange` router honor all four on first paint, reload, and back/forward. Playground also gained the `#/playground/<tool-slug>` sub-route (NAVIGATION.md §3 slugs) — `setPlaygroundTool` syncs the active tool to the URL and `openPlaygroundTool` opens a deep-linked tool. All four sections are now shareable / reload-safe. `#/library/<level>/<topic>` article-level deep routing remains a Phase-3 concern (out of scope here). Touches: `assets/js/app.js`. Verified: library/playground/glossary hashes set, tool hash `#/playground/validator`, and reloads at `#/playground/comparator` / `#/library` / `#/glossary/<term>` all restore the right view — zero console errors.
- ~~**Rename `learn → library` in code**~~ **Done in Session 1.3.** The
  `navigate()` key `learn` is now `library` across `index.html`, `app.js`, and
  `markdown.js`. (The internal `learn-root` element id was left as-is — it is
  plumbing, not the route key.)
- **History landing cleanup pass** *(raised by Revanth after Session 2.1; do NOT do inside 2.1 — schedule into 2.3 polish or a dedicated session).* Four edits to `PAGES.history` in `app.js` (and possibly `assets/css/style.css` for the blur fix):
  1. **Drop the hero CTA block.** Remove the `Interactive Academy · ISO 20022` eyebrow and the `Start the Journey` / `Explore the story` buttons. The History page should open straight into **"The Origin"** story section, keeping the background animation (`hero-bg` net / stream / glow).
  2. **Fix the scrub-timeline blur/scroll sync.** In the "THE STORY" pinned timeline (`.scrub-entry` / `initScrubTimeline`), the active-vs-blurred state is out of sync with scroll position — entry 01/07 is already blurred on arrival, and later entries (e.g. 03/07) read as blurred while their copy is centered. Re-tune the IntersectionObserver `rootMargin`/threshold (and/or the `.scrub-entry.active` blur CSS) so the focused entry is the one at the viewport center.
  3. **Remove the "Imagine a world…" pullquote + the cinematic establishing-shot video section** (the `history-cinematic-break` / `cinematic-video` block) entirely. After **"The Need"**, go straight into the **"The longer story"** scrub timeline (also retires the missing-`iso-history.mp4` video warning).
  4. **Remove the "Today — You've seen how we got here" closing section and its button**, and remove the **Learning Journey** entirely (the `journey` CTA + route). Note: this finishes the disposition started in the first Backlog item above — the `journey` deep route was *kept* in 1.3, but Revanth now wants it gone, so retire `PAGES.journey` / `renderRoadmapView()` and all in-page CTAs to it as part of this pass.

  **✅ Resolved in Session 2.3.** All four edits shipped in `assets/js/app.js` (+ `.hero-stage` band in `assets/css/style.css`). `PAGES.journey`, the `navigate('journey')` route branch, and both in-page CTAs were removed, making the journey route unreachable. **Caveat carried to the new Backlog item below.**

- **Dead `journey` code — JS renderer removed (Cleanup, 2026-07-01).** The entire Learning Journey renderer in `assets/js/ui.js` was deleted: `renderRoadmapView`, `renderJourneyHero/Story`, `renderResumeBanner`, `renderMasteryRing`, the route-line/stop helpers (`getStopTier`/`renderRouteStop`/`renderRouteLine`), `renderDeeperLayers`, the lesson renderers (`renderKnowledgeLesson`, `loadLessonModule`, `renderLessonProgress/Why`, `renderProcessMaps`, `renderLessonWho`, `renderMessageSpotlight`), the knowledge-node openers (`openKnowledgeNode`, `hasKnowledgeLesson`, `KNOWLEDGE_LESSON_IDS`, `renderFieldRows`), `lookupGlossary`, the icon/video helpers (`ICON_GLYPHS`, `renderIconGlyph`, `renderGlossyIcon`, `renderVideoFiller`, `HERO_VIDEO_FILLER`, `MASTERY_MILESTONES`), and the status helpers (`getModuleStatus`/`getCurrentModule`/`getCompletedCount`). Confirmed dead first: no live caller in `app.js`/`index.html`/`markdown.js` (`openKnowledgeNode` had no knowledge-node deep-link route wired). **Preserved** the shared live helpers the Message Explorer still uses — `renderWhyCards`, `renderMeaningRows`, `renderDetailSection`, `escapeHtml`, `openDetailPanel`/`closeDetailPanel`/`renderMessageNode` — plus the whole glossary + theme block. `ui.js` 52.5 KB → 15.9 KB; brace-balanced; all four sections navigate with zero console errors. **Still pending (carry-forward):** the now-orphaned `learningJourney` array (+ `DATA.pillars`, `getPillar`, `getMessagesByPillar`) in `data.js`, and the `.journey-*` / route / mastery / `.btn-back-roadmap` / `.coming-soon-*` / `.video-filler-*` CSS in `assets/css/style.css` — left untouched this pass because several lesson/spotlight/process-map CSS classes are **shared** with the live Message Explorer and need a careful per-class audit before deletion. Schedule a follow-up CSS+data cleanup. **✅ data.js portion resolved (Cleanup, 2026-07-01)** — see below; the `.journey-*`/route/mastery/`.coming-soon-*`/`.video-filler-*` CSS is still pending the shared-class audit.

- **Dead `journey` data — `data.js` portion removed (Cleanup, 2026-07-01).** Deleted the now-orphaned Learning Journey data from `assets/js/data.js` (1108 → 706 lines): the whole `DATA.pillars` object (7 pillars) + its doc-comment, the `getPillar` / `getMessagesByPillar` helpers, and the `learningJourney` array (7 chapter modules) + its doc-comment. Confirmed dead first — every reference to these four symbols in the live tree (`assets/js/*`, `index.html`, `markdown.js`) was self-contained within `data.js`; the only consumer was the journey renderer already removed from `ui.js`. **Preserved:** `DATA.messages` + its helpers, `DATA.glossary` (87 terms) + glossary helpers, and `ProgressEngine`. Verified: file parses clean, braces/brackets/parens balanced, the four symbols resolve to `undefined` at runtime, glossary still 87 terms, all four sections navigate with zero console errors. **Still pending (carry-forward):** (1) ~~`ProgressEngine` in `data.js` is now newly orphaned~~ **✅ Resolved (Cleanup, 2026-07-01)** — `ProgressEngine` deleted from `data.js` (only consumer was the removed journey renderer; no live reference remained). (2) The `.journey-*` / route / mastery / `.btn-back-roadmap` / `.coming-soon-*` / `.video-filler-*` CSS in `assets/css/style.css` still needs the shared-class audit.

- **Confirm placement of the legacy `Nostro & Vostro` article** *(raised by Session 3.1).* The Phase 3 Library architecture lists exactly five 100-level Fundamentals; Session 3.1 authored those five (display nums 101–105) and **retained** the pre-existing `nostro-vostro` article as a sixth, supplementary entry at num **106** rather than deleting published work. Its id/filename were left as `101-nostro-vostro` on purpose — `301-pacs-008.md`'s `related` list links to it, so renaming it reaches outside a content phase's Touches. Decide whether to: (a) keep it as the 106 deeper-dive, (b) fold its correspondent-banking content into `105-payment-participants`, or (c) push it to a different level. If the id ever changes, update the `related` ref in `301-pacs-008.md` in the same pass.

  **✅ Resolved (Session 6.2, 2026-07-01) — decision (a), delegated ("decide for me").** Kept as the #106 supplementary deeper-dive, as-is. id/file `101-nostro-vostro` left unchanged, so `301-pacs-008.md`'s `related` ref still resolves. No code change — recorded as the settled disposition.

---

- **Disposition of the `Business Application Header` draft + the stale 200-level framing in `toc.js`** *(raised by Session 3.2).* The roadmap's Phase 3 200 Architecture is Payment Systems / Gateway / Hub / Switch / Real-Time (authored in 3.2 as nums 201–205). The pre-existing `201-business-application-header.md` (`status:draft`) was written under an older framing where "200" meant *the ISO 20022 standard itself* (BAH, namespaces, message structure) — that framing still survives in `toc.js`'s top doc-comment block (the `200 Architecture — the ISO 20022 standard itself…` lines). 3.2 **retained** the BAH draft as a supplementary entry at display num **206** (id/file `201-business-application-header` kept stable — `data.js` and `knowledge-nodes.js` reference its concept, and `301-pacs-008` lives near it) rather than deleting published-adjacent work. Decide whether to: (a) keep BAH as a 206 supplementary read inside Architecture, (b) move it to level 300 (Messages / the standard's structure) where it conceptually belongs, or (c) finish it as a real published article. Whichever — update the stale `toc.js` comment-block description of level 200 to match in the same pass. Out of 3.2's Touches (it would mean rewriting the doc-comment framing), so logged here, not acted on.

  **✅ Resolved (Session 6.2, 2026-07-01) — decision (c): finish it.** `content/201-business-application-header.md` written up into a full published article (the envelope model; `Fr` / `To` / `BizMsgIdr` / `MsgDefIdr` / `BizSvc`; a `head.001` sample; routing + validation gating; BAH-vs-MT-header). `status` flipped to `published` at #206 in `toc.js`. The stale level-200 doc-comment in `toc.js` was rewritten to the shipped "machinery that moves money" framing, with the BAH noted as a supplementary read.

- **Disposition of the two pre-existing 300 single-message deep dives + the stale level-300/200 doc-comment framing in `toc.js`** *(raised by Session 3.3).* 3.3 authored the canonical **pain Family** (301) and **pacs Family** (302) pages. The pre-existing single-message deep dives were **retained and renumbered** (id/file stable): `301-pacs-008` (published, excellent field-by-field) → display num **308**; `302-pain-001` (draft stub) → display num **307**. Decide whether to: (a) keep both as supplementary deeper reads sitting under their family pages, (b) finish `302-pain-001` into a published article (it's still a stub), or (c) fold either deep dive's content into its family page and retire the file. Separately, `toc.js`'s **top doc-comment block** still describes level 200 as "the ISO 20022 standard itself" and level 300 as "happy-path messages, field by field (pain.001, pacs.008, camt.054…)" — both now stale vs. the shipped family framing; update that comment block in the same pass. Out of 3.3's Touches (comment-block rewrite), so logged here.

  **✅ Resolved (Session 6.2, 2026-07-01) — "finish both".** `content/302-pain-001.md` written up into a full published field-by-field article (the three nested levels; the four identifiers everyone confuses — `MsgId` / `PmtInfId` / `InstrId` / `EndToEndId` + `UETR`; self-checking `NbOfTxs` / `CtrlSum`; the pain.002 reply; the pacs.008 handoff). `301-pacs-008` was already published. Both now `status: 'published'` in `toc.js` (#307 / #308). The stale level-300 doc-comment framing in `toc.js` was rewritten to the shipped family framing.

- ~~**Orphaned one-way transformer module `assets/js/playground.js`** *(left by Session 4.2 — out of that session's Touches).* 4.2 replaced the Transformer panel's mount (`#pg-lab` → `#mxt-root`) and its init binding (`Playground.init()` → `MsgTransformer.init()`) with the new bidirectional `transformer.js`. The old `Playground` global, the `#pg-lab` demo, and its `<script src="assets/js/playground.js">` include in `index.html` are now dead code (nothing mounts `#pg-lab` or calls `Playground.init`). Safe to delete the file + its include in a dedicated cleanup pass (same disposition as the dead `journey`/`ui.js` code).~~ **✅ Resolved (Cleanup, 2026-07-01).** Deleted `assets/js/playground.js`, removed its `<script>` include from `index.html`, and removed the now-dangling `initPlayground()` call in `app.js`'s playground-navigate branch. No other live reference to `Playground`/`initPlayground`/`#pg-lab` remained.

- **Disposition of the `camt.056` deep-dive draft now sitting at 406** *(raised by Session 3.5).* The roadmap's Phase 3 400 Exceptions is Reject / Return / Recall / Reversal / Investigations (authored in 3.5 as nums 401–405). The pre-existing `401-camt-056-cancellation.md` (`status:draft`, a single-message field-by-field stub) overlaps conceptually with **403 Recall** (camt.056 is the cancellation request behind a recall); following the 3.1–3.3 precedent it was **retained** and renumbered to display num **406** (id/file `401-camt-056-cancellation` kept stable — renaming reaches outside a content phase's Touches), with 403 Recall linking to it via `related`. Decide whether to: (a) keep it as the 406 supplementary deeper read under Recall, (b) finish it into a real published article, or (c) fold its content into `403-recall` and retire the file. If the id ever changes, update the `related` ref in `403-recall.md` in the same pass. Out of 3.5's intent (it's a disposition call, not content), so logged here, not acted on.

  **✅ Resolved (Session 6.2, 2026-07-01) — decision (b): finish it.** `content/401-camt-056-cancellation.md` written up into a full published article (`Assgnmt` / `Case` / `Undrlyg` structure; reason codes `DUPL` / `FRAD` / `CUST` / `TECH` / `AGNT` / `UPAY`; a fuller sample; the camt.029 answer and when a `pacs.004` actually moves money; camt.056-vs-pacs.004). `status` → `published` at #406 in `toc.js`. id/file `401-camt-056-cancellation` kept stable, so `403-recall.md`'s `related` link still resolves.

- **Glossary cross-links stop at the glossary; a `#/glossary/<slug>` detail route is unbuilt** *(raised by Session 5.2).* The card renderer (`ui.js renderGlossary`) resolves each term's `related` slugs via `getGlossaryTerm` only, so a term can point to another *term* but not out to a Library article (`#/library/…`) or a Playground tool. 5.2 populated 87 fully term↔term cross-linked entries within that constraint (no orphans), but surfacing outbound links — e.g. **pain** → the Library "pain Family" article, **schema-validation** → the Playground Validator — needs a `renderGlossary` change (a typed `related` entry or a second `links` field), which is outside a data-only content phase's Touches. Also still unbuilt: the single-term detail route `#/glossary/<term-slug>` (cards show full definitions inline, so not yet needed). Schedule both into a dedicated glossary-UI pass, not a data phase.

  **✅ Resolved (Session 6.1, 2026-07-01).** `renderGlossary` now supports an optional per-term `links` field (`{ label, article }` → `openArticle`, or `{ label, tool }` → `openPlaygroundTool`), rendered as a distinct accent-colored **"Go deeper"** chip row (↗) beneath the term↔term "See also" row. Seeded five curated outbound links: **pain / pacs / camt** → their Library family articles, **schema-validation** → the Playground Validator, **element** → the XML Viewer. The single-term detail route `#/glossary/<term-slug>` is built: it deep-links to a term (shareable / reload-safe), scrolls it into view and briefly highlights the card; "See also" chips now navigate via that route. Touches: `assets/js/ui.js` (renderer + routing), `assets/js/data.js` (5 `links` entries). Verified: 87 cards, 5 "Go deeper" chips, `#/glossary/settlement` focuses the card, outbound chips open the right article/tool — zero console errors.

- **Dead `journey` CSS in `style.css` — the shared-class audit + deletion.** **✅ Resolved (Cleanup, 2026-07-01).** After auditing which `lesson-*`/`spotlight-*`/`process-map-*` classes the live Message Explorer (`ui.js`) + `motion.js` still use, removed all confirmed-dead journey CSS from `assets/css/style.css` (~19.5 KB): the `.journey-*`, route (`.roadmap-track`/`.route-*`/`.tier-*`), mastery (`.mastery-*`), `.resume-banner*`, `.video-filler*`, `.btn-back-roadmap`, dead lesson head (`.lesson-article*`/`.lesson-progress*`/`.lesson-title`/`.lesson-story-text`), dead lesson/spotlight renderer bits (`.lesson-process/who/unlocked/spotlight-section`, `.spotlight-header/title/code/subtitle/cta`), the MASTERY+ROUTE polish block, and the `.coming-soon*`/`.cs-track*` placeholder. **Preserved** the shared/live classes (`.lesson-why-*`, `.spotlight-fields`/`.spotlight-field*`, `.xml-editor-*`, `.process-map*`, `.detail-*`, `.glossy-icon`/`.icon-*`, `.hl-line`). Verified: brace-balanced (749/749), 0 dead selectors, all four sections render. This closes every `journey` dead-code carry-forward. Touches: `assets/css/style.css` only.

# Session Log

| Session | Status | Date | Shipped / DoD met | Deferred |
|---|---|---|---|---|
| 1.1 Philosophy & Navigation | ✅ Done | 2026-06-28 | `PHILOSOPHY.md` locks the four-question framing + nine-beat Lesson Spine; `NAVIGATION.md` names the four top-level sections, the full `#/…` hash-route scheme, every section's final sub-route slugs, and the current-code → target-route mapping. No visual build (per scope). | `journey` page disposition + `learn → library` rename → Backlog (both for 1.3). |
| 1.2 Design System | ✅ Done | 2026-06-28 | `DESIGN_TOKENS.css` — canonical single-source token set (color incl. light theme, type scale, spacing, radius, elevation, glass, icon, motion); every token has a value. `COMPONENTS.md` — shared component inventory (shell/nav, 6 card variants, content blocks, reading surface, controls, layout grids); each has name, props, and one example. Both extracted from the live `assets/css/style.css` so spec and code agree. | None new. (Nav `learn → library` rename + `journey` disposition already in Backlog for 1.3; documented in `COMPONENTS.md` §1, not acted on.) |
| 1.3 Page Templates | ✅ Done | 2026-06-28 | Shared page shell now has all three regions: `TEMPLATE.html` (new) is the standalone shell — header + content-area + **footer** — rendering generic placeholder content built from 1.2 tokens + components (no section-specific content). Live shell wired to match: new `site-footer` (markup in `index.html`, styles appended to `assets/css/style.css`, spec added to `COMPONENTS.md` §1). Both Backlog items executed: `learn → library` renamed across `index.html`, `app.js`, `markdown.js`; "Learning Journey" retired from global nav — `journey` kept as a non-nav deep route (disposition c). | `learn-root` DOM id left unchanged (internal plumbing, not the route key). |
| 1.4 IA Validation & Sign-off | ✅ Done | 2026-06-28 | Walked every planned Phase 2–5 page through the Phase 1 shell (`TEMPLATE.html`) + component inventory. Result: all pages render through the shell. Two shared controls were missing and patched in (no rebuild): **`pager`** (sequential prev/next — History chapters read in order, Library lesson sequence) and **`filter-bar`/`filter-chip`** (Glossary `?category=` filter; reusable as Library level filter). Each added in three places — `assets/css/style.css`, `COMPONENTS.md` §5, and demoed in `TEMPLATE.html`. New §7 in `COMPONENTS.md` records the full coverage matrix + gap decisions. No tokens added (both resolve from existing `DESIGN_TOKENS.css`). Playground tool interiors confirmed **page-owned** (Phase 4), same status as History's scrub-timeline. **Phase 1 marked ✅** in Current Status. | None. |
| 2.1 Evolution of Payments + SWIFT/MT | ✅ Done | 2026-06-28 | Two History chapters authored on the Phase 1 shell and routed at `#/history/<chapter-slug>` (deep-linkable, survives reload): **01 The Evolution of Payments** and **02 SWIFT and the MT Message**. Both follow the nine-beat Lesson Spine + house voice; the beat-1 acceptance test passes — neither opening line contains a tag, acronym, or "XML". All work is contained to `assets/js/app.js`: a `HISTORY_CHAPTERS` registry, a chapter index appended to the History landing, the chapter reading views, prev/next via the shared `pager` (1.4), and `hashchange` + deep-link routing. Reuses existing reading-surface styles (`.article-page` / `.md-body` / `.article-earned` / `.pager`) — **no new CSS** (reserved for 2.3). | Chapters 03–05 deferred to 2.2/2.3 (registered as `status:'soon'` placeholders — listed in the index, not yet routable). Hash-route sync for non-History sections (`#/library`, etc.) left to their phases → Backlog. |
| 2.2 Legacy Problems + Birth of ISO | ✅ Done | 2026-06-28 | Chapters **03 Problems with Legacy Standards** and **04 The Birth of ISO 20022** authored on the Phase 1 shell, promoted from `status:'soon'` placeholders to full `status:'ready'` entries in `HISTORY_CHAPTERS` (now deep-linkable + routable at `#/history/<slug>`, in the index, and in prev/next). Both follow the nine-beat Lesson Spine + house voice; beat-1 test passes (neither hook's opening line has a tag, acronym, or "XML"). DoD met: ch.04 is written entirely as the consequence of 02–03 — its opening paragraph reprises 03's three failures (truncated name, unreadable remittance, dialects) and each ISO 20022 idea is tied back to the specific legacy limit it fixes; the origin never stands alone. All work contained to `assets/js/app.js`; no new CSS (reserved for 2.3). | Chapter 05 (Global Migration Timeline) still `status:'soon'` → 2.3. Hash-route sync for non-History sections still in Backlog (per-phase). History landing cleanup pass untouched (Backlog item scheduled for 2.3). |
| 2.3 Migration Timeline + polish | ✅ Done | 2026-06-28 | Final chapter **05 The Global Migration Timeline** authored on the Phase 1 shell, promoted from `status:'soon'` to a full `status:'ready'` entry (deep-linkable + routable at `#/history/global-migration-timeline`, in the index and prev/next). Follows the nine-beat Lesson Spine + house voice; beat-1 test passes (opening line has no tag, acronym, or "XML"); closes the arc by reprising all five chapters. **History landing cleanup pass** (Backlog item) executed — all four edits: (1) hero CTA block dropped — History opens straight into "The Origin", hero-bg animation kept (band shortened in CSS); (2) scrub-timeline sync fixed — `initScrubTimeline` rewritten from a thin-band IntersectionObserver to a scroll/rAF nearest-to-center selector, so the focused (unblurred) entry is always the one at viewport center (listener de-duped across navigations); (3) "Imagine a world…" pullquote + cinematic establishing-shot video block removed (also retires the missing `iso-history.mp4` warning — `initBackgroundVideos()` and its call deleted); (4) "Today" closing section + its `journey` CTA removed, and Learning Journey retired — `PAGES.journey` + the `navigate('journey')` route branch deleted, so journey is now fully unreachable. Touches: `assets/js/app.js` (content area + light motion), `assets/css/style.css` (`.hero-stage` band only). **Phase 2 marked ✅.** | `renderRoadmapView()` + the Learning Journey render/lesson machinery in `assets/js/ui.js` are now dead code (journey route removed) — left untouched as `ui.js` is outside 2.3's Touches; logged in Backlog for a dedicated cleanup. |
| 3.1 100 Fundamentals | ✅ Done | 2026-06-28 | All five canonical 100-level Fundamentals authored as published Markdown articles on the Phase 1 reading surface and indexed in `toc.js` — **101 What Is Money?**, **102 What Is a Payment?**, **103 The Payment Lifecycle**, **104 Clearing vs. Settlement**, **105 Payment Participants** — each rendering in order under "100 · Fundamentals" and opening end-to-end. Each follows the house voice (problem-first hook with the recurring Bob→Sweety scenario, plain-English, no tag/acronym/"XML" in the opening line, an `earnedSkill` "So, what can you now do?" close) and is readable with zero finance background (DoD met). Clearing vs. Settlement was the existing `102-clearing-and-settlement.md` **draft promoted to a full published article** (reuse-where-appropriate); its id/filename were kept stable because `301-pacs-008.md` cross-references it. Touches: `content/101-what-is-money.md` (new), `content/102-what-is-a-payment.md` (new), `content/103-payment-lifecycle.md` (new), `content/102-clearing-and-settlement.md` (rewritten), `content/105-payment-participants.md` (new), `assets/js/toc.js` (level-100 index entries). No CSS/JS-engine changes. | The pre-existing `Nostro & Vostro` article (id/file `101-nostro-vostro`, kept stable — `301-pacs-008` links to it) was **retained** at display num **106** as a supplementary deeper read rather than deleted; whether it stays in Fundamentals or moves/retires → Backlog for confirmation. Its filename prefix (`101-`) now differs from its display num (106) — cosmetic only (id≠num by design). |
| 3.2 200 Architecture | ✅ Done | 2026-06-29 | All five canonical 200-level Architecture topics authored as published Markdown articles on the Phase 1 reading surface and indexed in `toc.js` — **201 Payment Systems**, **202 The Payment Gateway**, **203 The Payment Hub**, **204 The Payment Switch**, **205 Real-Time Payments** — each rendering in order under "200 · Architecture" and opening end-to-end. Each follows the house voice (problem-first Bob→Sweety hook, plain-English, no tag/acronym/"XML" in the opening line, an `earnedSkill` "So, what can you now do?" close). **DoD met:** every article cross-links back to relevant 100-level terms via real clickable `related` cards (Payment Lifecycle, Clearing vs. Settlement, Payment Participants, What Is a Payment) plus inline mentions, and the five build on each other (systems→gateway→hub→switch→real-time) — `relatedResolve` verified, all five `fetch` ok. Updated the level-200 blurb in `toc.js` to describe the canonical payment-architecture topics (was the old BAH/namespaces framing). Touches: `content/201-payment-systems.md`, `content/202-payment-gateway.md`, `content/203-payment-hub.md`, `content/204-payment-switch.md`, `content/205-real-time-payments.md` (all new), `assets/js/toc.js` (level-200 blurb + five entries). No CSS/JS-engine changes. | The pre-existing `Business Application Header` draft (id/file `201-business-application-header`, `status:draft`) conflicted on num 201; following the 3.1 nostro-vostro precedent it was **retained** and renumbered to display num **206** (id/file kept stable — `data.js`/`knowledge-nodes.js` reference its concept, and renaming reaches outside a content phase). Its home + the stale 200-level framing in `toc.js`'s top comment block → Backlog for confirmation. |
| 3.3 300 Messages (pain + pacs) | ✅ Done | 2026-06-29 | Both message families authored as published Markdown articles on the Phase 1 reading surface and indexed in `toc.js` — **301 The pain Family** (customer↔bank initiation) and **302 The pacs Family** (bank↔bank clearing & settlement). Each follows the house voice (problem-first Bob→Sweety hook, plain-English, no tag/acronym/"XML" in the opening line, an `earnedSkill` close). **DoD met:** each family page explains **purpose → lifecycle → then a sample message** in that order (pain.001 sample after the three-level walk-through; pacs.008 sample after the instruct→confirm→return lifecycle), and each **links out to the existing Explorer/Playground surfaces** via real `{{embed}}` tokens (`explorer:PAIN.001`, `explorer:PAIN.002`, `explorer:PACS.002`, `playground`). Continuity preserved: the same `EndToEndId` (`BOB-INV0042`) threads the pain.001 sample into the pacs.008 sample, showing the handoff. Refreshed the level-300 blurb in `toc.js` to the family framing (was "happy-path messages field by field"). Touches: `content/301-pain-family.md`, `content/302-pacs-family.md` (both new), `assets/js/toc.js` (300 blurb + two family entries + renumbering). No CSS/JS-engine changes. | Following the 3.1/3.2 precedent (retain published-adjacent work, don't delete), the two pre-existing single-message deep dives were **kept as supplementary entries, renumbered** (id/file stable): `301-pacs-008` (published) → display num **308**, `302-pain-001` (draft stub) → display num **307**. Their `related` refs use ids, so renumbering is safe. Stale 200/300 framing in `toc.js`'s top doc-comment block left untouched (out of Touches) → Backlog. |
| 3.4 300 Messages (camt + head&admi) | ✅ Done | 2026-06-29 | The three remaining 300-level pieces authored as published Markdown articles on the Phase 1 reading surface and indexed in `toc.js` — **303 The camt Family** (reporting: statements, notifications, balances), **304 head & admi** (the BAH envelope around every message + the network's housekeeping), and **305 The Message Lifecycle** (the overview tying 300 together). Each follows the house voice (problem-first Bob→Sweety hook, plain-English, no tag/acronym/"XML" in the opening line, an `earnedSkill` close); camt explains purpose → lifecycle → sample (camt.054) in order. **DoD met: Level 300 is complete** (301–305 render in order; the two supplementary deep dives sit at 307/308) and **305 Message Lifecycle links to all four families** — `related: [301-pain-family, 302-pacs-family, 303-camt-family, 304-head-admi]` renders four clickable "Keep reading" cards (verified: all three new files `fetch` 200, `getArticlesByLevel(300)` returns 301→305 in order). Continuity preserved: the `EndToEndId` `BOB-INV0042` and the `UETR` thread the pain.001 → pacs.008 → camt.054 chain across all three. camt links out to the live Explorer (`explorer:CAMT.054`, `explorer:PACS.008`) and Playground; head & admi cross-links the BAH draft (206). Touches: `content/303-camt-family.md`, `content/304-head-admi.md`, `content/305-message-lifecycle.md` (all new), `assets/js/toc.js` (three level-300 entries). No CSS/JS-engine changes. | head & admi has no dedicated Explorer surface (none exists for head.001/admi.*), so 304 hands off to the BAH deep-dive article (206) + Playground instead of an `explorer:` embed — noted, not a gap. Stale level-200/300 framing in `toc.js`'s top doc-comment block still untouched (out of Touches) → already logged in Backlog. |
| 3.5 400 Exceptions | ✅ Done | 2026-06-29 | All five canonical 400-level Exceptions authored as published Markdown articles on the Phase 1 reading surface and indexed in `toc.js` — **401 Reject**, **402 Return**, **403 Recall**, **404 Reversal**, **405 Investigations** — each rendering in order under "400 · Exceptions" and opening end-to-end (verified: all five `fetch` 200, `getArticlesByLevel(400)` returns 401→405 in order, embeds resolve, related cards resolve, no raw tokens left). Each follows the house voice (problem-first Bob→Sweety hook, plain-English, no tag/acronym/"XML" in the opening line, an `earnedSkill` close). **DoD met: each exception states which message(s) trigger it and the resolution flow** — Reject → `pacs.002`/`pain.002` status `RJCT` + reason code, no money back; Return → `pacs.004`, receiver sends settled funds back; Recall → `camt.056` request answered by `camt.029`, granted recall becomes a `pacs.004`; Reversal → `pacs.007` (`pain.007` customer side), originator undoes its own collection by right; Investigations → `camt.026/027/028` case opened, closed by `camt.029`. The four-exception timeline is taught explicitly around the single question *has it settled yet?*, and continuity is preserved (the same `EndToEndId` `BOB-INV0042` / `UETR` thread the examples back to the 300-level chain). Embeds link out to the live Explorer (`explorer:PACS.002`, `explorer:PACS.004`) and Playground. Refreshed the level-400 blurb in `toc.js` to the five-topic framing. Touches: `content/401-reject.md`, `content/402-return.md`, `content/403-recall.md`, `content/404-reversal.md`, `content/405-investigations.md` (all new), `assets/js/toc.js` (level-400 blurb + five entries + renumbering). No CSS/JS-engine changes. | Following the 3.1/3.2/3.3 precedent (retain published-adjacent work, don't delete), the pre-existing `camt.056` draft (id/file `401-camt-056-cancellation`, `status:draft`) was **retained and renumbered** to display num **406** (id/file kept stable) as a supplementary field-by-field deeper read sitting under the **403 Recall** page, which cross-links it via `related`. Its disposition → Backlog. `article:` is not a supported embed kind (only `playground`/`explorer:`/`page:`), so article cross-links go through `related` cards, not `{{embed}}`. Stale level-200/300 framing in `toc.js`'s top doc-comment block still untouched (out of Touches) → already logged in Backlog. |
| 3.6 500 Case Studies (A) | ✅ Done | 2026-06-29 | First three 500-level Case Studies authored as published Markdown articles on the Phase 1 reading surface and indexed in `toc.js` — **501 Customer Transfer**, **502 Payroll**, **503 Cross-border Payment** — each rendering in order under the new "500 · Case Studies" level and opening end-to-end (verified: `getArticlesByLevel(500)` returns 501→503 in order, all three `fetch` 200, no raw `{{ }}` tokens left, embeds + related cards all resolve, each has its `earnedSkill` close). Each follows the house voice (problem-first Bob→Sweety hook, plain-English, no tag/acronym/"XML" in the opening line). **DoD met: each case study walks an end-to-end flow referencing real 300-level message types** — 501 is the canonical single transfer (pain.001 → pain.002 → pacs.008 → pacs.002 → camt.054 → camt.053, threaded by `EndToEndId` `BOB-INV0042` + `UETR`); 502 scales it to bulk (one batch pain.001 → batch-vs-single booking → fan-out into one pacs.008 per employee → per-payee camt.054), with a single failure isolating as a pacs.004; 503 stretches it across borders (correspondent chain, the pacs.008 customer leg vs the pacs.009 COV cover leg reconciled by a shared `UETR`, FX/charges). Each is framed explicitly as "the customer transfer plus X" so 501 reads as the spine the others extend, and embeds link out to the live Explorer (`explorer:PACS.008`, `explorer:PAIN.001`, `explorer:PACS.009`) + Playground. Added the level-500 block to `ACADEMY_LEVELS`. Touches: `content/501-customer-transfer.md`, `content/502-payroll.md`, `content/503-cross-border-payment.md` (all new), `assets/js/toc.js` (level-500 block + three entries). No CSS/JS-engine changes. | Remaining two case studies (Treasury, End-to-End Payment Flow) + the whole-Library cross-link pass → 3.7. The stale level-100/400 doc-comment block at the top of `toc.js` still doesn't mention level 500 (comment-block rewrite is out of a content phase's Touches) → already-logged Backlog item. |
| 3.7 500 Case Studies (B) | ✅ Done | 2026-06-29 | The two remaining 500-level Case Studies authored as published Markdown articles on the Phase 1 reading surface and indexed in `toc.js` — **504 Treasury** and **505 The End-to-End Payment Flow** — each rendering in order under "500 · Case Studies" (verified: `getArticlesByLevel(500)` now returns 501→505 in order, both new files `fetch` 200, no raw `{{ }}` tokens left, each has its `earnedSkill` close). Both follow the house voice (problem-first Bob→Sweety hook, plain-English, no tag/acronym/"XML" in the opening line). **DoD met — Level 500 complete + whole-Library cross-link pass:** 504 is framed as "the customer transfer minus the customer" — the bank moving its *own* money (pacs.009, no pain.001) to fund nostro positions, read off camt.052/053 — tied back to 501 and cross-linking 101-nostro-vostro + 303-camt-family. **505 is the capstone that cross-links across all five levels at once:** it walks one ordinary payment through Fundamentals (money-as-promise, clearing vs. settlement), Architecture (gateway→hub→rail), the full 300 message chain (pain.001→pain.002→pacs.008→pacs.002→camt.054→camt.053 wrapped in head.001, held by `EndToEndId`+`UETR`), the 400 exception branch it avoids (pinned at settlement), and back out to the other 500 case studies (payroll/cross-border/treasury as "this plus one idea") — naming real articles from every level in prose + `related` cards. Continuity preserved (same `BOB-INV0042` / `UETR` thread the whole way). Touches: `content/504-treasury.md`, `content/505-end-to-end-payment-flow.md` (both new), `assets/js/toc.js` (two level-500 entries). No CSS/JS-engine changes. **Phase 3 marked ✅.** | None new. (No supplementary/legacy file collided at 504/505, so no renumbering this session.) |
| 4.1 XML Viewer | ✅ Done | 2026-06-29 | First Playground tool shipped as a new self-contained module, `assets/js/xml-viewer.js` (global `XmlViewer`, injects its own theme-aware styles). **Standalone viewer:** paste any ISO 20022 XML on the left, read it on the right as a **collapsible tree** (click/Enter to fold any branch; expand-all / collapse-all), with a **Plain English** toggle that renames every tag via a per-family dictionary (raw tag kept as a hint). Live re-parse on input; malformed XML surfaces a real `parsererror` message instead of a blank. **DoD met — handles ≥1 message from every 300 family:** ships loadable samples for **pain.001, pacs.008, camt.054, head.001 (BAH), admi.004** (all five parse with `err:false`, correct roots — head→`AppHdr`, admi→`Document`); samples reuse the Bob→Sweety `EndToEndId BOB-INV0042` + shared `UETR` so they thread back to the 300/500 lessons. Surfaced via a Playground **tool switcher** (XML Viewer default · Transformer) so the new tool and the pre-existing live MT103→pacs.008 transformer coexist without either being lost — the full five-tool workspace wiring is 4.6. Touches: `assets/js/xml-viewer.js` (new module + its injected CSS), plus the **minimum wiring** to surface it — `index.html` (one `<script>` include) and `assets/js/app.js` (tool tab bar in `PAGES.playground`, `setPlaygroundTool()`, viewer init on navigate). No change to `assets/css/style.css` (module self-injects). | Transformer/Validator/Comparator/Samples tabs not yet a unified workspace (one shared message across tools) → 4.6. Per-tool deep-link routing (`#/playground/<tool-slug>?sample=`) from NAVIGATION.md §3 not wired → its own pass (already in Backlog as the per-section hash-route sync item). |
| 4.2 Message Transformer | ✅ Done | 2026-06-29 | Second Playground tool shipped as a new self-contained module, `assets/js/transformer.js` (global `MsgTransformer`, injects its own theme-aware styles). **Live, bidirectional format converter:** the legacy SWIFT **MT103** and the **ISO 20022 pacs.008** sit side by side, *both editable*, kept in sync through a single canonical payment model — edit any MT103 field and the pacs.008 rebuilds live (12 mapped business fields → 14 editable XML values), edit any pacs.008 value and the MT103 rebuilds the other way. Only the *opposite* pane re-renders on each edit so the caret never jumps. A **direction toggle** (MT103 → pacs.008 / pacs.008 → MT103) reframes which side is "source" to teach both real conversions (modernisation + fallback); a **Plain English** toggle renames every pacs.008 tag via a dictionary; hovering any field cross-highlights its counterpart across the wire and synced lines pulse. **DoD met — ≥1 transformation pair works end-to-end with live updates:** MT103 ⇄ pacs.008 verified both directions (MT edit → 'ZZTEST' lands in pacs Nm; pacs edit → '999.99' lands in MT 32A amount), direction flip + plain-English + reset all confirmed, zero console errors. Threaded to the Library: default payment is the Bob → Sweety $400 transfer (`EndToEndId BOB-INV0042` + shared `UETR`). Touches: `assets/js/transformer.js` (new module + injected CSS), plus minimum wiring — `index.html` (one `<script>` include) and `assets/js/app.js` (Transformer panel body in `PAGES.playground`, tab sub-label MT103 ↔ pacs.008, `setPlaygroundTool()` init now calls `MsgTransformer.init`). No change to `assets/css/style.css` (module self-injects). | The pre-existing one-way `Playground` module (`assets/js/playground.js`, old `#pg-lab` MT103→pacs.008 demo) is now **superseded and orphaned** — its panel mount + init binding were replaced, but the file + its `<script>` include were left untouched (out of 4.2's Touches) → Backlog for cleanup. Validator catch-what-breaks behaviour from the old demo's framing belongs to 4.3. Unified one-message-across-tools workspace → 4.6. |
| 4.3 Schema Validator | ✅ Done | 2026-06-30 | Third Playground tool shipped as a new self-contained module, `assets/js/validator.js` (global `SchemaValidator`, injects its own theme-aware styles). **Standalone validator:** paste/load a message on the left, read a **live validation report** on the right — a pass/fail verdict plus one card per finding that names the **rule**, the **element**, and the offending **value** in plain English. **DoD met — catches well past the 4–5 named failure modes required, each with a clear message:** (1) **Malformed XML** (real `parsererror`, gates the rest); (2) **Missing required element** (EndToEndId / IntrBkSttlmAmt / Dbtr / Cdtr / ChrgBr); (3) **Bad BIC** (length + `[A-Z]{6}[A-Z0-9]{2}(branch)?`); (4) **Bad IBAN** (ISO 7064 mod-97 checksum — real digit math); (5) **Overlong field** (ISO maxLengths: Nm/Ustrd 140, Id 35); (6) **Amount problem** (non-numeric, negative, missing Ccy, too many decimals for the currency's minor unit); (7) **Bad currency code** (3-letter ISO 4217); (8) **Reference/Date/Count** (UETR must be a UUID, IntrBkSttlmDt must be ISO date, NbOfTxs must equal the real CdtTrfTxInf count). Ships **7 loadable samples** — one **clean** Bob→Sweety pacs.008 that passes every check (IBAN check digits computed so mod-97 genuinely reconciles), plus six that each break exactly one rule (bad BIC, bad IBAN, amount/currency, overlong remittance, missing EndToEndId, count mismatch) so each rule is demonstrably caught. Threaded to the Library (same `EndToEndId BOB-INV0042` + shared `UETR`). Surfaced via the existing Playground **tool switcher** (Viewer · Transformer · **Validator**) without disturbing the other tools. Touches: `assets/js/validator.js` (new module + injected CSS), plus minimum wiring — `index.html` (one `<script>` include) and `assets/js/app.js` (Validator tab + panel in `PAGES.playground`, `setPlaygroundTool('validator')` branch + init, `pg-tool-soon` label trimmed to "Comparator · Samples"). No change to `assets/css/style.css` (module self-injects). | Comparator/Samples tabs still placeholders → 4.4/4.5. Unified one-message-across-tools workspace → 4.6. Per-tool deep-link routing → existing Backlog item. |
| 4.4 Message Comparator | ✅ Done | 2026-06-30 | Fourth Playground tool shipped as a new self-contained module, `assets/js/comparator.js` (global `MsgComparator`, injects its own theme-aware styles). **Side-by-side, field-level diff:** two messages sit in editable A/B panes; below them a **live** report parses *both* to their structural tree (element path + attributes, namespace-agnostic, repeated siblings indexed) and aligns by path — so the diff is **field-level, not raw text**: a re-ordered or re-formatted message yields **zero** false differences, and every real change is reported against its element as **changed** / **added** / **removed** (identical fields counted and hidden behind a toggle). **DoD met — diff highlights field-level differences:** verified live — the *Charges renegotiated* pair returns `ChrgBr` **changed** SHAR→DEBT plus `@Ccy` / `Amt` / `BICFI` **added** from the new `ChrgsInf` block (4 diffs, not a line diff); the *Sent vs returned* pair (pacs.008 vs pacs.004) returns 31 structural diffs (1 changed root `@xmlns`, 16 removed, 14 added) naming each path; reorder/whitespace-only edits produce no spurious rows. Ships **5 before/after pairs**, each a variation of the Bob→Sweety pacs.008 (`EndToEndId BOB-INV0042` + shared `UETR`): amount corrected, charges renegotiated (SHAR→DEBT + ChrgsInf), version upgrade (.08→.09 namespace only), creditor re-routed (name/BIC/IBAN together), and sent-vs-returned (pacs.008 → pacs.004). Surfaced via the existing Playground **tool switcher** (Viewer · Transformer · Validator · **Comparator**) without disturbing the other tools; `pg-tool-soon` trimmed to "Samples". Touches: `assets/js/comparator.js` (new module + injected CSS), plus minimum wiring — `index.html` (one `<script>` include) and `assets/js/app.js` (Comparator tab + panel in `PAGES.playground`, `setPlaygroundTool` comparator branch + init). No change to `assets/css/style.css` (module self-injects). | Sample Message Library (4.5) + the unified five-tool workspace (4.6) still pending. Per-tool deep-link routing still in Backlog. The pre-existing orphaned `assets/js/playground.js` (+ its include) remains dead code — already logged in Backlog, untouched here (out of 4.4 Touches). |
| 4.5 Sample Message Library | ✅ Done | 2026-06-30 | Fifth Playground tool shipped as a new self-contained module, `assets/js/samples.js` (global `SampleLibrary`, injects its own theme-aware styles). **Browsable shelf of real, valid samples — loadable into the other tools in one click.** Ships **13 well-formed samples across all five 300-level families** (DoD "2–3 per family" met): **pain** ×3 (pain.001 initiation, pain.002 status, pain.008 direct debit), **pacs** ×3 (pacs.008 credit transfer, pacs.002 status, pacs.004 return), **camt** ×3 (camt.054 notification, camt.053 statement, camt.056 cancellation), **head** ×2 (BAH over pacs.008, BAH over camt.054), **admi** ×2 (admi.004 system event, admi.002 message reject). Light browse UI: family filter chips (All / pain / pacs / camt / head / admi) + a responsive card grid; each card carries a family badge, message name, one-line sub, a plain-English note, and **Load** buttons. **DoD met — each loadable into Viewer/Validator/Transformer:** Load drives each destination through its **own public surface only** — Viewer/Validator get the XML written into their source textarea + the tool's own `onInput()` fired (re-parses exactly as if pasted); the **pacs.008** (the only message the MT103⇄pacs.008 Transformer speaks) offers a **Transform** button that parses the message to the canonical model and calls the new `MsgTransformer.loadModel()`. Verified live: 13 cards render, family filter works, validator loads pacs.004 (`PmtRtr`), viewer loads camt.054, transformer loads pacs.008 with content, zero console errors. Threaded to the Library — every sample is a beat of the same Bob→Sweety $400 transfer (`EndToEndId BOB-INV0042` + shared `UETR`). Touches: `assets/js/samples.js` (new module + injected CSS), plus minimum wiring — `index.html` (one `<script>` include), `assets/js/app.js` (Sample Library tab + panel in `PAGES.playground`, `setPlaygroundTool('samples')` branch + init; replaced the "Samples — coming next" placeholder), and **one additive method** `MsgTransformer.loadModel(partial)` in `assets/js/transformer.js` (the integration surface required so a pacs.008 is loadable into the Transformer — purely additive, existing flows untouched). No change to `assets/css/style.css` (module self-injects). | Transformer load is offered only for the **pacs.008** sample by design — the MT103⇄pacs.008 Transformer has no meaning for a camt/head/admi message, so those load into Viewer/Validator only (the two tools that accept any XML); not a gap. The unified single-message workspace (move one message through all five tools without re-selecting) + per-tool deep-link routing → 4.6. |
| 4.6 Integration & polish | ✅ Done | 2026-06-30 | The five Playground tools now behave like **one workspace** — a message moves through all five without re-pasting. Added a shared **handoff bar** ("Continue with this message →" View · Transform · Validate · Compare, self excluded) to the Viewer, Transformer, Validator, and Comparator panels; the Sample Library stays the entry point with its existing per-card Load/Transform buttons. Wiring is one `sendMessageTo(dest)` in `app.js` (`PG_GET`/`PG_LOAD` maps) that reads the active tool's current message, switches tools (re-initialising the destination), then loads it in. Each module gained exactly the two surfaces this needs: `getXml()` + `loadXml()` on **XmlViewer** (`#xv-src`), **SchemaValidator** (`#val-src`), and **MsgComparator** (pane A — incoming lands in A, leaves B free to diff against); **MsgTransformer** gained `getXml()` (serialises its live canonical model to a real pacs.008 string) + `loadXml()` (parses a pacs.008 back into the model via `loadModel`). **DoD met:** Samples→Viewer→Validator→Comparator→Transformer→Viewer round-trips keep the same Bob→Sweety `BOB-INV0042` / `UETR` message intact at each hop. Touches: `assets/js/app.js` (handoff bars + `sendMessageTo` + maps), `assets/js/xml-viewer.js` (`getXml`/`loadXml` + shared `.pg-flow` chrome CSS — the viewer owns the shared playground chrome), `assets/js/transformer.js`, `assets/js/validator.js`, `assets/js/comparator.js` (`getXml`/`loadXml` each). No new tools; no change to `style.css`. **Phase 4 marked ✅.** | Handoff **into** the Transformer is pacs.008-only by design (it speaks only MT103⇄pacs.008) — sending a camt/admi/head message to Transform is a deliberate no-op, matching the Sample Library's pacs-only Transform button. Per-tool deep-link routing (`#/playground/<tool-slug>?sample=`) still unwired → Backlog. Dead `journey`/`ui.js` + orphaned `playground.js` cleanup still pending → Backlog. |
| 5.1 Data model + filter UI | ✅ Done | 2026-06-30 | Glossary term schema locked + category-filter + search built on the Phase 1 template. **Data model** (`data.js`): every term now carries `term`, `slug` (stable, lowercase-hyphenated), `category` (exactly one of five), `definition`, and `related` (array of other glossary slugs, "See also"). Added a `GLOSSARY_CATEGORIES` registry (NAVIGATION.md §3 slugs/labels) + `glossaryCategoryLabel()` / `getGlossaryTerm()` helpers. **Seeded 31 terms across all five categories** — Business Terms ×8, ISO 20022 Terms ×6, Message Elements ×7, Technical Terms ×5, Acronyms ×5 (existing 22 terms migrated + re-categorised, no data lost). **Filter UI** (`ui.js` + `app.js`): rebuilt `renderGlossary()` to drive off a shared `glossaryState {category,q}` — a reusable `filter-bar`/`filter-chip` row (All + per-category chips, each with a live count that respects the current search) plus the existing search box; the two compose (search narrows within the active category). Each card now shows a clickable category badge and "See also" related chips (`gotoGlossaryTerm`). State reflects to `#/glossary?category=&q=` via `replaceState` (shareable/reload-safe — `applyGlossaryHash` seeds on navigate, `routeOnLoad`+`hashchange` honor a deep link). **DoD met — filtering and search both work against seed terms in each category** (verified live: All→31, Acronyms→5, Acronyms+"iban"→1, "settle"→5, URL syncs, related chips resolve, zero console errors). Touches: `assets/js/data.js` (glossary data + categories), `assets/js/app.js` (filter-bar container in `PAGES.glossary` + glossary deep-link routing), `assets/js/ui.js` (`renderGlossary`/`filterGlossary` rewrite + chip/badge/related/state). No CSS changes (`.filter-bar`/`.filter-chip` already exist from 1.4; card chrome inline). | `#/glossary/<term-slug>` single-term detail route (NAVIGATION.md §2) not built — cards show the full definition inline, so no detail page is needed yet; fold into 5.2 if a dedicated term page is wanted. `related` currently links term→term only; cross-links out to Library/Playground are 5.2's explicit job. |
| 5.2 Populate terms | ✅ Done | 2026-07-01 | Full glossary term set authored in `assets/js/data.js` (glossary data only, per Touches) — grew the 5.1 seed of 31 to **87 terms** with a meaningful count in every category: **Business Terms 18**, **ISO 20022 Terms 16**, **Message Elements 20**, **Technical Terms 16**, **Acronyms 17**. New terms weave the Library/Playground vocabulary into the reference — pain/pacs/camt families, the pain.001 element tree (GrpHdr/PmtInf/CdtTrfTxInf, MsgId/NbOfTxs/CtrlSum, DbtrAgt/CdtrAgt, TxSts/Reason Code, IntrBkSttlmDt, SvcLvl, Purp), correspondent-banking + nostro/vostro + treasury, the rails/schemes (RTGS, ACH, CSM, SEPA, SWIFT), the standards machinery (message definition/identifier, business/message component, market practice, coexistence, migration), and the technical checks the Validator relies on (well-formed, schema validation, parser, mod-97, character set, ISO 4217/3166/8601, UTF-8, XSD, UUID). **DoD met — every category has a meaningful term count and no term is an orphan:** verified programmatically — 87 terms, 0 duplicate slugs, 0 broken `related` refs (every referenced slug resolves), 0 self-refs, and **0 terms with an empty `related` array**, so every card renders at least one working "See also" chip. Cross-links stay within the glossary because the card renderer (`ui.js renderGlossary`) resolves `related` via `getGlossaryTerm` only — links out to Library/Playground would need a renderer change, outside 5.2's data-only Touches (logged as a Backlog note, not acted on). Existing 31 terms kept verbatim; their `related` arrays extended toward the new terms. Touches: `assets/js/data.js` (glossary array only). No CSS/JS-engine changes. **Phase 5 marked ✅.** | Two carry-forwards, both out of 5.2's data-only scope → Backlog: (1) `#/glossary/<term-slug>` single-term detail route still unbuilt (cards show full definitions inline, so not yet needed); (2) glossary `related` chips link term→term only — surfacing cross-links *out* to Library articles / Playground tools needs a `renderGlossary` change. |

| Cleanup — orphaned `playground.js` | ✅ Done | 2026-07-01 | Backlog cleanup: deleted the dead one-way transformer module `assets/js/playground.js` (superseded by `transformer.js` in 4.2). Removed its `<script>` include from `index.html` and the now-dangling `initPlayground()` call in `app.js`'s `page === 'playground'` navigate branch. Confirmed no other live reference to `Playground` / `initPlayground` / `#pg-lab` remained before deleting. Touches: `assets/js/playground.js` (deleted), `index.html` (include removed), `assets/js/app.js` (dead call removed). | None. |
| Cleanup — dead `journey` renderer in `ui.js` | ✅ Done | 2026-07-01 | Backlog cleanup: removed the entire dead Learning Journey render/lesson machinery from `assets/js/ui.js` (~36.6 KB, 52.5 KB → 15.9 KB) — roadmap/hero/resume/mastery/route-line renderers, the knowledge-lesson renderers + openers, icon/video helpers, and status helpers (full symbol list in the Backlog note). Verified dead first: no live caller in `app.js`/`index.html`/`markdown.js`. **Preserved** the shared helpers the live Message Explorer depends on — `renderWhyCards`, `renderMeaningRows`, `renderDetailSection`, `escapeHtml`, `openDetailPanel`/`closeDetailPanel`/`renderMessageNode` — and the whole glossary + theme block. Brace-balanced; History/Library/Playground/Glossary all navigate with zero console errors; the 5 removed globals are now `undefined`, the 4 kept ones still `function`. Touches: `assets/js/ui.js` only. | Orphaned `learningJourney` data in `data.js` + `.journey-*`/route/mastery/`.coming-soon-*`/`.video-filler-*` CSS in `style.css` left for a follow-up — several lesson/spotlight/process-map CSS classes are shared with the live Message Explorer and need a per-class audit → Backlog. |
| Cleanup — orphaned `learningJourney`/`pillars` data in `data.js` | ✅ Done | 2026-07-01 | Backlog carry-forward from the `ui.js` journey cleanup: removed the now-dead Learning Journey data from `assets/js/data.js` (**1108 → 706 lines**) — the whole `DATA.pillars` object (7 pillars) + doc-comment, the `getPillar` / `getMessagesByPillar` helpers, and the `learningJourney` array (7 chapter modules) + doc-comment. Confirmed dead first: every reference to the four symbols across the live tree (`assets/js/*`, `index.html`, `markdown.js`) was confined to `data.js`'s own definitions; the only consumer was the journey renderer already removed from `ui.js`. **Preserved:** `DATA.messages` + its helpers, `DATA.glossary` (87 terms) + glossary helpers, `ProgressEngine`. Verified: `new Function(data.js)` parses clean, braces/brackets/parens balanced (256/256, 211/211, 150/150), the four symbols resolve to `undefined` at runtime, glossary still 87 terms, all four sections navigate with zero console errors. Touches: `assets/js/data.js` only. `DELETED.txt` updated. | `ProgressEngine` in `data.js` is now newly orphaned (only user was the deleted journey renderer) — out of this item's named scope, logged to Backlog for a follow-up. `.journey-*` / route / mastery / `.coming-soon-*` / `.video-filler-*` CSS still pending the shared-class audit → Backlog. |
| Cleanup — orphaned `ProgressEngine` in `data.js` | ✅ Done | 2026-07-01 | Backlog carry-forward from the `data.js` journey cleanup: removed the now-orphaned `ProgressEngine` localStorage progress store from `assets/js/data.js` (object + doc-comment; file now ends on `getMessageByCode()`). Confirmed dead first: grep of the live tree (`assets/js/*`, `index.html`, `markdown.js`) found **no** consumer — the only `ProgressEngine` / `iso_academy_progress` references were its own definition; every caller (`getModuleStatus`/`getCompletedCount`/`openKnowledgeNode`/`renderKnowledgeLesson`) lived in the journey renderer already deleted from `ui.js`. **Preserved:** `DATA.messages` + helpers, `DATA.glossary` (87 terms) + glossary helpers. Verified: braces/brackets/parens balanced (244/244, 209/209, 129/129); `index.html` loads with zero console errors; `typeof ProgressEngine === 'undefined'`, glossary still 87 terms, `getMessageByCode` still a function, all four sections navigate clean. Touches: `assets/js/data.js` only. `DELETED.txt` updated. | None. The remaining `journey` carry-forward is now just the `.journey-*` / route / mastery / `.coming-soon-*` / `.video-filler-*` CSS shared-class audit → Backlog. |
| Cleanup — dead `journey` CSS in `style.css` | ✅ Done | 2026-07-01 | Final `journey` cleanup carry-forward: after the shared-class audit (live callers = `ui.js` Message Explorer + `motion.js`), removed all confirmed-dead journey CSS from `assets/css/style.css` (~19.5 KB; 137.8 KB → 118.4 KB) — `.journey-*`, route/`.tier-*`, mastery, `.resume-banner*`, `.video-filler*`, `.btn-back-roadmap`, dead lesson-head + lesson/spotlight-renderer classes, the MASTERY+ROUTE polish refinement, and the `.coming-soon*`/`.cs-track*` placeholder. **Preserved** the shared/live classes (`.lesson-why-*`, `.spotlight-fields`/`.spotlight-field*`, `.xml-editor-*`, `.process-map*`, `.detail-*`, `.glossy-icon`/`.icon-*`, `.hl-line`). Verified brace-balanced (749/749), 0 dead selectors, all four sections navigate clean. `DELETED.txt` updated. Touches: `assets/css/style.css` only. | None — closes every `journey` dead-code carry-forward. |
| 6.1 Hash-route sync + Glossary cross-links | ✅ Done | 2026-07-01 | Two phase-scoped Backlog items cleared. **(1)** Top-level hash sync: `navigate()` reflects `#/library` / `#/playground` / `#/glossary` / `#/history` (write-only `replaceState`); `routeOnLoad` + one `hashchange` router honor all four on load/reload/back-forward; added the `#/playground/<tool-slug>` sub-route + `openPlaygroundTool`. **(6)** Glossary UI pass: `renderGlossary` `links` field → accent "Go deeper" outbound chips (5 seeded: pain/pacs/camt → Library, schema-validation/element → Playground), plus the `#/glossary/<term-slug>` detail route (deep-link, scroll-to, highlight). Touches: `app.js`, `ui.js`, `data.js`. Verified in-preview, zero console errors. | `#/library/<level>/<topic>` article-level deep routing left to Phase 3 (named, not built). Backlog items 2–5 (content dispositions) still open per user. |
| 6.2 Finish 3 draft articles + toc framing | ✅ Done | 2026-07-01 | Backlog items 2–5 dispositioned per user. **(3)** BAH #206 finished → published; **(4)** pain.001 #307 finished → published (pacs.008 #308 already was); **(5)** camt.056 #406 finished → published — three full field-by-field articles in the house style (problem-first → sections → real XML sample → embed cards → "You can now"). **(2)** Nostro & Vostro kept as the #106 deeper-dive (delegated). Stale `toc.js` level-200 / level-300 doc-comment framing rewritten to match the shipped structure. Touches: `content/201-business-application-header.md`, `content/302-pain-001.md`, `content/401-camt-056-cancellation.md`, `assets/js/toc.js`. Verified in-preview: no Draft cards remain; all three render full bodies, XML, earned boxes, embeds — zero console errors. | Backlog now fully cleared. |
| 6.3 Context-aware header arrows | ✅ Done | 2026-07-01 | Header ‹ › arrows are now context-aware instead of only switching top-level sections. While reading a **Library article** they step prev/next through the full article reading order (level ascending, then by num); past either end they drop back to the Library index. While reading a **History chapter** they step through the ready chapters; past either end they drop to the History landing. On a top-level page they behave as before (step NAV_ORDER, dimming at the ends). `openArticle` / `renderHistoryChapter` now record a reading context (`window.__currentArticle` / `__currentHistory`), `navigate()` clears it, and `updateNavArrows` keeps both arrows live while reading. Also fixed a latent bug: `openArticle` lit a non-existent `data-page="learn"` nav item — now correctly lights `library`. Touches: `assets/js/app.js`, `assets/js/markdown.js`. Verified in-preview: article next/prev + wrap-to-index, history chapter stepping + wrap-to-landing, Library stays lit — zero console errors. | User request (arrows should navigate between articles while reading, not just sections). |
