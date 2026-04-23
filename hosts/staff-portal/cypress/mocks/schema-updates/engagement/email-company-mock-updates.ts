import { successOperationMock } from '~integration/mocks/operations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { enabledOperationMock } from '~integration/mocks'
import {
  getEmailContactsResponse,
  getEngagementClientRecipientResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'
import { emailMessagingEngagementClientMock } from '~integration/mocks/fragments'

const updateEmailCompanyMocks = () => {
  const clientEmailMessaging = emailMessagingEngagementClientMock({
    operations: {
      sendEmailTo: enabledOperationMock()
    }
  })

  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      clientEmailMessaging
    }),
    GetGeneralEmailContext: getEngagementClientRecipientResponse(),
    GetLazyOperation: {
      data: {
        node: clientEmailMessaging
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

export default updateEmailCompanyMocks
