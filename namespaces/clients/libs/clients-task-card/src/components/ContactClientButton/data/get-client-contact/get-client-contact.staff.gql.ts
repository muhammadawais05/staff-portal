import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetClientContactDocument,
  GetClientContactQuery
} from './get-client-contact.staff.gql.types'

export const GET_CLIENT_CONTACT: typeof GetClientContactDocument = gql`
  query GetClientContact($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        contact {
          id
          contacts(filter: { type: [EMAIL, PHONE, SKYPE] }) {
            nodes {
              ...ContactMethodFragment
            }
          }
        }
      }
    }
  }

  fragment ContactMethodFragment on Contact {
    category
    id
    note
    primary
    type
    value
  }
`

export const useGetLazyClientContact = ({
  clientId,
  onCompleted,
  onError
}: {
  clientId: string
  onCompleted: (data: GetClientContactQuery) => void
  onError: (error: Error) => void
}) => {
  const [getData, { data, error, loading }] = useLazyQuery(GET_CLIENT_CONTACT, {
    variables: {
      clientId
    },
    onCompleted,
    onError,
    fetchPolicy: 'cache-first'
  })

  return { getData, data: data?.node?.contact, error, loading }
}
