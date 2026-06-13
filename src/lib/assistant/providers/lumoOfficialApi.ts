import type { AssistantInput } from '@/lib/forms';
import type { SiteEnv } from '@/lib/env';
import type { AssistantResponsePayload } from '@/lib/assistant/providers/staticRules';

export async function lumoOfficialApiProvider(
  _input: AssistantInput,
  env: SiteEnv
): Promise<AssistantResponsePayload> {
  if (!env.LUMO_API_KEY) {
    throw new Error('LUMO_API_KEY is missing. The public Lumo adapter is a future-only stub.');
  }

  throw new Error('The public Lumo adapter is not implemented because Proton has not been approved here for live public website traffic.');
}
