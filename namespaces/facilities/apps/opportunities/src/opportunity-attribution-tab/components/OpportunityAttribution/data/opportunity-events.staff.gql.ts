import { gql, useQuery } from '@staff-portal/data-layer-service'

import { OpportunityEventsDocument } from './opportunity-events.staff.gql.types'

export const OPPORTUNITY_EVENTS = gql`
  query OpportunityEvents {
    opportunityEvents
  }
`

export const useOpportunityEvents = () => {
  const { data, ...restOptions } = useQuery(OpportunityEventsDocument, {
    fetchPolicy: 'cache-first'
  })

  return {
    opportunityEvents: data?.opportunityEvents,
    ...restOptions
  }
}
