// ===========================================================================
// toc.js  —  The Academy Table of Contents (article registry)
// ===========================================================================
//
// WHAT THIS IS
//   The index of every long-form article in /content. This is the Markdown
//   architecture's answer to the old hardcoded lists: articles live as .md
//   files; this file just orders and describes them so the Learn index can be
//   built WITHOUT fetching every article up front.
//
// HOW IT RELATES TO data.js (Hybrid model — see ACADEMY_BLUEPRINT_PLAN.md)
//   data.js still powers the *interactive* surfaces (Playground, Message
//   Explorer, Glossary, Journey). toc.js + /content power *reading* — the
//   long-form articles. An article can hand off to an interactive surface via
//   an {{embed:...}} token (handled in markdown.js).
//
// THE NUMBERING (university-style difficulty × domain)
//   100  Fundamentals  — banking concepts, money movement, clearing,
//                         correspondent banking. No XML yet.
//   200  Architecture  — the machinery that moves money between and inside
//                         banks: payment systems, the gateway, the hub, the
//                         switch, and the real-time rails. (The BAH /
//                         head.001 envelope lives here too, as a deeper read.)
//   300  Message Deep Dives — the message families that move and confirm a
//                         payment: pain (you instruct your bank), pacs (banks
//                         pay each other), camt (reporting), and head & admi.
//   400  Exceptions    — R-transactions: cancellations (camt.056),
//                         returns (pacs.004), routing failures.
//
// ADDING AN ARTICLE
//   1. Drop  content/<num>-<slug>.md  with a YAML frontmatter block.
//   2. Add one entry below. `id` MUST equal the filename without .md.
//   The listing metadata here should mirror the file's frontmatter; the file
//   is the source of truth once an article is opened.
// ---------------------------------------------------------------------------

const ACADEMY_LEVELS = {
    100: {
        name: 'Fundamentals',
        tag: '100 · Fundamentals',
        blurb: 'How money actually moves — value, trust, clearing, settlement, correspondent banking. No XML yet.'
    },
    200: {
        name: 'Architecture',
        tag: '200 · Architecture',
        blurb: 'The machinery that moves money between and inside banks — the shared payment systems, the gateway, the hub, the switch, and the instant rails. Still no XML.'
    },
    300: {
        name: 'Message Deep Dives',
        tag: '300 · Message Deep Dives',
        blurb: 'The message families that move and confirm a payment — pain (you instruct your bank), pacs (banks pay each other), camt, and friends — each opened by purpose, lifecycle, and a sample message.'
    },
    400: {
        name: 'Exceptions',
        tag: '400 · Exceptions',
        blurb: 'When a payment goes wrong — the five exits off the happy path: reject, return, recall, reversal, and the investigations that hunt down a payment gone quiet. The one question behind them all: has the money settled yet?'
    },
    500: {
        name: 'Case Studies',
        tag: '500 · Case Studies',
        blurb: 'Everything you have learned, put in motion. Real end-to-end flows — a single transfer, a payroll run, a cross-border payment — each one walked message by message, family by family, from the first tap to the final reconciled statement.'
    }
};

