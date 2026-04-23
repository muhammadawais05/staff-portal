import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'
import {
  getJobEmailRecipientResponse,
  getEmailContactsResponse,
  getJobPageDataResponse,
  getTeamsWithEmailTrackingResponse,
  getLatestEmailMessageResponse
} from '~integration/mocks/responses'

const updateEmailCompanyStubs = () => {
  const emailMessaging = {
    id: encodeEntityId('123', 'EmailMessagingJob'),
    operations: {
      sendEmailTo: enabledOperationMock(),
      __typename: 'EmailMessagingOperation'
    },
    __typename: 'EmailMessagingJob'
  }

  return cy.stubGraphQLRequests({
    ...jobPageStubs(),
    GetJobPageData: getJobPageDataResponse({
      talentCount: 2,
      notActive: true,
      emailMessaging
    }),
    GetLazyOperation: {
      data: {
        node: emailMessaging
      }
    },
    GetGeneralEmailContext: getJobEmailRecipientResponse(),
    GetLatestEmailMessage: getLatestEmailMessageResponse(),
    SendEmail: {
      data: {
        sendEmailTo: successMutationMock()
      }
    },
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetEmailContacts: getEmailContactsResponse()
  })
}

export default updateEmailCompanyStubs
