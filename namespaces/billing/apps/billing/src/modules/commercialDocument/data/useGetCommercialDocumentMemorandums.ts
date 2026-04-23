import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetCommercialDocumentMemorandumsQuery } from './getCommercialDocumentMemorandums.graphql.types'

export const useGetCommercialDocumentMemorandums = (nodeId: string) =>
  useGetNode(useGetCommercialDocumentMemorandumsQuery)({ nodeId })
