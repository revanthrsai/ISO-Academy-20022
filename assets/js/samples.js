// =============================================================================
// PLAYGROUND TOOL · SAMPLE MESSAGE LIBRARY  (Session 4.5)
// -----------------------------------------------------------------------------
// A browsable shelf of real, valid ISO 20022 sample messages — 2–3 per
// 300-level family (pain · pacs · camt · head · admi) — each loadable straight
// into the other Playground tools (Viewer · Validator · Transformer) with one
// click, so a learner never has to hand-paste XML to start experimenting.
//
// Self-contained: one global `SampleLibrary` object + its own injected styles,
// so it drops into the Playground page without touching the shared stylesheet.
// Loading is done through each tool's own public surface — the Viewer/Validator
// source textareas (+ their onInput), and MsgTransformer.loadModel() for the
// pacs.008 the Transformer speaks — so nothing here reaches into tool internals.
//
// Threaded to the Library: every sample is a beat of the same Bob → Sweety $400
// transfer (EndToEndId BOB-INV0042, the shared UETR eb6305c9…) the 300/500
// lessons follow — so the catalogue reads as one payment's whole life, not a
// pile of disconnected fixtures.
// =============================================================================

const SampleLibrary = (function () {
    const UETR = 'eb6305c9-1f7c-4a9b-9b1e-2c2f4e7a91d4';

    // -------------------------------------------------------------------------
    // CATALOGUE — keyed by stable id. Each entry: family, msg label, a one-line
    // sub, a short "what it is" note, the destinations it can load into, and the
    // well-formed XML itself. `dest` lists which tools the Load buttons offer —
    // every message reads in the Viewer and checks in the Validator; only the
    // pacs.008 (the language the Transformer speaks) offers Transform.
    // -------------------------------------------------------------------------
    const SAMPLES = {
        // ---- pain — customer ⇄ bank ----------------------------------------
        'pain.001': {
            family: 'pain', label: 'pain.001', kind: 'Initiation',
            sub: 'Customer Credit Transfer Initiation',
            note: 'Bob tells his bank to pay Sweety $400. Where the whole story starts.',
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>BOB-MSG-20260627-0001</MsgId>
      <CreDtTm>2026-06-27T09:28:14+04:00</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>400.00</CtrlSum>
      <InitgPty><Nm>Bob Marsh</Nm></InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>BOB-PMT-0042</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <BtchBookg>false</BtchBookg>
      <ReqdExctnDt><Dt>2026-06-27</Dt></ReqdExctnDt>
      <Dbtr>
        <Nm>Bob Marsh</Nm>
        <PstlAdr><StrtNm>Marina View</StrtNm><TwnNm>Dubai</TwnNm><Ctry>AE</Ctry></PstlAdr>
      </Dbtr>
      <DbtrAcct><Id><IBAN>AE070331234567890123456</IBAN></Id></DbtrAcct>
      <DbtrAgt><FinInstnId><BICFI>EBILAEAD</BICFI></FinInstnId></DbtrAgt>
      <ChrgBr>SHAR</ChrgBr>
      <CdtTrfTxInf>
        <PmtId><EndToEndId>BOB-INV0042</EndToEndId><UETR>${UETR}</UETR></PmtId>
        <Amt><InstdAmt Ccy="USD">400.00</InstdAmt></Amt>
        <CdtrAgt><FinInstnId><BICFI>HDFCINBB</BICFI></FinInstnId></CdtrAgt>
        <Cdtr>
          <Nm>Sweety Rao</Nm>
          <PstlAdr><StrtNm>MG Road</StrtNm><TwnNm>Bengaluru</TwnNm><Ctry>IN</Ctry></PstlAdr>
        </Cdtr>
        <CdtrAcct><Id><IBAN>IN52HDFC0000123456789012</IBAN></Id></CdtrAcct>
        <RmtInf><Ustrd>Invoice 0042 - June freelance</Ustrd></RmtInf>
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`
        },
        'pain.002': {
            family: 'pain', label: 'pain.002', kind: 'Status',
            sub: 'Customer Payment Status Report',
            note: "Bob's bank answers his instruction: accepted, on its way.",
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.002.001.10">
  <CstmrPmtStsRpt>
    <GrpHdr>
      <MsgId>EBILAEAD-STS-20260627-01</MsgId>
      <CreDtTm>2026-06-27T09:29:02+04:00</CreDtTm>
      <InitgPty><Nm>Emirates Islamic Bank</Nm></InitgPty>
    </GrpHdr>
    <OrgnlGrpInfAndSts>
      <OrgnlMsgId>BOB-MSG-20260627-0001</OrgnlMsgId>
      <OrgnlMsgNmId>pain.001.001.09</OrgnlMsgNmId>
      <GrpSts>ACCP</GrpSts>
    </OrgnlGrpInfAndSts>
    <OrgnlPmtInfAndSts>
      <OrgnlPmtInfId>BOB-PMT-0042</OrgnlPmtInfId>
      <TxInfAndSts>
        <OrgnlEndToEndId>BOB-INV0042</OrgnlEndToEndId>
        <UETR>${UETR}</UETR>
        <TxSts>ACCP</TxSts>
        <StsRsnInf><Rsn><Cd>G000</Cd></Rsn></StsRsnInf>
      </TxInfAndSts>
    </OrgnlPmtInfAndSts>
  </CstmrPmtStsRpt>
</Document>`
        },
        'pain.008': {
            family: 'pain', label: 'pain.008', kind: 'Direct debit',
            sub: 'Customer Direct Debit Initiation',
            note: "The mirror image — a biller pulling funds instead of a payer pushing them.",
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.08">
  <CstmrDrctDbtInitn>
    <GrpHdr>
      <MsgId>UTIL-DD-20260627-0007</MsgId>
      <CreDtTm>2026-06-27T06:00:00+04:00</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>120.00</CtrlSum>
      <InitgPty><Nm>Dubai Electricity Co</Nm></InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>UTIL-PMT-0007</PmtInfId>
      <PmtMtd>DD</PmtMtd>
      <ReqdColltnDt>2026-06-30</ReqdColltnDt>
      <Cdtr><Nm>Dubai Electricity Co</Nm></Cdtr>
      <CdtrAcct><Id><IBAN>AE980331000000000099887</IBAN></Id></CdtrAcct>
      <CdtrAgt><FinInstnId><BICFI>EBILAEAD</BICFI></FinInstnId></CdtrAgt>
      <DrctDbtTxInf>
        <PmtId><EndToEndId>UTIL-JUN-0007</EndToEndId></PmtId>
        <InstdAmt Ccy="AED">120.00</InstdAmt>
        <DbtrAgt><FinInstnId><BICFI>EBILAEAD</BICFI></FinInstnId></DbtrAgt>
        <Dbtr><Nm>Bob Marsh</Nm></Dbtr>
        <DbtrAcct><Id><IBAN>AE070331234567890123456</IBAN></Id></DbtrAcct>
        <RmtInf><Ustrd>Electricity - June</Ustrd></RmtInf>
      </DrctDbtTxInf>
    </PmtInf>
  </CstmrDrctDbtInitn>
</Document>`
        },

        // ---- pacs — bank ⇄ bank --------------------------------------------
        'pacs.008': {
            family: 'pacs', label: 'pacs.008', kind: 'Credit transfer',
            sub: 'FI-to-FI Customer Credit Transfer',
            note: "Bob's bank to Sweety's bank, on the wire. The one the Transformer speaks.",
            dest: ['viewer', 'validator', 'transformer'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.008.001.08">
  <FIToFICstmrCdtTrf>
    <GrpHdr>
      <MsgId>EBILAEAD-20260627-000400</MsgId>
      <CreDtTm>2026-06-27T09:30:00+04:00</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <SttlmInf><SttlmMtd>INDA</SttlmMtd></SttlmInf>
      <InstgAgt><FinInstnId><BICFI>EBILAEAD</BICFI></FinInstnId></InstgAgt>
      <InstdAgt><FinInstnId><BICFI>HDFCINBB</BICFI></FinInstnId></InstdAgt>
    </GrpHdr>
    <CdtTrfTxInf>
      <PmtId>
        <InstrId>EBILAEAD-INSTR-0400</InstrId>
        <EndToEndId>BOB-INV0042</EndToEndId>
        <UETR>${UETR}</UETR>
      </PmtId>
      <IntrBkSttlmAmt Ccy="USD">400.00</IntrBkSttlmAmt>
      <IntrBkSttlmDt>2026-06-27</IntrBkSttlmDt>
      <ChrgBr>SHAR</ChrgBr>
      <Dbtr><Nm>Bob Marsh</Nm></Dbtr>
      <DbtrAgt><FinInstnId><BICFI>EBILAEAD</BICFI></FinInstnId></DbtrAgt>
      <CdtrAgt><FinInstnId><BICFI>HDFCINBB</BICFI></FinInstnId></CdtrAgt>
      <Cdtr><Nm>Sweety Rao</Nm></Cdtr>
      <RmtInf><Ustrd>Invoice 0042 - June freelance</Ustrd></RmtInf>
    </CdtTrfTxInf>
  </FIToFICstmrCdtTrf>
</Document>`
        },
        'pacs.002': {
            family: 'pacs', label: 'pacs.002', kind: 'Status',
            sub: 'FI-to-FI Payment Status Report',
            note: "Sweety's bank confirms back up the wire: settled, accepted.",
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.002.001.10">
  <FIToFIPmtStsRpt>
    <GrpHdr>
      <MsgId>HDFCINBB-STS-20260627-400</MsgId>
      <CreDtTm>2026-06-27T15:01:40+05:30</CreDtTm>
      <InstgAgt><FinInstnId><BICFI>HDFCINBB</BICFI></FinInstnId></InstgAgt>
      <InstdAgt><FinInstnId><BICFI>EBILAEAD</BICFI></FinInstnId></InstgAgt>
    </GrpHdr>
    <TxInfAndSts>
      <OrgnlInstrId>EBILAEAD-INSTR-0400</OrgnlInstrId>
      <OrgnlEndToEndId>BOB-INV0042</OrgnlEndToEndId>
      <UETR>${UETR}</UETR>
      <TxSts>ACSC</TxSts>
      <OrgnlTxRef><IntrBkSttlmAmt Ccy="USD">400.00</IntrBkSttlmAmt></OrgnlTxRef>
    </TxInfAndSts>
  </FIToFIPmtStsRpt>
</Document>`
        },
        'pacs.004': {
            family: 'pacs', label: 'pacs.004', kind: 'Return',
            sub: 'Payment Return',
            note: 'The unhappy path — the $400 sent back, settled funds returned with a reason.',
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.004.001.09">
  <PmtRtr>
    <GrpHdr>
      <MsgId>HDFCINBB-RTR-20260628-009</MsgId>
      <CreDtTm>2026-06-28T11:14:00+05:30</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <SttlmInf><SttlmMtd>INDA</SttlmMtd></SttlmInf>
    </GrpHdr>
    <TxInf>
      <RtrId>HDFCINBB-RTR-0400</RtrId>
      <OrgnlEndToEndId>BOB-INV0042</OrgnlEndToEndId>
      <UETR>${UETR}</UETR>
      <RtrdIntrBkSttlmAmt Ccy="USD">400.00</RtrdIntrBkSttlmAmt>
      <IntrBkSttlmDt>2026-06-28</IntrBkSttlmDt>
      <RtrRsnInf><Rsn><Cd>AC04</Cd></Rsn><AddtlInf>Closed account</AddtlInf></RtrRsnInf>
    </TxInf>
  </PmtRtr>
</Document>`
        },

        // ---- camt — reporting ----------------------------------------------
        'camt.054': {
            family: 'camt', label: 'camt.054', kind: 'Notification',
            sub: 'Bank-to-Customer Debit/Credit Notification',
            note: "Sweety's bank pings her the moment the $400 lands.",
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.054.001.08">
  <BkToCstmrDbtCdtNtfctn>
    <GrpHdr>
      <MsgId>HDFCINBB-NTF-20260627-77</MsgId>
      <CreDtTm>2026-06-27T15:02:11+05:30</CreDtTm>
    </GrpHdr>
    <Ntfctn>
      <Id>NTF-77-0042</Id>
      <Acct>
        <Id><IBAN>IN52HDFC0000123456789012</IBAN></Id>
        <Ownr><Nm>Sweety Rao</Nm></Ownr>
      </Acct>
      <Ntry>
        <Amt Ccy="USD">400.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Sts><Cd>BOOK</Cd></Sts>
        <BookgDt><DtTm>2026-06-27T15:02:00+05:30</DtTm></BookgDt>
        <ValDt><Dt>2026-06-27</Dt></ValDt>
        <NtryDtls><TxDtls>
          <Refs><EndToEndId>BOB-INV0042</EndToEndId><UETR>${UETR}</UETR></Refs>
          <RmtInf><Ustrd>Invoice 0042 - June freelance</Ustrd></RmtInf>
        </TxDtls></NtryDtls>
      </Ntry>
    </Ntfctn>
  </BkToCstmrDbtCdtNtfctn>
</Document>`
        },
        'camt.053': {
            family: 'camt', label: 'camt.053', kind: 'Statement',
            sub: 'Bank-to-Customer Statement',
            note: "End-of-day: the same credit, now a line on Sweety's statement.",
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.08">
  <BkToCstmrStmt>
    <GrpHdr>
      <MsgId>HDFCINBB-STMT-20260627</MsgId>
      <CreDtTm>2026-06-27T23:59:00+05:30</CreDtTm>
    </GrpHdr>
    <Stmt>
      <Id>STMT-20260627-IN52</Id>
      <Acct>
        <Id><IBAN>IN52HDFC0000123456789012</IBAN></Id>
        <Ownr><Nm>Sweety Rao</Nm></Ownr>
      </Acct>
      <Bal>
        <Tp><CdOrPrtry><Cd>CLBD</Cd></CdOrPrtry></Tp>
        <Amt Ccy="USD">400.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Dt><Dt>2026-06-27</Dt></Dt>
      </Bal>
      <Ntry>
        <Amt Ccy="USD">400.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Sts><Cd>BOOK</Cd></Sts>
        <BookgDt><Dt>2026-06-27</Dt></BookgDt>
        <NtryDtls><TxDtls>
          <Refs><EndToEndId>BOB-INV0042</EndToEndId><UETR>${UETR}</UETR></Refs>
        </TxDtls></NtryDtls>
      </Ntry>
    </Stmt>
  </BkToCstmrStmt>
</Document>`
        },
        'camt.056': {
            family: 'camt', label: 'camt.056', kind: 'Cancellation',
            sub: 'FI-to-FI Payment Cancellation Request',
            note: 'Second thoughts — a request to recall the transfer before it is spent.',
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.056.001.08">
  <FIToFIPmtCxlReq>
    <Assgnmt>
      <Id>EBILAEAD-CXL-0400</Id>
      <Assgnr><Agt><FinInstnId><BICFI>EBILAEAD</BICFI></FinInstnId></Agt></Assgnr>
      <Assgne><Agt><FinInstnId><BICFI>HDFCINBB</BICFI></FinInstnId></Agt></Assgne>
      <CreDtTm>2026-06-27T16:40:00+04:00</CreDtTm>
    </Assgnmt>
    <Undrlyg>
      <TxInf>
        <CxlId>EBILAEAD-CXL-TX-0400</CxlId>
        <OrgnlEndToEndId>BOB-INV0042</OrgnlEndToEndId>
        <UETR>${UETR}</UETR>
        <OrgnlIntrBkSttlmAmt Ccy="USD">400.00</OrgnlIntrBkSttlmAmt>
        <CxlRsnInf><Rsn><Cd>DUPL</Cd></Rsn></CxlRsnInf>
      </TxInf>
    </Undrlyg>
  </FIToFIPmtCxlReq>
</Document>`
        },

        // ---- head — the envelope -------------------------------------------
        'head.001-pacs': {
            family: 'head', label: 'head.001', kind: 'BAH · over pacs.008',
            sub: 'Business Application Header',
            note: 'The envelope wrapped around the pacs.008 — who, to whom, which message.',
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<AppHdr xmlns="urn:iso:std:iso:20022:tech:xsd:head.001.001.02">
  <Fr><FIId><FinInstnId><BICFI>EBILAEAD</BICFI></FinInstnId></FIId></Fr>
  <To><FIId><FinInstnId><BICFI>HDFCINBB</BICFI></FinInstnId></FIId></To>
  <BizMsgIdr>EBILAEAD-20260627-000400</BizMsgIdr>
  <MsgDefIdr>pacs.008.001.08</MsgDefIdr>
  <BizSvc>swift.cbprplus.02</BizSvc>
  <CreDt>2026-06-27T09:30:00+04:00</CreDt>
  <Prty>NORM</Prty>
</AppHdr>`
        },
        'head.001-camt': {
            family: 'head', label: 'head.001', kind: 'BAH · over camt.054',
            sub: 'Business Application Header',
            note: 'The same envelope, this time around the notification flowing the other way.',
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<AppHdr xmlns="urn:iso:std:iso:20022:tech:xsd:head.001.001.02">
  <Fr><FIId><FinInstnId><BICFI>HDFCINBB</BICFI></FinInstnId></FIId></Fr>
  <To><FIId><FinInstnId><BICFI>HDFCINBB</BICFI></FinInstnId></FIId></To>
  <BizMsgIdr>HDFCINBB-NTF-20260627-77</BizMsgIdr>
  <MsgDefIdr>camt.054.001.08</MsgDefIdr>
  <BizSvc>swift.cbprplus.02</BizSvc>
  <CreDt>2026-06-27T15:02:11+05:30</CreDt>
  <Prty>NORM</Prty>
</AppHdr>`
        },

        // ---- admi — housekeeping -------------------------------------------
        'admi.004': {
            family: 'admi', label: 'admi.004', kind: 'System event',
            sub: 'System Event Notification',
            note: 'The network talking to itself — a value cut-off has been reached.',
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:admi.004.001.02">
  <SysEvtNtfctn>
    <EvtInf>
      <EvtCd>CUSC</EvtCd>
      <EvtParam>2026-06-27</EvtParam>
      <EvtParam>17:00:00+01:00</EvtParam>
      <EvtDesc>Same-day value cut-off reached; later items value tomorrow</EvtDesc>
      <EvtTm>2026-06-27T17:00:00+01:00</EvtTm>
    </EvtInf>
  </SysEvtNtfctn>
</Document>`
        },
        'admi.002': {
            family: 'admi', label: 'admi.002', kind: 'Message reject',
            sub: 'Message Reject',
            note: 'The network refusing a malformed message at the door, before any business logic.',
            dest: ['viewer', 'validator'],
            xml:
`<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:admi.002.001.01">
  <Admi.002.001.01>
    <RltdRef><Ref>EBILAEAD-20260627-000400</Ref></RltdRef>
    <Rsn>
      <RjctgPtyRsn>X09</RjctgPtyRsn>
      <RjctnDtTm>2026-06-27T09:30:05+04:00</RjctnDtTm>
      <ErrLctn>/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/IntrBkSttlmAmt</ErrLctn>
      <AddtlData>Amount currency attribute missing</AddtlData>
    </Rsn>
  </Admi.002.001.01>
</Document>`
        }
    };

    // Display order, grouped by family.
    const ORDER = [
        'pain.001', 'pain.002', 'pain.008',
        'pacs.008', 'pacs.002', 'pacs.004',
        'camt.054', 'camt.053', 'camt.056',
        'head.001-pacs', 'head.001-camt',
        'admi.004', 'admi.002'
    ];

    const FAMILIES = [
        { id: 'all', label: 'All' },
        { id: 'pain', label: 'pain' },
        { id: 'pacs', label: 'pacs' },
        { id: 'camt', label: 'camt' },
        { id: 'head', label: 'head' },
        { id: 'admi', label: 'admi' }
    ];

    const DEST_LABEL = { viewer: 'View', validator: 'Validate', transformer: 'Transform' };

    // -------------------------------------------------------------------------
    // STATE
    // -------------------------------------------------------------------------
    let filter = 'all';
    let mountId = 'smp-root';

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // -------------------------------------------------------------------------
    // LOAD — drive each target tool through its own public surface only.
    //   • Viewer / Validator: switch to the tool, fill its source textarea, fire
    //     the tool's own onInput so it re-parses exactly as if pasted.
    //   • Transformer: parse the pacs.008 into the canonical model and hand it to
    //     MsgTransformer.loadModel().
    // setPlaygroundTool() (app.js) initialises the destination synchronously, so
    // its DOM exists by the time we write into it.
    // -------------------------------------------------------------------------
    function loadInto(dest, key) {
        const s = SAMPLES[key];
        if (!s) return;
        if (typeof window.setPlaygroundTool === 'function') window.setPlaygroundTool(dest);

        if (dest === 'viewer') {
            const ta = document.getElementById('xv-src');
            if (ta && window.XmlViewer) { ta.value = s.xml; XmlViewer.onInput(); }
        } else if (dest === 'validator') {
            const ta = document.getElementById('val-src');
            if (ta && window.SchemaValidator) { ta.value = s.xml; SchemaValidator.onInput(); }
        } else if (dest === 'transformer') {
            if (window.MsgTransformer && typeof MsgTransformer.loadModel === 'function') {
                MsgTransformer.loadModel(pacsToModel(s.xml));
            }
        }
        flash(key, dest);
    }

    // Pull the transformer's canonical model out of a pacs.008.
    function pacsToModel(xml) {
        const doc = new DOMParser().parseFromString(xml, 'application/xml');
        const get = (sel) => { const n = doc.querySelector(sel); return n ? (n.textContent || '').trim() : ''; };
        const getAttr = (sel, a) => { const n = doc.querySelector(sel); return n ? (n.getAttribute(a) || '') : ''; };
        const amt = doc.querySelector('IntrBkSttlmAmt');
        const model = {
            ref: get('CdtTrfTxInf > PmtId > EndToEndId') || get('EndToEndId'),
            valDate: get('IntrBkSttlmDt'),
            ccy: amt ? (amt.getAttribute('Ccy') || '') : '',
            amount: amt ? (amt.textContent || '').trim() : '',
            dbtrNm: get('Dbtr > Nm'),
            dbtrAgt: get('DbtrAgt BICFI'),
            cdtrAgt: get('CdtrAgt BICFI'),
            cdtrNm: get('Cdtr > Nm'),
            rmt: get('RmtInf > Ustrd'),
            chrg: get('ChrgBr')
        };
        // Drop empties so the transformer keeps its sensible defaults for anything absent.
        Object.keys(model).forEach(k => { if (!model[k]) delete model[k]; });
        return model;
    }

    // Brief "loaded" pulse on the button that was clicked.
    function flash(key, dest) {
        const btn = document.querySelector(`.smp-card[data-key="${CSS.escape(key)}"] .smp-load[data-dest="${dest}"]`);
        if (!btn) return;
        btn.classList.add('is-flash');
        setTimeout(() => btn.classList.remove('is-flash'), 700);
    }

    // -------------------------------------------------------------------------
    // RENDER
    // -------------------------------------------------------------------------
    function setFilter(f) { filter = f; render(); }

    function cardHtml(key) {
        const s = SAMPLES[key];
        const buttons = s.dest.map(d =>
            `<button class="smp-load" data-dest="${d}" onclick="SampleLibrary.loadInto('${d}', '${key}')">
                <span class="smp-load-ar">&rarr;</span>${DEST_LABEL[d]}
            </button>`).join('');
        return `<article class="smp-card" data-key="${esc(key)}" data-fam="${s.family}">
            <header class="smp-card-head">
                <span class="smp-fam smp-fam-${s.family}">${esc(s.family)}</span>
                <span class="smp-kind">${esc(s.kind)}</span>
            </header>
            <h3 class="smp-name">${esc(s.label)}</h3>
            <p class="smp-sub">${esc(s.sub)}</p>
            <p class="smp-note">${esc(s.note)}</p>
            <div class="smp-actions">${buttons}</div>
        </article>`;
    }

    function render() {
        const root = document.getElementById(mountId);
        if (!root) return;
        const keys = ORDER.filter(k => filter === 'all' || SAMPLES[k].family === filter);
        const chips = FAMILIES.map(f =>
            `<button class="smp-chip${f.id === filter ? ' is-on' : ''}" onclick="SampleLibrary.setFilter('${f.id}')">${esc(f.label)}</button>`
        ).join('');
        const count = keys.length;
        root.innerHTML = `
            <div class="smp-bar">
                <div class="smp-chips">${chips}</div>
                <span class="smp-count">${count} sample${count === 1 ? '' : 's'}</span>
            </div>
            <div class="smp-grid">${keys.map(cardHtml).join('')}</div>
        `;
    }

    // -------------------------------------------------------------------------
    // STYLES — injected once, theme-aware (reads the global CSS variables).
    // -------------------------------------------------------------------------
    function injectStyles() {
        if (document.getElementById('smp-styles')) return;
        const css = `
        .smp { display: flex; flex-direction: column; gap: 20px; }
        .smp-bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .smp-chips { display: flex; gap: 8px; flex-wrap: wrap; }
        .smp-chip {
            padding: 7px 15px; border-radius: var(--radius-pill);
            background: var(--surface); border: 1px solid var(--border);
            color: var(--text-muted); cursor: pointer; font-family: var(--font-mono);
            font-size: 12.5px; letter-spacing: 0.02em;
            transition: border-color var(--dur-fast) var(--ease-out),
                        color var(--dur-fast) var(--ease-out),
                        background var(--dur-fast) var(--ease-out);
        }
        .smp-chip:hover { border-color: var(--border-hi); color: var(--text); }
        .smp-chip.is-on { border-color: var(--primary-deep); background: var(--glass-tint-strong); color: var(--text); }
        .smp-count { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: var(--text-faint); }

        .smp-grid {
            display: grid; gap: 16px;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }

        .smp-card {
            display: flex; flex-direction: column; gap: 8px;
            padding: 18px 18px 16px; min-width: 0;
            background: var(--surface); border: 1px solid var(--border);
            border-radius: var(--radius-md);
            transition: border-color var(--dur-fast) var(--ease-out),
                        transform var(--dur-fast) var(--ease-out);
        }
        .smp-card:hover { border-color: var(--border-hi); transform: translateY(-2px); }
        .smp-card-head { display: flex; align-items: center; gap: 9px; }
        .smp-fam {
            font-family: var(--font-mono); font-size: 10px; font-weight: 700;
            letter-spacing: 0.08em; text-transform: uppercase;
            padding: 3px 9px; border-radius: var(--radius-pill);
            background: var(--glass-tint-strong); color: var(--primary-bright);
        }
        .smp-fam-pain { color: var(--primary-bright); }
        .smp-fam-pacs { color: var(--warning); }
        .smp-fam-camt { color: var(--text); }
        .smp-kind {
            font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.03em;
            color: var(--text-faint);
        }
        .smp-name {
            font-family: var(--font-mono); font-size: 18px; font-weight: 700;
            color: var(--text); margin: 2px 0 0; letter-spacing: -0.01em;
        }
        .smp-sub { font-size: 13px; color: var(--text-muted); margin: 0; line-height: 1.4; }
        .smp-note { font-size: 12.5px; color: var(--text-faint); margin: 0; line-height: 1.55; flex: 1; }

        .smp-actions {
            display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;
            padding-top: 14px; border-top: 1px solid var(--border);
        }
        .smp-load {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 6px 13px; border-radius: var(--radius-sm);
            background: transparent; border: 1px solid var(--border);
            color: var(--text-muted); cursor: pointer;
            font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0.02em;
            transition: border-color var(--dur-fast) var(--ease-out),
                        color var(--dur-fast) var(--ease-out),
                        background var(--dur-fast) var(--ease-out);
        }
        .smp-load:hover { border-color: var(--primary-deep); color: var(--text); background: var(--glass-tint-strong); }
        .smp-load-ar { color: var(--primary); font-weight: 700; }
        .smp-load.is-flash { border-color: var(--primary); background: var(--primary); color: #04130D; }
        .smp-load.is-flash .smp-load-ar { color: #04130D; }
        `;
        const style = document.createElement('style');
        style.id = 'smp-styles';
        style.textContent = css;
        document.head.appendChild(style);
    }

    // -------------------------------------------------------------------------
    // INIT — call after the mount container exists.
    // -------------------------------------------------------------------------
    function init(id) {
        mountId = id || 'smp-root';
        injectStyles();
        render();
    }

    return { init, setFilter, loadInto };
})();

window.SampleLibrary = SampleLibrary;
