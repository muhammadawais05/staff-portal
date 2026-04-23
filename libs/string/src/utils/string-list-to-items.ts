import { Item } from '@toptal/picasso/TagSelector'

export const stringListToItems = (list?: string[] | null): Item[] =>
  list?.map(item => ({ text: item, value: item })) || []
