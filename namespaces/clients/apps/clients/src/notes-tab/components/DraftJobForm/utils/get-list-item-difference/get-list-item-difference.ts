import { Item } from '@toptal/picasso/TagSelector'

export const getListItemDifference = ({
  originalList,
  compareList
}: {
  originalList: Item[]
  compareList: Item[]
}) =>
  originalList.find(({ value: originalValue }) =>
    compareList.every(
      ({ value: compareValue }) => originalValue !== compareValue
    )
  )
