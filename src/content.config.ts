import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'zod';

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const textItemSchema = z.object({
  text: z.string(),
});

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  title: z.string().optional(),
});

const ctaLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const ctaPanelSchema = z.object({
  kicker: z.string().optional(),
  title: z.string(),
  copy: z.string(),
  label: z.string(),
  href: z.string(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const homepage = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/homepage' }),
  schema: z.object({
    url: z.string(),
    seoTitle: z.string(),
    metaDescription: z.string(),
    hero: z.object({
      kicker: z.string(),
      title: z.string(),
      subhead: z.string(),
      primaryCta: ctaLinkSchema,
      secondaryCta: ctaLinkSchema,
      trustStrip: z.array(textItemSchema),
      image: imageSchema,
    }),
    practiceCards: z.array(
      z.object({
        title: z.string(),
        href: z.string(),
        image: imageSchema,
        copy: z.string(),
        cta: z.string(),
      })
    ),
    steelMethodIntro: z.object({
      kicker: z.string(),
      title: z.string(),
      copy: z.string(),
    }),
    steelMethod: z.array(
      z.object({
        title: z.string(),
        copy: z.string(),
      })
    ),
    immigrationHighlight: z.object({
      kicker: z.string(),
      title: z.string(),
      copy: z.string(),
      links: z.array(
        z.object({
          label: z.string(),
          href: z.string(),
          summary: z.string(),
        })
      ),
    }),
    languages: z.object({
      kicker: z.string(),
      title: z.string(),
      copy: z.string(),
      list: z.array(textItemSchema),
    }),
    footerCta: ctaPanelSchema,
  }),
});

const aboutPage = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about-page' }),
  schema: z.object({
    url: z.string(),
    title: z.string(),
    metaDescription: z.string(),
    heroKicker: z.string(),
    heroTitle: z.string(),
    heroSubhead: z.string(),
    summaryTitle: z.string(),
    summaryItems: z.array(textItemSchema),
    sections: z.array(
      z.object({
        title: z.string(),
        body: z.string(),
      })
    ),
    sidebarTitle: z.string(),
    sidebarLines: z.array(textItemSchema),
    sidebarCta: ctaLinkSchema,
    footerCta: ctaPanelSchema,
  }),
});

const contactPage = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/contact-page' }),
  schema: z.object({
    url: z.string(),
    title: z.string(),
    metaDescription: z.string(),
    heroKicker: z.string(),
    heroTitle: z.string(),
    heroSubhead: z.string(),
    directContactTitle: z.string(),
    formSectionTitle: z.string(),
    submitLabel: z.string(),
    statusMessage: z.string(),
    bestForTitle: z.string(),
    bestForItems: z.array(textItemSchema),
    doNotSendTitle: z.string(),
    doNotSendItems: z.array(textItemSchema),
    privacyNotice: z.string(),
  }),
});

const immigrationPage = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/immigration-page' }),
  schema: z.object({
    url: z.string(),
    title: z.string(),
    metaDescription: z.string(),
    headline: z.string(),
    subhead: z.string(),
    intro: z.string(),
    summaryTitle: z.string(),
    keyPoints: z.array(textItemSchema),
    sections: z.array(
      z.object({
        title: z.string(),
        body: z.string(),
        points: z.array(textItemSchema).optional(),
        links: z.array(linkSchema).optional(),
      })
    ),
    sidebarTitle: z.string(),
    sidebarCopy: z.string(),
    faqTitle: z.string(),
    faqs: z.array(faqSchema),
    disclaimer: z.string().optional(),
    relatedLinks: z.array(linkSchema).optional(),
    cta: ctaPanelSchema,
  }),
});

export const collections = {
  homepage,
  'about-page': aboutPage,
  'contact-page': contactPage,
  'immigration-page': immigrationPage,
};
