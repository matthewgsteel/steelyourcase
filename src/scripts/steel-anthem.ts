type SoundCloudWidget = {
  bind: (event: string, callback: () => void) => void;
  pause: () => void;
  play: () => void;
  setVolume: (value: number) => void;
};

declare global {
  interface Window {
    SC?: {
      Widget: (iframe: HTMLIFrameElement) => SoundCloudWidget;
    };
    __soundCloudLoader?: Promise<void>;
  }
}

const STORAGE_KEYS = {
  enabled: 'steelAnthemEnabled',
  dismissed: 'steelAnthemDismissed',
  interacted: 'steelAnthemHasInteracted',
  volume: 'steelAnthemVolume',
};

const defaults = {
  enabled: true,
  dismissed: false,
  volume: 35,
};

const root = document.querySelector<HTMLElement>('[data-steel-anthem]');

if (root) {
  const title = root.querySelector<HTMLButtonElement>('[data-anthem-toggle-panel]');
  const panel = root.querySelector<HTMLElement>('[data-anthem-panel]');
  const slot = root.querySelector<HTMLElement>('[data-anthem-player-slot]');
  const status = root.querySelector<HTMLElement>('[data-anthem-status]');
  const playButton = root.querySelector<HTMLButtonElement>('[data-anthem-play]');
  const pauseButton = root.querySelector<HTMLButtonElement>('[data-anthem-pause]');
  const muteButton = root.querySelector<HTMLButtonElement>('[data-anthem-mute]');
  const hideButton = root.querySelector<HTMLButtonElement>('[data-anthem-hide]');
  const footerToggle = document.querySelector<HTMLButtonElement>('[data-anthem-footer-toggle]');
  const footerLabel = document.querySelector<HTMLElement>('[data-anthem-toggle-text]');

  let expanded = false;
  let iframe: HTMLIFrameElement | null = null;
  let widget: SoundCloudWidget | null = null;
  let assistantVolume: number | null = null;

  const readBoolean = (key: string, fallback: boolean) => {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value === 'true';
  };

  const readVolume = () => Number(localStorage.getItem(STORAGE_KEYS.volume) || defaults.volume);

  const setBoolean = (key: string, value: boolean) => localStorage.setItem(key, String(value));
  const setStoredVolume = (value: number) => localStorage.setItem(STORAGE_KEYS.volume, String(value));

  const state = {
    enabled: readBoolean(STORAGE_KEYS.enabled, defaults.enabled),
    dismissed: readBoolean(STORAGE_KEYS.dismissed, defaults.dismissed),
    interacted: readBoolean(STORAGE_KEYS.interacted, false),
    volume: readVolume(),
  };

  const updateUi = () => {
    root.hidden = state.dismissed && !state.enabled;
    if (footerLabel) {
      footerLabel.textContent = state.enabled ? 'On' : 'Off';
    }
    if (status) {
      status.textContent = state.enabled
        ? 'Tap to play the Steel Your Case anthem.'
        : 'Anthem off';
    }
    panel?.toggleAttribute('hidden', !expanded);
    title?.setAttribute('aria-expanded', String(expanded));
  };

  const ensureSoundCloudApi = async () => {
    if (window.SC?.Widget) {
      return;
    }

    if (!window.__soundCloudLoader) {
      window.__soundCloudLoader = new Promise<void>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>('script[data-soundcloud-loader]');
        if (existing) {
          existing.addEventListener('load', () => resolve(), { once: true });
          existing.addEventListener('error', () => reject(new Error('Unable to load SoundCloud.')), {
            once: true,
          });
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://w.soundcloud.com/player/api.js';
        script.async = true;
        script.defer = true;
        script.dataset.soundcloudLoader = 'true';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Unable to load SoundCloud.'));
        document.head.appendChild(script);
      });
    }

    await window.__soundCloudLoader;
  };

  const ensurePlayer = async () => {
    if (!slot) {
      return;
    }

    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'steel-anthem-player';
      iframe.title = 'Steel Your Case Studio Anthem Mix';
      iframe.width = '100%';
      iframe.height = '166';
      iframe.allow = 'autoplay; encrypted-media';
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('scrolling', 'no');
      iframe.src =
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2338830416&color=%2328241c&auto_play=true&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';
      slot.replaceChildren(iframe);
    }

    await ensureSoundCloudApi();
    if (!widget && iframe && window.SC?.Widget) {
      widget = window.SC.Widget(iframe);
      widget.bind('ready', () => {
        widget?.setVolume(state.volume);
        if (state.enabled) {
          widget?.play();
        }
      });
    }
  };

  const play = async () => {
    state.enabled = true;
    state.dismissed = false;
    state.interacted = true;
    setBoolean(STORAGE_KEYS.enabled, true);
    setBoolean(STORAGE_KEYS.dismissed, false);
    setBoolean(STORAGE_KEYS.interacted, true);
    expanded = true;
    updateUi();

    try {
      await ensurePlayer();
      widget?.setVolume(state.volume);
      widget?.play();
      if (status) {
        status.textContent = 'Studio Anthem Mix playing.';
      }
    } catch (error) {
      if (status) {
        status.textContent =
          error instanceof Error ? error.message : 'Unable to load the anthem right now.';
      }
    }
  };

  const pause = () => {
    widget?.pause();
    if (status) {
      status.textContent = state.enabled ? 'Anthem paused.' : 'Anthem off';
    }
  };

  const mute = () => {
    state.enabled = false;
    setBoolean(STORAGE_KEYS.enabled, false);
    pause();
    updateUi();
  };

  const hide = () => {
    state.dismissed = true;
    state.enabled = false;
    setBoolean(STORAGE_KEYS.dismissed, true);
    setBoolean(STORAGE_KEYS.enabled, false);
    pause();
    updateUi();
  };

  title?.addEventListener('click', () => {
    expanded = !expanded;
    updateUi();
  });

  playButton?.addEventListener('click', () => void play());
  pauseButton?.addEventListener('click', pause);
  muteButton?.addEventListener('click', mute);
  hideButton?.addEventListener('click', hide);

  footerToggle?.addEventListener('click', async () => {
    if (state.enabled) {
      mute();
    } else {
      await play();
    }
  });

  document.addEventListener(
    'steel:assistant-open',
    (event: Event) => {
      const open = (event as CustomEvent<{ open: boolean }>).detail.open;
      if (!widget) {
        return;
      }

      if (open) {
        assistantVolume = state.volume;
        widget.setVolume(15);
      } else if (assistantVolume !== null) {
        widget.setVolume(assistantVolume);
      }
    },
    { passive: true }
  );

  document.addEventListener(
    'steel:contact-submit',
    () => {
      widget?.pause();
      if (status) {
        status.textContent = 'Anthem paused while intake is submitted.';
      }
    },
    { passive: true }
  );

  document.addEventListener(
    'pointerdown',
    () => {
      if (!state.interacted) {
        state.interacted = true;
        setBoolean(STORAGE_KEYS.interacted, true);
        if (state.enabled) {
          void play();
        }
      }
    },
    { once: true, passive: true }
  );

  if (state.dismissed && !state.enabled) {
    root.hidden = true;
  }

  updateUi();
  setStoredVolume(state.volume);
}

export {};
