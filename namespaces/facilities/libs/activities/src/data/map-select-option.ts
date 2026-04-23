import { SelectOption } from '@toptal/picasso'

export const mapSelectOption = (
  items: Record<string, string>,
  itemsOrder: string[]
): SelectOption[] => {
  return itemsOrder.map(key => ({
    text: items[key],
    value: key
  }))
}
