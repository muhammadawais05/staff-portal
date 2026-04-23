import { HighlightItem, HighlightType } from '../../types'

const sum = (numbers: number[]) =>
  numbers.reduce((acc, value) => acc + value, 0)

export const getHighlightItemTypeCount = (
  items: HighlightItem[],
  itemTypes: HighlightType[]
) => {
  let total = 0

  itemTypes.forEach(itemType => {
    if (itemType === 'employment') {
      total += sum(
        items
          .filter(({ type }) => type === itemType)
          .map(({ description_items }) => description_items?.length ?? 0)
      )
    } else {
      total += items.filter(({ type }) => type === itemType).length
    }
  })

  return total
}
