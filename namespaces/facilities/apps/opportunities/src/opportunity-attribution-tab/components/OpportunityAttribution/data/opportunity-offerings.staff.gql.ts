import { gql, useQuery } from '@staff-portal/data-layer-service'

import { OpportunityOfferingsDocument } from './opportunity-offerings.staff.gql.types'

export const OPPORTUNITY_OFFERINGS = gql`
  query OpportunityOfferings {
    opportunityOfferings
  }
`

export const useOpportunityOfferings = () => {
  const { data, ...restOptions } = useQuery(OpportunityOfferingsDocument, {
    fetchPolicy: 'cache-first'
  })

  return {
    opportunityOfferings: data?.opportunityOfferings,
    ...restOptions
  }
}
