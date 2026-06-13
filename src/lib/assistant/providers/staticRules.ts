import type { AssistantInput } from '@/lib/forms';
import { assistantDisclaimer, assistantLanguageLine, assistantSensitiveWarning } from '@/lib/assistant/disclaimers';
import { detectRiskFlags, riskLevelFromFlags, type AssistantRiskFlag } from '@/lib/assistant/routing';

export type AssistantResponsePayload = {
  assistantMessage: string;
  riskLevel: 'low' | 'medium' | 'high';
  suggestedNextStep: string;
  intakeFieldsToAsk: string[];
  shouldEscalate: boolean;
  disclaimerRequired: boolean;
};

export function createStaticRulesResponse(input: AssistantInput): AssistantResponsePayload {
  const flags = detectRiskFlags(input.userMessage, input.practiceArea) as AssistantRiskFlag[];
  const riskLevel = riskLevelFromFlags(flags);
  const normalized = input.userMessage.toLowerCase();

  if (flags.includes('sensitive_data')) {
    return {
      assistantMessage: `${assistantSensitiveWarning} This assistant helps route information for review and does not collect that level of sensitive data here.`,
      riskLevel,
      suggestedNextStep: 'Remove the sensitive information, keep the summary high level, and call the office if the matter is urgent.',
      intakeFieldsToAsk: ['general summary', 'deadline', 'contact information'],
      shouldEscalate: true,
      disclaimerRequired: true,
    };
  }

  if (flags.includes('inspection')) {
    return {
      assistantMessage:
        'This may involve employer exposure and a short audit clock. The office needs the deadline, employer name, worksite state, and a contact path as soon as possible.',
      riskLevel,
      suggestedNextStep: 'Submit the secure intake form and call the office now so the audit timing can be triaged.',
      intakeFieldsToAsk: ['deadline', 'employer name', 'worksite state', 'contact information'],
      shouldEscalate: true,
      disclaimerRequired: true,
    };
  }

  if (flags.includes('detention') || normalized.includes('court tomorrow')) {
    return {
      assistantMessage:
        'This may involve a deadline or risk that needs attorney review. Submit the form if you want, but also call +1.833.43.STEEL now so the office can triage timing.',
      riskLevel,
      suggestedNextStep: 'Call the office now and include the detention, hearing, or deadline detail in the secure intake form.',
      intakeFieldsToAsk: ['deadline', 'location', 'case status', 'contact information'],
      shouldEscalate: true,
      disclaimerRequired: true,
    };
  }

  if (input.locale !== 'en') {
    return {
      assistantMessage: assistantLanguageLine,
      riskLevel,
      suggestedNextStep: 'Send the basic intake details in your preferred language and the office will route the file for attorney review.',
      intakeFieldsToAsk: ['practice area', 'deadline', 'contact information', 'preferred language'],
      shouldEscalate: false,
      disclaimerRequired: true,
    };
  }

  if (input.practiceArea === 'credit-repair' && flags.includes('guarantee_request')) {
    return {
      assistantMessage:
        'The office does not promise guaranteed deletions or score jumps. Credit work starts with the record, the reporting problem, and the documentation that supports a clean dispute strategy.',
      riskLevel,
      suggestedNextStep: 'Use the secure intake form to describe the reporting problem, the accounts involved, and any recent dispute history.',
      intakeFieldsToAsk: ['reporting problem', 'account type', 'recent dispute history', 'contact information'],
      shouldEscalate: false,
      disclaimerRequired: true,
    };
  }

  if (input.practiceArea === 'traffic-tickets') {
    return {
      assistantMessage:
        'Traffic ticket services are available for Louisiana matters only at this time. The office needs the citation type, court or parish, date, and the risk you are trying to manage.',
      riskLevel,
      suggestedNextStep: 'Use the secure intake form and include the court date, parish, and whether the issue is mainly appearance, cost, or license risk.',
      intakeFieldsToAsk: ['Louisiana parish', 'court date', 'citation type', 'contact information'],
      shouldEscalate: false,
      disclaimerRequired: true,
    };
  }

  if (input.practiceArea === 'notary') {
    return {
      assistantMessage:
        'For notary routing, the office needs the location, document type, signer availability, ID readiness, and timing.',
      riskLevel,
      suggestedNextStep: 'Use the secure intake form and include whether the matter needs remote online or mobile notary service.',
      intakeFieldsToAsk: ['location', 'document type', 'signer availability', 'ID readiness', 'timing'],
      shouldEscalate: false,
      disclaimerRequired: true,
    };
  }

  return {
    assistantMessage: `${assistantDisclaimer} The fastest route is to identify the practice area, the deadline if there is one, and the part of the record that needs review.`,
    riskLevel,
    suggestedNextStep: 'Use the secure intake form with the deadline, the matter type, and the cleanest short summary you can provide.',
    intakeFieldsToAsk: ['practice area', 'deadline', 'short summary', 'contact information'],
    shouldEscalate: flags.includes('deadline'),
    disclaimerRequired: true,
  };
}
