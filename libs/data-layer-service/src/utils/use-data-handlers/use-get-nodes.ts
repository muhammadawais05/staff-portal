import { TypedDocumentNode } from '@graphql-typed-document-node/core'

import { useGetData } from './use-get-data'

export const useGetNodes = <
  TData extends { nodes?: Partial<{}> | null },
  TVariables
>(
  document: TypedDocumentNode<TData, TVariables>
) => useGetData<TData, TVariables>(document, 'nodes')
