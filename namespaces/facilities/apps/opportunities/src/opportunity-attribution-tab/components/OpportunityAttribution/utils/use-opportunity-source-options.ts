import { useMemo } from 'react'

import { useOpportunitySources } from '../data/opportunity-sources.staff.gql'

const useOpportunitySourceOptions = () => {
  const { opportunitySources, loading } = useOpportunitySources()
  const opportunitySourceOptions = useMemo(
    () =>
      opportunitySources?.map(item => ({
        text: item,
        value: item
      })) || [],
    [opportunitySources]
  )

  return { opportunitySourceOptions, loading }
}

export default useOpportunitySourceOptions
