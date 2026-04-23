import {
  gql,
  useQuery,
  BATCH_KEY,
  GENERAL_APP_QUERIES_BATCH_KEY
} from '@staff-portal/data-layer-service'

import { GetEmailContactsDocument } from './get-email-contacts.staff.gql.types'

export const GET_EMAIL_CONTACTS = gql`
  query GetEmailContacts {
    viewer {
      me {
        id
        contacts(filter: { type: EMAIL }) {
          nodes {
            id
            value
          }
        }
      }
    }
  }
`

export const useGetEmailContacts = () => {
  const { data } = useQuery(GetEmailContactsDocument, {
    context: { [BATCH_KEY]: GENERAL_APP_QUERIES_BATCH_KEY }
  })

  return {
    contacts: data?.viewer.me.contacts.nodes
  }
}
