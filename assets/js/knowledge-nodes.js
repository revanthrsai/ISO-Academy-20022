// ===========================================================================
// knowledge-nodes.js  —  ISO 20022 Academy Knowledge Graph (Phase 2)
// ===========================================================================
//
// WHAT THIS IS
//   The academy's content, restructured from "lists of messages" into a GRAPH
//   of knowledge NODES. Every node is shaped like the 9-beat Lesson Spine
//   defined in PHILOSOPHY.md, so any page can render any node the same way.
//
// WHY IT'S A SEPARATE, ADDITIVE FILE (Phase 2 rule: "app runs unchanged")
//   Nothing references `knowledgeNodes` yet. It loads alongside data.js and
//   sits idle until Phases 3-7 wire it into app.js / ui.js. Dropping it in
//   cannot break the live site.
//
//   To activate: add  <script src="assets/js/knowledge-nodes.js"></script>
//   in index.html AFTER data.js and BEFORE ui.js. (Adding the tag changes no
//   behavior on its own — the object is just available on `window`.)
//   Alternatively, paste this whole block at the end of data.js.
//
// THE LAW (PHILOSOPHY.md): every node begins with a HUMAN QUESTION; raw XML
//   never appears before beat 7. The field order below mirrors the spine so
//   it's obvious if a beat is missing.
//
// ---------------------------------------------------------------------------
// NODE SCHEMA  (copy this template for every new node in Phases 3-7)
// ---------------------------------------------------------------------------
//   id:            unique slug, e.g. 'payments'
//   layer:         IA layer this node lives in (see IA_LAYERS below)
//   title:         short human title (NO acronyms)
//   icon:          emoji used by existing components (kept for visual parity)
//
//   --- Beat 1 --- humanQuestion: ONE sentence a non-banker would ask aloud.
//                  No tag, no acronym, no "XML/schema/message". (Acceptance test!)
//   --- Beat 2 --- whoFeelsIt: [{ who, pain }]  — who hurt before the fix existed
//   --- Beat 3 --- story: { lead, beats:[...], castPayoff }  — Bob & Sweety canon
//   --- Beat 4 --- worldProcess: { summary, participants:[{role, plain, icon}],
//                                  flow:[ '...' ] }  — plain-English process
//   --- Beat 5 --- semanticModel: { summary, roles:[{ concept, plain }] }  — no tags
//   --- Beat 6 --- messages: [{ code, businessName, plainRole }]  — links DATA.messages
//   --- Beat 7 --- xml: { intro, code, tagGlossary:[{ tag, plain }] }  — FIRST raw XML
//   --- Beat 8 --- breaks: [{ symptom, cause, fix }]  — concrete real failures
//   --- Beat 9 --- earnedSkill: one plain sentence of what they can now do
//                  relatedNodes: [ids]   glossaryTerms: [terms]
// ---------------------------------------------------------------------------

// The 7-layer information architecture (Google review). Nodes descend from
// human trust down to technical rules — the same shape as the Lesson Spine.
const IA_LAYERS = {
    concept:    { order: 1, title: 'The Concept',    blurb: 'Why money moves — value, trust, clearing.' },
    dictionary: { order: 2, title: 'The Dictionary', blurb: 'Syntax-independent meaning — Debtor, Creditor, Agent, Amount.' },
    taxonomy:   { order: 3, title: 'The Taxonomy',   blurb: 'The domain families — pain, pacs, camt, sese, …' },
    networks:   { order: 4, title: 'The Networks',   blurb: 'Regional dialects — CBPR+, TARGET2, FedNow, CHAPS.' },
    physics:    { order: 5, title: 'The Physics',    blurb: 'Routing, hops, cover payments, UETR tracking.' },
    payload:    { order: 6, title: 'The Payload',    blurb: 'The envelope — the Business Application Header.' },
    rules:      { order: 7, title: 'The Rules',      blurb: 'Validation, character sets, structured addresses.' }
};

