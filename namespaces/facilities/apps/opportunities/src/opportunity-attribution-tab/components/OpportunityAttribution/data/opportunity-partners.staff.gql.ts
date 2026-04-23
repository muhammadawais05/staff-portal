import { gql, useQuery } from '@staff-portal/data-layer-service'

import { OpportunityPartnersDocument } from './opportunity-partners.staff.gql.types'

export const OPPORTUNITY_PARTNERS = gql`
  query OpportunityPartners {
    opportunityPartners
  }
`

export const useOpportunityPartners = () => {
  const { data, ...restOptions } = useQuery(OpportunityPartnersDocument, {
    fetchPolicy: 'cache-first'
  })

  return {
    opportunityPartners: data?.opportunityPartners,
    ...restOptions
  }
}
