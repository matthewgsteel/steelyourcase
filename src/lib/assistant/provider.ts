import type { SiteEnv } from '@/lib/env';
import type { AssistantInput } from '@/lib/forms';
import { cloudflareWorkersAiProvider } from '@/lib/assistant/providers/cloudflareWorkersAi';
import { lumoOfficialApiProvider } from '@/lib/assistant/providers/lumoOfficialApi';
import {
  createStaticRulesResponse,
  type AssistantResponsePayload,
} from '@/lib/assistant/providers/staticRules';

export async function resolveAssistantResponse(
  input: AssistantInput,
  env: SiteEnv
): Promise<AssistantResponsePayload> {
  switch (env.ASSISTANT_PROVIDER) {
    case 'lumo_official_api':
      return lumoOfficialApiProvider(input, env);
    case 'cloudflare_workers_ai':
      return cloudflareWorkersAiProvider(input);
    default:
      return createStaticRulesResponse(input);
  }
}