// ---------------------------------------------------------------------------
// THE NODES
//   Phase 2 ships two fully-built reference nodes (Foundations, Payments).
//   Phases 3-7 add the rest by copying the schema template above.
// ---------------------------------------------------------------------------
const knowledgeNodes = {

    // =====================================================================
    // FOUNDATIONS  —  the shared language under every step of Bob's transfer
    // =====================================================================
    foundations: {
        id: 'foundations',
        layer: 'dictionary',
        title: 'The Shared Language',
        icon: '🧱',

        // --- Beat 1: The Human Question ---
        humanQuestion: "Before Bob's bank and Sweety's bank move a single dollar, how do they make sure they're even talking about the same thing?",

        // --- Beat 2: Who feels this ---
        whoFeelsIt: [
            { who: 'A bank building a new payment system', pain: 'Without a shared vocabulary, every team reinvents how to write a name, an amount, an account — and none of them agree.' },
            { who: 'Anyone migrating off the old SWIFT MT format', pain: 'Mapping legacy messages becomes guesswork done one field at a time, and data quietly falls on the floor.' },
            { who: 'Sweety, waiting at the other end', pain: "If the two banks disagree on what a field means, her money is delayed or her name comes through wrong." }
        ],

        // --- Beat 3: The Story ---
        story: {
            lead: "Bob is about to send Sweety $400. It feels like one tap. But before his bank and her bank can begin that conversation, they have to agree on the basic words for it.",
            beats: [
                "Who is sending? Who is receiving? How much, and in what currency? What account, identified how?",
                "Those aren't technical questions yet — they're the same questions a shopkeeper asks before writing a receipt.",
                "ISO 20022 wrote those questions down once, in a single shared dictionary, so that every bank in the world fills in the same blanks the same way."
            ],
            castPayoff: "You just met the four words every message in this academy is built from: a party who sends, a party who receives, an amount, and an identifier that ties it all together."
        },

        // --- Beat 4: How the world solved it ---
        worldProcess: {
            summary: "Instead of each bank speaking its own dialect, everyone agrees on one dictionary of meanings first, then on how to write those meanings down.",
            participants: [
                { role: 'Standards Body (ISO)', plain: 'Keeps the one shared dictionary everyone draws from.', icon: '🏛️' },
                { role: 'Financial Institution', plain: "Bob's bank and Sweety's bank — they speak the shared language.", icon: '🏦' },
                { role: 'Implementer / Vendor', plain: 'Builds the software that reads and writes the messages.', icon: '🧑‍💻' }
            ],
            flow: ['Shared Dictionary (meanings)', 'Message Definition (structure)', 'XML Schema (how it\'s written)', "Bob's & Sweety's Banks (who use it)"]
        },

        // --- Beat 5: How ISO models it (concepts, not tags) ---
        semanticModel: {
            summary: "ISO 20022 separates three layers so the meaning never depends on how it's written: what it MEANS (conceptual) → how it's STRUCTURED (logical) → how it's WRITTEN (physical, e.g. XML). Change XML for something else someday and the meanings stay intact.",
            roles: [
                { concept: 'Debtor', plain: 'the party whose account the money leaves — here, Bob' },
                { concept: 'Creditor', plain: 'the party whose account the money lands in — Sweety' },
                { concept: 'Amount', plain: 'how much, and in which currency' },
                { concept: 'Agent', plain: 'a bank acting for a party (a "Debtor Agent" is the sending bank)' },
                { concept: 'Identifier', plain: 'a reference that lets everyone point to the same transaction' }
            ]
        },

        // --- Beat 6: The message(s) ---
        // Foundations teaches the shared SHAPE rather than one specific message.
        messages: [],

        // --- Beat 7: The real XML (FIRST appearance, fully explained) ---
        xml: {
            intro: "Here, finally, is how those concepts get written down. Notice it's just the words you already met — sender, receiver, amount — wearing tag names.",
            code: '<Document>\n  <PmtInf>\n    <Dbtr><Nm>Bob</Nm></Dbtr>\n    <Cdtr><Nm>Sweety</Nm></Cdtr>\n    <Amt Ccy="USD">400.00</Amt>\n  </PmtInf>\n</Document>',
            tagGlossary: [
                { tag: 'Dbtr', plain: 'Debtor — the party sending the money (Bob).' },
                { tag: 'Cdtr', plain: 'Creditor — the party receiving it (Sweety).' },
                { tag: 'Amt', plain: 'Amount — how much, with a currency code (USD).' }
            ]
        },

        // --- Beat 8: What breaks ---
        breaks: [
            { symptom: 'Rich data arrives but disappears downstream.', cause: 'A bank treats ISO 20022 as "SWIFT in XML" and runs it through a legacy core that only holds the old short fields.', fix: 'Keep the full structured data end-to-end instead of truncating to legacy limits.' },
            { symptom: "A learner thinks ISO 20022 is just a file format.", cause: 'Meeting the tags before the meaning.', fix: 'Remember the tag is only the physical skin over a shared meaning — the whole point of the three layers.' }
        ],

        // --- Beat 9: You can now... ---
        earnedSkill: "You can now spot the same four building blocks — sender, receiver, amount, identifier — inside any ISO 20022 message you ever see.",
        relatedNodes: ['payments', 'metamodel', 'history-iso'],
        glossaryTerms: ['Debtor', 'Creditor', 'XML Schema', 'MT Format', 'Settlement']
    },

    // =====================================================================
    // PAYMENTS & CASH MANAGEMENT  —  Bob hits send; follow the $400
    // =====================================================================
    payments: {
        id: 'payments',
        layer: 'taxonomy',
        title: 'Payments & Cash Management',
        icon: '💸',

        // --- Beat 1: The Human Question ---
        humanQuestion: "Bob taps send — where does his $400 actually go before Sweety sees it, and how does anyone know it arrived?",

        // --- Beat 2: Who feels this ---
        whoFeelsIt: [
            { who: 'Bob, staring at a "pending" screen', pain: 'The payment looks instant but isn\'t — and he has no idea which of several banks is holding it up.' },
            { who: "A corporate finance team", pain: 'When the payment reason is crammed into free text, they reconcile it against invoices by hand.' },
            { who: 'A compliance officer', pain: "A name truncated to fit an old 35-character field trips a false sanctions match and freezes the transfer." }
        ],

        // --- Beat 3: The Story ---
        story: {
            lead: "Bob opens his banking app and sends $400 to Sweety. On his screen it's one tap. Behind the glass, that instruction has to pass from hand to hand without anyone dropping a detail.",
            beats: [
                "It leaves Bob's bank, may cross an intermediary, runs through a clearing system, and finally reaches Sweety's bank — each one needing the exact same facts, written the exact same way.",
                "Before ISO 20022, that handoff was a minefield of bank-specific formats and ambiguous free text; one misread field could delay Bob's money for days.",
                "Once it lands, the story isn't over: Sweety's bank still has to tell her it arrived, and keep her balance in sync — that's the 'cash management' half of the job."
            ],
            castPayoff: "You just lived through Debtor (Bob), Debtor Agent (his bank), Clearing System, Creditor Agent (Sweety's bank), and Creditor (Sweety) — plus the statement and notification that confirm it all."
        },

        // --- Beat 4: How the world solved it ---
        worldProcess: {
            summary: "One common language carries the money (pain → pacs), and a matching set of statements and alerts tracks it afterward (camt).",
            participants: [
                { role: 'Debtor (Bob)', plain: 'starts the payment by instructing his bank', icon: '👤' },
                { role: "Debtor Agent (Bob's Bank)", plain: 'sends the interbank transfer', icon: '🏦' },
                { role: 'Clearing System', plain: 'routes and reconciles between banks', icon: '🔁' },
                { role: 'Intermediary Agent', plain: 'an optional correspondent bank in the middle', icon: '🏛️' },
                { role: "Creditor Agent (Sweety's Bank)", plain: 'credits the final funds', icon: '🏦' },
                { role: 'Creditor (Sweety)', plain: 'receives the money', icon: '👤' }
            ],
            flow: ['Bob', "Bob's Bank", 'Clearing System', "Sweety's Bank", 'Sweety']
        },

        // --- Beat 5: How ISO models it ---
        semanticModel: {
            summary: "ISO 20022 splits the work into three message families by WHO is talking to WHOM: customer↔bank (pain), bank↔bank (pacs), and bank→customer reporting (camt).",
            roles: [
                { concept: 'Debtor / Creditor', plain: 'the people at each end — Bob and Sweety' },
                { concept: 'Debtor Agent / Creditor Agent', plain: 'their banks, acting on their behalf' },
                { concept: 'Intermediary Agent', plain: 'any bank that passes the payment along the chain' },
                { concept: 'End-to-End Identifier', plain: "Bob's own reference, untouched all the way to Sweety" }
            ]
        },

        // --- Beat 6: The message(s) ---
        messages: [
            { code: 'PAIN.001', businessName: 'Customer Credit Transfer Initiation', plainRole: 'Bob tells his bank: please send this.' },
            { code: 'PAIN.002', businessName: 'Customer Payment Status Report', plainRole: "Bob's bank tells him: accepted / rejected / pending." },
            { code: 'PACS.008', businessName: 'FI-to-FI Customer Credit Transfer', plainRole: 'The bank-to-bank message that actually moves the $400.' },
            { code: 'PACS.002', businessName: 'Payment Status Report', plainRole: 'Bank-to-bank status of the transfer.' },
            { code: 'PACS.004', businessName: 'Payment Return', plainRole: 'Sends the money back if it can\'t be delivered.' },
            { code: 'CAMT.054', businessName: 'Debit/Credit Notification', plainRole: "Sweety's bank pings her: money just landed." },
            { code: 'CAMT.053', businessName: 'Bank-to-Customer Statement', plainRole: 'The end-of-day statement showing it settled.' }
        ],

        // --- Beat 7: The real XML ---
        xml: {
            intro: "This is the actual bank-to-bank message for Bob's $400. Every tag is just a role you already met.",
            code: '<Document>\n  <FIToFICstmrCdtTrf>\n    <CdtTrfTxInf>\n      <PmtId><EndToEndId>BOB-TO-SWEETY-001</EndToEndId></PmtId>\n      <Amt Ccy="USD">400.00</Amt>\n      <Dbtr><Nm>Bob</Nm></Dbtr>\n      <Cdtr><Nm>Sweety</Nm></Cdtr>\n    </CdtTrfTxInf>\n  </FIToFICstmrCdtTrf>\n</Document>',
            tagGlossary: [
                { tag: 'FIToFICstmrCdtTrf', plain: 'Financial-Institution-to-Financial-Institution Customer Credit Transfer — the bank-to-bank envelope.' },
                { tag: 'EndToEndId', plain: "Bob's own reference for this payment, meant to survive untouched all the way to Sweety." },
                { tag: 'Amt', plain: 'The $400, with its currency.' },
                { tag: 'Dbtr / Cdtr', plain: 'Debtor (Bob, paying) and Creditor (Sweety, paid).' }
            ]
        },

        // --- Beat 8: What breaks ---
        breaks: [
            { symptom: 'A clean payment freezes in compliance review.', cause: "Sweety's name was truncated to fit a legacy 35-character field, so screening flagged a partial match.", fix: 'Carry the full structured name and address that ISO 20022 allows.' },
            { symptom: "Bob's reference is useless for tracing the payment.", cause: 'An EndToEndId was filled with a placeholder like "NOT PROVIDED" instead of a real reference.', fix: 'Always populate a genuine, unique end-to-end reference and never alter it in transit.' },
            { symptom: 'A 2026 cross-border payment is rejected outright.', cause: "The address was unstructured free text, which the structured-address mandate no longer accepts.", fix: 'Use structured or hybrid address fields (town and country in their own tags).' }
        ],

        // --- Beat 9: You can now... ---
        earnedSkill: "You can now read a pacs.008 credit transfer and a camt.054 notification — and say exactly who's paying whom, and how the arrival gets confirmed.",
        relatedNodes: ['foundations', 'fx', 'networks', 'uetr'],
        glossaryTerms: ['Clearing', 'Settlement', 'Creditor', 'Debtor', 'CBPR+', 'Reconciliation']
    }

    // -----------------------------------------------------------------------
    // TODO (Phase 3+): foundations is also the entry to `metamodel` (dictionary
    // layer). Phase 4 adds history-* story nodes. Phase 5 adds securities, cards,
    // trade, fx. Phase 7 adds the gap nodes: metamodel, networks, routing/cover,
    // uetr, payload (head.001). Copy the schema template at the top for each.
    // -----------------------------------------------------------------------
};

