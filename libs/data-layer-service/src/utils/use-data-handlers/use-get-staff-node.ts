import { TypedDocumentNode } from '@graphql-typed-document-node/core'

import { useGetData } from './use-get-data'

export const useGetStaffNode = <
  TData extends { staffNode?: Partial<{}> | null },
  TVariables
>(
  document: TypedDocumentNode<TData, TVariables>
) => useGetData<TData, TVariables>(document, 'staffNode')
