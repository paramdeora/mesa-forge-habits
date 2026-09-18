// ─── Shared Projection Fragments ──────────────────────────────────────────────

const IMAGE_PROJECTION = /* groq */ `{
  _type,
  alt,
  caption,
  hotspot,
  crop,
  "asset": asset-> {
    _id,
    url,
    metadata {
      lqip,
      dimensions { width, height, aspectRatio },
      palette { dominant { background, foreground } }
    }
  }
}`;

const SEO_PROJECTION = /* groq */ `{
  metaTitle,
  metaDescription,
  ogImage ${IMAGE_PROJECTION}
}`;

const ARTICLE_CARD_PROJECTION = /* groq */ `{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  publishedAt,
  category,
  excerpt,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200),
  coverImage ${IMAGE_PROJECTION},
  "author": author-> {
    name,
    "image": image ${IMAGE_PROJECTION}
  }
}`;

// ─── Home Page ────────────────────────────────────────────────────────────────

export const GET_HOMEPAGE_QUERY = /* groq */ `
  *[_type == "homePage"][0] {
    _id,
    _type,
    _updatedAt,
    hero {
      autoplayInterval,
      slides[] {
        _key,
        heading,
        subheading,
        textColor,
        cta { label, href },
        image ${IMAGE_PROJECTION},
        mobileImage ${IMAGE_PROJECTION}
      }
    },
    featuredCollections[] {
      _key,
      title,
      handle,
      description,
      image ${IMAGE_PROJECTION}
    },
    valuePropSection {
      heading,
      items[] {
        _key,
        icon,
        heading,
        body
      }
    },
    journalSection {
      heading,
      subheading,
      "articles": articles[]-> ${ARTICLE_CARD_PROJECTION}
    },
    instagramSection {
      heading,
      handle,
      posts[] {
        _key,
        url,
        image ${IMAGE_PROJECTION}
      }
    },
    seo ${SEO_PROJECTION}
  }
`;

// ─── Articles (Journal List) ──────────────────────────────────────────────────

export const GET_ARTICLES_QUERY = /* groq */ `
  *[_type == "article" && defined(publishedAt)] | order(publishedAt desc) {
    ${ARTICLE_CARD_PROJECTION.slice(1, -1)}
  }
`;

export const GET_ARTICLES_BY_CATEGORY_QUERY = /* groq */ `
  *[_type == "article" && defined(publishedAt) && category == $category]
    | order(publishedAt desc) {
    ${ARTICLE_CARD_PROJECTION.slice(1, -1)}
  }
`;

// ─── Single Article ───────────────────────────────────────────────────────────

export const GET_ARTICLE_QUERY = /* groq */ `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    publishedAt,
    category,
    excerpt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200),
    coverImage ${IMAGE_PROJECTION},
    "author": author-> {
      name,
      bio,
      "image": image ${IMAGE_PROJECTION}
    },
    body[] {
      ...,
      _type == "image" => {
        ...,
        ${IMAGE_PROJECTION.slice(1, -1)}
      }
    },
    "relatedArticles": relatedArticles[]-> ${ARTICLE_CARD_PROJECTION},
    seo ${SEO_PROJECTION}
  }
`;

// Article slugs — for generateStaticParams
export const GET_ARTICLE_SLUGS_QUERY = /* groq */ `
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// ─── Story Page ───────────────────────────────────────────────────────────────

export const GET_STORY_PAGE_QUERY = /* groq */ `
  *[_type == "storyPage"][0] {
    _id,
    _type,
    _updatedAt,
    heading,
    subheading,
    heroImage ${IMAGE_PROJECTION},
    introText,
    missionStatement,
    values[] {
      _key,
      heading,
      body,
      icon
    },
    timeline[] {
      _key,
      year,
      heading,
      body,
      image ${IMAGE_PROJECTION}
    },
    teamSection {
      heading,
      members[] {
        _key,
        name,
        role,
        bio,
        image ${IMAGE_PROJECTION}
      }
    },
    closingCta {
      heading,
      body,
      buttonLabel,
      buttonHref,
      image ${IMAGE_PROJECTION}
    },
    seo ${SEO_PROJECTION}
  }
`;

// ─── Gifting Page ─────────────────────────────────────────────────────────────

export const GET_GIFTING_PAGE_QUERY = /* groq */ `
  *[_type == "giftingPage"][0] {
    _id,
    _type,
    _updatedAt,
    heading,
    subheading,
    heroImage ${IMAGE_PROJECTION},
    introText,
    giftBundles[] {
      _key,
      name,
      description,
      price,
      currencyCode,
      image ${IMAGE_PROJECTION},
      items,
      badge,
      cta { label, href }
    },
    customGiftingSection {
      heading,
      body,
      image ${IMAGE_PROJECTION},
      contactEmail,
      contactPhone
    },
    corporateSection {
      heading,
      body,
      image ${IMAGE_PROJECTION},
      formEnabled
    },
    faq[] {
      _key,
      question,
      answer
    },
    seo ${SEO_PROJECTION}
  }
`;

// ─── Site Settings ────────────────────────────────────────────────────────────

export const GET_SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    siteName,
    tagline,
    logo ${IMAGE_PROJECTION},
    favicon ${IMAGE_PROJECTION},
    seo ${SEO_PROJECTION},
    socialLinks[] {
      _key,
      platform,
      url
    },
    announcement {
      enabled,
      text,
      link
    },
    footerLinks[] {
      _key,
      label,
      href
    }
  }
`;
