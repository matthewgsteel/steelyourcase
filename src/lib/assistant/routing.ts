export type AssistantRiskLevel = 'low' | 'medium' | 'high';

export type AssistantRiskFlag =
  | 'deadline'
  | 'detention'
  | 'sensitive_data'
  | 'inspection'
  | 'guarantee_request'
  | 'louisiana_only';

const sensitivePatterns = [
  /\b\d{3}-\d{2}-\d{4}\b/,
  /\b[Aa][- ]?\d{8,9}\b/,
  /\bpassport\b/i,
  /\bpassword\b/i,
  /\bseed phrase\b/i,
  /\bprivate key\b/i,
];

export function detectRiskFlags(message: string, practiceArea: string) {
  const normalized = message.toLowerCase();
  const flags = new Set<AssistantRiskFlag>();

  if (
    normalized.includes('deadline') ||
    normalized.includes('tomorrow') ||
    normalized.includes('hearing') ||
    normalized.includes('court')
  ) {
    flags.add('deadline');
  }

  if (normalized.includes('detained') || normalized.includes('detention') || normalized.includes('ice')) {
    flags.add('detention');
  }

  if (normalized.includes('notice of inspection') || normalized.includes('noi')) {
    flags.add('inspection');
  }

  if (practiceArea === 'traffic-tickets' && !normalized.includes('louisiana')) {
    flags.add('louisiana_only');
  }

  if (normalized.includes('guarantee') || normalized.includes('delete my bad credit')) {
    flags.add('guarantee_request');
  }

  if (sensitivePatterns.some((pattern) => pattern.test(message))) {
    flags.add('sensitive_data');
  }

  return [...flags];
}

export function riskLevelFromFlags(flags: AssistantRiskFlag[]): AssistantRiskLevel {
  if (flags.includes('detention') || flags.includes('inspection') || flags.includes('sensitive_data')) {
    return 'high';
  }

  if (flags.includes('deadline') || flags.includes('guarantee_request') || flags.includes('louisiana_only')) {
    return 'medium';
  }

  return 'low';
}
