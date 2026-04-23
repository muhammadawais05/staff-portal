import { DetailedListItems } from '../types'

export const filterHiddenRows = (processedElements: DetailedListItems) => {
  return processedElements.reduce<DetailedListItems>(
    (acc, processedElementsItem) => {
      if (Array.isArray(processedElementsItem)) {
        const innerItems = processedElementsItem.filter(
          itemInner => !itemInner?.hidden
        )

        if (innerItems.length > 0) {
          acc.push(innerItems)
        }
      } else if (!processedElementsItem.hidden) {
        acc.push(processedElementsItem)
      }

      return acc
    },
    []
  )
}
