import { defineType, defineField } from 'sanity'

export const giftingPage = defineType({
  name: 'giftingPage',
  title: 'Gifting Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', type: 'string' }),
    defineField({ name: 'heroBody', type: 'text' }),
  ],
})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'announcementText', type: 'string' }),
    defineField({ name: 'instagramUrl', type: 'url' }),
    defineField({ name: 'pinterestUrl', type: 'url' }),
  ],
})
