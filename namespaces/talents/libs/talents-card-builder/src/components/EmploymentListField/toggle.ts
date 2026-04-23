import { toggle } from '../../utils/toggle'
import { HighlightItem } from '../../types'

const removeIfEmpty = <T, T2>(draft: T[], item: T2[], index: number) => {
  if (item.length === 0) {
    draft.splice(index, 1)
  }

  return draft
}

const toggleEmployment = (items: HighlightItem[], id: string) => {
  const item: HighlightItem = {
    id,
    description_items: [],
    type: 'employment'
  }

  toggle(items, item, current => current.id === id)

  return items
}

const toggleEmploymentDescription = (
  draft: HighlightItem[],
  id: string,
  description: string
) => {
  const index = draft.findIndex(item => item.id === id)

  if (index >= 0) {
    const item = draft[index]

    item.description_items = item.description_items?.slice() ?? []

    toggle(item.description_items, description)
    removeIfEmpty(draft, item.description_items, index)
  } else {
    draft.push({ id, description_items: [description], type: 'employment' })
  }

  return draft
}

export { toggleEmployment, toggleEmploymentDescription }
