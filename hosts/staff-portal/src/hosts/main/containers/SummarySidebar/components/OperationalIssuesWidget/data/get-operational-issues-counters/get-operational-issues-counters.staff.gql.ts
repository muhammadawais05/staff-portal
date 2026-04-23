import { gql, useGetData, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetOperationalIssuesCountersDocument } from './get-operational-issues-counters.staff.gql.types'
import { SUMMARY_SIDEBAR_BATCH_KEY } from '../../../../config'

export const GET_OPERATIONAL_ISSUES_COUNTERS = gql`
  query GetOperationalIssuesCounters {
    operationalIssues(
      filter: { ownedBy: ALL }
      pagination: { offset: 0, limit: 0 }
    ) {
      counters {
        all
        escalated
        mine
        team
        __typename
      }
      __typename
    }
  }
`

export const useGetOperationalIssuesCounters = () => {
  const { data, ...restOptions } = useGetData(
    GetOperationalIssuesCountersDocument,
    'operationalIssues'
  )(undefined, {
    throwOnError: true,
    context: { [BATCH_KEY]: SUMMARY_SIDEBAR_BATCH_KEY }
  })

  return { ...restOptions, data: data?.counters }
}