// ---------------------------------------------------------------------------
// Helpers (mirrors the style of data.js helpers; safe no-ops until wired in)
// ---------------------------------------------------------------------------

// Fetch a single knowledge node by id.
function getKnowledgeNode(id) {
    return knowledgeNodes[id] || null;
}

// Resolve a node's relatedNodes ids into the actual node objects (skips any
// not yet built, so partial graphs don't throw during Phases 3-7).
function getRelatedNodes(id) {
    const node = getKnowledgeNode(id);
    if (!node || !Array.isArray(node.relatedNodes)) return [];
    return node.relatedNodes.map(getKnowledgeNode).filter(Boolean);
}

// Resolve a node's message codes into full message records from DATA.messages
// (beat 6 → beat 7 bridge). Returns [] gracefully if DATA isn't present.
function getNodeMessages(id) {
    const node = getKnowledgeNode(id);
    if (!node || !Array.isArray(node.messages)) return [];
    if (typeof getMessageByCode !== 'function') return node.messages;
    return node.messages.map(m => ({
        ...m,
        record: getMessageByCode(m.code) || null
    }));
}

// All nodes that live in a given IA layer, e.g. layerNodes('taxonomy').
function getNodesByLayer(layer) {
    return Object.values(knowledgeNodes).filter(n => n.layer === layer);
}

