import { defineType, defineField } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Journal Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['At Home', 'Ritual', 'Ingredients', 'Behind the Brand', 'Gifting'] } }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'object', fields: [
      defineField({ name: 'title', type: 'string' }),
      defineField({ name: 'description', type: 'text', rows: 2 }),
    ]}),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'coverImage' } },
})
