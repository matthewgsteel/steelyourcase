import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();

function readRepoFile(relativePath: string) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

describe('CloudCannon pilot wiring', () => {
  it('adds CloudCannon visual editing support to the Astro app', () => {
    const packageJson = readRepoFile('package.json');
    const astroConfig = readRepoFile('astro.config.mjs');

    expect(packageJson).toContain('@cloudcannon/editable-regions');
    expect(astroConfig).toContain('@cloudcannon/editable-regions/astro-integration');
    expect(astroConfig).toContain('editableRegions()');
    expect(existsSync(path.join(repoRoot, 'src/scripts/register-cloudcannon-components.js'))).toBe(true);
  });

  it('creates four collection-backed pilot content files and a CloudCannon config file', () => {
    const requiredFiles = [
      'cloudcannon.config.yml',
      'src/content.config.ts',
      'src/content/homepage/index.md',
      'src/content/about-page/index.md',
      'src/content/contact-page/index.md',
      'src/content/immigration-page/index.md',
    ];

    for (const relativePath of requiredFiles) {
      expect(existsSync(path.join(repoRoot, relativePath))).toBe(true);
    }

    const cloudCannonConfig = readRepoFile('cloudcannon.config.yml');

    expect(cloudCannonConfig).toContain('collections_config:');
    expect(cloudCannonConfig).toContain('homepage:');
    expect(cloudCannonConfig).toContain('about_page:');
    expect(cloudCannonConfig).toContain('contact_page:');
    expect(cloudCannonConfig).toContain('immigration_page:');
    expect(cloudCannonConfig).toContain("url: '{url}'");
  });

  it('wires editable regions into the homepage, about, contact, and immigration surfaces', () => {
    const baseLayout = readRepoFile('src/layouts/BaseLayout.astro');
    const hero = readRepoFile('src/components/Hero.astro');
    const cta = readRepoFile('src/components/CTA.astro');
    const practiceCard = readRepoFile('src/components/PracticeCard.astro');
    const servicePage = readRepoFile('src/components/ServicePage.astro');
    const homePage = readRepoFile('src/pages/index.astro');
    const aboutPage = readRepoFile('src/pages/about.astro');
    const contactPage = readRepoFile('src/pages/contact.astro');
    const immigrationPage = readRepoFile('src/pages/immigration/index.astro');

    expect(baseLayout).toContain('register-cloudcannon-components.js');

    expect(hero).toContain('data-editable="text"');
    expect(hero).toContain('data-editable="image"');
    expect(practiceCard).toContain('data-editable="text"');
    expect(practiceCard).toContain('data-editable="image"');
    expect(cta).toContain('data-editable=');
    expect(servicePage).toContain('data-editable=');

    expect(homePage).toContain("getCollection('homepage')");
    expect(homePage).toContain('editable-component');
    expect(aboutPage).toContain("getCollection('about-page')");
    expect(contactPage).toContain("getCollection('contact-page')");
    expect(immigrationPage).toContain("getCollection('immigration-page')");
  });
});
