import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useSetDisputeMutation } from './setDisputeMutation.graphql.types'
import { useSetUpdateDisputeMutation } from './setUpdateDisputeMutation.graphql.types'
import { useGetDisputeCommercialDocumentQuery } from './getDisputeCommercialDocument.graphql.types'

export const useGetDisputeCommercialDocument = (id: string) =>
  useGetNode(useGetDisputeCommercialDocumentQuery)({ id })

export {
  useSetDisputeMutation,
  useGetDisputeCommercialDocumentQuery,
  useSetUpdateDisputeMutation
}
