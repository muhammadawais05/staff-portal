import { EmailMessage } from '@staff-portal/graphql/lens'

export const getEmailMessagesListResponse = (
  emailMessages: EmailMessage[] = []
) => ({
  data: {
    emailMessages: {
      __typename: 'EmailMessageList',
      entities: emailMessages,
      maxCount: 10000,
      totalCount: emailMessages.length
    }
  }
})
