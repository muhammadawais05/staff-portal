import { Item } from '@toptal/picasso/TagSelector'
import { AutocompleteEdge } from '@staff-portal/graphql/staff'
import { TaskTagFragment, TaskTagEdgeFragment } from '@staff-portal/tasks'

const getItemValue = ({ value: itemValue }: Item) => itemValue as string

export const prepareTaskTags = (
  tags?: TaskTagFragment[]
): TaskTagEdgeFragment[] | undefined =>
  tags?.map(tag => ({ key: tag.id, node: tag, label: tag.name }))

export const diffTagLists = (
  left: Item[] = [],
  right: Item[] = [],
  getKey = getItemValue
) =>
  right.find(rightItem =>
    left.every(leftItem => getKey(leftItem) !== getKey(rightItem))
  )

export const getItemKey = (item: Item) => (item as AutocompleteEdge).key

export const getItemId = (item: Item) =>
  (item as AutocompleteEdge).node?.id ?? null

export const getItemLabel = (item: Item | null) =>
  (item as AutocompleteEdge)?.label ?? ''
