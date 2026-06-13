export type LinkItem = {
  href: string;
  label: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PageSection = {
  title: string;
  body: string;
  points?: string[];
  links?: LinkItem[];
};

export type ServicePageData = {
  path: string;
  title: string;
  metaDescription: string;
  headline: string;
  subhead: string;
  intro: string;
  keyPoints: string[];
  sections: PageSection[];
  faqs: FaqItem[];
  disclaimer?: string;
  relatedLinks?: LinkItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export const firm = {
  name: 'Steel & Associates, A Professional Law Corporation',
  shortName: 'Steel & Associates',
  attorney: 'Matthew G. Steel',
  addressLines: ['2000 Belle Chasse Highway, 200B', 'Gretna, Louisiana 70056'],
  phoneDisplay: '+1.833.43.STEEL',
  phoneNumeric: '+18334378335',
  email: 'info@steelyourcase.com',
  domain: 'https://steelyourcase.com',
  handle: '@steelyourcase',
};

export const legalDisclaimers = {
  footer:
    'The information on this website is for general informational purposes only and is not legal advice. Submitting a form, calling, texting, chatting, or emailing does not create an attorney-client relationship. Representation begins only after conflict review and written engagement. Past results do not guarantee future outcomes.',
  creditRepair:
    'Credit repair results are not guaranteed. The firm reviews records, prepares disputes where appropriate, and helps clients pursue accurate reporting under applicable law. No statement on this site promises deletion, score increase, or a particular outcome.',
  traffic:
    'Traffic ticket services are available for Louisiana matters only at this time. Outcomes depend on the citation, court, facts, driving record, and applicable law.',
  notary:
    'Notary availability depends on document type, signer identity verification, location, technology requirements, and applicable Louisiana law.',
  immigration:
    'Immigration law is federal, fact-specific, and deadline-sensitive. General website information does not replace legal advice for a specific case.',
  employment:
    'Employment-based immigration, O visa, NIW, and worksite I-9 audit matters depend on the employer, beneficiary, record, deadlines, agency posture, and applicable law. No page promises approval or a specific government result.',
  federalCourt:
    'Federal court relief, including habeas, mandamus, APA actions, and related litigation, depends on jurisdiction, exhaustion, custody, delay, agency action or inaction, procedural posture, and the facts of the case.',
  sVisa:
    'S visa matters are rare and fact-specific, generally tied to law-enforcement cooperation and government sponsorship. Website content does not suggest eligibility or availability in any particular case.',
  assistant:
    'The Record Room assistant helps route information for review. It does not provide legal advice, does not create an attorney-client relationship, and does not guarantee representation or results.',
  privacy:
    'Privacy tools reduce unnecessary exposure, but no public internet communication method is risk-free. Do not submit emergency deadlines or highly sensitive documents through a public form or chat.',
};

export const primaryNav: LinkItem[] = [
  { href: '/immigration/', label: 'Immigration' },
  { href: '/credit-repair/', label: 'Credit Repair' },
  { href: '/traffic-tickets/', label: 'Traffic Tickets' },
  { href: '/notary/', label: 'Notary' },
  { href: '/privacy-first-law-firm/', label: 'Privacy Stack' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export const immigrationNav: LinkItem[] = [
  { href: '/immigration/family-petitions/', label: 'Family Petitions' },
  {
    href: '/immigration/asylum-humanitarian-relief/',
    label: 'Asylum and Humanitarian Relief',
  },
  { href: '/immigration/removal-defense/', label: 'Removal Defense' },
  { href: '/immigration/citizenship-naturalization/', label: 'Citizenship' },
  { href: '/immigration/employment-immigration/', label: 'Employment Immigration' },
  { href: '/immigration/worksite-i-9-audits-defense/', label: 'Worksite I-9 Audits' },
  { href: '/immigration/o-visas-extraordinary-ability/', label: 'O Visas' },
  { href: '/immigration/national-interest-waiver/', label: 'NIW' },
  { href: '/immigration/federal-court-relief/', label: 'Federal Court Relief' },
];

export const practiceCards = [
  {
    title: 'Immigration',
    href: '/immigration/',
    image: '/images/practice-immigration.webp',
    copy:
      'Family petitions, asylum, removal defense, humanitarian relief, citizenship, employment immigration, worksite I-9 audits, O visas, NIW petitions, habeas, mandamus, APA actions, and federal court immigration relief.',
    cta: 'Start Immigration Review',
  },
  {
    title: 'Credit Repair',
    href: '/credit-repair/',
    image: '/images/practice-credit-repair.webp',
    copy:
      'Credit report review, dispute planning, documentation cleanup, and follow-up strategy built for clean records and careful words.',
    cta: 'Review My Credit File',
  },
  {
    title: 'Traffic Tickets',
    href: '/traffic-tickets/',
    image: '/images/practice-traffic-tickets.webp',
    copy:
      'Louisiana traffic ticket help for people who need the court date handled, the record reviewed, and the next move made cleanly.',
    cta: 'Review My Ticket',
  },
  {
    title: 'Notary',
    href: '/notary/',
    image: '/images/practice-notary.webp',
    copy:
      'Remote online and mobile notary services for documents that need to be signed, sealed, and handled properly.',
    cta: 'Book Notary Help',
  },
];

export const steelMethod = [
  {
    title: 'Facts',
    copy: 'Get the real timeline, the real paper, and the real pressure points before anyone performs certainty.',
  },
  {
    title: 'Evidence',
    copy: 'Sort what exists, what is missing, and what needs to be built before the record gets used against you.',
  },
  {
    title: 'Strategy',
    copy: 'Choose the lane that fits the matter, the deadline, the forum, and the risk instead of running every idea at once.',
  },
  {
    title: 'Record',
    copy: 'Put the file in order, move it cleanly, and keep the work defensible from intake through follow-up.',
  },
];

export const homeSections = {
  hero: {
    title: 'Put it on record. Put it on Steel.',
    subhead:
      'Steel & Associates, A Professional Law Corporation helps clients handle immigration, credit repair, Louisiana traffic tickets, and notary needs with clear strategy, clean records, and secure systems.',
    primaryCta: { label: 'Schedule a Consultation', href: '/contact/' },
    secondaryCta: { label: 'Call +1.833.43.STEEL', href: `tel:${firm.phoneNumeric}` },
    trustStrip: [
      'Gretna, Louisiana',
      'Federal immigration matters across the United States',
      'Louisiana matters for traffic ticket and notary services',
      'Multilingual capability',
      'Privacy-first operating stack',
    ],
  },
  steelMethod: {
    title: 'The Steel Method',
    copy:
      'No theater. No panic. No template advice dressed up as wisdom. We identify the moving parts, organize the record, choose the lane, and put the work where it belongs.',
  },
  deeperImmigration: {
    title: 'Immigration That Goes Deeper Than Forms',
    copy:
      'Some immigration cases are not just petitions. They are worksite audits, detained clients, federal deadlines, government delay, agency silence, removal orders, employer exposure, and records that need to be built before the government builds them first.',
    links: [
      { href: '/immigration/worksite-i-9-audits-defense/', label: 'Worksite I-9 Audits and Defense' },
      { href: '/immigration/o-visas-extraordinary-ability/', label: 'O Visas' },
      { href: '/immigration/national-interest-waiver/', label: 'National Interest Waivers' },
      { href: '/immigration/asylum-humanitarian-relief/', label: 'S Visas and T Visas' },
      { href: '/immigration/federal-court-relief/', label: 'Habeas and Federal Court Relief' },
    ],
  },
  privacy: {
    title: 'Privacy-First Law Firm',
    copy:
      'A legal problem is already enough exposure. The firm uses a privacy-first operating stack for communications, files, scheduling, credentials, research, and internal work product. Privacy tools do not make the internet magic, but they do reduce unnecessary leakage.',
    cta: { label: 'See Our Privacy Stack', href: '/privacy-first-law-firm/' },
  },
  languages: {
    title: 'Multilingual Reach',
    list: ['English', 'Spanish', 'Polish', 'Mandarin Chinese', 'Vietnamese', 'Russian and Ukrainian-facing routing'],
    copy:
      'Immigration is not just paperwork. It is family, memory, language, status, movement, fear, timing, and the official record. The firm is built for clients who live between worlds.',
  },
  footerCta: 'Bring the file. Bring the facts. We’ll bring the next move.',
};

export const languagePages = [
  {
    path: '/immigration/polish-speaking-immigration-lawyer/',
    title: 'Polish-Speaking Immigration Lawyer',
    headline: 'Polish-speaking immigration help with a clear record and a direct next step.',
    intro:
      'The firm can collect intake in Polish, explain the first file review in plain language, and move the matter into attorney review without turning the process into a guessing exercise.',
    lines: [
      'We can collect basic intake information in Polish and continue attorney review in the format the case requires.',
      'Family, humanitarian, removal, employment, O visa, NIW, and federal court immigration matters all start with the same discipline: facts, evidence, strategy, record.',
      'If the matter involves detention, a hearing, a Notice to Appear, or a fast deadline, call immediately after submitting the form.',
    ],
  },
  {
    path: '/immigration/spanish-speaking-immigration-lawyer/',
    title: 'Spanish-Speaking Immigration Lawyer',
    headline: 'Spanish-speaking immigration support built for real timing, real records, and real pressure.',
    intro:
      'The firm can collect intake in natural professional Spanish, route the file correctly, and move the matter to attorney review without promising what the record has not earned.',
    lines: [
      'Family petitions, asylum, humanitarian relief, removal defense, citizenship, worksite I-9 matters, O visas, NIW, and federal court relief can all be screened through the same intake lane.',
      'We can collect basic information in your preferred language. Attorney review determines next steps.',
      'If the matter involves court, detention, or a government deadline, submit the form and call right away.',
    ],
  },
  {
    path: '/immigration/chinese-speaking-immigration-lawyer/',
    title: 'Chinese-Speaking Immigration Lawyer',
    headline: 'Mandarin-friendly immigration intake for families, workers, founders, and urgent cases.',
    intro:
      'The public site keeps the intake language simple and safe. The goal is to collect the right basics, preserve timing, and move the file into attorney review cleanly.',
    lines: [
      'We can collect basic intake details in Mandarin and continue the formal case review in the format the matter requires.',
      'The firm handles family petitions, humanitarian matters, removal defense, employment immigration, O visas, NIW, and federal court immigration relief.',
      'For urgent deadlines, hearings, detention, or employer exposure, submit the form and call immediately.',
    ],
  },
  {
    path: '/immigration/vietnamese-speaking-immigration-lawyer/',
    title: 'Vietnamese-Speaking Immigration Lawyer',
    headline: 'Vietnamese-friendly immigration intake with direct routing and disciplined review.',
    intro:
      'This page is built to help clients start the intake process safely, identify deadlines early, and move the record to attorney review without noise.',
    lines: [
      'We can collect basic intake information in Vietnamese and confirm what the attorney needs to review the file.',
      'Common matters include family immigration, humanitarian relief, removal defense, citizenship, employment immigration, O visas, NIW, and federal court relief.',
      'If there is detention, a hearing, or a fast government deadline, call after submitting the form.',
    ],
  },
  {
    path: '/immigration/russian-speaking-immigration-lawyer/',
    title: 'Russian-Speaking Immigration Lawyer',
    headline: 'Russian-facing immigration intake for files that need timing, clarity, and careful routing.',
    intro:
      'This routing page keeps the public language safe and direct. The goal is to capture the basics, identify risk, and move the file to attorney review without unnecessary exposure.',
    lines: [
      'We can collect basic intake information in your preferred language. Attorney review determines next steps.',
      'The firm reviews family, humanitarian, removal, employment, O visa, NIW, worksite I-9, and federal court immigration matters.',
      'Urgent court, detention, or deadline matters should be submitted and followed with a phone call right away.',
    ],
  },
  {
    path: '/immigration/ukrainian-speaking-immigration-lawyer/',
    title: 'Ukrainian-Facing Immigration Help',
    headline: 'Ukrainian-facing immigration routing for families, humanitarian cases, and record-heavy matters.',
    intro:
      'This page is designed to help the office collect safe intake details, preserve timing, and route the file into attorney review cleanly.',
    lines: [
      'We can collect basic intake information in your preferred language and confirm what documents or facts the attorney needs next.',
      'The firm reviews humanitarian relief, family petitions, removal defense, employment immigration, O visas, NIW, and federal court immigration matters.',
      'If the matter involves detention, a hearing notice, or a short deadline, call after you submit the form.',
    ],
  },
];

export const privacyTools = [
  {
    title: 'Proton Account',
    copy: 'Account security, recovery planning, two-factor protection, and controlled access are the base layer for everything else.',
  },
  {
    title: 'Proton Mail',
    copy: 'Custom-domain email, encrypted Proton-to-Proton mail, aliases, filters, password-protected external messages where appropriate, and exportable records.',
  },
  {
    title: 'Proton Mail Bridge',
    copy: 'Used only when a desktop workflow needs local decryption and a traditional mail client without pretending every workflow needs it.',
  },
  {
    title: 'Proton Calendar',
    copy: 'Private scheduling for consultations, filing dates, court events, audit deadlines, and internal timing discipline.',
  },
  {
    title: 'Proton Drive',
    copy: 'Encrypted file custody, secure links, expiration controls, version history, and disciplined folder structure for active records.',
  },
  {
    title: 'Proton Docs',
    copy: 'Secure drafting, review loops, dispute letters, filings, audit responses, and internal work product under attorney review.',
  },
  {
    title: 'Proton Sheets',
    copy: 'Private trackers for intake, credit review, I-9 checklists, deadlines, matter status, and internal dashboards.',
  },
  {
    title: 'Proton Meet',
    copy: 'Confidential consultations and internal calls with guest access when appropriate.',
  },
  {
    title: 'Proton Pass',
    copy: 'Vaults, aliases, passkeys, breach monitoring, password health, and compartmentalized credential sharing.',
  },
  {
    title: 'SimpleLogin',
    copy: 'Public-facing aliasing that helps compartmentalize where contact routes begin and where they stop.',
  },
  {
    title: 'Proton Authenticator',
    copy: 'A separate TOTP lane for high-value accounts and internal access control.',
  },
  {
    title: 'Proton VPN',
    copy: 'Network hardening for travel, public Wi-Fi, remote work, and sensitive sessions.',
  },
  {
    title: 'Proton Wallet',
    copy: 'Mentioned carefully as self-custody literacy and internal compartmentalization, not as a client-service or payment product.',
  },
  {
    title: 'Lumo',
    copy: 'Private AI assistance for summarization, translation, drafting, and research workflows, always subject to attorney review and source verification.',
  },
  {
    title: 'Proton for Business',
    copy: 'Custom domains, user governance, SMTP tokens for business systems, retention awareness, and organization-level control.',
  },
  {
    title: 'Standard Notes',
    copy: 'Private notes and research capture adjacent to the Proton ecosystem for internal knowledge work.',
  },
];

export const servicePages: Record<string, ServicePageData> = {
  immigration: {
    path: '/immigration/',
    title: 'Immigration',
    metaDescription:
      'Immigration lawyer in Gretna, Louisiana handling family petitions, asylum, removal defense, citizenship, employment immigration, worksite I-9 audits, O visas, NIW petitions, habeas, mandamus, and federal court immigration relief.',
    headline: 'Immigration law for families, fighters, founders, workers, and people under pressure.',
    subhead:
      'From family petitions to asylum, removal defense, humanitarian relief, citizenship, employment immigration, worksite I-9 audits, O visas, NIW petitions, and federal court relief, the firm builds the record before the record gets used against you.',
    intro: 'You bring doubt. We bring clarity.',
    keyPoints: [
      'Family petitions, adjustment, and consular processing',
      'Asylum, withholding, CAT, TPS, parole, VAWA, U visas, T visas, and other humanitarian lanes',
      'Removal defense, detention, bond, motions, appeals, and time-sensitive court work',
      'Employment immigration, O visas, NIW, worksite I-9 audits, and employer-side strategy',
      'Federal court immigration relief, including habeas, mandamus, and APA actions',
    ],
    sections: [
      {
        title: 'When the case gets heavier',
        body:
          'Some cases need more than a clean form packet. Employers face I-9 audits. Professionals need O visa or NIW positioning. Detained clients may need habeas. Delayed cases may need mandamus or APA litigation. Humanitarian cases may involve T visas, S visas, VAWA, U visas, asylum, TPS, or parole. The work is still the same discipline: facts, evidence, strategy, record.',
      },
      {
        title: 'What the office needs first',
        body:
          'A real timeline, the key notices, the current status, the next deadline, and the part of the record that carries the risk. That is how a file gets triaged correctly instead of being buried under panic or generic advice.',
        points: [
          'Receipt notices, hearing notices, interview notices, or Requests for Evidence',
          'Detention location, custody timeline, or Notice to Appear when applicable',
          'Employer exposure, audit notice, or worksite deadline for I-9 matters',
          'Any prior filing, denial, order, or appeal that changes the posture of the case',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can the firm review urgent immigration deadlines?',
        answer:
          'Yes. If the matter involves detention, a hearing, a response deadline, a worksite audit, or another time-sensitive government action, submit the form and call right away so the office can triage timing.',
      },
      {
        question: 'Does the public site provide legal advice?',
        answer:
          'No. The site explains services, intake needs, and routing. Case-specific advice happens only after attorney review.',
      },
    ],
    disclaimer: legalDisclaimers.immigration,
    relatedLinks: immigrationNav,
    ctaLabel: 'Start Immigration Review',
    ctaHref: '/contact/',
  },
  familyPetitions: {
    path: '/immigration/family-petitions/',
    title: 'Family Petitions',
    metaDescription:
      'Family petitions and green card strategy for spouses, parents, children, fiances, and relatives whose records need a clean, document-driven filing path.',
    headline: 'Family petitions and green card work built on records, timing, and clean proof.',
    subhead:
      'Family immigration cases can look simple on paper and turn sharp when the timeline, travel history, prior filings, or admissibility issues are not handled correctly.',
    intro: 'The file matters as much as the form.',
    keyPoints: [
      'Marriage-based petitions and adjustment strategy',
      'Consular processing preparation and document control',
      'Parent, child, sibling, and other family-based filings',
      'Waiver-sensitive cases that need careful record review before filing',
    ],
    sections: [
      {
        title: 'Where family cases usually tighten up',
        body:
          'Travel history, prior visa use, unlawful presence, missed filings, criminal exposure, support obligations, and incomplete records all change the way a petition should be prepared and timed.',
      },
      {
        title: 'What helps the first review',
        body:
          'Relationship evidence, status history, entry history, identity records, prior filings, and any government correspondence already tied to the matter.',
      },
    ],
    faqs: [
      {
        question: 'Can the office review both adjustment and consular cases?',
        answer:
          'Yes. The first review focuses on the filing lane, timing risks, and the documents needed to keep the record consistent.',
      },
      {
        question: 'Should I send all personal documents through the public form?',
        answer:
          'No. Use the public form for basic routing only. Do not send highly sensitive documents or emergency deadlines through the public site.',
      },
    ],
    disclaimer: legalDisclaimers.immigration,
    relatedLinks: immigrationNav,
    ctaLabel: 'Request Family Petition Review',
    ctaHref: '/contact/',
  },
  asylumHumanitarian: {
    path: '/immigration/asylum-humanitarian-relief/',
    title: 'Asylum and Humanitarian Relief',
    metaDescription:
      'Asylum, withholding, CAT, TPS, parole, VAWA, U visas, T visas, S visas where available, and humanitarian immigration review built for timing and record control.',
    headline: 'Humanitarian immigration work for records that carry fear, risk, and deadlines.',
    subhead:
      'Asylum and humanitarian matters need disciplined facts, careful timing, and a record that can survive government scrutiny instead of collapsing under rushed storytelling.',
    intro: 'When the facts are heavy, the file has to get sharper.',
    keyPoints: [
      'Asylum, withholding, and CAT review',
      'TPS, parole, VAWA, U visas, and T visas where applicable',
      'Trauma-aware intake without public overexposure',
      'Routing for rare S visa fact patterns without false promises',
    ],
    sections: [
      {
        title: 'Why these files need control',
        body:
          'Humanitarian cases often involve fragmented records, trauma-sensitive timelines, interpreter needs, prior entries, and government deadlines that punish inconsistency.',
      },
      {
        title: 'How the public site handles intake',
        body:
          'The site routes the matter, collects only the minimum useful facts, and pushes the rest into attorney review. It does not ask for highly sensitive public uploads or pretend the first message is the full case.',
      },
    ],
    faqs: [
      {
        question: 'Does the assistant decide whether someone qualifies for asylum or a visa?',
        answer:
          'No. The assistant only routes the matter, flags urgency, and explains what the office may need to review.',
      },
      {
        question: 'Are S visa matters available for everyone?',
        answer:
          'No. S visa matters are rare, fact-specific, and generally tied to law-enforcement cooperation and government sponsorship.',
      },
    ],
    disclaimer: `${legalDisclaimers.immigration} ${legalDisclaimers.sVisa}`,
    relatedLinks: immigrationNav,
    ctaLabel: 'Start Humanitarian Case Review',
    ctaHref: '/contact/',
  },
  removalDefense: {
    path: '/immigration/removal-defense/',
    title: 'Removal Defense',
    metaDescription:
      'Removal defense, detained immigration defense, bond, motions, appeals, and immigration court strategy for time-sensitive cases under pressure.',
    headline: 'Removal defense for cases where the record, the forum, and the deadline all matter at once.',
    subhead:
      'When immigration court is active, delay and noise are expensive. The first move is to identify the posture, preserve timing, and get the file into a disciplined lane.',
    intro: 'When court calls, answer clean.',
    keyPoints: [
      'Removal defense and hearing preparation',
      'Detained defense and bond-related review',
      'Motions to reopen and appellate record review',
      'Escalation when the timeline cannot wait',
    ],
    sections: [
      {
        title: 'What the office needs immediately',
        body:
          'Hearing notices, custody status, prior filings, prior orders, the current court venue, and the fastest upcoming deadline. Without that, the record cannot be triaged correctly.',
      },
      {
        title: 'What the public site will not do',
        body:
          'It will not tell someone to ignore notices, miss a court date, or guess at eligibility. It routes the file and pushes urgent matters toward live human review fast.',
      },
    ],
    faqs: [
      {
        question: 'What if someone is detained right now?',
        answer:
          'Submit the form if helpful, but call immediately. Detained matters should not wait on a public intake queue alone.',
      },
      {
        question: 'Can the office review motions or appeal records?',
        answer:
          'Yes. The first review focuses on posture, timing, prior orders, and what part of the record controls the next move.',
      },
    ],
    disclaimer: legalDisclaimers.immigration,
    relatedLinks: immigrationNav,
    ctaLabel: 'Request Removal Defense Review',
    ctaHref: '/contact/',
  },
  citizenship: {
    path: '/immigration/citizenship-naturalization/',
    title: 'Citizenship and Naturalization',
    metaDescription:
      'Citizenship and naturalization review for N-400 matters, acquired or derivative citizenship questions, and record issues that need a careful lane.',
    headline: 'Citizenship and naturalization work for records that need to be right before they are final.',
    subhead:
      'Naturalization, acquired citizenship, derivative citizenship, and N-400 issues often turn on old records, travel history, criminal exposure, tax issues, or prior immigration filings.',
    intro: 'A clean record hits harder.',
    keyPoints: [
      'N-400 preparation and issue spotting',
      'Acquired and derivative citizenship review',
      'Travel, tax, and prior-filing record control',
      'Interview posture and follow-up preparation',
    ],
    sections: [
      {
        title: 'Why citizenship files need review',
        body:
          'Cases that look routine can tighten around long trips, prior arrests, support issues, selective service questions, prior green card history, or a mismatch between the record and the application.',
      },
    ],
    faqs: [
      {
        question: 'Can the office review a naturalization denial or complicated history?',
        answer:
          'Yes. The first review focuses on the record, the reason the matter tightened, and what follow-up lane fits the posture.',
      },
      {
        question: 'Does the site promise approval?',
        answer:
          'No. The site explains the work and the intake process. No page promises approval or a particular government result.',
      },
    ],
    disclaimer: legalDisclaimers.immigration,
    relatedLinks: immigrationNav,
    ctaLabel: 'Request Citizenship Review',
    ctaHref: '/contact/',
  },
  employmentImmigration: {
    path: '/immigration/employment-immigration/',
    title: 'Employment Immigration',
    metaDescription:
      'Employment immigration, employer strategy, NIW, O visas, worksite I-9 review, and business-facing immigration planning from Gretna, Louisiana.',
    headline: 'Employment immigration and employer-facing strategy for records that need precision, not filler.',
    subhead:
      'When immigration law leaves the form and enters the record, the strategy has to get sharper. Employer exposure, beneficiary positioning, and government timing all change the build.',
    intro: 'Moves stay clean. Every word airtight.',
    keyPoints: [
      'Employer-side immigration strategy and document control',
      'O visas and NIW positioning',
      'Business-facing intake that respects deadlines and exposure',
      'Worksite I-9 issues, NOIs, and audit routing',
    ],
    sections: [
      {
        title: 'Why business-facing cases are different',
        body:
          'These files often involve employer records, role definitions, evidence strategy, internal deadlines, government posture, and reputational exposure beyond a single petition packet.',
      },
    ],
    faqs: [
      {
        question: 'Does the office handle both employer and beneficiary review?',
        answer:
          'Yes. The intake lane is built to identify whose record, deadlines, and exposure drive the next move.',
      },
      {
        question: 'Do these pages promise approvals or outcomes?',
        answer:
          'No. Employment immigration matters depend on the employer, beneficiary, record, deadlines, and agency posture.',
      },
    ],
    disclaimer: legalDisclaimers.employment,
    relatedLinks: immigrationNav,
    ctaLabel: 'Request Employment Immigration Review',
    ctaHref: '/contact/',
  },
  worksiteI9: {
    path: '/immigration/worksite-i-9-audits-defense/',
    title: 'Worksite I-9 Audits and Defense',
    metaDescription:
      'Worksite I-9 audit and immigration compliance defense for employers facing Notices of Inspection, document review, audit deadlines, and federal immigration enforcement pressure.',
    headline: 'Worksite I-9 audit defense for employers who need the deadline, the documents, and the exposure handled cleanly.',
    subhead:
      'A Notice of Inspection is not the time for generic compliance talk. It is the time to control the record, understand the deadline, and move through the audit without creating new damage.',
    intro: 'When the government starts building its record, yours has to move first.',
    keyPoints: [
      'Notice of Inspection triage and deadline control',
      'I-9 record review and document organization',
      'Employer exposure review and response planning',
      'Escalation for urgent deadlines and enforcement pressure',
    ],
    sections: [
      {
        title: 'What the office needs first',
        body:
          'The audit deadline, the employer name, the worksite state, the notice itself, and the current state of the I-9 records. Those facts decide how the review starts.',
      },
      {
        title: 'How the public assistant handles this route',
        body:
          'If a user says “Notice of Inspection,” the assistant asks for the deadline, employer name, worksite state, and contact information, then escalates the matter toward human review.',
      },
    ],
    faqs: [
      {
        question: 'Should an employer wait on email if an NOI deadline is active?',
        answer:
          'No. Submit the intake if helpful, but call immediately when the audit deadline is short or the records are already under pressure.',
      },
      {
        question: 'Can the office help before a formal inspection notice arrives?',
        answer:
          'Yes. Preventive I-9 review and cleanup planning can reduce unnecessary exposure before the government sets the pace.',
      },
    ],
    disclaimer: legalDisclaimers.employment,
    relatedLinks: immigrationNav,
    ctaLabel: 'Request I-9 Audit Review',
    ctaHref: '/contact/',
  },
  oVisas: {
    path: '/immigration/o-visas-extraordinary-ability/',
    title: 'O Visas',
    metaDescription:
      'O visa immigration representation for extraordinary ability professionals, artists, entrepreneurs, researchers, and qualified support personnel.',
    headline: 'O visa work for people whose record has to prove distinction, not just describe it.',
    subhead:
      'Extraordinary ability cases turn on how the evidence is chosen, framed, sequenced, and defended. The file needs a record story, not just a list of achievements.',
    intro: 'A clean file hits harder when the standard is high.',
    keyPoints: [
      'O-1A and O-1B evidence strategy',
      'Support personnel and event-driven timing review',
      'Public profile, documentation, and role framing',
      'Coordination with employer or petitioner records',
    ],
    sections: [
      {
        title: 'Where O visa cases tighten up',
        body:
          'Weak evidence framing, inconsistent role definitions, rushed timelines, and records that sound impressive but do not actually satisfy the standard are common reasons cases lose force.',
      },
    ],
    faqs: [
      {
        question: 'Does the office only work with artists?',
        answer:
          'No. O visa review can apply to professionals, founders, researchers, artists, and qualified support personnel depending on the record and the role.',
      },
      {
        question: 'Will the page tell me whether I qualify?',
        answer:
          'No. Qualification depends on the evidence, the role, and the filing posture. The intake process helps route the case to review.',
      },
    ],
    disclaimer: legalDisclaimers.employment,
    relatedLinks: immigrationNav,
    ctaLabel: 'Request O Visa Review',
    ctaHref: '/contact/',
  },
  niw: {
    path: '/immigration/national-interest-waiver/',
    title: 'National Interest Waiver',
    metaDescription:
      'National Interest Waiver immigration representation for professionals, entrepreneurs, researchers, and high-value contributors seeking an employment-based green card path.',
    headline: 'National Interest Waiver work for professionals whose record has to show impact, not noise.',
    subhead:
      'NIW cases succeed on disciplined evidence, a clear proposed endeavor, and a record that connects achievement to national importance without hype.',
    intro: 'Federal court is where delay meets a docket. NIW is where the record has to do the persuading early.',
    keyPoints: [
      'Proposed endeavor and evidence architecture',
      'Research, founder, and high-skill professional positioning',
      'Document strategy built for the actual standard',
      'Record review before the filing clock starts',
    ],
    sections: [
      {
        title: 'What a strong NIW file usually needs',
        body:
          'A coherent endeavor, proof of impact, a documented track record, and evidence that can carry the argument without exaggeration.',
      },
    ],
    faqs: [
      {
        question: 'Does the office work with researchers and founders?',
        answer:
          'Yes. NIW review can fit researchers, entrepreneurs, professionals, and other contributors whose work can be documented in the right way.',
      },
      {
        question: 'Is NIW the same as an O visa?',
        answer:
          'No. The standards, timing, and record strategy differ. Intake helps identify which lane needs deeper review.',
      },
    ],
    disclaimer: legalDisclaimers.employment,
    relatedLinks: immigrationNav,
    ctaLabel: 'Request NIW Review',
    ctaHref: '/contact/',
  },
  federalCourt: {
    path: '/immigration/federal-court-relief/',
    title: 'Federal Court Relief',
    metaDescription:
      'Federal court immigration relief including habeas, mandamus, APA actions, unreasonable delay claims, detention challenges, and agency inaction litigation.',
    headline: 'Federal court immigration relief for files that cannot wait on silence, drift, or detention.',
    subhead:
      'When the agency stalls, the record still moves. Habeas, mandamus, APA actions, detention challenges, and other federal court routes require clean facts, procedural posture, and a defensible timeline.',
    intro: 'Federal court is where delay meets a docket.',
    keyPoints: [
      'Mandamus and unreasonable-delay review',
      'Habeas and detention-related federal court routing',
      'APA posture review and administrative record discipline',
      'Escalation for agency silence and stalled cases',
    ],
    sections: [
      {
        title: 'What matters most in the first review',
        body:
          'Jurisdiction, exhaustion, custody, the exact delay, prior agency action or inaction, and the record that shows why ordinary waiting is no longer enough.',
      },
      {
        title: 'How the site handles this lane',
        body:
          'The public site explains the route, flags urgency, and collects the minimum facts needed to decide whether attorney review should move faster.',
      },
    ],
    faqs: [
      {
        question: 'Does a long delay automatically mean a federal case?',
        answer:
          'No. Delay matters, but posture, jurisdiction, the agency record, and exhaustion all affect the answer. The site does not promise a specific route.',
      },
      {
        question: 'Can detained matters route here too?',
        answer:
          'Yes. Detention-related federal court review may overlap with habeas or other time-sensitive relief depending on the posture.',
      },
    ],
    disclaimer: legalDisclaimers.federalCourt,
    relatedLinks: immigrationNav,
    ctaLabel: 'Request Federal Court Review',
    ctaHref: '/contact/',
  },
  creditRepair: {
    path: '/credit-repair/',
    title: 'Credit Repair',
    metaDescription:
      'Credit repair in Gretna, Louisiana focused on record review, dispute strategy, documentation cleanup, and follow-up without false guarantees.',
    headline: 'Credit repair built on records, not promises.',
    subhead:
      'The work starts with the file: what is listed, what is wrong, what can be documented, what should be disputed, and what needs follow-up.',
    intro: 'Moves stay clean. Every word airtight.',
    keyPoints: [
      'Credit report review and issue mapping',
      'Dispute strategy built on records, not slogans',
      'Documentation cleanup and follow-up verification',
      'Identity-related reporting issues and outdated information review',
    ],
    sections: [
      {
        title: 'What the page will not promise',
        body:
          'No guaranteed deletions, no guaranteed score jumps, no magic-credit language. The work is record review, careful dispute planning, and clean follow-up.',
      },
      {
        title: 'What helps the first review',
        body:
          'Recent reports, the items you believe are wrong, any dispute history, collection records, duplicate accounts, inaccurate balances, and identity-related reporting issues.',
      },
    ],
    faqs: [
      {
        question: 'Can the office guarantee score improvement?',
        answer:
          'No. The site and intake process do not promise deletion, score increases, or any specific credit result.',
      },
      {
        question: 'Can the office review duplicate or outdated accounts?',
        answer:
          'Yes. Duplicate account issues, outdated information, and documentation cleanup are part of the review lane.',
      },
    ],
    disclaimer: legalDisclaimers.creditRepair,
    relatedLinks: [
      { href: '/credit-repair/credit-report-review/', label: 'Credit Report Review' },
      { href: '/credit-repair/dispute-strategy/', label: 'Dispute Strategy' },
      { href: '/contact/', label: 'Contact' },
    ],
    ctaLabel: 'Review My Credit File',
    ctaHref: '/contact/',
  },
  creditReportReview: {
    path: '/credit-repair/credit-report-review/',
    title: 'Credit Report Review',
    metaDescription:
      'Credit report review for inaccurate balances, duplicate lines, outdated items, identity-related reporting issues, and documentation cleanup.',
    headline: 'Credit report review that starts with what is actually on the file.',
    subhead:
      'Before any dispute strategy makes sense, the record has to be read cleanly: what is wrong, what is stale, what is duplicated, and what can be documented.',
    intro: 'A clean file hits harder.',
    keyPoints: [
      'Line-by-line review of the current report',
      'Incorrect balances, duplicate accounts, and outdated entries',
      'Identity-related reporting concerns',
      'Follow-up map for the next dispute or correction lane',
    ],
    sections: [
      {
        title: 'Why file review matters first',
        body:
          'Weak disputes often start with a weak read of the record. Review comes before pressure, and documentation comes before demand letters.',
      },
    ],
    faqs: [
      {
        question: 'Should I send full financial records through the public form?',
        answer:
          'No. Use the public form for routing and basic issue identification only. Sensitive supporting material belongs in a more controlled review lane.',
      },
      {
        question: 'Can a review include public record or inquiry issues?',
        answer:
          'Yes, where appropriate. The first review maps what is present and what part of the file deserves follow-up.',
      },
    ],
    disclaimer: legalDisclaimers.creditRepair,
    relatedLinks: [
      { href: '/credit-repair/', label: 'Credit Repair Hub' },
      { href: '/credit-repair/dispute-strategy/', label: 'Dispute Strategy' },
    ],
    ctaLabel: 'Start Credit Report Review',
    ctaHref: '/contact/',
  },
  disputeStrategy: {
    path: '/credit-repair/dispute-strategy/',
    title: 'Dispute Strategy',
    metaDescription:
      'Credit dispute strategy built on documentation, issue prioritization, clean wording, and follow-up that avoids false promises.',
    headline: 'Dispute strategy for records that need clean pressure, not noise.',
    subhead:
      'The point is not to spray generic letters. The point is to identify what is wrong, choose the right sequence, and put accurate disputes in writing that can be defended later.',
    intro: 'Every word airtight.',
    keyPoints: [
      'Issue prioritization and dispute sequencing',
      'Documentation cleanup before outbound disputes',
      'Follow-up verification and response tracking',
      'No guarantee language and no illegal credit-repair claims',
    ],
    sections: [
      {
        title: 'What good dispute strategy avoids',
        body:
          'Template noise, guaranteed-result language, and dispute volume that ignores the actual evidence. Clean pressure is better than loud pressure.',
      },
    ],
    faqs: [
      {
        question: 'Does the office promise deletions?',
        answer:
          'No. The office reviews records, prepares disputes where appropriate, and follows the file. No page promises deletion or score improvement.',
      },
      {
        question: 'Can follow-up be part of the plan?',
        answer:
          'Yes. Follow-up verification and documentation review are part of the strategy when the record calls for it.',
      },
    ],
    disclaimer: legalDisclaimers.creditRepair,
    relatedLinks: [
      { href: '/credit-repair/', label: 'Credit Repair Hub' },
      { href: '/credit-repair/credit-report-review/', label: 'Credit Report Review' },
    ],
    ctaLabel: 'Request Dispute Strategy Review',
    ctaHref: '/contact/',
  },
  trafficTickets: {
    path: '/traffic-tickets/',
    title: 'Traffic Tickets',
    metaDescription:
      'Louisiana traffic ticket help for citations, court dates, license-risk review, local court coordination, and practical record-first strategy.',
    headline: 'Louisiana traffic ticket help without courthouse theater.',
    subhead:
      'When a citation has a court date, a deadline, or a license risk, the first move is simple: get the record clean, identify the court, and decide the next step.',
    intro: 'When Louisiana court calls, put it on Steel.',
    keyPoints: [
      'Louisiana-only traffic ticket review',
      'Court-date, deadline, and license-risk triage',
      'Moving and non-moving violation routing',
      'Practical next-step planning without criminal-defense theater',
    ],
    sections: [
      {
        title: 'What the office needs first',
        body:
          'The citation, the court or parish, the deadline, the driver’s concerns, and whether the risk is mainly cost, appearance, insurance, or license exposure.',
      },
    ],
    faqs: [
      {
        question: 'Does the office handle traffic matters outside Louisiana?',
        answer:
          'No. Traffic ticket services are limited to Louisiana matters at this time.',
      },
      {
        question: 'Can the assistant route urgent court dates?',
        answer:
          'Yes. It can flag urgency, collect the court date, and push the matter toward human review. It does not give legal advice.',
      },
    ],
    disclaimer: legalDisclaimers.traffic,
    relatedLinks: [{ href: '/contact/', label: 'Contact' }],
    ctaLabel: 'Review My Ticket',
    ctaHref: '/contact/',
  },
  notary: {
    path: '/notary/',
    title: 'Notary',
    metaDescription:
      'Remote online and mobile notary services in Louisiana, subject to availability, identity verification, document type, and compliance requirements.',
    headline: 'Signed. Sealed. Steel’d.',
    subhead:
      'Remote online and mobile notary services for documents that need proper identity verification, careful execution, and a clean record.',
    intro: 'From the ink to the chain.',
    keyPoints: [
      'Acknowledgments, jurats, affidavits, and powers of attorney',
      'Remote online and mobile notary routing',
      'Identity, location, and document-type review',
      'Louisiana availability and compliance limits respected from the start',
    ],
    sections: [
      {
        title: 'What helps the first notary review',
        body:
          'Document type, signer availability, required timing, location, ID readiness, and whether the matter needs remote online or mobile service.',
      },
    ],
    faqs: [
      {
        question: 'Does the office guarantee immediate availability?',
        answer:
          'No. Notary availability depends on document type, identity verification, location, technology requirements, and applicable Louisiana law.',
      },
      {
        question: 'Can the assistant collect the basics first?',
        answer:
          'Yes. It can ask for location, document type, signer availability, ID, and timing so the office starts with the right facts.',
      },
    ],
    disclaimer: legalDisclaimers.notary,
    relatedLinks: [{ href: '/contact/', label: 'Contact' }],
    ctaLabel: 'Book Notary Help',
    ctaHref: '/contact/',
  },
};

export function buildAbsoluteUrl(path: string) {
  return new URL(path, firm.domain).toString();
}

export function buildPageTitle(pageTitle: string) {
  return `${pageTitle} | ${firm.name}`;
}

export const socialProof = [
  'Record-first legal workflows',
  'Privacy-aware intake',
  'Multilingual routing',
  'Cloudflare-first launch path',
];
