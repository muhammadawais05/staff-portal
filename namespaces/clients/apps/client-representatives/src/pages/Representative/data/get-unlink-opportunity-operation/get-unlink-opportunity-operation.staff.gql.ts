import { gql } from 'graphql-tag'
import { concatMessages, useGetNode } from '@staff-portal/data-layer-service'
import {
  isOperationEnabled,
  OPERATION_FRAGMENT
} from '@staff-portal/operations'

import { GetUnlinkOpportunityOperationDocument } from './get-unlink-opportunity-operation.staff.gql.types'

export default gql`
  query GetUnlinkOpportunityOperation(
    $representativeId: ID!
    $opportunityId: ID
  ) {
    node(id: $representativeId) {
      ... on CompanyRepresentative {
        operations {
          unlinkOpportunityCompanyRepresentative(
            opportunityId: $opportunityId
          ) {
            ...OperationFragment
          }
        }
      }
    }
  }

  ${OPERATION_FRAGMENT}
`

export const useGetUnlinkOpportunityOperation = (
  representativeId: string,
  opportunityId?: string
) => {
  const { data, loading, error } = useGetNode(
    GetUnlinkOpportunityOperationDocument
  )({ representativeId, opportunityId })

  const operation = data?.operations.unlinkOpportunityCompanyRepresentative

  return {
    enabled: !loading && isOperationEnabled(operation),
    error: !isOperationEnabled(operation)
      ? concatMessages(operation?.messages) || error?.message
      : null,
    loading,
    operation
  }
}
