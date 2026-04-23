import { gql, useQuery, LENS_CONTEXT } from '@staff-portal/data-layer-service'

import { GetMailboxesDocument } from './get-mailboxes.lens.gql.types'
import { useGetEmailContacts } from '../get-email-contacts'

export const GET_MAILBOXES: typeof GetMailboxesDocument = gql`
  query GetMailboxes($emails: [Address!]!) {
    mailboxes(emails: $emails) {
      entities {
        email
        id
      }
    }
  }
`
export const useGetMailboxes = () => {
  const { contacts } = useGetEmailContacts()
  const emails = contacts?.map(contact => contact.value)
  const hasEmailContactsResolved = Boolean(emails)

  const { data } = useQuery(GET_MAILBOXES, {
    context: { type: LENS_CONTEXT },
    skip: !hasEmailContactsResolved,
    variables: { emails: emails as string[] }
  })

  return {
    mailboxes: data?.mailboxes.entities
  }
}
