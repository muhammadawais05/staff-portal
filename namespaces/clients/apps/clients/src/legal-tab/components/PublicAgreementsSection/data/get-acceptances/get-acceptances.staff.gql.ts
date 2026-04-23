import { gql, useGetStaffNode } from '@staff-portal/data-layer-service'

import { GetAgreementAcceptancesDocument } from './get-acceptances.staff.gql.types'

export const GET_AGREEMENT_ACCEPTANCES_LINKS = gql`
  query GetAgreementAcceptances($clientId: ID!) {
    staffNode(id: $clientId) {
      ... on Client {
        id

        agreementAcceptancesLinks {
          url
          text
        }
      }
    }
  }
`

export const useGetAgreementAcceptances = (clientId: string) => {
  const { data: company, ...rest } = useGetStaffNode(
    GetAgreementAcceptancesDocument
  )({ clientId })

  return { company, ...rest }
}
