import { mountTurnstile, readTurnstileToken, resetTurnstile } from '@/scripts/turnstile';

type AssistantApiResult = {
  assistantMessage?: string;
  error?: string;
  riskLevel?: string;
  shouldEscalate?: boolean;
  suggestedNextStep?: string;
};

const root = document.querySelector<HTMLElement>('[data-record-room]');

if (root) {
  const toggle = root.querySelector<HTMLButtonElement>('[data-record-room-toggle]');
  const panel = root.querySelector<HTMLElement>('[data-record-room-panel]');
  const form = root.querySelector<HTMLFormElement>('[data-record-room-form]');
  const messages = root.querySelector<HTMLElement>('[data-record-room-messages]');
  const status = root.querySelector<HTMLElement>('[data-record-room-status]');
  const widgetHost = root.querySelector<HTMLElement>('[data-turnstile-widget="assistant"]');

  let open = false;

  const setOpen = (next: boolean) => {
    open = next;
    panel?.toggleAttribute('hidden', !next);
    toggle?.setAttribute('aria-expanded', String(next));
    document.dispatchEvent(new CustomEvent('steel:assistant-open', { detail: { open: next } }));
  };

  toggle?.addEventListener('click', () => setOpen(!open));

  widgetHost && mountTurnstile(widgetHost).catch((error) => {
    if (status) {
      status.textContent = error instanceof Error ? error.message : 'Unable to load Turnstile.';
    }
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!status || !messages || !widgetHost) {
      return;
    }

    status.textContent = 'Routing your message...';
    messages.innerHTML = '';

    const formData = new FormData(form);
    const token = readTurnstileToken(widgetHost);

    if (!token) {
      status.textContent = 'Please complete the anti-spam check before sending.';
      return;
    }

    const payload = {
      practiceArea: String(formData.get('practiceArea') || 'immigration'),
      locale: String(formData.get('locale') || 'en'),
      pageContext: document.body.dataset.sitePath || 'general',
      userMessage: String(formData.get('userMessage') || ''),
      conversationState: [],
      turnstileToken: token,
    };

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as AssistantApiResult;
      if (!response.ok) {
        throw new Error(result.error || 'The assistant could not route this request.');
      }

      status.textContent = result.shouldEscalate
        ? 'This needs attorney review or a call now.'
        : 'Routing guidance ready.';

      messages.innerHTML = `
        <article class="record-room__message">
          <h3>Routing response</h3>
          <p>${escapeHtml(result.assistantMessage)}</p>
          <p><strong>Next step:</strong> ${escapeHtml(result.suggestedNextStep)}</p>
          <p><strong>Risk level:</strong> ${escapeHtml(result.riskLevel)}</p>
        </article>
      `;

      form.reset();
      resetTurnstile(widgetHost);
    } catch (error) {
      status.textContent =
        error instanceof Error ? error.message : 'The assistant could not route this request.';
    }
  });
}

function escapeHtml(value: string | undefined) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
