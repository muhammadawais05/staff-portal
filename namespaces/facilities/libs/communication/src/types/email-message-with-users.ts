import { EmailMessageFragment } from '../data/email-message-fragment/email-message-fragment.lens.gql.types'
import { EmailContact } from './email-contact'

export interface EmailMessageWithUsers extends EmailMessageFragment {
  fromWithUser: EmailContact
  toWithUsers: EmailContact[]
}
