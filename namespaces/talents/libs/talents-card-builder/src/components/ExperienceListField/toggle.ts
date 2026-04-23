import { toggle } from '../../utils/toggle'
import { ExperienceSelectionItem } from '../../types'

const toggleExperience = (
  items: ExperienceSelectionItem[],
  item: ExperienceSelectionItem
) => {
  toggle(items, item, (firstItem, secondItem) => {
    return firstItem.id === secondItem.id && firstItem.type === secondItem.type
  })

  return items
}

export { toggleExperience }
