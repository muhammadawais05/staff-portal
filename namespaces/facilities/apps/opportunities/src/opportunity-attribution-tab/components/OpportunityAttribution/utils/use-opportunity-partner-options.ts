import { useMemo } from 'react'

import { useOpportunityPartners } from '../data/opportunity-partners.staff.gql'

const useOpportunityPartnerOptions = () => {
  const { opportunityPartners, loading } = useOpportunityPartners()
  const opportunityPartnerOptions = useMemo(
    () =>
      opportunityPartners?.map(item => ({
        text: item,
        value: item
      })) || [],
    [opportunityPartners]
  )

  return { opportunityPartnerOptions, loading }
}

export default useOpportunityPartnerOptions
