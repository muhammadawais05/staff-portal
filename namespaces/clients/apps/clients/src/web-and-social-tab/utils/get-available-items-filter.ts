import { isSubstring } from '@toptal/picasso/utils'
import { Item } from '@toptal/picasso/TagSelector'

export const getAvailableItemsFilter = (
  selectedItems: string[] = [],
  searchInput = ''
) => (itemsList?: Item[]) => {
  if (!itemsList) {
    return []
  }

  if ((!selectedItems || !selectedItems.length) && !searchInput) {
    return itemsList
  }

  const availableItems = itemsList?.filter(
    option => !selectedItems?.includes(option?.value || '')
  )

  return searchInput !== ''
    ? availableItems?.filter(({ value }) =>
        isSubstring(searchInput, String(value))
      )
    : availableItems
}
