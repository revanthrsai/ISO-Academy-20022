// Data Module - Loads all content from JSON files

const DATA = {
    messages: {
        'CAMT': [
            {
                code: 'CAMT.052',
                family: 'CAMT',
                title: 'CAMT.052',
                subtitle: 'Bank to Customer - Report',
                purpose: 'Interim report on account transactions and balances before monthly statement',
                direction: 'Bank → Customer',
                category: 'Cash Management',
                useCases: ['Interim Reports', 'Daily Balance Reports', 'Account Summaries'],
                fields: ['Rpt (Report)', 'Bal (Balance)', 'Ntry (Entries)', 'TtlCdtDbtAmt'],
                example: '<Document>\n  <BkToCstmrReport>\n    <Rpt>\n      <Acct><IBAN>DE89370400440532013000</IBAN></Acct>\n      <Bal>9500.00</Bal>\n    </Rpt>\n  </BkToCstmrReport>\n</Document>',
                node: {
                    story: "Mid-morning, Sweety's treasurer wants to know what landed overnight — not at month-end, now. camt.052 is the intraday read on the account.",
                    whyExists: "Businesses can't wait for the end-of-day statement to reconcile. An interim report gives a running view of balances and entries during the day.",
                    createdBy: "The account servicer — Sweety's bank.",
                    receivedBy: "The account owner or their treasury / ERP system.",
                    flow: ['Account Servicer (Bank)', 'Interim Report', 'Account Owner / Treasury'],
                    businessComponents: [
                        { name: 'Report', plain: 'A snapshot of activity so far today' },
                        { name: 'Balance', plain: 'Running balance at the moment of the report' },
                        { name: 'Entries', plain: 'Individual movements booked since the last report' }
                    ],
                    messageComponents: [
                        { tag: 'Rpt', plain: "Report — the container for this account's intraday view" },
                        { tag: 'Bal', plain: 'Balance figures' },
                        { tag: 'Ntry', plain: 'Each booked entry, with NtryRef' }
                    ],
                    breaks: [
                        { symptom: 'Duplicate entries across two interim reports', cause: 'Pulling overlapping time windows without de-duplicating', fix: 'Reconcile on NtryRef, not on amount + time' }
                    ],
                    interview: [
                        { q: "What's the difference between camt.052, camt.053 and camt.054?", a: '052 is the intraday / interim report, 053 is the end-of-day statement (the legal record), and 054 is a real-time debit/credit notification of a single movement.' }
                    ],
                    related: ['CAMT.053', 'CAMT.054']
                }
            },
            {
                code: 'CAMT.053',
                family: 'CAMT',
                title: 'CAMT.053',
                subtitle: 'Bank to Customer - Statement',
                purpose: 'Provides complete account statement with opening/closing balances and all transactions',
                direction: 'Bank → Customer',
                category: 'Cash Management',
                useCases: ['Monthly Statements', 'Account Reconciliation', 'Balance Verification', 'Audit Reports'],
                fields: ['Stmt (Statement)', 'Bal (Balance)', 'OpeningBalance', 'ClosingBalance'],
                example: '<Document>\n  <BkToCstmrStmt>\n    <Stmt>\n      <AcctStmt>\n        <Acct><IBAN>DE89370400440532013000</IBAN></Acct>\n        <OpeningBalance>10000.00</OpeningBalance>\n        <ClosingBalance>10000.00</ClosingBalance>\n      </AcctStmt>\n    </Stmt>\n  </BkToCstmrStmt>\n</Document>',
                node: {
                    story: "At the end of the day, Sweety's bank closes the books and sends the official statement: opening balance, every transaction, closing balance. This is the record auditors trust.",
                    whyExists: 'Reconciliation and audit need one authoritative end-of-day record per account — structured, complete, machine-readable. camt.053 is the ISO 20022 replacement for the old MT940 (the legacy end-of-day statement).',
                    createdBy: 'The account servicer (the bank), once per business day.',
                    receivedBy: 'The account owner / corporate ERP, for automatic reconciliation.',
                    flow: ['Bank closes books', 'camt.053 Statement', 'Corporate ERP reconciles'],
                    businessComponents: [
                        { name: 'Statement', plain: "The day's complete account record" },
                        { name: 'Opening / Closing Balance', plain: 'Where the account started and ended' },
                        { name: 'Entries', plain: 'Every booked transaction, with references' }
                    ],
                    messageComponents: [
                        { tag: 'Stmt', plain: 'Statement container' },
                        { tag: 'Bal (OPBD / CLBD)', plain: 'Opening and closing booked balances' },
                        { tag: 'Ntry', plain: 'Booked entries with NtryRef and AcctSvcrRef' }
                    ],
                    validation: [
                        { tag: '<Bal>', rule: 'Opening + sum(entries) must equal closing balance', fails: "A closing balance that doesn't foot — usually a missing or duplicated entry" }
                    ],
                    breaks: [
                        { symptom: "ERP won't auto-reconcile", cause: 'Entries lack structured references (EndToEndId / AcctSvcrRef), forcing manual matching', fix: 'Ensure each entry carries its original payment references end to end' }
                    ],
                    interview: [
                        { q: 'Which MT message did camt.053 replace, and why is the MX version better?', a: 'It replaces the MT940 statement. The MX version carries structured balances and references, so reconciliation can be fully automated instead of parsing free text.' },
                        { q: 'camt.053 vs camt.052?', a: '053 is the definitive end-of-day statement; 052 is an interim, intraday view that is not the legal record.' }
                    ],
                    related: ['CAMT.052', 'CAMT.054', 'PACS.008']
                }
            },
            {
                code: 'CAMT.054',
                family: 'CAMT',
                title: 'CAMT.054',
                subtitle: 'Bank to Customer - Debit/Credit Notification',
                purpose: 'Notifies customers about debit or credit entries on their accounts in real-time',
                direction: 'Bank → Customer',
                category: 'Cash Management',
                useCases: ['Salary Credits', 'Refunds', 'Settlements', 'Interest Payments'],
                fields: ['Amt (Amount)', 'CdtDbtInd (Credit/Debit)', 'BkgDt (Booking Date)', 'NtryRef'],
                example: '<Document>\n  <BkToCstmrDebitCreditNotifctn>\n    <Notfctn>\n      <Acct><Id><IBAN>DE89370400440532013000</IBAN></Id></Acct>\n      <Ntry>\n        <Amt>1000.00</Amt>\n        <CdtDbtInd>CRDT</CdtDbtInd>\n        <BkgDt>2024-06-18</BkgDt>\n      </Ntry>\n    </Notfctn>\n  </BkToCstmrDebitCreditNotifctn>\n</Document>',
                node: {
                    story: "The instant Bob's $400 hits Sweety's account, her bank fires a notification: credit, 400, here's the reference. She doesn't wait for the statement to know the money arrived.",
                    whyExists: 'Real-time reconciliation. A single credit or debit needs to be announced the moment it books, so the receiver can release goods, mark an invoice paid, or update cash position immediately.',
                    createdBy: "The account servicer (creditor's bank), at the moment of booking.",
                    receivedBy: 'The account owner — the beneficiary or their treasury system.',
                    flow: ['Funds book at Creditor Agent', 'camt.054 Notification', 'Beneficiary updates ledger'],
                    businessComponents: [
                        { name: 'Notification', plain: 'A heads-up about one movement, not a full statement' },
                        { name: 'Amount', plain: 'How much moved' },
                        { name: 'Credit / Debit Indicator', plain: 'Money in or money out' }
                    ],
                    messageComponents: [
                        { tag: 'Ntfctn', plain: 'Notification container' },
                        { tag: 'Amt', plain: 'Amount booked' },
                        { tag: 'CdtDbtInd', plain: 'CRDT = credit, DBIT = debit' },
                        { tag: 'BkgDt', plain: 'Booking date' }
                    ],
                    validation: [
                        { tag: '<CdtDbtInd>', rule: 'Must be CRDT or DBIT', fails: 'Free text or a wrong indicator breaks downstream reconciliation logic' }
                    ],
                    breaks: [
                        { symptom: 'Beneficiary credits the wrong invoice', cause: "Remittance reference not carried through, so the notification can't be tied to the open item", fix: 'Preserve EndToEndId / structured remittance from the originating payment' }
                    ],
                    interview: [
                        { q: 'When would you use camt.054 instead of camt.053?', a: 'camt.054 notifies a single debit/credit in near real time; camt.053 is the batched end-of-day statement. Use 054 when you need to react to one movement immediately.' }
                    ],
                    related: ['CAMT.053', 'PACS.008']
                }
            },
            {
                code: 'CAMT.060',
                family: 'CAMT',
                title: 'CAMT.060',
                subtitle: 'Account Management - Information Request',
                purpose: 'Customers request information about their accounts, balances, or transaction history',
                direction: 'Customer → Bank',
                category: 'Cash Management',
                useCases: ['Account Inquiry', 'Balance Request', 'Transaction History Query'],
                fields: ['ReqId (Request ID)', 'AcctId (Account ID)', 'QueryType', 'DateRange'],
                example: '<Document>\n  <AcctMgmtInfoRequest>\n    <ReqId>REQ001</ReqId>\n    <AcctId>DE89370400440532013000</AcctId>\n  </AcctMgmtInfoRequest>\n</Document>',
                node: {
                    story: "Sweety's treasury system needs yesterday's detail again — so it asks the bank for it, instead of waiting for the next scheduled file.",
                    whyExists: 'Account owners sometimes need to pull a report or statement on demand. camt.060 is the request that triggers the bank to send a camt.052 / 053 / 054.',
                    createdBy: 'The account owner (customer / treasury).',
                    receivedBy: 'The account servicer (the bank).',
                    flow: ['Account Owner', 'camt.060 Request', 'Bank responds with camt.05x'],
                    businessComponents: [
                        { name: 'Request', plain: 'The ask: which report, which account, which window' },
                        { name: 'Account', plain: 'Which account it concerns' }
                    ],
                    messageComponents: [
                        { tag: 'ReqId', plain: 'Reference for this request' },
                        { tag: 'AcctId', plain: 'The account being queried' }
                    ],
                    breaks: [
                        { symptom: 'Bank returns nothing', cause: "Requested date range is outside retention, or the account id doesn't match servicer records", fix: 'Validate the account id and stay within the supported reporting window' }
                    ],
                    interview: [
                        { q: 'What does camt.060 trigger?', a: 'It requests an account report / statement; the bank answers with a camt.052, camt.053 or camt.054.' }
                    ],
                    related: ['CAMT.053', 'CAMT.052']
                }
            }
        ],
        'PACS': [
            {
                code: 'PACS.002',
                family: 'PACS',
                title: 'PACS.002',
                subtitle: 'Payment Status Report',
                purpose: 'Status report on payment instruction - accepted, rejected, pending, or completed',
                direction: 'Bank → Bank',
                category: 'Payments & Settlement',
                useCases: ['Payment Confirmation', 'Rejection Notification', 'Status Updates'],
                fields: ['PmtSts (Payment Status)', 'PmtId (Payment ID)', 'StsRsnInf'],
                example: '<Document>\n  <FIPaymentStatusReport>\n    <PmtSts>ACCC</PmtSts>\n    <PmtId>PMT001</PmtId>\n  </FIPaymentStatusReport>\n</Document>',
                node: {
                    story: "Bob's bank sent the transfer onward. Did the next bank accept it? pacs.002 is the answer coming back: accepted, rejected, or pending — with a reason code if it failed.",
                    whyExists: 'Interbank payments need a confirmation channel. Without a status report, the sending bank never knows if the instruction was accepted or why it bounced.',
                    createdBy: 'The instructed / receiving financial institution.',
                    receivedBy: 'The instructing financial institution that sent the original payment.',
                    flow: ['Receiving FI evaluates payment', 'pacs.002 Status Report', 'Sending FI updates status'],
                    businessComponents: [
                        { name: 'Payment Status', plain: 'Accepted, rejected, or pending' },
                        { name: 'Status Reason', plain: 'The code explaining a rejection' },
                        { name: 'Original Reference', plain: 'Which payment this status is about' }
                    ],
                    messageComponents: [
                        { tag: 'TxSts', plain: 'Transaction status — e.g. ACCC, ACSP, RJCT, PDNG' },
                        { tag: 'StsRsnInf', plain: 'Reason information when rejected' },
                        { tag: 'OrgnlEndToEndId', plain: 'Link back to the original payment' }
                    ],
                    validation: [
                        { tag: '<TxSts>', rule: 'Must be a valid ISO status code (ACCC, ACSP, RJCT, PDNG…)', fails: "Custom status strings downstream systems can't interpret" }
                    ],
                    breaks: [
                        { symptom: "Sender can't match the status to a payment", cause: 'OrgnlEndToEndId / OrgnlTxId not echoed back correctly', fix: 'Always return the original identifiers unchanged' }
                    ],
                    interview: [
                        { q: 'What do status codes ACCC, ACSP and RJCT mean?', a: 'ACCC = accepted and settlement completed, ACSP = accepted, settlement in process, RJCT = rejected. RJCT is always paired with a reason code.' }
                    ],
                    related: ['PACS.008', 'PAIN.002', 'PACS.004']
                }
            },
            {
                code: 'PACS.004',
                family: 'PACS',
                title: 'PACS.004',
                subtitle: 'Payment Return',
                purpose: 'Return of failed or rejected payments back to originating bank',
                direction: 'Bank → Bank',
                category: 'Payments & Settlement',
                useCases: ['Payment Rejection', 'Failed Transfers', 'Return Processing'],
                fields: ['OrgnlPmtId (Original Payment ID)', 'RtrRsn (Return Reason)', 'ReturnAmt'],
                example: '<Document>\n  <PaymentReturn>\n    <OrgnlPmtId>PMT001</OrgnlPmtId>\n    <RtrRsn>NOOR</RtrRsn>\n  </PaymentReturn>\n</Document>',
                node: {
                    story: "The account was closed. The receiving bank can't deliver Bob's money — so it sends it back, with a reason, using pacs.004.",
                    whyExists: "When a settled payment can't be applied, the funds must be returned cleanly and traceably to the originator, not just dropped.",
                    createdBy: "The receiving bank that can't apply the funds.",
                    receivedBy: 'The original sending bank.',
                    flow: ['Receiving bank cannot apply funds', 'pacs.004 Return', 'Original sender re-credits debtor'],
                    businessComponents: [
                        { name: 'Return Reason', plain: 'Why the money is coming back (account closed, etc.)' },
                        { name: 'Returned Amount', plain: 'How much is returned (may net charges)' },
                        { name: 'Original Reference', plain: 'The payment being reversed' }
                    ],
                    messageComponents: [
                        { tag: 'RtrId', plain: 'Identifier for this return' },
                        { tag: 'RtrRsnInf', plain: 'Return reason code, e.g. AC04 account closed' },
                        { tag: 'OrgnlUETR', plain: 'Ties the return to the original tracked payment' }
                    ],
                    breaks: [
                        { symptom: "Return can't be auto-matched", cause: 'Original UETR / EndToEndId not preserved on the return', fix: 'Carry the original identifiers so the sender can reverse the right transaction' }
                    ],
                    interview: [
                        { q: "pacs.004 (return) vs camt.056 (recall) — what's the difference?", a: "pacs.004 returns funds that were settled but can't be applied; camt.056 requests cancellation / recall of a payment and may not result in returned funds." }
                    ],
                    related: ['PACS.008', 'PACS.002']
                }
            },
            {
                code: 'PACS.008',
                family: 'PACS',
                title: 'PACS.008',
                subtitle: 'Credit Transfer - Interbank',
                purpose: 'Bank-to-bank message for credit transfer of customer payments between institutions',
                direction: 'Bank → Bank',
                category: 'Payments & Settlement',
                useCases: ['Cross-bank Transfers', 'International Payments', 'Settlement Processing'],
                fields: ['PmtId (Payment ID)', 'Amt (Amount)', 'Cdtr (Creditor)', 'Dbtr (Debtor)'],
                example: '<Document>\n  <FIToFICstmrCdtTrf>\n    <CdtTrfTxInf>\n      <PmtId>PMT001</PmtId>\n      <Amt>1000.00</Amt>\n      <Cdtr><Nm>Creditor Bank</Nm></Cdtr>\n    </CdtTrfTxInf>\n  </FIToFICstmrCdtTrf>\n</Document>',
                node: {
                    story: "This is the message that actually moves Bob's $400 between banks. Bob's bank (the debtor agent) hands it to Sweety's bank (the creditor agent), possibly through an intermediary — each hop preserving who pays whom.",
                    whyExists: "It's the interbank workhorse for customer payments — the MX replacement for MT103. It carries the debtor, creditor, agents, amount and the references that let a payment be tracked end to end across the world.",
                    createdBy: "The debtor agent (sender's bank), after receiving the customer's pain.001.",
                    receivedBy: "The creditor agent (beneficiary's bank), directly or via intermediary agents.",
                    flow: ['Debtor Agent', 'Intermediary Agent', 'Creditor Agent', 'Beneficiary credited'],
                    businessComponents: [
                        { name: 'Debtor / Creditor', plain: 'Who pays and who is paid' },
                        { name: 'Debtor Agent / Creditor Agent', plain: 'The sending and receiving banks' },
                        { name: 'Interbank Settlement Amount', plain: 'What settles between the banks' }
                    ],
                    messageComponents: [
                        { tag: 'PmtId / UETR', plain: 'Payment identifiers, including the global tracking reference' },
                        { tag: 'IntrBkSttlmAmt', plain: 'Interbank settlement amount' },
                        { tag: 'Dbtr / Cdtr', plain: 'Debtor and creditor parties' },
                        { tag: 'DbtrAgt / CdtrAgt', plain: 'Debtor and creditor banks, identified by their BIC (Bank Identifier Code)' }
                    ],
                    validation: [
                        { tag: '<UETR>', rule: 'RFC 4122 UUIDv4, lowercase hex, version bit 4 and variant 8/9/a/b', fails: 'Uppercase letters or wrong version / variant bits → rejected' },
                        { tag: '<EndToEndId>', rule: '≤35 chars, must survive every hop unchanged', fails: "Placeholder values like 'NOT PROVIDED' or 'NO REF'" },
                        { tag: '<CreDtTm>', rule: 'ISO-8601 date-time with UTC offset', fails: 'Omitting the timezone offset' }
                    ],
                    breaks: [
                        { symptom: 'Payment NAKed at a domestic network', cause: 'Missing the required RTGS codeword (e.g. TARGET2) for that leg', fix: "Apply the network's HVPS+ market-practice rules before routing" },
                        { symptom: 'Sanctions-screening false hit', cause: 'Name and address crammed unstructured when a BIC is already given', fix: "Use structured address; don't duplicate identification in free text" }
                    ],
                    interview: [
                        { q: "What's the difference between MsgId, EndToEndId and UETR?", a: 'MsgId is point-to-point (rotates each hop). EndToEndId is the customer reference, unchanged end to end. UETR is the globally unique UUIDv4 that tracks the whole payment across every bank.' },
                        { q: 'Which MT message does pacs.008 replace?', a: 'MT103, the single customer credit transfer. pacs.008 is its ISO 20022 equivalent on FINplus / CBPR+.' }
                    ],
                    related: ['PAIN.001', 'PACS.002', 'PACS.009', 'CAMT.054']
                }
            },
            {
                code: 'PACS.009',
                family: 'PACS',
                title: 'PACS.009',
                subtitle: 'Settlement Transaction',
                purpose: 'Settlement of interbank payment transactions at clearing house level',
                direction: 'Settlement Agency → Banks',
                category: 'Payments & Settlement',
                useCases: ['Batch Settlement', 'Clearing House Reports', 'Daily Settlement'],
                fields: ['SettlmtInfId (Settlement ID)', 'SettlmtDt (Settlement Date)', 'SttlmAmt'],
                example: '<Document>\n  <SettlementTransaction>\n    <SettlmtInfId>SETTL001</SettlmtInfId>\n    <SettlmtDt>2024-06-18</SettlmtDt>\n    <SttlmAmt>50000.00</SttlmAmt>\n  </SettlementTransaction>\n</Document>',
                node: {
                    story: 'Banks also move their own money — to settle positions or manage liquidity. pacs.009 is the financial-institution credit transfer, including the COV variant that settles the cover leg behind a customer payment.',
                    whyExists: 'Wholesale funds movement between institutions: treasury, liquidity, and the cover payment that funds a pacs.008 routed serially through correspondents.',
                    createdBy: 'The ordering financial institution (or its correspondent).',
                    receivedBy: 'The beneficiary financial institution / its agent.',
                    flow: ['Ordering FI', 'Intermediary / Correspondent', 'Beneficiary FI'],
                    businessComponents: [
                        { name: 'Institution Debtor / Creditor', plain: 'The banks themselves, not customers' },
                        { name: 'Settlement Amount', plain: 'The funds moving between institutions' },
                        { name: 'Underlying Customer Payment (COV)', plain: 'In the cover variant, the customer payment being funded' }
                    ],
                    messageComponents: [
                        { tag: 'InstgAgt / InstdAgt', plain: 'Instructing and instructed agents' },
                        { tag: 'IntrBkSttlmAmt', plain: 'Interbank settlement amount' },
                        { tag: 'UndrlygCstmrCdtTrf', plain: 'COV only — the underlying pacs.008 details' }
                    ],
                    validation: [
                        { tag: '<SttlmMtd>', rule: 'Valid settlement method (INDA, INGA, CLRG, COVE)', fails: 'Wrong or missing settlement method for the routing scenario' }
                    ],
                    breaks: [
                        { symptom: "Cover and customer legs don't reconcile", cause: 'UETR not shared between the pacs.008 and its pacs.009 COV', fix: 'Carry the same UETR on both legs so the cover can be matched' }
                    ],
                    interview: [
                        { q: 'pacs.008 vs pacs.009?', a: "pacs.008 moves a customer's funds between banks; pacs.009 moves a bank's own funds. The pacs.009 COV variant funds the cover leg behind a serial pacs.008." },
                        { q: 'What is a cover payment?', a: 'When banks have no direct relationship, the customer message (pacs.008) routes one way while a separate pacs.009 COV settles the actual funds through correspondents.' }
                    ],
                    related: ['PACS.008', 'PACS.002']
                }
            }
        ],
        'PAIN': [
            {
                code: 'PAIN.001',
                family: 'PAIN',
                title: 'PAIN.001',
                subtitle: 'Credit Transfer Initiation',
                purpose: 'Customer initiates credit transfer payment request to their bank',
                direction: 'Customer → Bank',
                category: 'Customer Initiation',
                useCases: ['Bill Payments', 'Salary Payouts', 'Invoice Settlements'],
                fields: ['PmtId (Payment ID)', 'Debtor', 'Creditor', 'InstrAmt'],
                example: '<Document>\n  <CstmrCdtTrfInitn>\n    <PmtInf>\n      <PmtId>PMT001</PmtId>\n      <CdtTrfTxInf>\n        <Amt>500.00</Amt>\n      </CdtTrfTxInf>\n    </PmtInf>\n  </CstmrCdtTrfInitn>\n</Document>',
                node: {
                    story: "It all begins here. Bob tells his bank 'pay Sweety $400.' That instruction — from a customer to their own bank — is pain.001. No money has moved yet; this is the request.",
                    whyExists: 'Corporates and individuals need one structured way to instruct their bank to make payments — single or batched — replacing the old MT101 (the legacy SWIFT request format) and a zoo of proprietary bank formats.',
                    createdBy: 'The debtor (Bob) or their ERP / accounting system.',
                    receivedBy: "The debtor's bank (debtor agent).",
                    flow: ['Debtor / ERP', 'pain.001 Initiation', 'Debtor Agent validates & executes'],
                    businessComponents: [
                        { name: 'Group Header', plain: 'Metadata for the whole file — id, timestamp, control sum' },
                        { name: 'Payment Information', plain: 'Shared instructions: execution date, debtor account, charge bearer' },
                        { name: 'Credit Transfer Transaction', plain: 'One block per individual payment' }
                    ],
                    messageComponents: [
                        { tag: 'GrpHdr', plain: 'Level 1 — message id, creation time, number of txns, control sum' },
                        { tag: 'PmtInf', plain: 'Level 2 — shared payment parameters' },
                        { tag: 'CdtTrfTxInf', plain: 'Level 3 — per-transaction detail incl. EndToEndId, amount, creditor' }
                    ],
                    validation: [
                        { tag: '<CtrlSum>', rule: 'Must equal the sum of all transaction amounts', fails: "A control sum that doesn't match → the whole file is rejected" },
                        { tag: '<ReqdExctnDt>', rule: 'Valid, well-formed execution date', fails: 'Past dates or a bad date format' }
                    ],
                    breaks: [
                        { symptom: 'Entire batch rejected', cause: "GrpHdr control sum or number-of-transactions doesn't match the actual transactions", fix: 'Compute GrpHdr totals from the transaction list — never hand-enter them' }
                    ],
                    interview: [
                        { q: 'Walk me through the three levels of a pain.001.', a: 'Level 1 Group Header (file-wide metadata), Level 2 Payment Information (shared params like debtor account and execution date), Level 3 Credit Transfer Transaction Information (per-payment detail).' },
                        { q: 'pain.001 vs pacs.008?', a: 'pain.001 is customer-to-bank (the request). pacs.008 is bank-to-bank (the execution). The bank turns the pain.001 it receives into a pacs.008 it sends.' }
                    ],
                    related: ['PACS.008', 'PAIN.002', 'CAMT.054']
                }
            },
            {
                code: 'PAIN.002',
                family: 'PAIN',
                title: 'PAIN.002',
                subtitle: 'Credit Transfer Status Report',
                purpose: 'Status report from bank to customer about their credit transfer request',
                direction: 'Bank → Customer',
                category: 'Customer Initiation',
                useCases: ['Payment Confirmation', 'Transaction Status', 'Error Notification'],
                fields: ['PmtId (Payment ID)', 'PmtSts (Payment Status)', 'StsRsnInf'],
                example: '<Document>\n  <CstmrPaymentStatusReport>\n    <PmtId>PMT001</PmtId>\n    <PmtSts>ACCC</PmtSts>\n  </CstmrPaymentStatusReport>\n</Document>',
                node: {
                    story: "Bob's bank received his pain.001. Was it accepted? pain.002 is the bank telling Bob: accepted, rejected, or pending — and if rejected, exactly which transaction and why.",
                    whyExists: 'Initiators need confirmation that their instruction was understood and accepted, with a precise reason when something fails — before assuming the money is on its way.',
                    createdBy: "The debtor's bank (debtor agent).",
                    receivedBy: 'The debtor / originating system that sent the pain.001.',
                    flow: ['Debtor Agent evaluates pain.001', 'pain.002 Status Report', 'Debtor / ERP updates status'],
                    businessComponents: [
                        { name: 'Group Status', plain: 'Status of the whole file' },
                        { name: 'Transaction Status', plain: 'Status of each individual payment' },
                        { name: 'Status Reason', plain: 'Why a payment was rejected' }
                    ],
                    messageComponents: [
                        { tag: 'GrpSts', plain: 'Status for the whole original message' },
                        { tag: 'TxInfAndSts', plain: 'Per-transaction status' },
                        { tag: 'StsRsnInf', plain: 'Reason code for rejections' }
                    ],
                    breaks: [
                        { symptom: "Bob can't tell which payment failed", cause: 'OrgnlEndToEndId not echoed per transaction', fix: 'Return original references at the transaction level, not just the group level' }
                    ],
                    interview: [
                        { q: 'pain.002 vs pacs.002?', a: 'pain.002 is bank-to-customer status (about a pain.001). pacs.002 is bank-to-bank status (about a pacs.008). Same idea, different leg of the journey.' }
                    ],
                    related: ['PAIN.001', 'PACS.002']
                }
            },
            {
                code: 'PAIN.008',
                family: 'PAIN',
                title: 'PAIN.008',
                subtitle: 'Direct Debit Initiation',
                purpose: 'Customer initiates direct debit collection request - recurring or one-time debits',
                direction: 'Customer → Bank',
                category: 'Customer Initiation',
                useCases: ['Recurring Payments', 'Subscription Collection', 'Loan Repayments'],
                fields: ['PmtId (Payment ID)', 'Creditor', 'Debtor', 'MndtId (Mandate ID)'],
                example: '<Document>\n  <CstmrDrctDebitInitn>\n    <PmtInf>\n      <MndtId>MNDT001</MndtId>\n      <Debtor>Customer Name</Debtor>\n    </PmtInf>\n  </CstmrDrctDebitInitn>\n</Document>',
                node: {
                    story: "Instead of Bob pushing money, a company pulls it — Sweety's gym collects her monthly fee. pain.008 is the creditor instructing its bank to collect from the debtor, backed by a mandate the debtor signed.",
                    whyExists: 'Recurring collections (subscriptions, utilities, loans) need a standard, mandate-controlled way for a creditor to debit a payer account.',
                    createdBy: 'The creditor (the company collecting) or its system.',
                    receivedBy: "The creditor's bank, which then collects via the debtor's bank.",
                    flow: ['Creditor', 'pain.008 Direct Debit Initiation', 'Creditor Agent', 'Debtor Agent debits payer'],
                    businessComponents: [
                        { name: 'Mandate', plain: "The debtor's signed authorization to be debited" },
                        { name: 'Creditor / Debtor', plain: 'Who collects and who pays' },
                        { name: 'Collection Amount', plain: 'How much is pulled' }
                    ],
                    messageComponents: [
                        { tag: 'MndtId', plain: 'Mandate identifier — proof of authorization' },
                        { tag: 'DrctDbtTxInf', plain: 'Direct debit transaction detail' },
                        { tag: 'CdtrSchmeId', plain: 'Creditor scheme identifier' }
                    ],
                    breaks: [
                        { symptom: 'Collection rejected as unauthorized', cause: 'Missing or expired MndtId / mandate details', fix: 'Reference a valid, current mandate for every collection' }
                    ],
                    interview: [
                        { q: 'What makes a direct debit (pain.008) different from a credit transfer (pain.001)?', a: "Direction of the pull: pain.001 pushes money out at the debtor's instruction; pain.008 pulls money in at the creditor's instruction, and it requires a mandate." }
                    ],
                    related: ['PAIN.001', 'PACS.008']
                }
            }
        ],
        'Others': [
            {
                code: 'SEEV.001',
                family: 'SEEV',
                title: 'SEEV.001',
                subtitle: 'Securities Event Notification',
                purpose: 'Notifies about securities-related events like corporate actions, dividends, stock splits',
                direction: 'CSD/Securities Agent → Participants',
                category: 'Securities',
                useCases: ['Corporate Actions', 'Dividend Notifications', 'Stock Splits'],
                fields: ['EventId (Event ID)', 'EventType', 'EffectiveDate', 'SecurityId'],
                example: '<Document>\n  <SecuritiesEventNotification>\n    <EventId>EVT001</EventId>\n    <EventType>DIVD</EventType>\n    <SecurityId>US0378331005</SecurityId>\n  </SecuritiesEventNotification>\n</Document>',
                node: {
                    story: 'Sweety invested some savings. The company declares a dividend — and every holder must be told the same thing, the same way. seev.001 announces that corporate event to participants.',
                    whyExists: 'Corporate-action terms used to live in free-text MT564 (the legacy corporate-action notice) narrative, so every custodian read them differently. Structured seev messages let entitlements be calculated automatically.',
                    createdBy: "The issuer's agent / CSD.",
                    receivedBy: 'Custodians, investment managers, and ultimately holders.',
                    flow: ['Issuer / CSD', 'seev.001 Event Notification', 'Custodian', 'Investment Manager'],
                    businessComponents: [
                        { name: 'Event', plain: "What's happening — dividend, split, merger" },
                        { name: 'Security', plain: 'Which instrument is affected (ISIN)' },
                        { name: 'Effective Date', plain: 'When it takes effect' }
                    ],
                    messageComponents: [
                        { tag: 'EvtId', plain: 'Event identifier' },
                        { tag: 'EvtTp', plain: 'Event type, e.g. DIVD' },
                        { tag: 'FinInstrmId / ISIN', plain: 'The security' }
                    ],
                    breaks: [
                        { symptom: 'Holders compute different entitlements', cause: 'Key terms left in unstructured narrative (the old MT564 problem)', fix: 'Carry rates and dates as structured fields, not free text' }
                    ],
                    interview: [
                        { q: 'Why did structured seev messages replace MT564 free text?', a: 'Free-text narrative forced manual interpretation across custodians, causing mismatched entitlements and operational risk. Structured data enables straight-through, automated processing.' }
                    ],
                    related: ['CAMT.053']
                }
            },
            {
                code: 'ACMT.002',
                family: 'ACMT',
                title: 'ACMT.002',
                subtitle: 'Account Opening Instruction',
                purpose: 'Instructions for opening new bank accounts and account configuration',
                direction: 'Customer → Bank',
                category: 'Account Management',
                useCases: ['New Account Setup', 'Account Configuration', 'Customer Onboarding'],
                fields: ['AcctOpenngInstrId (ID)', 'AcctOwnr (Owner)', 'AcctType'],
                example: '<Document>\n  <AcctOpnngInstr>\n    <AcctOpenngInstrId>ACCTOPEN001</AcctOpenngInstrId>\n    <AcctOwnr>John Doe</AcctOwnr>\n  </AcctOpnngInstr>\n</Document>',
                node: {
                    story: 'Before any of this works, Sweety needs an account. acmt.002 carries the instruction to open and configure one — owner, type, and settings.',
                    whyExists: 'Account management itself needs to be standardized so onboarding and configuration can flow between parties without bespoke forms.',
                    createdBy: 'The customer / account owner (or an agent acting for them).',
                    receivedBy: 'The bank that will open and service the account.',
                    flow: ['Customer', 'acmt.002 Account Opening Instruction', 'Bank configures account'],
                    businessComponents: [
                        { name: 'Account Owner', plain: 'Whose account it is' },
                        { name: 'Account Type', plain: 'What kind of account' },
                        { name: 'Instruction', plain: 'The open / configure request' }
                    ],
                    messageComponents: [
                        { tag: 'AcctOpngInstrId', plain: 'Identifier for the opening instruction' },
                        { tag: 'AcctOwnr', plain: 'The owner party' },
                        { tag: 'Acct', plain: 'Account configuration details' }
                    ],
                    breaks: [
                        { symptom: 'Onboarding stalls', cause: 'Owner identification incomplete for KYC (Know Your Customer checks)', fix: 'Provide full structured party identification up front' }
                    ],
                    interview: [
                        { q: 'Which domain do acmt messages belong to?', a: 'Account Management — they standardize opening, maintaining and reporting on accounts, separate from the payment flows themselves.' }
                    ],
                    related: ['CAMT.053']
                }
            }
        ]
    },
    // Learning Journey pillars. Each pillar drives the guided "What / Why /
    // Who / How / Process Maps / Coverage / Messages" journey, before any
    // message or payload is shown.
    // messageCodes link into DATA.messages (matched against `code`) to power
    // Section 7 (Message Catalogue) and Section 8 (Technical View) of the
    // journey -- no message data is duplicated here.
    pillars: {
        foundations: {
            id: 'foundations',
            name: 'Payment Foundations',
            icon: '🧱',
            what: 'Payment Foundations covers the core building blocks every ISO 20022 message is made of: parties, accounts, amounts, identifiers, and the MX/XML structure that replaced legacy SWIFT MT.',
            why: {
                problem: 'Without a shared foundation: every message family reinvents how it names a party, an amount, or an account, and migrating off legacy MT formats becomes guesswork done message-by-message.',
                solution: 'ISO 20022 defines a common data dictionary and XML structure that every other message family (payments, securities, cards, trade, FX) builds on top of.'
            },
            who: [
                { role: 'Standards Body (ISO)', icon: '🏛️' },
                { role: 'Financial Institution', icon: '🏦' },
                { role: 'Implementer / Vendor', icon: '🧑‍💻' }
            ],
            how: {
                story: 'Before any payment, security, or trade message can be exchanged, both sides need to agree on the basic vocabulary describing it.',
                flow: ['ISO 20022 Data Dictionary', 'Message Definition (MX)', 'XML Schema', 'Financial Institution']
            },
            processMaps: [
                { title: 'MT → MX Migration', steps: ['Legacy SWIFT MT', 'Mapping Layer', 'ISO 20022 MX', 'Coexistence Period', 'MX Only'] }
            ],
            coverage: ['Common Data Dictionary', 'XML Message Structure', 'Party & Account Identification', 'MT to MX Migration'],
            messageCodes: []
        },
        payments: {
            id: 'payments',
            name: 'Payments & Cash Management',
            icon: '💸',
            what: 'Payments & Cash Management covers how money moves between parties, and how account owners and their banks stay in sync on the balances and activity behind every movement.',
            why: {
                problem: 'Without standardized payment messaging and reporting: different bank formats, ambiguous instructions, manual processing, stale balances, and delayed visibility into account activity across multiple banks and currencies.',
                solution: 'ISO 20022 solves this with one common business language for moving money and a standardized set of statements, reports, and notifications for tracking it afterward.'
            },
            who: [
                { role: 'Customer', icon: '👤' },
                { role: 'Debtor Bank', icon: '🏦' },
                { role: 'Clearing System', icon: '🔁' },
                { role: 'Intermediary Bank', icon: '🏛️' },
                { role: 'Creditor Bank', icon: '🏦' },
                { role: 'Beneficiary', icon: '👤' },
                { role: 'Account Owner', icon: '👤' },
                { role: 'Account Servicing Institution', icon: '🏦' }
            ],
            how: {
                story: 'A customer wants to send money to another customer — and afterward, both sides want to see it land.',
                flow: ['Customer', 'Bank', 'Clearing System', 'Receiving Bank', 'Beneficiary']
            },
            processMaps: [
                { title: 'Customer Credit Transfer', steps: ['Customer', 'Bank', 'Clearing System', 'Receiving Bank', 'Beneficiary'] },
                { title: 'Payment Status Flow', steps: ['Debtor Bank', 'Clearing System', 'Creditor Bank', 'Status Report → Debtor Bank'] },
                { title: 'Account Reporting', steps: ['Account Owner', 'Reporting Request', 'Bank', 'Statement / Report'] },
                { title: 'Real-Time Notification', steps: ['Transaction Posted', 'Bank', 'Debit/Credit Notification', 'Account Owner'] }
            ],
            coverage: ['Customer Credit Transfers', 'Interbank Transfers', 'Instant Payments', 'Direct Debits', 'Payment Status Reporting', 'Investigation Flows', 'Interim & Daily Reports', 'Monthly Statements', 'Debit/Credit Notifications', 'Account Reporting Requests'],
            messageCodes: ['PAIN.001', 'PAIN.002', 'PAIN.008', 'PACS.002', 'PACS.004', 'PACS.008', 'PACS.009', 'CAMT.052', 'CAMT.053', 'CAMT.054', 'CAMT.060']
        },
        securities: {
            id: 'securities',
            name: 'Securities',
            icon: '📈',
            what: 'Securities messaging covers the trading, settlement, and servicing of financial instruments like stocks and bonds.',
            why: {
                problem: 'Without a shared standard: mismatched trade details, settlement failures, and missed corporate action deadlines across custodians and depositories.',
                solution: 'ISO 20022 gives every participant in the settlement chain a common, structured view of trades and events.'
            },
            who: [
                { role: 'Investor', icon: '👤' },
                { role: 'Broker', icon: '💼' },
                { role: 'CSD (Central Securities Depository)', icon: '🏛️' },
                { role: 'Custodian', icon: '🏦' }
            ],
            how: {
                story: 'An investor buys a security and it needs to settle.',
                flow: ['Investor', 'Broker', 'CSD', 'Custodian']
            },
            processMaps: [
                { title: 'Securities Settlement', steps: ['Investor', 'Broker', 'CSD', 'Custodian'] },
                { title: 'Corporate Action Notification', steps: ['CSD / Securities Agent', 'Event Notification', 'Participants'] }
            ],
            coverage: ['Trade Settlement', 'Corporate Actions', 'Dividend & Event Notifications', 'Stock Splits'],
            messageCodes: ['SEEV.001']
        },
        cards: {
            id: 'cards',
            name: 'Cards',
            icon: '💳',
            what: 'Cards messaging covers card-based payment transactions between merchants, acquirers, and card issuers.',
            why: {
                problem: 'Without standardization: inconsistent authorization, clearing, and dispute formats across card networks and processors.',
                solution: 'ISO 20022 brings the same structured, extensible approach used in payments to the card transaction lifecycle.'
            },
            who: [
                { role: 'Cardholder', icon: '👤' },
                { role: 'Merchant', icon: '🏪' },
                { role: 'Acquirer', icon: '🏦' },
                { role: 'Card Issuer', icon: '🏛️' }
            ],
            how: {
                story: 'A cardholder pays a merchant, and that transaction has to be authorized, cleared, and settled.',
                flow: ['Cardholder', 'Merchant', 'Acquirer', 'Card Issuer']
            },
            processMaps: [
                { title: 'Card Authorization', steps: ['Cardholder', 'Merchant', 'Acquirer', 'Card Issuer', 'Authorization Response'] }
            ],
            coverage: ['Authorization', 'Clearing', 'Settlement', 'Dispute Management'],
            messageCodes: []
        },
        tradeFinance: {
            id: 'tradeFinance',
            name: 'Trade Finance',
            icon: '🚢',
            what: 'Trade Finance messaging supports instruments like letters of credit and guarantees that reduce risk in international trade.',
            why: {
                problem: 'Without a common standard: slow, paper-heavy processes and inconsistent terms between buyers, sellers, and their banks across borders.',
                solution: 'ISO 20022 structures trade instruments so banks and corporates can exchange and process them consistently.'
            },
            who: [
                { role: 'Buyer (Applicant)', icon: '🧑‍💼' },
                { role: 'Seller (Beneficiary)', icon: '🧑‍💼' },
                { role: 'Issuing Bank', icon: '🏦' },
                { role: 'Advising Bank', icon: '🏛️' }
            ],
            how: {
                story: 'A buyer and seller in different countries need a bank-backed guarantee of payment.',
                flow: ['Buyer', 'Issuing Bank', 'Advising Bank', 'Seller']
            },
            processMaps: [
                { title: 'Letter of Credit Issuance', steps: ['Buyer', 'Issuing Bank', 'Advising Bank', 'Seller'] }
            ],
            coverage: ['Letters of Credit', 'Guarantees', 'Documentary Collections'],
            messageCodes: []
        },
        fx: {
            id: 'fx',
            name: 'Foreign Exchange (FX)',
            icon: '💱',
            what: 'FX messaging covers the trading and settlement of currency exchange transactions between counterparties.',
            why: {
                problem: 'Without standardization: mismatched trade confirmations and settlement instructions between counterparties trading across currencies.',
                solution: 'ISO 20022 standardizes FX trade confirmation and settlement messaging so both counterparties stay aligned.'
            },
            who: [
                { role: 'Counterparty A', icon: '🏦' },
                { role: 'Counterparty B', icon: '🏦' },
                { role: 'Settlement Agent', icon: '🔁' }
            ],
            how: {
                story: 'Two counterparties agree to exchange currencies and need that trade confirmed and settled.',
                flow: ['Counterparty A', 'Trade Agreement', 'Counterparty B', 'Settlement Agent']
            },
            processMaps: [
                { title: 'FX Trade Confirmation', steps: ['Counterparty A', 'Trade Confirmation', 'Counterparty B', 'Settlement'] }
            ],
            coverage: ['Trade Confirmations', 'Settlement Instructions'],
            messageCodes: []
        }
    },
    glossary: [
        { term: 'IBAN', definition: 'International Bank Account Number - unique identifier for bank accounts worldwide.' },
        { term: 'BIC/SWIFT Code', definition: 'Bank Identifier Code - identifies banks for international transactions.' },
        { term: 'CRDT/DBIT', definition: 'Credit = money in, Debit = money out. Direction depends on perspective.' },
        { term: 'Settlement', definition: 'Final transfer of funds between accounts after clearing. When money actually moves.' },
        { term: 'Clearing', definition: 'Process of validating, routing, and reconciling payments between banks.' },
        { term: 'Counterparty', definition: 'The other party in a transaction - sender or receiver depending on perspective.' },
        { term: 'Reconciliation', definition: 'Matching payment messages with actual transactions to ensure accuracy.' },
        { term: 'Batch', definition: 'Multiple transactions grouped in one message for efficiency.' },
        { term: 'Mandate', definition: 'Authorization for recurring debit collections from an account.' },
        { term: 'XML Schema', definition: 'Defines structure and rules for ISO 20022 messages.' },
        { term: 'Instruction', definition: 'Request to move money, sent before actual settlement occurs.' },
        { term: 'Creditor', definition: 'Party receiving payment - also called beneficiary or payee.' },
        { term: 'Debtor', definition: 'Party making/initiating payment - also called payer or originator.' },
        { term: 'Liquidity', definition: 'Availability of funds for settlement activities.' },
        { term: 'CBPR+', definition: 'Cross Border Payments and Reporting Plus - standard for international payments.' },
        { term: 'HVPS+', definition: 'High Value Payments Systems Plus - market-practice guidelines aligning high-value payment systems.' },
        { term: 'UETR', definition: 'Unique End-to-end Transaction Reference - a globally unique UUIDv4 (lowercase) that tracks one payment across every bank.' },
        { term: 'Cover Payment', definition: 'A separate interbank transfer (pacs.009 COV) that settles the funds behind a customer payment routed through correspondents.' },
        { term: 'Business Application Header', definition: 'head.001 - the envelope wrapping each document, carrying sender, receiver, message type and version.' },
        { term: 'Data Dictionary', definition: 'The static store of ISO 20022 business meanings, elements and components shared across all messages.' },
        { term: 'Structured Address', definition: 'Postal address split into labelled fields (street, town, country) rather than free-text lines - mandated by SWIFT from Nov 2026.' },
        { term: 'MT Format', definition: 'SWIFT Message Type (legacy) - old text-based format being replaced by ISO 20022.' }
    ]
};

