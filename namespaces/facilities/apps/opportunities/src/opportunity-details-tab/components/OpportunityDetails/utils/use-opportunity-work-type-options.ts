import { useMemo } from 'react'

import { useOpportunityWorkTypes } from '../data/opportunity-work-types.staff.gql'

const useOpportunityWorkTypeOptions = () => {
  const { opportunityWorkTypes, loading } = useOpportunityWorkTypes()
  const opportunityWorkTypeOptions = useMemo(
    () =>
      opportunityWorkTypes?.map(item => ({
        text: item,
        value: item
      })) || [],
    [opportunityWorkTypes]
  )

  return { opportunityWorkTypeOptions, loading }
}

export default useOpportunityWorkTypeOptions
