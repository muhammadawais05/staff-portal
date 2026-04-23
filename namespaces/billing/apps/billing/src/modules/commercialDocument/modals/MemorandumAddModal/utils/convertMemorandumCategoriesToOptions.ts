import { MemorandumCategoryCommonFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumCategoryCommon.graphql.types'

export const convertMemorandumCategoriesToOptions = (
  nodes?: MemorandumCategoryCommonFragment[]
) => {
  return nodes?.length
    ? nodes.map(({ id, name }) => ({
        text: name,
        value: id
      }))
    : undefined
}
