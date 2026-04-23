import { useMemo } from 'react'

import { useOpportunityEvents } from '../data/opportunity-events.staff.gql'

const useOpportunityEventsOptions = () => {
  const { opportunityEvents, loading } = useOpportunityEvents()
  const opportunityEventOptions = useMemo(
    () =>
      opportunityEvents?.map(item => ({
        text: item,
        value: item
      })) || [],
    [opportunityEvents]
  )

  return { opportunityEventOptions, loading }
}

export default useOpportunityEventsOptions
