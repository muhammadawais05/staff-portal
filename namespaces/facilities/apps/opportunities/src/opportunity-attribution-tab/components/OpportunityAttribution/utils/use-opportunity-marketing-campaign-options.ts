import { useMemo } from 'react'

import { useOpportunityMarketingCampaigns } from '../data/opportunity-marketing-campaigns.staff.gql'

const useOpportunityMarketingCampaignOptions = () => {
  const { opportunityMarketingCampaigns, loading } =
    useOpportunityMarketingCampaigns()
  const opportunityMarketingCampaignOptions = useMemo(
    () =>
      opportunityMarketingCampaigns?.map(item => ({
        text: item,
        value: item
      })) || [],
    [opportunityMarketingCampaigns]
  )

  return { opportunityMarketingCampaignOptions, loading }
}

export default useOpportunityMarketingCampaignOptions
