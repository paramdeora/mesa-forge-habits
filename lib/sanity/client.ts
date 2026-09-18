import { createClient, type SanityClient, type QueryParams } from '@sanity/client';

// ─── Config ───────────────────────────────────────────────────────────────────

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-04-01';
const useCdn = process.env.NODE_ENV === 'production';

// ─── Client ───────────────────────────────────────────────────────────────────

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  // Optionally set a read token for private datasets:
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
  stega: {
    enabled: false,
  },
});

// ─── sanityFetch Helper ───────────────────────────────────────────────────────

type SanityFetchOptions<T = unknown> = {
  query: string;
  params?: QueryParams;
  /** Next.js revalidation interval in seconds. Default: 60. Pass 0 for no caching. */
  revalidate?: number | false;
  /** Next.js cache tags for on-demand revalidation */
  tags?: string[];
};

/**
 * Typed wrapper around the Sanity client that integrates with Next.js fetch
 * caching via the `next` option on the underlying fetch call.
 *
 * Falls back gracefully when no projectId is configured (returns `null`).
 */
export async function sanityFetch<T = unknown>(
  options: SanityFetchOptions<T>
): Promise<T | null> {
  const { query, params = {}, revalidate = 60, tags } = options;

  if (!projectId) {
    console.warn(
      '[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — returning null for query.'
    );
    return null;
  }

  try {
    const result = await client.fetch<T>(query, params, {
      next: {
        revalidate,
        ...(tags && tags.length > 0 ? { tags } : {}),
      },
    });

    return result ?? null;
  } catch (error) {
    console.error('[sanity] fetch error:', error);
    return null;
  }
}

/**
 * Preview client — use this inside draft-mode routes only.
 * Requires SANITY_API_READ_TOKEN with viewer permissions.
 */
export function getPreviewClient(): SanityClient {
  return client.withConfig({
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
    perspective: 'previewDrafts',
  });
}
