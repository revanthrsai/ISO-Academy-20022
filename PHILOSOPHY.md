# The ISO 20022 Academy — Teaching Philosophy

> **The one law everything else obeys:**
> **Every lesson must begin with a human question, not a technical concept.**

This document is the academy's constitution. It is not marketing copy and it is
not a style guide — it is the contract every lesson is measured against. If a
lesson and this document disagree, the lesson is wrong.

Read this before writing or reviewing any content.

---

## 1. Why we teach ISO 20022

We are not here to help someone pass a migration deadline. Deadlines expire.

We teach ISO 20022 because it is the closest thing humanity has ever built to a
**universal language for trust and value** — the rules by which money moves
between strangers who will never meet, across borders, currencies, and time
zones, and still arrives intact. Behind a payment that *looks* instant on a phone
screen sits five thousand years of people solving the same problem over and over:
*how do I know the value I'm owed will actually reach me?*

ISO 20022 is the current answer. Our job is to make a learner *understand that
answer* — not memorize its tags. When they finish, they should see the financial
system the way the people who built it do: as a chain of human problems, each
solved just well enough to expose the next one.

A learner who only memorizes `pacs.008` forgets it in a week. A learner who
understands *why money needs a `pacs.008* never unlearns it.

---

## 2. What a learner should feel

In this exact order:

1. **Curiosity first.** Every lesson opens with a question they actually want
   answered. The feeling is *"huh, I never thought about that."*
2. **Recognition second.** *"Oh — that's a problem I've sort of felt myself."*
   (Their card got declined. A transfer "pending" for two days. A wrong name on a
   wire.) We connect the abstract to something they've lived.
3. **Competence third.** *"I get it now — and I could explain it to someone
   else."* Competence is the payoff, never the entry fee.

What a learner must **never** feel: **overwhelmed**. Confusion is not rigor.
If a lesson makes someone feel stupid, the lesson failed, not the learner. Every
cryptic tag, every nested structure, every acronym is a tax on attention — and we
spend that attention budget only on *real understanding*, never on decoding
jargon we could have explained in plain words.

*(In the language of the research: minimize **extraneous load** — cryptic syntax,
unexplained abbreviations — so the learner's full attention goes to **germane
load** — the actual idea. We never make them parse `CdtrAgt` and grasp interbank
routing in the same breath.)*

---

## 3. The promise

We make the learner exactly one promise, and we keep it without exception:

> **You will never be shown a tag before you've been shown the human problem it
> solves.**

XML is the *last* thing a learner meets in any lesson, never the first. A tag is
only ever revealed as *"here's how the world happens to write down the thing you
already understand."* Syntax is a costume the meaning wears — and we always
introduce the person before the costume.

---

## 4. Our voice

The History page already found it. Every other page should read like **the next
scene of the same film**, never a tonal reset into a textbook.

- **Cinematic and human.** We tell stories about people, ports, banks, and money
  in motion — not "the standard specifies that…"
- **Second-person and present.** *"Bob hits send. Right now, his $400 is sitting
  in a queue you've never heard of."* The learner is inside the moment, not
  reading a report about it.
- **Plain before precise.** Say the everyday thing first, the exact term second:
  *"the receiving bank — the **Creditor Agent** —"*. Never the reverse.
- **Confident, not academic.** Short sentences. Concrete nouns. We earn trust by
  being clear, not by sounding complex. If a sentence needs a glossary lookup to
  parse, rewrite the sentence.
- **Warm, never cute.** Stories carry the warmth. We don't decorate with emoji,
  exclamation, or jokes that distract from the idea.

> **The voice test:** read any paragraph aloud. If it sounds like documentation,
> it's wrong. If it sounds like a good narrator walking a friend through
> something genuinely interesting, it's right.

---

## 5. What makes us different from documentation

Documentation answers **"what is this field?"**
We answer **"why does this field exist — and who got hurt before it did?"**

| Documentation | The Academy |
|---|---|
| Starts with the structure | Starts with the human question |
| Lists what a message contains | Tells you why the message had to be invented |
| Treats XML as the subject | Treats XML as the *last step*, a serialization of meaning |
| Defines `Debtor` | Lets you *meet* a debtor (Bob) and feel the problem first |
| Complete | **Understandable** |

Anyone can read the ISO spec. Almost no one finishes it understanding *why*. That
gap is the entire reason this academy exists.

---

## The Lesson Spine

Every unit of knowledge in the academy — a domain, a single message, a glossary
term, a history chapter — is taught in this **fixed nine-beat order**. This is the
core law made operational. Do not reorder it. Do not let a later beat leak into an
earlier one (no tags in beat 1, no XML before beat 7).

| # | Beat | What it must do |
|---|------|-----------------|
| 1 | **The Human Question** | One sentence a non-banker would actually ask out loud. Contains **no** tag, acronym, or the words *XML / schema / message*. |
| 2 | **Who feels this** | Name the person or role in pain *before* the solution existed, and what it cost them. |
| 3 | **The Story** | A concrete, named human (Bob, Sweety, and their cast — see canon below) living the problem in a real moment. |
| 4 | **How the world solved it** | The business process and the people in it, in plain English. Diagrams in business terms, not tags. |
| 5 | **How ISO *models* it** | The semantic roles — Debtor, Creditor, Agent, Amount — as *concepts*. Still no tags. |
| 6 | **The message(s)** | Which message carries this, named in business terms first (*"the bank-to-bank credit transfer — `pacs.008`"*). |
| 7 | **The real XML** | *Only now.* Shown explicitly as "one way to write down beat 5." Tags are translated inline on first sight. |
| 8 | **What breaks** | A concrete, real failure — truncated name flags a sanctions match, a missing TARGET2 codeword, a bad UETR. Specific, never hand-wavy. |
| 9 | **You can now…** | One concrete earned skill, stated plainly (*"You can now read a `pacs.008` and say who's paying whom"*), plus 2–4 links to related ideas. |

### The acceptance test (run on every lesson, every time)

> Read **beat 1** aloud.
> - Does it contain a tag name? **Fail.**
> - Does it contain an acronym? **Fail.**
> - Does it contain the word *XML*, *schema*, or *message*? **Fail.**
> - Would a curious 15-year-old actually ask it? If not, **rewrite.**
>
> Then check: does any beat **before 7** show raw XML? If yes, **fail** — move it.

A lesson that cannot pass this test does not ship.

---

## Canon: Bob & Sweety

Every story in the academy is one continuous thread following the same people.
The learner should feel they're watching one film, not flipping through unrelated
examples. Keep these facts consistent everywhere.

**The two leads**
- **Bob** — works offshore, **earns in AED (UAE dirhams)**. He's the one who hits
  *send*. Warm, ordinary, not a banker. He is our **Debtor / Originator**.
- **Sweety** — back home, **receives in INR (Indian rupees)**. She's who the
  money is *for*. She is our **Creditor / Beneficiary**.

**The signature moment**
> **Bob sends Sweety $400. It looks instant. It isn't.**
This single transfer is the spine of the whole journey. Every domain is one
moment in this $400's life.

**The supporting cast** (introduce each only when its domain needs it)
- **Bob's Bank** — the **Debtor Agent** (sending bank).
- **Sweety's Bank** — the **Creditor Agent** (receiving bank).
- The **clearing system / intermediary** — the hops in between.
- **Bob's employer** — why the salary exists at all (the **Trade Finance** story:
  a letter of credit funded the shipment that funded payroll).
- **Sweety's pharmacy** — where she taps her card (the **Cards** story).
- **Sweety's small mutual fund** — where the leftover goes (the **Securities**
  story).

**The journey order (causality, not catalog order)** — money is earned, sent,
converted, spent, and what's left is invested:

```
Trade Finance  →  Payments  →  FX  →  Cards  →  Securities
(Bob's salary    (Bob sends    (AED→   (Sweety   (Sweety
 was funded)      the $400)     INR)    taps)     invests)
       …all resting on Foundations: the shared language underneath every step.
```

**Rules for using the canon**
- A new domain = a new **moment in Bob & Sweety's day**, never an abstract
  overview. *"Bob earns in AED. Sweety needs rupees. Someone has to convert
  one into the other."*
- Relabel generic roles with the cast inside stories and process maps
  (*"Bob's Bank → Clearing → Sweety's Bank"*, not *"Debtor Agent → … →
  Creditor Agent"*) — but keep the generic term available as the formal name in
  beat 5.
- Use the **"you just learned…"** payoff: tell the story with names, *then* reveal
  the vocabulary they absorbed without trying.
  > *Bob's bank debits him. The clearing system passes it on. Sweety's bank credits
  > her.* **→ "Congratulations — you just learned Debtor, Debtor Agent, Clearing,
  > Creditor Agent, and Creditor."**

---

## The single sentence to remember

If you forget everything else in this document, keep this:

> **Introduce the person before the costume. Always Bob and Sweety first — the
> tag comes last, if at all.**
