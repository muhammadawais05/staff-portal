import { gql, useLazyQuery } from '@staff-portal/data-layer-service'
import { CLIENT_FRAGMENT } from '@staff-portal/clients'

import {
  GetClientDocument,
  GetClientQueryVariables
} from './get-lazy-client.staff.gql.types'

export const GET_CLIENT: typeof GetClientDocument = gql`
  query GetClient($id: ID!, $isClientsList: Boolean!) {
    node(id: $id) {
      ...ClientFragment
    }
  }

  ${CLIENT_FRAGMENT}
`

export const useGetLazyClient = (variables: GetClientQueryVariables) =>
  useLazyQuery(GET_CLIENT, {
    variables
  })
