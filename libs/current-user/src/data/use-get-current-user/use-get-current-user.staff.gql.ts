import {
  CRITICAL_APP_QUERIES_BATCH_KEY,
  gql,
  useQuery,
  BATCH_KEY
} from '@staff-portal/data-layer-service'

import {
  GetCurrentUserQuery,
  GetCurrentUserDocument
} from './use-get-current-user.staff.gql.types'

export type CurrentUser = GetCurrentUserQuery['viewer']['me']

export const GET_CURRENT_USER: typeof GetCurrentUserDocument = gql`
  query GetCurrentUser {
    viewer {
      me {
        id
        email
        fullName
        type
        timeZone {
          name
          value
        }
      }
    }
  }
`

export const useGetCurrentUser = () => {
  const { data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-first',
    context: { [BATCH_KEY]: CRITICAL_APP_QUERIES_BATCH_KEY }
  })

  return data?.viewer.me
}
