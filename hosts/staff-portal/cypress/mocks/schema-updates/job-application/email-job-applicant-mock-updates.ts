import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successOperationMock } from '~integration/mocks/operations'
import { enabledOperationMock } from '~integration/mocks'
import { jobApplicationPageStubs } from '~integration/mocks/request-stubs'
import {
  getGeneralEmailContextResponse,
  getLatestEmailMessageResponse,
  getStaffUsersByEmailsResponse
} from '~integration/mocks/responses'

export const updateEmailJobApplicantMocks = () => {
  cy.stubGraphQLRequests({
    ...jobApplicationPageStubs(),
    SendEmail: {
      data: {
        sendEmailTo: successOperationMock()
      }
    },
    GetGeneralEmailContext: getGeneralEmailContextResponse(),
    GetLatestEmailMessage: getLatestEmailMessageResponse(),
    GetUsersByEmails: getStaffUsersByEmailsResponse(),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'JobApplication'),
          operations: {
            emailJobApplicant: enabledOperationMock(),
            __typename: 'JobApplicationOperations'
          },
          __typename: 'JobApplication'
        }
      }
    }
  })
}
