import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetDepositRefundAllowedDocument } from './get-deposit-refund-allowed.staff.gql.types'

export const GET_DEPOSIT_REFUND_ALLOWED: typeof GetDepositRefundAllowedDocument = gql`
  query GetDepositRefundAllowed($companyId: ID!) {
    node(id: $companyId) {
      ... on Client {
        id
        depositRefundAllowed
      }
    }
  }
`

export const useGetDepositRefundAllowed = (companyId: string) => {
  const { data, ...restOptions } = useQuery(GET_DEPOSIT_REFUND_ALLOWED, {
    throwOnError: true,
    variables: { companyId }
  })

  return {
    isDepositRefundAllowed: data?.node?.depositRefundAllowed ?? false,
    ...restOptions
  }
}
