import { TypedDocumentNode } from '@staff-portal/data-layer-service'
import { Dictionary } from '@staff-portal/utils'

export type TypedDocumentNodeWithInputVariables = TypedDocumentNode<
  Dictionary,
  {
    input: Dictionary
  }
>
