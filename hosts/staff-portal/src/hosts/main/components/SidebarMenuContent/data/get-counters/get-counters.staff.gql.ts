import {
  BATCH_KEY,
  GENERAL_APP_QUERIES_BATCH_KEY,
  gql,
  useGetData
} from '@staff-portal/data-layer-service'

import { GetCountersDocument } from './get-counters.staff.gql.types'

export default gql`
  query GetCounters {
    viewer {
      counters {
        nodes {
          name
          total
          unread
        }
      }
    }
  }
`

export const useGetCounters = () => {
  const { data, ...restOptions } = useGetData(GetCountersDocument, 'viewer')(
    undefined,
    {
      context: { [BATCH_KEY]: GENERAL_APP_QUERIES_BATCH_KEY }
    }
  )

  return { ...restOptions, data: data?.counters.nodes }
}
