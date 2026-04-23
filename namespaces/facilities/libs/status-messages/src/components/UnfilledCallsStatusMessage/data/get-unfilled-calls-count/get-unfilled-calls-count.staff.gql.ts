import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetUnfilledCallsCountDocument } from './get-unfilled-calls-count.staff.gql.types'

export const GET_UNFILLED_CALLS_COUNT = gql`
  query GetUnfilledCallsCount {
    viewer {
      calls(pagination: { offset: 0, limit: 1000000 }, isUnfilled: true) {
        totalCount
      }
    }
  }
`

export const useGetUnfilledCallsCount = () => {
  const { data, ...restOptions } = useQuery(GetUnfilledCallsCountDocument, {
    fetchPolicy: 'cache-first'
  })

  return { data: data?.viewer?.calls.totalCount, ...restOptions }
}
