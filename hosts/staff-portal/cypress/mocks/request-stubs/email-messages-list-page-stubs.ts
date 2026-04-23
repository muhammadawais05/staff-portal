import { EmailMessage } from '@staff-portal/graphql/lens'

import { OperationValue } from '~integration/types'
import { getEmailMessagesListResponse } from '~integration/mocks/responses/email-messages'

export const emailMessagesListPageStubs = ({
  emailMessages
}: {
  emailMessages?: EmailMessage[]
}): { [key: string]: OperationValue } => ({
  GetEmailMessagesList: getEmailMessagesListResponse(emailMessages)
})
