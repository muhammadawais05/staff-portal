import {
  gql,
  useQuery,
  QueryHookOptions
} from '@staff-portal/data-layer-service'

import {
  GetServerTimeZoneDocument,
  GetServerTimeZoneQuery,
  GetServerTimeZoneQueryVariables
} from './get-server-time-zone.staff.gql.types'

export default gql`
  query GetServerTimeZone {
    viewer {
      me {
        id
      }
      serverTimeZone {
        name
        value
      }
    }
  }
`

export const useGetServerTimeZone = (
  options?: QueryHookOptions<
    GetServerTimeZoneQuery,
    GetServerTimeZoneQueryVariables
  >
) => {
  const { data, ...restResult } = useQuery(GetServerTimeZoneDocument, {
    fetchPolicy: 'cache-first',
    ...options
  })

  return {
    data: data?.viewer.serverTimeZone,
    ...restResult
  }
}
