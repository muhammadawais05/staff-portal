import { gql, useQuery } from '@staff-portal/data-layer-service'

import { OpportunitySourcesDocument } from './opportunity-sources.staff.gql.types'

export const OPPORTUNITY_SOURCES = gql`
  query OpportunitySources {
    opportunitySources
  }
`

export const useOpportunitySources = () => {
  const { data, ...restOptions } = useQuery(OpportunitySourcesDocument, {
    fetchPolicy: 'cache-first'
  })

  return {
    opportunitySources: data?.opportunitySources,
    ...restOptions
  }
}
