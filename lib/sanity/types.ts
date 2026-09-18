// ─── Sanity Primitive / Reference Types ──────────────────────────────────────

export interface SanityReference {
  _type: 'reference';
  _ref: string;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export type SanityMarkDef = {
  _key: string;
  _type: string;
  href?: string;
  [key: string]: unknown;
};

export interface SanitySpan {
  _key: string;
  _type: 'span';
  marks: string[];
  text: string;
}

export interface SanityBlock {
  _type: 'block';
  _key: string;
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  listItem?: 'bullet' | 'number';
  level?: number;
  markDefs: SanityMarkDef[];
  children: SanitySpan[];
}

export interface SanityImageBlock {
  _type: 'image';
  _key: string;
  asset: SanityReference;
  alt?: string;
  caption?: string;
}

export interface SanityCodeBlock {
  _type: 'code';
  _key: string;
  code: string;
  language?: string;
  filename?: string;
}

export type PortableTextBlock = SanityBlock | SanityImageBlock | SanityCodeBlock;

// ─── Sanity Image ─────────────────────────────────────────────────────────────

export interface SanityImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface SanityImagePaletteSwatch {
  background: string;
  foreground: string;
  population?: number;
  title?: string;
}

export interface SanityImageMetadata {
  lqip: string;
  dimensions: SanityImageDimensions;
  palette?: {
    dominant?: SanityImagePaletteSwatch;
    darkMuted?: SanityImagePaletteSwatch;
    darkVibrant?: SanityImagePaletteSwatch;
    lightMuted?: SanityImagePaletteSwatch;
    lightVibrant?: SanityImagePaletteSwatch;
    muted?: SanityImagePaletteSwatch;
    vibrant?: SanityImagePaletteSwatch;
  };
}

export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata: SanityImageMetadata;
}

export interface SanityImage {
  _type: 'image';
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  asset: SanityImageAsset;
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

export interface SanitySEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export type SocialPlatform =
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'youtube'
  | 'pinterest'
  | 'tiktok';

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  siteName: string;
  tagline?: string;
  logo?: SanityImage;
  favicon?: SanityImage;
  seo: SanitySEO;
  socialLinks?: Array<{
    _key: string;
    platform: SocialPlatform;
    url: string;
  }>;
  announcement?: {
    enabled: boolean;
    text: string;
    link?: string;
  };
  footerLinks?: Array<{
    _key: string;
    label: string;
    href: string;
  }>;
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export interface HeroSlide {
  _key: string;
  heading: string;
  subheading?: string;
  cta?: { label: string; href: string };
  image: SanityImage;
  mobileImage?: SanityImage;
  textColor?: 'light' | 'dark';
}

export interface FeaturedCollection {
  _key: string;
  title: string;
  handle: string;
  description?: string;
  image: SanityImage;
}

export type ValuePropIcon = 'flame' | 'leaf' | 'hand' | 'gift' | 'clock' | 'star';

export interface ValuePropItem {
  _key: string;
  icon: ValuePropIcon;
  heading: string;
  body: string;
}

export interface InstagramPost {
  _key: string;
  image: SanityImage;
  url: string;
}

export interface HomePage {
  _id: string;
  _type: 'homePage';
  _updatedAt: string;
  hero: {
    slides: HeroSlide[];
    autoplayInterval?: number;
  };
  featuredCollections?: FeaturedCollection[];
  valuePropSection?: {
    heading?: string;
    items: ValuePropItem[];
  };
  journalSection?: {
    heading: string;
    subheading?: string;
    articles: ArticleListItem[];
  };
  instagramSection?: {
    heading?: string;
    handle?: string;
    posts?: InstagramPost[];
  };
  seo?: SanitySEO;
}

// ─── Article (Journal) ────────────────────────────────────────────────────────

export type ArticleCategory =
  | 'ritual'
  | 'ingredients'
  | 'lifestyle'
  | 'behind-the-scenes'
  | 'seasonal';

export interface ArticleAuthor {
  name: string;
  bio?: string;
  image?: SanityImage;
}

export interface Article {
  _id: string;
  _type: 'article';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  category: ArticleCategory;
  excerpt?: string;
  coverImage: SanityImage;
  author?: ArticleAuthor;
  body: PortableTextBlock[];
  relatedArticles?: ArticleListItem[];
  estimatedReadingTime?: number;
  seo?: SanitySEO;
}

/** Lightweight projection returned by list queries and embedded references */
export interface ArticleListItem {
  _id: string;
  _type: 'article';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  category: ArticleCategory;
  excerpt?: string;
  coverImage: SanityImage;
  author?: Pick<ArticleAuthor, 'name' | 'image'>;
  estimatedReadingTime?: number;
}

// ─── Story Page ───────────────────────────────────────────────────────────────

export interface TimelineItem {
  _key: string;
  year: string;
  heading: string;
  body: string;
  image?: SanityImage;
}

export interface TeamMember {
  _key: string;
  name: string;
  role: string;
  bio?: string;
  image?: SanityImage;
}

export interface StoryPageValue {
  _key: string;
  heading: string;
  body: string;
  icon?: string;
}

export interface StoryPage {
  _id: string;
  _type: 'storyPage';
  _updatedAt: string;
  heading: string;
  subheading?: string;
  heroImage: SanityImage;
  introText: PortableTextBlock[];
  missionStatement?: string;
  values?: StoryPageValue[];
  timeline?: TimelineItem[];
  teamSection?: {
    heading?: string;
    members: TeamMember[];
  };
  closingCta?: {
    heading: string;
    body?: string;
    buttonLabel: string;
    buttonHref: string;
    image?: SanityImage;
  };
  seo?: SanitySEO;
}

// ─── Gifting Page ─────────────────────────────────────────────────────────────

export interface GiftBundle {
  _key: string;
  name: string;
  description: string;
  price: number;
  currencyCode?: string;
  image: SanityImage;
  items: string[];
  cta?: { label: string; href: string };
  badge?: string;
}

export interface GiftingPage {
  _id: string;
  _type: 'giftingPage';
  _updatedAt: string;
  heading: string;
  subheading?: string;
  heroImage: SanityImage;
  introText?: PortableTextBlock[];
  giftBundles?: GiftBundle[];
  customGiftingSection?: {
    heading: string;
    body: PortableTextBlock[];
    image?: SanityImage;
    contactEmail?: string;
    contactPhone?: string;
  };
  corporateSection?: {
    heading: string;
    body: PortableTextBlock[];
    image?: SanityImage;
    formEnabled?: boolean;
  };
  faq?: Array<{
    _key: string;
    question: string;
    answer: string;
  }>;
  seo?: SanitySEO;
}
