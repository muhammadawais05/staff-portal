import { GraphQLResolveInfo } from 'graphql'
import { decodeEntityId } from '@staff-portal/data-layer-service'

const resolveNodeTypes = (obj: unknown, info?: GraphQLResolveInfo) => {
  // workaround to auto-resolve types
  const { id, __typename } = obj as { id: string; __typename?: string }

  if (id) {
    try {
      const { type } = decodeEntityId(id)

      if (type) {
        return type as string
      }
    } catch {
      //
    }
  }

  if (__typename) {
    return __typename as any
  }

  const firstSelection = info?.fieldNodes[0]?.selectionSet?.selections[0]

  const typeNameFormQuery =
    firstSelection?.kind === 'InlineFragment'
      ? firstSelection?.typeCondition?.name?.value
      : null

  if (typeNameFormQuery) {
    return typeNameFormQuery as string
  }

  throw new Error(
    'Entity type is missing. Please provide an encoded ID or a __typename'
  )
}

export default resolveNodeTypes
