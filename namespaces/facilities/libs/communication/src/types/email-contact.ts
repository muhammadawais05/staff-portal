import { EmailMessageFragment } from '../data/email-message-fragment/email-message-fragment.lens.gql.types'

export type EmailContact = EmailMessageFragment['from'] & {
  id?: string
  name?: string
  path?: string
}
