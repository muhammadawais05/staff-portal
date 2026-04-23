
import {
  GENERAL_APP_QUERIES_BATCH_KEY,
  gql,
  useGetData
,BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetUserInfoDocument } from './get-user-info.staff.gql.types'

export const GET_USER_INFO = gql`
  query GetUserInfo {
    viewer {
      me {
        id
        fullName
        type
        photo {
          thumb
        }
      }
    }
  }
`

export const useGetUserInfo = () =>
  useGetData(GetUserInfoDocument, 'viewer')(undefined, {
    throwOnError: true,
    returnPartialData: true,
    fetchPolicy: 'cache-first',
    context: { [BATCH_KEY]: GENERAL_APP_QUERIES_BATCH_KEY }
  })
