import { emailMessagingEngagementClientMock } from '~integration/mocks/fragments'

export const getEngagementClientRecipientResponse = () => ({
  data: {
    staffNode: emailMessagingEngagementClientMock()
  }
})
