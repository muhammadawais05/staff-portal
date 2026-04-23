import { useMemo } from 'react'

import { useOpportunityOfferings } from '../data/opportunity-offerings.staff.gql'

const useOpportunityOfferingOptions = () => {
  const { opportunityOfferings, loading } = useOpportunityOfferings()
  const opportunityOfferingOptions = useMemo(
    () =>
      opportunityOfferings?.map(item => ({
        text: item,
        value: item
      })) || [],
    [opportunityOfferings]
  )

  return { opportunityOfferingOptions, loading }
}

export default useOpportunityOfferingOptions
