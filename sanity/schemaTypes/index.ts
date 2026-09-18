import { type SchemaTypeDefinition } from 'sanity'
import { article } from './article'
import { homepage } from './homepage'
import { storyPage } from './storyPage'
import { giftingPage } from './giftingPage'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, article, storyPage, giftingPage, siteSettings],
}
