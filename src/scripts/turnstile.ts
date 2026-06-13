declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove?: (widgetId: string) => void;
    };
    __turnstileLoader?: Promise<void>;
  }
}

type TurnstileState = {
  widgetId?: string;
  token: string;
};

const widgetState = new WeakMap<HTMLElement, TurnstileState>();

function getSiteKey() {
  return document.body.dataset.turnstileSiteKey?.trim() ?? '';
}

async function loadTurnstileScript() {
  if (window.turnstile) {
    return;
  }

  if (!window.__turnstileLoader) {
    window.__turnstileLoader = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile-loader]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Unable to load Turnstile.')), {
          once: true,
        });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.turnstileLoader = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Unable to load Turnstile.'));
      document.head.appendChild(script);
    });
  }

  return window.__turnstileLoader;
}

export async function mountTurnstile(container: HTMLElement) {
  const siteKey = getSiteKey();
  if (!siteKey) {
    widgetState.set(container, { token: '' });
    container.innerHTML =
      '<p class="turnstile-help">Turnstile site key is not configured for this environment yet.</p>';
    return;
  }

  await loadTurnstileScript();

  if (!window.turnstile) {
    throw new Error('Turnstile failed to initialize.');
  }

  const state: TurnstileState = { token: '' };
  widgetState.set(container, state);

  state.widgetId = window.turnstile.render(container, {
    sitekey: siteKey,
    theme: 'dark',
    callback: (token) => {
      state.token = token;
    },
    'expired-callback': () => {
      state.token = '';
    },
  });
}

export function readTurnstileToken(container: HTMLElement) {
  return widgetState.get(container)?.token ?? '';
}

export function resetTurnstile(container: HTMLElement) {
  const state = widgetState.get(container);
  if (!state?.widgetId || !window.turnstile) {
    return;
  }

  state.token = '';
  window.turnstile.reset(state.widgetId);
}
