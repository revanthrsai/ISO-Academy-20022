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
        relatedNodes: ['payments', 'fx', 'cards'],
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
        relatedNodes: ['foundations', 'trade', 'fx', 'cards'],
        glossaryTerms: ['Clearing', 'Settlement', 'Creditor', 'Debtor', 'CBPR+', 'Reconciliation']
    },

    // =====================================================================
    // FOREIGN EXCHANGE  —  Bob's dirhams become Sweety's rupees
    // =====================================================================
    fx: {
        id: 'fx',
        layer: 'taxonomy',
        title: 'Foreign Exchange',
        icon: '💱',

        // --- Beat 1: The Human Question ---
        humanQuestion: "Bob earns in dirhams and Sweety needs rupees — who actually swaps one for the other, and what stops the agreed rate from quietly falling apart mid-trade?",

        // --- Beat 2: Who feels this ---
        whoFeelsIt: [
            { who: 'Bob and Sweety', pain: "If the two banks disagree on the rate by even a fraction, money goes missing on one end and nobody can say why." },
            { who: 'A bank settling a currency trade across time zones', pain: "It can pay out its side in the morning and discover the other party collapsed before paying back — losing the full amount." },
            { who: 'An operations team', pain: 'When the deal terms live in free text, the two sides disagree on what was agreed and fix it by hand, hours later.' }
        ],

        // --- Beat 3: The Story ---
        story: {
            lead: "Bob is paid in AED. Sweety spends in INR. Somewhere between his bank and hers, one currency has to become the other — a trade that exists for a fraction of a second but has to be agreed, confirmed, and settled perfectly.",
            beats: [
                "Two parties agree: this many dirhams for this many rupees, settling on this date. Both must record exactly the same thing, down to the decimal.",
                "The danger is timing. If one side pays its currency and the other defaults before paying back, the first side simply loses the money — a real disaster that happened, and reshaped the whole market.",
                "So a neutral settlement agent now sits in the middle and refuses to move either currency unless both move together."
            ],
            castPayoff: "You just met the two counterparties, the settlement agent between them, the currency pair, the settlement date — and the simple rule that neither leg moves unless both do."
        },

        // --- Beat 4: How the world solved it ---
        worldProcess: {
            summary: "Both sides confirm the identical trade in a structured message, and a central settlement agent releases each currency only if the other is released at the same instant (payment-versus-payment).",
            participants: [
                { role: 'Counterparty A', plain: "Bob's side of the exchange — wants to sell dirhams.", icon: '🏦' },
                { role: 'Counterparty B', plain: "Sweety's side — wants the rupees.", icon: '🏦' },
                { role: 'Settlement Agent', plain: 'The neutral party that moves both currencies together, or not at all.', icon: '🔁' },
                { role: 'Matching System', plain: 'Checks that both sides confirmed the exact same trade.', icon: '🧮' }
            ],
            flow: ['Counterparty A', 'Trade Agreement', 'Counterparty B', 'Settlement Agent (both legs together)']
        },

        // --- Beat 5: How ISO models it ---
        semanticModel: {
            summary: "An FX trade is modeled as a confirmation both counterparties send: the same trade reference, the same currency pair, the same settlement date. Matching those structured fields is what replaces hours of manual checking.",
            roles: [
                { concept: 'Currency Pair', plain: 'the two currencies being exchanged — AED for INR' },
                { concept: 'Trade Reference', plain: 'a shared id so both sides point to the same deal' },
                { concept: 'Settlement Date', plain: 'the day the converted funds actually change hands' },
                { concept: 'Settlement Agent', plain: 'the neutral party guaranteeing both legs move together' }
            ]
        },

        // --- Beat 6: The message(s) ---
        messages: [
            { code: 'fxtr.014', businessName: 'FX Trade Instruction', plainRole: 'Confirms a currency trade — spot, forward, or option — to the settlement system.' },
            { code: 'fxtr.015', businessName: 'FX Trade Instruction Amendment', plainRole: 'Adjusts the terms of a trade already confirmed.' },
            { code: 'fxtr.016', businessName: 'FX Trade Instruction Cancellation', plainRole: 'Cancels a confirmed trade before it settles.' }
        ],

        // --- Beat 7: The real XML ---
        xml: {
            intro: "Here's the confirmation that pins down Bob's dirhams-to-rupees trade. Each tag is a fact both sides must agree on.",
            code: '<Document>\n  <FXTradeInstruction>\n    <TradeId>FX-2026-001</TradeId>\n    <CcyPair>AED/INR</CcyPair>\n    <SttlmDt>2026-06-24</SttlmDt>\n  </FXTradeInstruction>\n</Document>',
            tagGlossary: [
                { tag: 'TradeId', plain: 'The shared reference for this specific exchange.' },
                { tag: 'CcyPair', plain: 'The two currencies being swapped — AED for INR.' },
                { tag: 'SttlmDt', plain: 'The date the converted funds actually settle.' }
            ]
        },

        // --- Beat 8: What breaks ---
        breaks: [
            { symptom: 'Two banks disagree on a settlement weeks later.', cause: 'The fixing date and reference rate were typed into free text, so each side read them differently.', fix: 'Carry fixing details in structured fields both sides match automatically.' },
            { symptom: 'A bank loses the full value of a trade.', cause: 'It paid its currency leg before the counterparty paid back, and the counterparty failed (settlement risk).', fix: 'Settle through a payment-versus-payment agent that releases both legs together or neither.' }
        ],

        // --- Beat 9: You can now... ---
        earnedSkill: "You can now read an FX trade confirmation and explain why settling both currency legs together is what keeps the money from vanishing.",
        relatedNodes: ['payments', 'cards', 'foundations'],
        glossaryTerms: ['Counterparty', 'Settlement', 'Liquidity']
    },

    // =====================================================================
    // CARDS  —  Sweety taps her card; the money's last mile
    // =====================================================================
    cards: {
        id: 'cards',
        layer: 'taxonomy',
        title: 'Cards',
        icon: '💳',

        // --- Beat 1: The Human Question ---
        humanQuestion: "Sweety taps her card at the pharmacy and it approves in under a second — how did four different companies just agree that fast?",

        // --- Beat 2: Who feels this ---
        whoFeelsIt: [
            { who: 'Sweety at the counter', pain: 'When her card is declined for no clear reason, nobody in the shop can tell her which of four systems said no.' },
            { who: 'The shop owner', pain: 'Switching to a cheaper card processor means buying all-new terminals, because the old ones are locked to one network.' },
            { who: 'A point-of-sale software developer', pain: 'Every card network speaks its own dialect, so each one needs custom integration code written and maintained separately.' }
        ],

        // --- Beat 3: The Story ---
        story: {
            lead: "The money has landed. Sweety taps her card at the pharmacy. In that instant, the payment has to be checked, approved, and later settled — passing through the shop's bank and her own, on systems they never built together.",
            beats: [
                "First, an authorization: is the card real, and is there enough on it? That answer races out and back in under a second.",
                "Later, clearing and settlement actually move the money between the shop's bank and Sweety's bank.",
                "Card networks used to do all this with their own private formats — so every processor needed custom wiring for every network it touched."
            ],
            castPayoff: "You just met the cardholder, the merchant, the acquirer (the shop's bank), and the card issuer (Sweety's bank) — and the authorization that ties them together in a heartbeat."
        },

        // --- Beat 4: How the world solved it ---
        worldProcess: {
            summary: "The same structured approach used for payments now carries card authorizations, so a tap can flow over shared rails instead of one-off formats.",
            participants: [
                { role: 'Cardholder (Sweety)', plain: 'taps the card to pay', icon: '👤' },
                { role: 'Merchant (the pharmacy)', plain: 'reads the card and asks for approval', icon: '🏪' },
                { role: 'Acquirer', plain: "the merchant's bank, which forwards the request", icon: '🏦' },
                { role: 'Card Network', plain: 'routes the request to the right issuer', icon: '🔁' },
                { role: 'Card Issuer', plain: "Sweety's bank, which approves or declines", icon: '🏛️' }
            ],
            flow: ['Sweety taps', 'Pharmacy terminal', 'Acquirer', 'Card Network', "Sweety's Bank (approve)"]
        },

        // --- Beat 5: How ISO models it ---
        semanticModel: {
            summary: "A card payment is modeled as an authorization request: which card, how much, at which merchant — the same who/how-much shape you already know, fitted to a shop counter.",
            roles: [
                { concept: 'Transaction Reference', plain: 'a unique id for this single tap' },
                { concept: 'Card', plain: "Sweety's card number, masked for safety" },
                { concept: 'Amount', plain: 'how much the pharmacy is charging' },
                { concept: 'Merchant', plain: 'who is being paid — the pharmacy' }
            ]
        },

        // --- Beat 6: The message(s) ---
        messages: [
            { code: 'caaa.001', businessName: 'Card Payment Service Request', plainRole: 'The terminal asks the acquirer to authorize the tap.' },
            { code: 'caaa.002', businessName: 'Card Payment Service Response', plainRole: 'The approve/decline answer back to the terminal.' },
            { code: 'cain.001', businessName: 'Acquirer-to-Issuer Authorisation Request', plainRole: "Forwards the request to Sweety's bank via the network." },
            { code: 'cain.002', businessName: 'Acquirer-to-Issuer Authorisation Response', plainRole: "The issuer's decision coming back." }
        ],

        // --- Beat 7: The real XML ---
        xml: {
            intro: "Here's what fires the instant Sweety taps. Every tag is a fact the shop's bank needs to ask hers for an answer.",
            code: '<Document>\n  <CardAuthorisationReq>\n    <TxId>TXN-0001</TxId>\n    <Card><Pan>**** **** **** 1234</Pan></Card>\n    <Amt Ccy="INR">350.00</Amt>\n    <Mrch><Nm>Sweety\'s Pharmacy</Nm></Mrch>\n  </CardAuthorisationReq>\n</Document>',
            tagGlossary: [
                { tag: 'TxId', plain: 'Unique reference for this one tap.' },
                { tag: 'Card / Pan', plain: "Sweety's card number, masked for security." },
                { tag: 'Amt', plain: 'The amount the pharmacy is charging, in rupees.' },
                { tag: 'Mrch', plain: 'The merchant being paid — her pharmacy.' }
            ]
        },

        // --- Beat 8: What breaks ---
        breaks: [
            { symptom: 'A processor needs months to support a new card network.', cause: 'Each network historically used its own proprietary message format.', fix: 'Use the shared ISO 20022 card structure so one integration serves many networks.' },
            { symptom: 'A company can\'t reconcile its card spend automatically.', cause: 'The old card format had no room for invoice or tax detail, so statements are matched by hand.', fix: 'Carry structured purchase detail inside the standardized message.' }
        ],

        // --- Beat 9: You can now... ---
        earnedSkill: "You can now trace a card payment from Sweety's tap all the way to settlement, and name who approves it.",
        relatedNodes: ['payments', 'securities', 'foundations'],
        glossaryTerms: ['Settlement', 'Clearing', 'Counterparty']
    },

    // =====================================================================
    // SECURITIES  —  what Sweety does with what's left over
    // =====================================================================
    securities: {
        id: 'securities',
        layer: 'taxonomy',
        title: 'Securities',
        icon: '📈',

        // --- Beat 1: The Human Question ---
        humanQuestion: "Sweety puts what's left into a small fund — when it pays a dividend months later, who makes sure she actually gets it?",

        // --- Beat 2: Who feels this ---
        whoFeelsIt: [
            { who: 'An investor like Sweety', pain: 'A dividend or a share split can be missed entirely if the news reaches her custodian too late or in a form it misreads.' },
            { who: 'A custodian holding the shares', pain: 'When event terms arrive as free-text notes from many sources, staff re-key and reconcile them by hand, and mistakes slip through.' },
            { who: 'Both sides of a trade', pain: 'If their records of the same trade disagree, settlement fails and the fix is slow and costly.' }
        ],

        // --- Beat 3: The Story ---
        story: {
            lead: "Sweety doesn't spend everything Bob sends. What's left over goes into a small fund — and that modest investment quietly joins one of the most heavily standardized flows in all of finance.",
            beats: [
                "Buying in means settling correctly across a broker, a central depository, and a custodian — each holding a piece of the truth.",
                "Then every event that touches the fund afterward — a dividend, a split — has to reach her custodian accurately and on time.",
                "Mismatched details between custodians used to cause failed settlements and missed deadlines, sometimes costing investors real money they never heard about in time."
            ],
            castPayoff: "You just met the investor, the broker, the central depository, and the custodian — plus the corporate action and the settlement that keep Sweety's small stake honest."
        },

        // --- Beat 4: How the world solved it ---
        worldProcess: {
            summary: "Every participant in the chain gets the same structured view of the trade and of each event, so nothing falls through the cracks between hand-offs.",
            participants: [
                { role: 'Investor (Sweety)', plain: 'owns the stake in the fund', icon: '👤' },
                { role: 'Broker', plain: 'executes the buy or sell order', icon: '💼' },
                { role: 'Central Depository', plain: 'the definitive registry of who owns what', icon: '🏛️' },
                { role: 'Custodian', plain: "safekeeps Sweety's holding and services events", icon: '🏦' }
            ],
            flow: ['Sweety', 'Broker', 'Central Depository', 'Custodian (settled & serviced)']
        },

        // --- Beat 5: How ISO models it ---
        semanticModel: {
            summary: "A corporate-action notification is modeled around the event itself: which event, on which security, with which dates — so a custodian can act on it without re-reading prose.",
            roles: [
                { concept: 'Event Reference', plain: 'a unique id for this specific corporate action' },
                { concept: 'Event Type', plain: 'what kind of event it is — a dividend, a split' },
                { concept: 'Security', plain: 'the exact holding the event applies to' },
                { concept: 'Custodian', plain: 'the party that must act on it for Sweety' }
            ]
        },

        // --- Beat 6: The message(s) ---
        messages: [
            { code: 'SEEV.001', businessName: 'Securities Event Notification', plainRole: "Tells the custodian a corporate action — like a dividend — is happening." },
            { code: 'seev.031', businessName: 'Corporate Action Notification', plainRole: 'Announces the event terms and key dates in structured fields.' },
            { code: 'sese.023', businessName: 'Securities Settlement Instruction', plainRole: 'Instructs delivery or receipt of the securities themselves.' }
        ],

        // --- Beat 7: The real XML ---
        xml: {
            intro: "This is what Sweety's custodian receives when her fund pays a dividend. The tags name the event, not free-text prose.",
            code: '<Document>\n  <SecuritiesEventNotification>\n    <EventId>EVT001</EventId>\n    <EventType>DIVD</EventType>\n    <SecurityId>US0378331005</SecurityId>\n  </SecuritiesEventNotification>\n</Document>',
            tagGlossary: [
                { tag: 'EventId', plain: 'Unique reference for this corporate action.' },
                { tag: 'EventType', plain: 'The kind of event — DIVD means a dividend.' },
                { tag: 'SecurityId', plain: 'The exact security the event applies to.' }
            ]
        },

        // --- Beat 8: What breaks ---
        breaks: [
            { symptom: 'An investor misses a dividend or a vote.', cause: 'Event terms arrived as free text and were parsed too slowly or wrongly.', fix: 'Carry the event in structured fields every custodian reads the same way.' },
            { symptom: 'A trade fails to settle.', cause: 'Two intermediaries recorded the same trade with mismatched details.', fix: 'Match structured settlement instructions instead of narrative blocks.' }
        ],

        // --- Beat 9: You can now... ---
        earnedSkill: "You can now read a corporate action notification the way a custodian would, and say why structured event data prevents missed dividends.",
        relatedNodes: ['fx', 'payments', 'foundations'],
        glossaryTerms: ['Settlement', 'Reconciliation', 'Counterparty']
    },

    // =====================================================================
    // TRADE FINANCE  —  where Bob's salary actually came from
    // =====================================================================
    trade: {
        id: 'trade',
        layer: 'taxonomy',
        title: 'Trade Finance',
        icon: '🚢',

        // --- Beat 1: The Human Question ---
        humanQuestion: "Two companies on opposite sides of the world, who've never met — how does either trust the other to pay, or to ship, first?",

        // --- Beat 2: Who feels this ---
        whoFeelsIt: [
            { who: 'A seller shipping goods abroad', pain: "Send the cargo before you're paid and a stranger overseas could simply never pay." },
            { who: 'A buyer paying in advance', pain: 'Pay first and the goods might never arrive, or arrive wrong.' },
            { who: 'The banks in the middle', pain: 'Slow, paper-heavy guarantees and inconsistent terms stall shipments for days and tie up cash.' }
        ],

        // --- Beat 3: The Story ---
        story: {
            lead: "Step back further. Bob's salary exists because the company he works for trades internationally. This month's payroll was only possible because a shipment left port after a bank-backed guarantee changed hands between a buyer and seller who may never meet.",
            beats: [
                "Neither side trusts the other to go first — so a bank steps in and promises to pay the seller once proof of shipment is presented.",
                "That promise, a letter of credit, turns 'trust a stranger' into 'trust a bank'.",
                "Done on paper, it crawled; done as structured data, banks and companies on both sides process it consistently — and the capital behind Bob's paycheck keeps moving."
            ],
            castPayoff: "You just met the applicant (the buyer), the beneficiary (the seller), the issuing bank, and the advising bank — and the guarantee that lets trade happen between strangers."
        },

        // --- Beat 4: How the world solved it ---
        worldProcess: {
            summary: "A bank issues a structured guarantee to the seller on the buyer's behalf; on proof of a compliant shipment, it pays — turning a paper ritual into machine-readable data.",
            participants: [
                { role: "Applicant (Bob's employer)", plain: 'the buyer who asks its bank to guarantee payment', icon: '🧑‍💼' },
                { role: 'Beneficiary (the supplier)', plain: 'the seller protected by the guarantee', icon: '🧑‍💼' },
                { role: 'Issuing Bank', plain: "the buyer's bank that makes the promise", icon: '🏦' },
                { role: 'Advising Bank', plain: 'the seller-side bank that verifies and relays it', icon: '🏛️' }
            ],
            flow: ["Bob's Employer", 'Issuing Bank', 'Advising Bank', 'Supplier (ships on guarantee)']
        },

        // --- Beat 5: How ISO models it ---
        semanticModel: {
            summary: "A letter of credit is modeled as an undertaking: who is guaranteed, by whom, for how much — the trust relationship written as structured data both banks can process.",
            roles: [
                { concept: 'Undertaking Reference', plain: 'a unique id for this guarantee' },
                { concept: 'Applicant', plain: "the buyer requesting it — Bob's employer" },
                { concept: 'Beneficiary', plain: 'the seller it protects — the supplier' },
                { concept: 'Amount', plain: 'the value the guarantee covers' }
            ]
        },

        // --- Beat 6: The message(s) ---
        messages: [
            { code: 'tsrv.001', businessName: 'Undertaking Issuance', plainRole: 'Issues the letter of credit or guarantee with its terms.' },
            { code: 'tsrv.002', businessName: 'Undertaking Issuance Advice', plainRole: 'Relays the issued guarantee to the seller via their bank.' },
            { code: 'tsrv.013', businessName: 'Undertaking Demand', plainRole: 'Claims payment under the guarantee when terms are met.' }
        ],

        // --- Beat 7: The real XML ---
        xml: {
            intro: "This is the bank-backed guarantee behind Bob's paycheck — the trust between two strangers, written down.",
            code: '<Document>\n  <UndertakingIssuance>\n    <UndertakingId>LC-2026-001</UndertakingId>\n    <Applcnt><Nm>Bob\'s Employer Corp</Nm></Applcnt>\n    <Bnfcry><Nm>Overseas Supplier Ltd</Nm></Bnfcry>\n    <Amt Ccy="USD">250000.00</Amt>\n  </UndertakingIssuance>\n</Document>',
            tagGlossary: [
                { tag: 'UndertakingId', plain: 'Unique reference for this letter of credit.' },
                { tag: 'Applcnt', plain: "The buyer requesting it — Bob's employer." },
                { tag: 'Bnfcry', plain: 'The seller it protects — the overseas supplier.' },
                { tag: 'Amt', plain: 'The value the guarantee covers.' }
            ]
        },

        // --- Beat 8: What breaks ---
        breaks: [
            { symptom: 'A shipment stalls in port for days.', cause: 'Paper guarantees and inconsistent terms passed slowly between banks.', fix: 'Exchange the undertaking as structured data both banks process automatically.' },
            { symptom: 'A valid claim is rejected on a technicality.', cause: 'A spelling or date mismatch between documents and the credit terms.', fix: 'Match structured trade datasets against the credit terms instead of reading by eye.' }
        ],

        // --- Beat 9: You can now... ---
        earnedSkill: "You can now describe how a letter of credit lets two strangers trade across borders — and where Bob's salary really came from.",
        relatedNodes: ['payments', 'fx', 'foundations'],
        glossaryTerms: ['Settlement', 'Counterparty']
    }

    // -----------------------------------------------------------------------
    // All six journey chapters are now built (foundations + the five domains).
    // Phase 7 will add the gap nodes: metamodel, networks, routing/cover, uetr,
    // payload (head.001). Copy the schema template at the top for each.
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
