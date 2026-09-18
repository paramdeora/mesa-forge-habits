import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string', initialValue: 'New Collection' }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', initialValue: 'Monsoon Noir' }),
    defineField({ name: 'heroBody', title: 'Hero Body Text', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'editorialTitle', title: 'Editorial Section Title', type: 'string' }),
    defineField({ name: 'editorialBody', title: 'Editorial Section Body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'editorialImage', title: 'Editorial Section Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'seo', title: 'SEO', type: 'object', fields: [
      defineField({ name: 'title', type: 'string' }),
      defineField({ name: 'description', type: 'text', rows: 2 }),
    ]}),
  ],
})
