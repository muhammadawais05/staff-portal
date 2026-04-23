import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetClientContactsDocument } from './get-client-contacts.staff.gql.types'

export default gql`
  query GetClientContacts($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        fullName
        contact {
          id
          fullName
          contacts(filter: { type: [PHONE, SKYPE] }) {
            nodes {
              id
              type
              value
            }
          }
        }
      }
    }
  }
`

export const useGetClientContacts = ({ clientId }: { clientId: string }) =>
  useGetNode(GetClientContactsDocument)({
    clientId
  })
