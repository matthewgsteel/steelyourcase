import { buildAbsoluteUrl, firm, type FaqItem, type LinkItem, type ServicePageData } from './site';

export function breadcrumbSchema(items: LinkItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': buildAbsoluteUrl(item.href),
        name: item.label,
      },
    })),
  };
}

export function organizationSchema() {
  const address = `${firm.addressLines[0]}, ${firm.addressLines[1]}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: firm.name,
      url: firm.domain,
      email: firm.email,
      telephone: firm.phoneDisplay,
      sameAs: [`https://instagram.com/${firm.handle.replace('@', '')}`],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Attorney',
      name: firm.attorney,
      worksFor: {
        '@type': 'LegalService',
        name: firm.name,
      },
      address,
      telephone: firm.phoneDisplay,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: firm.name,
      url: firm.domain,
      address,
      telephone: firm.phoneDisplay,
      email: firm.email,
      areaServed: ['Gretna, Louisiana', 'United States'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: firm.name,
      url: firm.domain,
      address,
      telephone: firm.phoneDisplay,
      email: firm.email,
    },
  ];
}

export function serviceSchema(page: ServicePageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: page.title,
    name: `${page.title} | ${firm.name}`,
    provider: {
      '@type': 'LegalService',
      name: firm.name,
      url: firm.domain,
    },
    areaServed: ['Gretna, Louisiana', 'United States'],
    description: page.metaDescription,
    url: buildAbsoluteUrl(page.path),
  };
}

export function faqSchema(items: FaqItem[]) {
  if (items.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