// Lightweight self-check against the Lesson Spine + the beat-1 acceptance test.
// Call validateKnowledgeGraph() in the console during authoring; it logs any
// node that violates the law (raw XML promise can't be auto-checked, but the
// "no tag/acronym/XML in the human question" rule can).
function validateKnowledgeGraph() {
    const required = ['humanQuestion', 'whoFeelsIt', 'story', 'worldProcess', 'semanticModel', 'messages', 'xml', 'breaks', 'earnedSkill'];
    const banned = /\bxml\b|\bschema\b|\bmessage\b|<[a-z]/i;
    const issues = [];
    Object.values(knowledgeNodes).forEach(n => {
        required.forEach(f => { if (!(f in n)) issues.push(`${n.id}: missing beat "${f}"`); });
        if (n.humanQuestion && banned.test(n.humanQuestion)) {
            issues.push(`${n.id}: humanQuestion fails beat-1 test (contains a tag/acronym/"XML/schema/message")`);
        }
    });
    if (issues.length) console.warn('[knowledge-graph] ' + issues.length + ' issue(s):\n' + issues.join('\n'));
    else console.log('[knowledge-graph] all nodes pass the Lesson Spine self-check ✓');
    return issues;
}

// Expose on window so app.js / ui.js can pick these up in later phases without
// a build step (matches how data.js exposes its globals).
if (typeof window !== 'undefined') {
    window.knowledgeNodes = knowledgeNodes;
    window.IA_LAYERS = IA_LAYERS;
    window.getKnowledgeNode = getKnowledgeNode;
    window.getRelatedNodes = getRelatedNodes;
    window.getNodeMessages = getNodeMessages;
    window.getNodesByLayer = getNodesByLayer;
    window.validateKnowledgeGraph = validateKnowledgeGraph;
}