// Helper function to get message count by family
function getMessageCountByFamily(family) {
    return (DATA.messages[family] || []).length;
}

// Helper function to get all messages by family
function getMessagesByFamily(family) {
    return DATA.messages[family] || [];
}

// Helper function to get single message by code
function getMessageByCode(code) {
    for (const family in DATA.messages) {
        const msg = DATA.messages[family].find(m => m.code === code);
        if (msg) return msg;
    }
    return null;
}

// Helper function to get a pillar by id
function getPillar(pillarId) {
    return DATA.pillars[pillarId] || null;
}

// Helper function to get all messages belonging to a pillar, in declared order
function getMessagesByPillar(pillarId) {
    const pillar = getPillar(pillarId);
    if (!pillar) return [];
    return pillar.messageCodes
        .map(code => getMessageByCode(code))
        .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Learning Journey: "Follow the Money" -- Bob (works offshore) sends money to
// Sweety (back home). Each module is a chapter in that single transfer's
// path through the financial system, ordered by causality rather than
// catalog order: Foundations (the shared language) -> Payments & Cash Mgmt
// (the transfer itself) -> FX (currency conversion) -> Cards (the last-mile
// spend) -> Trade Finance (where Bob's salary originated) -> Securities
// (what's left over, invested).
// Each module maps to a pillar in DATA.pillars (via pillarId) for supporting
// "Who" / coverage data, but carries its own narrative ("story"), a
// `chapterHook` (one-line route-map teaser), an `unlockedSkill` (surfaced on
// open), a `videoFiller` placeholder spec describing a short (15-30s,
// Shorts/Reels-style) clip that can be dropped in later without any further
// dev work, and a `messageSpotlight` -- one real, read-only example message
// for that chapter (optionally tied to a real `code` in DATA.messages),
// shown instead of an editable workshop. Chapters are free-roam (see
// ProgressEngine.isUnlocked), so order here only drives the route-line's
// visual sequence and the "what's next" tier, not access.
// ---------------------------------------------------------------------------
const learningJourney = [
    {
        id: 'foundations',
        pillarId: 'foundations',
        name: 'Foundations',
        icon: '🧱',
        chapterHook: 'The shared language behind every step of Bob\'s transfer.',
        unlockedSkill: 'You can now recognize the shared building blocks — debtor, creditor, amount — inside any ISO 20022 message.',
        storyTitle: 'From a Common Language to a Common Map',
        story: [
            'Bob is about to send Sweety $400. Before his bank and her bank can even start that conversation, they need to agree on the basic vocabulary for describing it — that\'s the language you watched ISO 20022 establish in 2004, back on the History page.',
            'That dictionary doesn\'t sit idle. It\'s the foundation every chapter ahead is built on: Payments, FX, Cards, Trade Finance, and Securities all speak the same underlying XML/MX grammar, even though each handles a completely different moment in Bob\'s money\'s journey.',
            'Before you follow the transfer itself, it helps to recognize that shared grammar — a party, an account, an amount, an identifier — because once you spot it here, you\'ll spot it in every chapter from here on.'
        ],
        messageSpotlight: {
            code: null,
            title: 'The Shared Building Blocks',
            subtitle: 'Every message in every chapter ahead reuses this same shape — a debtor, a creditor, an amount.',
            xml: '<Document>\n  <PmtInf>\n    <Dbtr><Nm>Bob</Nm></Dbtr>\n    <Cdtr><Nm>Sweety</Nm></Cdtr>\n    <Amt Ccy="USD">400.00</Amt>\n  </PmtInf>\n</Document>',
            fields: [
                { tag: 'Dbtr', meaning: 'The party sending the money — here, Bob.' },
                { tag: 'Cdtr', meaning: 'The party receiving it — Sweety.' },
                { tag: 'Amt', meaning: 'The amount and currency being moved.' }
            ]
        },
        videoFiller: {
            aspect: '9:16',
            duration: '15–20s',
            concept: 'An abstract motion graphic: two mismatched "dialect" symbols (e.g. scattered text fragments) align and snap into one clean structured XML block, glowing emerald. No actors, no voiceover needed — just a single caption line: "One language. Every message after this speaks it."',
            why: 'Left as a placeholder because this needs a custom motion-graphic (Lottie/After Effects export), not stock or filmed footage — easiest to outsource once the visual direction below is locked.'
        }
    },
    {
        id: 'payments',
        pillarId: 'payments',
        name: 'Payments & Cash Management',
        icon: '💸',
        chapterHook: 'Bob hits send. Follow the transfer hop by hop.',
        unlockedSkill: 'You can now read a PACS.008 credit transfer and a CAMT.054 notification.',
        // Relabels generic pillar role names with Bob/Sweety inside this chapter's
        // process maps + who's-involved cards only -- the shared DATA.pillars
        // entry stays generic since it's also used as standalone reference data.
        roleMap: {
            'Customer': 'Bob',
            'Debtor Bank': "Bob's Bank",
            'Creditor Bank': "Sweety's Bank",
            'Beneficiary': 'Sweety',
            'Account Owner': 'Sweety'
        },
        storyTitle: 'A Customer Just Wants Their Money to Arrive — and to See It Land',
        story: [
            'Bob opens his banking app and sends $400 to Sweety. It looks instant from his screen — but between that tap and Sweety seeing funds land, the message passes through Bob\'s bank, possibly an intermediary, a clearing system, and Sweety\'s bank — each one needing the same facts, structured the same way.',
            'Before ISO 20022, that handoff was a minefield of bank-specific formats and ambiguous free-text fields. A misread field could delay Bob\'s payment for days or trigger a costly investigation.',
            'pacs and pain messages fix this by giving every hop in the chain a structured, unambiguous record: who is paying, who is being paid, how much, and what status the payment is in at every step.',
            'Once the money arrives, the story isn\'t over — Sweety and her bank still need to stay in sync on the balance and activity it created. camt messages handle that side: statements, real-time debit/credit notifications, and account reporting requests, using the same structured approach as the payment itself.'
        ],
        messageSpotlight: {
            code: 'PACS.008',
            title: 'PACS.008 — Credit Transfer (Interbank)',
            subtitle: 'The actual message Bob\'s bank sends when his $400 moves bank-to-bank.',
            xml: '<Document>\n  <FIToFICstmrCdtTrf>\n    <CdtTrfTxInf>\n      <PmtId>PMT001</PmtId>\n      <Amt>400.00</Amt>\n      <Cdtr><Nm>Sweety</Nm></Cdtr>\n      <Dbtr><Nm>Bob</Nm></Dbtr>\n    </CdtTrfTxInf>\n  </FIToFICstmrCdtTrf>\n</Document>',
            fields: [
                { tag: 'PmtId', meaning: 'Unique reference for this specific transfer.' },
                { tag: 'Amt', meaning: 'Bob\'s $400, in the agreed currency.' },
                { tag: 'Dbtr / Cdtr', meaning: 'Bob (sending) and Sweety (receiving).' }
            ]
        },
        videoFiller: {
            aspect: '9:16',
            duration: '20–30s',
            concept: 'A stylized phone-tap "send" animation: a money icon leaves Bob\'s phone, hops through three labeled nodes (his bank → clearing system → Sweety\'s bank), and lands in Sweety\'s phone with a soft confirmation chime/glow. Captioned with each hop\'s name as it animates in.',
            why: 'This is the chapter most learners will rewatch, so it\'s worth a clean custom motion graphic rather than filmed footage — recommend building this one first once a video budget is available.'
        }
    },
    {
        id: 'fx',
        pillarId: 'fx',
        name: 'Foreign Exchange',
        icon: '💱',
        chapterHook: 'Bob\'s dirhams become Sweety\'s rupees.',
        unlockedSkill: 'You can now read an FX trade confirmation.',
        storyTitle: 'Two Currencies, One Moment of Agreement',
        story: [
            'Bob earns in AED. Sweety needs rupees. Somewhere between his bank and hers, someone has to convert one currency into another — a trade that exists for a fraction of a second but has to be confirmed and settled perfectly, often across time zones and through a separate settlement agent.',
            'A single mismatched confirmation between counterparties trading across currencies can mean a costly settlement break — and for Bob and Sweety, money that doesn\'t add up on either end.',
            'ISO 20022 FX messages (fxtr) standardize trade confirmation and settlement instructions so both counterparties — and the settlement agent between them — stay aligned on exactly what was agreed, down to the decimal.'
        ],
        messageSpotlight: {
            code: null,
            title: 'FX Trade Confirmation',
            subtitle: 'How Bob\'s dirhams and Sweety\'s rupees get matched and confirmed.',
            xml: '<Document>\n  <FXTradeConfirmation>\n    <TradeId>FX-2026-001</TradeId>\n    <CcyPair>AED/INR</CcyPair>\n    <SttlmDt>2026-06-24</SttlmDt>\n  </FXTradeConfirmation>\n</Document>',
            fields: [
                { tag: 'TradeId', meaning: 'Unique reference for this specific FX deal.' },
                { tag: 'CcyPair', meaning: 'The two currencies being exchanged — AED/INR.' },
                { tag: 'SttlmDt', meaning: 'The date the converted funds actually settle.' }
            ]
        },
        videoFiller: {
            aspect: '9:16',
            duration: '15s',
            concept: 'Two currency symbols (AED, ₹) circling each other and morphing into one another, with a small ticking exchange-rate counter overlay. Minimal, ambient, loopable.',
            why: 'Short and abstract enough to be a low-cost first video to produce — a good starting point if testing the video-filler concept before committing to the others.'
        }
    },
    {
        id: 'cards',
        pillarId: 'cards',
        name: 'Cards',
        icon: '💳',
        chapterHook: 'Sweety taps her card. The money\'s last mile.',
        unlockedSkill: 'You can now trace a card authorization from tap to settlement.',
        roleMap: {
            'Cardholder': 'Sweety',
            'Card Issuer': "Sweety's Bank"
        },
        storyTitle: 'One Tap, Four Institutions',
        story: [
            'The money has landed. Sweety taps her card at the pharmacy. In that instant, the transaction needs to be authorized, cleared, and eventually settled — passing through an acquirer and a card issuer, each running on infrastructure they did not design together.',
            'Card networks historically solved this with their own proprietary formats, which meant every processor needed custom integration work for every network they supported.',
            'ISO 20022 brings the same structured, extensible approach used in payments to the card lifecycle, so authorization, clearing, and dispute data for Sweety\'s tap can flow through common rails instead of one-off formats.'
        ],
        messageSpotlight: {
            code: null,
            title: 'Card Authorization Request',
            subtitle: 'What fires the instant Sweety taps her card.',
            xml: '<Document>\n  <CardAuthorisationReq>\n    <TxId>TXN-0001</TxId>\n    <Card><Pan>**** **** **** 1234</Pan></Card>\n    <Amt Ccy="INR">350.00</Amt>\n    <Mrch><Nm>Sweety\'s Pharmacy</Nm></Mrch>\n  </CardAuthorisationReq>\n</Document>',
            fields: [
                { tag: 'TxId', meaning: 'Unique reference for this tap.' },
                { tag: 'Card / Pan', meaning: 'Sweety\'s card, masked for security.' },
                { tag: 'Mrch', meaning: 'The merchant being paid — her pharmacy.' }
            ]
        },
        videoFiller: {
            aspect: '9:16',
            duration: '15–20s',
            concept: 'Slow-motion phone/card tap at a payment terminal, with four small labeled icons (cardholder, merchant, acquirer, issuer) pulsing in sequence as an overlay, ending on a green checkmark.',
            why: 'Best filmed as a real short clip (a genuine tap-to-pay moment) rather than animated — a good candidate to source from stock footage or a quick phone recording.'
        }
    },
    {
        id: 'trade',
        pillarId: 'tradeFinance',
        name: 'Trade Finance',
        icon: '🚢',
        chapterHook: 'Where Bob\'s salary actually came from.',
        unlockedSkill: 'You can now describe how a letter of credit protects a cross-border trade.',
        storyTitle: 'Trust, Wrapped in Paper, Crossing Oceans',
        story: [
            'Step back further: Bob\'s salary exists because the company he works for trades internationally. This month\'s payroll was only possible because a shipment left its origin port after a bank-backed guarantee changed hands between a buyer and seller who have never met and may never meet.',
            'Inconsistent terms and slow, manual processes between an issuing bank and an advising bank could stall a letter of credit for days, holding up shipments and tying up the capital that eventually became Bob\'s paycheck.',
            'ISO 20022 trade instruments structure letters of credit and guarantees so banks and corporates on both sides of the trade can exchange and process them consistently — turning a paper-heavy ritual into structured data.'
        ],
        messageSpotlight: {
            code: null,
            title: 'Letter of Credit Reference',
            subtitle: 'The bank-backed guarantee behind Bob\'s paycheck.',
            xml: '<Document>\n  <DocCdtIssnReq>\n    <DocCdtId>LC-2026-001</DocCdtId>\n    <Applcnt><Nm>Bob\'s Employer Corp</Nm></Applcnt>\n    <Bnfcry><Nm>Overseas Supplier Ltd</Nm></Bnfcry>\n    <Amt Ccy="USD">250000.00</Amt>\n  </DocCdtIssnReq>\n</Document>',
            fields: [
                { tag: 'DocCdtId', meaning: 'Unique reference for this letter of credit.' },
                { tag: 'Applcnt / Bnfcry', meaning: 'Bob\'s employer (buyer) and their overseas supplier (seller).' },
                { tag: 'Amt', meaning: 'The value the letter of credit guarantees.' }
            ]
        },
        videoFiller: {
            aspect: '16:9',
            duration: '20–25s',
            concept: 'A cargo ship leaving port, intercut with a single stamped paper document transforming into a clean digital record — implying "this is what funded that payroll."',
            why: 'Likely needs licensed stock footage (cargo ships, ports) rather than original filming — flagged as the highest-cost video to source, so it\'s fine to leave for last.'
        }
    },
    {
        id: 'securities',
        pillarId: 'securities',
        name: 'Securities',
        icon: '📈',
        chapterHook: 'What Sweety does with what\'s left over.',
        unlockedSkill: 'You can now read a corporate action notification the way a custodian would.',
        storyTitle: 'A Trade Is Only Half the Job',
        story: [
            'Sweety doesn\'t spend everything Bob sends. What\'s left over goes into a small mutual fund — and that modest investment quietly joins one of the most heavily standardized message flows in finance.',
            'Settling that investment correctly across a broker, a central securities depository, and a custodian, while tracking every corporate action that touches it afterward, is where the real complexity lives.',
            'Mismatched trade details between custodians used to cause settlement failures and missed corporate action deadlines — sometimes costing investors like Sweety real money on dividends or splits they never heard about in time.',
            'ISO 20022 settlement and corporate-action messages give every participant in that chain the same structured view of the trade and the event, so nothing falls through the cracks between hand-offs.'
        ],
        messageSpotlight: {
            code: 'SEEV.001',
            title: 'SEEV.001 — Securities Event Notification',
            subtitle: 'What Sweety\'s custodian sends when her fund pays a dividend.',
            xml: '<Document>\n  <SecuritiesEventNotification>\n    <EventId>EVT001</EventId>\n    <EventType>DIVD</EventType>\n    <SecurityId>US0378331005</SecurityId>\n  </SecuritiesEventNotification>\n</Document>',
            fields: [
                { tag: 'EventId', meaning: 'Unique reference for this corporate action.' },
                { tag: 'EventType', meaning: 'The kind of event — DIVD means dividend.' },
                { tag: 'SecurityId', meaning: 'The specific security the event applies to.' }
            ]
        },
        videoFiller: {
            aspect: '9:16',
            duration: '15s',
            concept: 'A coin dropping into a jar that smoothly morphs into a gently rising line chart — calm, optimistic close to the journey.',
            why: 'Simple enough to animate cheaply — a reasonable second or third video to produce after Payments and FX.'
        }
    }
];

// ---------------------------------------------------------------------------
// ProgressEngine: persists Learning Journey progress to localStorage under
// the key "iso_academy_progress". A module is unlocked if it's the first
// module, or if the preceding module's id is in the user's completed list.
// ---------------------------------------------------------------------------
const ProgressEngine = {
    STORAGE_KEY: 'iso_academy_progress',

    // Pulls progress data from localStorage, defaulting to { completed: [] }
    // if nothing is stored yet or the stored value is malformed.
    get() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : null;
            if (parsed && Array.isArray(parsed.completed)) {
                return parsed;
            }
        } catch (e) {
            // Fall through to default below on parse errors.
        }
        return { completed: [] };
    },

    _save(progress) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    },

    // Free-roam: every chapter is always open. Kept as a function (rather
    // than deleted) so callers don't need to change -- it just always says
    // "go ahead." The "completed" list now means "viewed", not "gated".
    isUnlocked(moduleId) {
        return true;
    },

    isComplete(moduleId) {
        return this.get().completed.includes(moduleId);
    },

    // Appends moduleId to the viewed list (no duplicates). Called the moment
    // a chapter is opened -- there's no workshop/verify step gating it.
    markComplete(moduleId) {
        const progress = this.get();
        if (!progress.completed.includes(moduleId)) {
            progress.completed.push(moduleId);
            this._save(progress);
        }
    }
};