// Each entry: { id, num, level, file, title, summary, minutes, tags, status }
//   status: 'published' (default) | 'draft' (a stub that still opens)
const ACADEMY_TOC = [
    {
        id: '105-payment-participants',
        num: 105, level: 100,
        file: '105-payment-participants.md',
        title: "Payment Participants: Who's Actually Involved When You Pay",
        summary: "A simple payment hides a surprising cast of characters. Learn their roles and the names inside every message stop being a riddle.",
        minutes: 7,
        tags: ['participants', 'agents', 'intermediary'],
        status: 'published'
    },
    {
        id: '101-nostro-vostro',
        num: 106, level: 100,
        file: '101-nostro-vostro.md',
        title: 'Nostro & Vostro: How Banks Hold Money for Each Other',
        summary: "The account trick that lets a bank in Dubai pay a bank in Bangalore without shipping any cash across the border.",
        minutes: 7,
        tags: ['correspondent banking', 'accounts', 'settlement'],
        status: 'published'
    },
    {
        id: '101-what-is-money',
        num: 101, level: 100,
        file: '101-what-is-money.md',
        title: 'What Is Money? The IOU You Forgot Was an IOU',
        summary: "Before you can move money you have to know what it is — and it isn't the coins or the cash. It's a promise everyone agrees to trust.",
        minutes: 6,
        tags: ['money', 'value', 'trust', 'ledgers'],
        status: 'published'
    },
    {
        id: '102-what-is-a-payment',
        num: 102, level: 100,
        file: '102-what-is-a-payment.md',
        title: 'What Is a Payment? Moving Value Without Moving Cash',
        summary: "A payment isn't cash changing hands — it's information changing two ledgers, plus everyone agreeing it really happened.",
        minutes: 7,
        tags: ['payment', 'transfer', 'instruction'],
        status: 'published'
    },
    {
        id: '103-payment-lifecycle',
        num: 103, level: 100,
        file: '103-payment-lifecycle.md',
        title: 'The Payment Lifecycle: What Happens Between Tap and Done',
        summary: "A payment isn't one event — it's a short journey with named stages. Learn them and you'll recognise them inside every message and every error.",
        minutes: 8,
        tags: ['lifecycle', 'clearing', 'settlement', 'reconciliation'],
        status: 'published'
    },
    {
        id: '102-clearing-and-settlement',
        num: 104, level: 100,
        file: '102-clearing-and-settlement.md',
        title: 'Clearing vs. Settlement: The Two Halves of a Payment',
        summary: "Two words everyone uses interchangeably — and the difference is where most payment confusion lives.",
        minutes: 7,
        tags: ['clearing', 'settlement', 'RTGS', 'netting'],
        status: 'published'
    },
    {
        id: '201-payment-systems',
        num: 201, level: 200,
        file: '201-payment-systems.md',
        title: 'Payment Systems: The Shared Roads Money Travels On',
        summary: "Banks don't pay each other one-to-one. They plug into shared systems — public roads for money — and the kind of road decides the speed, the cost, and the rules.",
        minutes: 8,
        tags: ['payment systems', 'RTGS', 'ACH', 'rails', 'scheme'],
        status: 'published'
    },
    {
        id: '202-payment-gateway',
        num: 202, level: 200,
        file: '202-payment-gateway.md',
        title: 'The Payment Gateway: The Front Door of a Bank',
        summary: "Before a payment can be processed, it has to get inside. The gateway is the guarded front door where every payment is checked and translated into the bank's own language.",
        minutes: 7,
        tags: ['payment gateway', 'ingress', 'validation', 'translation'],
        status: 'published'
    },
    {
        id: '203-payment-hub',
        num: 203, level: 200,
        file: '203-payment-hub.md',
        title: 'The Payment Hub: The Brain That Routes Every Payment',
        summary: "The central engine that takes each clean payment and decides where it should go, how, and on which road — replacing a bank's old pile of separate silos.",
        minutes: 8,
        tags: ['payment hub', 'orchestration', 'routing', 'core'],
        status: 'published'
    },
    {
        id: '204-payment-switch',
        num: 204, level: 200,
        file: '204-payment-switch.md',
        title: 'The Payment Switch: The Split-Second Router',
        summary: "Some payments can't wait for orchestration — a card tap needs an answer in under a second. The switch is the specialised router built purely for speed.",
        minutes: 7,
        tags: ['payment switch', 'authorisation', 'real-time', 'cards'],
        status: 'published'
    },
    {
        id: '205-real-time-payments',
        num: 205, level: 200,
        file: '205-real-time-payments.md',
        title: 'Real-Time Payments: Money That Moves While You Wait',
        summary: "Instant, always-on, final, push — the four traits of a real-time payment, and how they compress the whole lifecycle into a few seconds and move the risk around.",
        minutes: 8,
        tags: ['real-time payments', 'instant', 'irrevocable', '24x7'],
        status: 'published'
    },
    {
        id: '201-business-application-header',
        num: 206, level: 200,
        file: '201-business-application-header.md',
        title: 'The Business Application Header: The Envelope Around Every Message',
        summary: "Before a bank reads what a message says, it reads the envelope — who sent it, who it's for, what's inside.",
        minutes: 8,
        tags: ['BAH', 'head.001', 'routing'],
        status: 'published'
    },
    {
        id: '301-pain-family',
        num: 301, level: 300,
        file: '301-pain-family.md',
        title: 'The pain Family: How You Tell Your Bank to Pay',
        summary: "Before any bank talks to any other bank, a customer talks to their own bank. The instruction that starts a payment — and the receipt that answers it.",
        minutes: 9,
        tags: ['pain', 'initiation', 'pain.001', 'pain.002'],
        status: 'published'
    },
    {
        id: '302-pacs-family',
        num: 302, level: 300,
        file: '302-pacs-family.md',
        title: 'The pacs Family: How Banks Pay Each Other',
        summary: "The language banks use to move real money between each other — and to tell each other it worked.",
        minutes: 9,
        tags: ['pacs', 'clearing', 'settlement', 'pacs.008'],
        status: 'published'
    },
    {
        id: '303-camt-family',
        num: 303, level: 300,
        file: '303-camt-family.md',
        title: 'The camt Family: How Banks Tell You What Happened',
        summary: "The money moved — but how do you find out? The reporting side of payments: statements, notifications, and balances that let everyone reconcile what happened.",
        minutes: 8,
        tags: ['camt', 'reporting', 'camt.053', 'camt.054', 'reconciliation'],
        status: 'published'
    },
    {
        id: '304-head-admi',
        num: 304, level: 300,
        file: '304-head-admi.md',
        title: 'head & admi: The Envelope and the Housekeeping',
        summary: "The header that wraps every message with who sent it and who it's for, and the quiet administration that keeps the network running.",
        minutes: 7,
        tags: ['head', 'admi', 'head.001', 'BAH', 'housekeeping'],
        status: 'published'
    },
    {
        id: '305-message-lifecycle',
        num: 305, level: 300,
        file: '305-message-lifecycle.md',
        title: 'The Message Lifecycle: How the Families Move One Payment Together',
        summary: "Watch the families work as one chain — pain, pacs, camt, and the head envelope around them all — carrying a single payment end-to-end.",
        minutes: 8,
        tags: ['message-lifecycle', 'end-to-end', 'EndToEndId', 'UETR'],
        status: 'published'
    },
    {
        id: '301-pacs-008',
        num: 308, level: 300,
        file: '301-pacs-008.md',
        title: 'pacs.008: The Message That Actually Moves the Money',
        summary: "The interbank workhorse, opened field by field — then edit a live one in the Playground.",
        minutes: 11,
        tags: ['pacs.008', 'credit transfer', 'CBPR+'],
        status: 'published'
    },
    {
        id: '302-pain-001',
        num: 307, level: 300,
        file: '302-pain-001.md',
        title: 'pain.001: The Instruction That Starts It All',
        summary: "A deeper, field-by-field read on the pain family's headline message — the customer's first instruction.",
        minutes: 9,
        tags: ['pain.001', 'initiation'],
        status: 'published'
    },
    {
        id: '401-reject',
        num: 401, level: 400,
        file: '401-reject.md',
        title: 'Reject: When a Payment Is Turned Away Before It Settles',
        summary: "The cleanest failure there is — caught before any money moves, answered with a single status message (pacs.002 / pain.002) and a reason code.",
        minutes: 7,
        tags: ['reject', 'RJCT', 'pacs.002', 'pain.002'],
        status: 'published'
    },
    {
        id: '402-return',
        num: 402, level: 400,
        file: '402-return.md',
        title: 'Return: Sending Settled Money Back',
        summary: "Once money has settled, you can't just say no — you physically send it back. The structured U-turn (pacs.004) for a payment that arrived but can't be applied.",
        minutes: 7,
        tags: ['return', 'pacs.004', 'settlement'],
        status: 'published'
    },
    {
        id: '403-recall',
        num: 403, level: 400,
        file: '403-recall.md',
        title: 'Recall: Asking for Your Money Back',
        summary: "The sender realises its own mistake and politely asks for settled funds back (camt.056) — a request the receiver can grant (camt.029 + pacs.004) or refuse.",
        minutes: 8,
        tags: ['recall', 'camt.056', 'camt.029', 'cancellation'],
        status: 'published'
    },
    {
        id: '404-reversal',
        num: 404, level: 400,
        file: '404-reversal.md',
        title: 'Reversal: Undoing a Payment You Had the Right to Make',
        summary: "The originator undoing its own settled payment by right (pacs.007) — most often a direct debit it should never have collected. No permission needed.",
        minutes: 7,
        tags: ['reversal', 'pacs.007', 'direct debit'],
        status: 'published'
    },
    {
        id: '405-investigations',
        num: 405, level: 400,
        file: '405-investigations.md',
        title: 'Investigations: When a Payment Just Goes Quiet',
        summary: "No reject, no return — the payment simply vanished or arrived wrong. The case-management conversation (camt.026/027/028 → camt.029) that hunts down the money.",
        minutes: 8,
        tags: ['investigations', 'camt.027', 'camt.026', 'camt.029', 'case-management'],
        status: 'published'
    },
    {
        id: '401-camt-056-cancellation',
        num: 406, level: 400,
        file: '401-camt-056-cancellation.md',
        title: 'camt.056: Calling a Payment Back',
        summary: "Sometimes a payment is sent in error and must be recalled. The polite, structured way one bank asks another to cancel.",
        minutes: 7,
        tags: ['camt.056', 'cancellation', 'R-transactions'],
        status: 'published'
    },
    {
        id: '501-customer-transfer',
        num: 501, level: 500,
        file: '501-customer-transfer.md',
        title: 'Customer Transfer: One Payment, Every Family, Start to Finish',
        summary: "The simplest real payment there is — one person paying one invoice — walked end-to-end so every family you've learned snaps into a single, traceable journey.",
        minutes: 9,
        tags: ['case-study', 'customer-transfer', 'pain.001', 'pacs.008', 'end-to-end'],
        status: 'published'
    },
    {
        id: '502-payroll',
        num: 502, level: 500,
        file: '502-payroll.md',
        title: 'Payroll: One Instruction, Two Hundred Payments',
        summary: "How a single batch pain.001 fans out into hundreds of independently-routed payments — and how the payer and each payee get told exactly what happened to their slice.",
        minutes: 9,
        tags: ['case-study', 'payroll', 'bulk', 'batch-booking', 'pacs.008'],
        status: 'published'
    },
    {
        id: '503-cross-border-payment',
        num: 503, level: 500,
        file: '503-cross-border-payment.md',
        title: 'Cross-border Payment: When the Two Banks Have Never Met',
        summary: "Correspondent banks, a cover payment, and an FX conversion stretch the simple transfer across borders — without ever losing the thread that keeps it one payment.",
        minutes: 10,
        tags: ['case-study', 'cross-border', 'correspondent', 'pacs.009', 'cover-payment'],
        status: 'published'
    },
    {
        id: '504-treasury',
        num: 504, level: 500,
        file: '504-treasury.md',
        title: 'Treasury: When the Bank Moves Its Own Money',
        summary: "Every customer payment quietly drains one of the bank's accounts and fills another. At day's end someone has to put it all back — the treasury desk moving the bank's own funds (pacs.009) to keep tomorrow's payments flowing.",
        minutes: 9,
        tags: ['case-study', 'treasury', 'liquidity', 'pacs.009', 'nostro'],
        status: 'published'
    },
    {
        id: '505-end-to-end-payment-flow',
        num: 505, level: 500,
        file: '505-end-to-end-payment-flow.md',
        title: 'The End-to-End Payment Flow: Everything, In One Motion',
        summary: "The capstone. One ordinary payment, walked through the whole Library at once — the fundamentals beneath it, the architecture it travels through, every message it becomes, and the exception it narrowly avoids.",
        minutes: 11,
        tags: ['case-study', 'end-to-end', 'capstone', 'lifecycle', 'pacs.008'],
        status: 'published'
    }
];

// Convenience lookups used by markdown.js / app.js
function getArticle(id) { return ACADEMY_TOC.find(a => a.id === id) || null; }
function getArticlesByLevel(level) {
    return ACADEMY_TOC.filter(a => a.level === level).sort((a, b) => a.num - b.num);
}
