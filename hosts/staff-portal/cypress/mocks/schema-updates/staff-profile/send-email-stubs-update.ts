import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successOperationMock } from '~integration/mocks/operations'
import { enabledOperationMock } from '~integration/mocks'
import { staffProfilePageStubs } from '~integration/mocks/request-stubs'
import {
  getGeneralEmailContextResponse,
  getLatestEmailMessageResponse,
  getStaffUsersByEmailsResponse
} from '~integration/mocks/responses'

export const updateStaffProfileSendEmailStubs = () => {
  cy.stubGraphQLRequests({
    ...staffProfilePageStubs(),
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
          id: encodeEntityId('123', 'Staff'),
          operations: {
            sendEmailTo: enabledOperationMock(),
            __typename: 'EmailMessagingOperation'
          },
          __typename: 'EmailMessagingRole'
        }
      }
    }
  })
}
