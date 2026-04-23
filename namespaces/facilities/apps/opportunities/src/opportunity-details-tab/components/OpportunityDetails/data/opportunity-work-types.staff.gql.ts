import { gql, useQuery } from '@staff-portal/data-layer-service'

import { OpportunityWorkTypesDocument } from './opportunity-work-types.staff.gql.types'

export const OPPORTUNITY_WORK_TYPES = gql`
  query OpportunityWorkTypes {
    opportunityWorkTypes
  }
`

export const useOpportunityWorkTypes = () => {
  const { data, ...restOptions } = useQuery(OpportunityWorkTypesDocument, {
    fetchPolicy: 'cache-first'
  })

  return {
    opportunityWorkTypes: data?.opportunityWorkTypes,
    ...restOptions
  }
}
