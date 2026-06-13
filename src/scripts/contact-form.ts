import { matterTypes } from '@/lib/forms';
import { mountTurnstile, readTurnstileToken, resetTurnstile } from '@/scripts/turnstile';

type ContactApiResult = {
  error?: string;
  message?: string;
};

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

if (form) {
  const practiceArea = form.querySelector('[name="practiceArea"]');
  const matterType = form.querySelector('[name="matterType"]');
  const status = form.querySelector<HTMLElement>('[data-contact-status]');
  const widgetHost = form.querySelector<HTMLElement>('[data-turnstile-widget="contact"]');

  const syncMatterTypes = () => {
    if (!(practiceArea instanceof HTMLSelectElement) || !(matterType instanceof HTMLSelectElement)) {
      return;
    }

    const options =
      matterTypes[practiceArea.value as keyof typeof matterTypes] ?? matterTypes.Other;
    matterType.replaceChildren(
      ...options.map((option) => {
        const element = document.createElement('option');
        element.value = option;
        element.textContent = option;
        return element;
      })
    );
  };

  syncMatterTypes();

  if (practiceArea instanceof HTMLSelectElement) {
    practiceArea.addEventListener('change', syncMatterTypes);
  }

  widgetHost && mountTurnstile(widgetHost).catch((error) => {
    if (status) {
      status.textContent = error instanceof Error ? error.message : 'Unable to load Turnstile.';
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!widgetHost || !status) {
      return;
    }

    const formData = new FormData(form);
    const token = readTurnstileToken(widgetHost);
    if (!token) {
      status.textContent = 'Please complete the anti-spam check before sending.';
      return;
    }

    document.dispatchEvent(new CustomEvent('steel:contact-submit'));
    status.textContent = 'Sending your message...';

    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      preferredLanguage: String(formData.get('preferredLanguage') || 'English'),
      practiceArea: String(formData.get('practiceArea') || 'Immigration'),
      matterType: String(formData.get('matterType') || ''),
      urgency: String(formData.get('urgency') || 'No deadline yet'),
      deadline: String(formData.get('deadline') || ''),
      shortMessage: String(formData.get('shortMessage') || ''),
      consent: formData.get('consent') === 'on',
      turnstileToken: token,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactApiResult;
      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message.');
      }

      status.textContent = result.message || 'Your message has been received.';
      form.reset();
      syncMatterTypes();
      resetTurnstile(widgetHost);
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : 'Unable to send your message.';
    }
  });
}
