import { EngagementStatus } from '@staff-portal/graphql/staff'

import { successOperationMock } from '~integration/mocks/operations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { enabledOperationMock } from '~integration/mocks'
import {
  getEmailContactsResponse,
  getEngagementTalentRecipientResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'
import { emailMessagingEngagementTalentMock } from '~integration/mocks/fragments'

const updateEmailTalentMocks = () => {
  const talentEmailMessaging = emailMessagingEngagementTalentMock({
    operations: {
      sendEmailTo: enabledOperationMock()
    }
  })

  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.REVIEWED,
      talentEmailMessaging
    }),
    GetGeneralEmailContext: getEngagementTalentRecipientResponse(),
    GetLazyOperation: {
      data: {
        node: talentEmailMessaging
      }
    },
    SendEmail: {
      data: {
        sendEmailTo: successOperationMock()
      }
    },
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetEmailContacts: getEmailContactsResponse()
  })
}

export default updateEmailTalentMocks
