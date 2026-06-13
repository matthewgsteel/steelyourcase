import type { AssistantInput } from '@/lib/forms';
import type { AssistantResponsePayload } from '@/lib/assistant/providers/staticRules';

export async function cloudflareWorkersAiProvider(
  _input: AssistantInput
): Promise<AssistantResponsePayload> {
  throw new Error('Cloudflare Workers AI fallback is not enabled for this launch.');
}
