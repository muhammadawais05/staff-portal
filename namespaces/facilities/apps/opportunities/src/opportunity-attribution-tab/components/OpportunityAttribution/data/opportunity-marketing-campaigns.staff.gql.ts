import { gql, useQuery } from '@staff-portal/data-layer-service'

import { OpportunityMarketingCampaignsDocument } from './opportunity-marketing-campaigns.staff.gql.types'

export const OPPORTUNITY_MARKETING_CAMPAIGNS = gql`
  query OpportunityMarketingCampaigns {
    opportunityMarketingCampaigns
  }
`

export const useOpportunityMarketingCampaigns = () => {
  const { data, ...restOptions } = useQuery(
    OpportunityMarketingCampaignsDocument,
    {
      fetchPolicy: 'cache-first'
    }
  )

  return {
    opportunityMarketingCampaigns: data?.opportunityMarketingCampaigns,
    ...restOptions
  }
}
