import { TagItem } from '../../types'

const getTagItemMock = (tagItem: Partial<TagItem> = {}) => ({
  id: tagItem.name ?? 'tag-1',
  name: 'tag',
  ...tagItem
})

export default getTagItemMock
