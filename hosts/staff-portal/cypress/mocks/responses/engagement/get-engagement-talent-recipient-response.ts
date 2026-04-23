import { emailMessagingEngagementTalentMock } from '~integration/mocks/fragments'

export const getEngagementTalentRecipientResponse = () => ({
  data: {
    staffNode: emailMessagingEngagementTalentMock()
  }
})
