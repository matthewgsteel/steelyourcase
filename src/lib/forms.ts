import { z } from 'zod';

const emailAddress = z.email();
const isEmailAddress = (value: string) => emailAddress.safeParse(value).success;

export const practiceAreas = ['Immigration', 'Credit Repair', 'Traffic Tickets', 'Notary', 'Other'] as const;

export const urgencyOptions = [
  'No deadline yet',
  'Deadline within 30 days',
  'Deadline within 7 days',
  'Court, hearing, audit, or interview date scheduled',
  'Emergency',
] as const;

export const matterTypes = {
  Immigration: [
    'Family petition',
    'Green card',
    'Asylum or humanitarian relief',
    'Removal defense',
    'Detained immigration matter',
    'Citizenship or naturalization',
    'Employment immigration',
    'Worksite I-9 audit or employer defense',
    'O visa',
    'National Interest Waiver',
    'S visa',
    'T visa',
    'U visa',
    'VAWA',
    'Habeas or federal court relief',
    'Mandamus or agency delay',
    'Other immigration issue',
  ],
  'Credit Repair': [
    'Credit report review',
    'Dispute strategy',
    'Documentation cleanup',
    'Duplicate account issues',
    'Outdated information',
    'Identity-related reporting issue',
    'Other credit issue',
  ],
  'Traffic Tickets': [
    'Moving violation',
    'Non-moving violation',
    'Court date review',
    'License risk review',
    'Louisiana citation strategy',
  ],
  Notary: [
    'Acknowledgment',
    'Jurat',
    'Affidavit',
    'Power of attorney',
    'Remote online notary',
    'Mobile notary',
    'Other document notarization',
  ],
  Other: ['Other'],
} as const;

export const languageOptions = [
  'English',
  'Spanish',
  'Polish',
  'Mandarin Chinese',
  'Vietnamese',
  'Russian',
  'Ukrainian',
] as const;

export const assistantPracticeAreas = ['immigration', 'credit-repair', 'traffic-tickets', 'notary'] as const;
export const assistantLocales = ['en', 'es', 'pl', 'zh', 'vi', 'ru', 'uk'] as const;

export const contactConsentText =
  'I understand that submitting this form does not create an attorney-client relationship. I should not send emergency deadlines or highly sensitive documents through this public form. The firm may contact me to discuss whether representation is available after conflict review and written engagement.';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z
    .string()
    .trim()
    .max(180)
    .refine(isEmailAddress, 'Please enter a valid email address.'),
  phone: z.string().trim().min(7, 'Please enter a valid phone number.').max(40),
  preferredLanguage: z.enum(languageOptions),
  practiceArea: z.enum(practiceAreas),
  matterType: z.string().trim().min(2, 'Please choose a matter type.').max(120),
  urgency: z.enum(urgencyOptions),
  deadline: z.string().trim().max(160).optional().default(''),
  shortMessage: z.string().trim().min(10, 'Please add a short message.').max(5000),
  consent: z.literal(true, {
    error: 'You must confirm the public-intake consent language.',
  }),
  turnstileToken: z.string().trim().min(1, 'Missing Turnstile token.'),
});

export const assistantSchema = z.object({
  userMessage: z.string().trim().min(2).max(1500),
  pageContext: z.string().trim().max(120).default('general'),
  practiceArea: z.enum(assistantPracticeAreas).default('immigration'),
  locale: z.enum(assistantLocales).default('en'),
  conversationState: z.array(z.string().trim().max(600)).max(10).default([]),
  turnstileToken: z.string().trim().min(1, 'Missing Turnstile token.'),
});

export const mailProbeSchema = z.object({
  recipient: z
    .string()
    .trim()
    .refine(isEmailAddress, 'Please enter a valid email address.')
    .optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type AssistantInput = z.infer<typeof assistantSchema>;
export type MailProbeInput = z.infer<typeof mailProbeSchema>;

export function resolveMatterTypes(practiceArea: string) {
  const key = practiceArea as keyof typeof matterTypes;
  return matterTypes[key] ?? matterTypes.Other;
}
