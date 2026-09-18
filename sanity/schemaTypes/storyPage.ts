import { defineType, defineField } from 'sanity'

export const storyPage = defineType({
  name: 'storyPage',
  title: 'Brand Story Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Our Story' }),
    defineField({ name: 'heroText', title: 'Hero Opening Statement', type: 'text' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Page Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
  ],
})

export const giftingPage = defineType({
  name: 'giftingPage',
  title: 'Gifting Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', type: 'string', initialValue: 'The considered gift for people with taste.' }),
    defineField({ name: 'heroBody', type: 'text' }),
    defineField({ name: 'giftSets', title: 'Gift Sets', type: 'array', of: [{ type: 'object', fields: [
      defineField({ name: 'name', type: 'string' }),
      defineField({ name: 'description', type: 'text' }),
      defineField({ name: 'price', type: 'number' }),
      defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
      defineField({ name: 'featured', type: 'boolean' }),
    ]}]}),
  ],
})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'announcementText', title: 'Announcement Bar Text', type: 'string' }),
    defineField({ name: 'instagramUrl', type: 'url' }),
    defineField({ name: 'pinterestUrl', type: 'url' }),
  ],
})
