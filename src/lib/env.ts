export type SiteEnv = Partial<Env> & {
  MAIL_TRANSPORT_MODE?: 'mock' | 'proton_smtp' | 'disabled';
  ASSISTANT_PROVIDER?: 'static_rules' | 'lumo_official_api' | 'cloudflare_workers_ai';
  CF_PAGES_BRANCH?: string;
  CF_PAGES_URL?: string;
};
