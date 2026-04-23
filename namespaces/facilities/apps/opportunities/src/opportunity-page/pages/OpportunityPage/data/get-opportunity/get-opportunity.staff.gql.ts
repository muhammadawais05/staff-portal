import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { OPPORTUNITY_FRAGMENT } from '@staff-portal/opportunities'

import { GetOpportunityDocument } from './get-opportunity.staff.gql.types'

export const GET_OPPORTUNITY = gql`
  query GetOpportunity($id: ID!) {
    node(id: $id) {
      ... on Opportunity {
        ...OpportunityFragment
      }
    }
  }

  ${OPPORTUNITY_FRAGMENT}
`

export const useGetOpportunity = (opportunityId: string) =>
  useGetNode(GetOpportunityDocument)(
    { id: opportunityId },
    { throwOnError: true }
  )
