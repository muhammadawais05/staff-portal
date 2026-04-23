import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'
import { emailMessagesListPageStubs } from '~integration/mocks/request-stubs'
import {
  getRoleLensTokenResponse,
  getClientEmailRecipientResponse,
  getTeamsWithEmailTrackingResponse,
  getEmailContactsResponse,
  getLatestEmailMessageResponse,
  getUsersByEmailResponse
} from '~integration/mocks/responses'

const updateEmailMessageSendEmailStubs = () =>
  cy.stubGraphQLRequests({
    ...emailMessagesListPageStubs({
      emailMessages: []
    }),
    GetRoleLensToken: getRoleLensTokenResponse(),
    GetGeneralEmailContext: getClientEmailRecipientResponse(),
    GetUsersByEmails: getUsersByEmailResponse(),
    SendEmail: {
      data: {
        sendEmailTo: successMutationMock()
      }
    },
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetEmailContacts: getEmailContactsResponse(),
    GetLatestEmailMessage: getLatestEmailMessageResponse(),
    GetSendEmailOperation: {
      data: {
        staffNode: {
          id: encodeEntityId('677127', 'Talent'),
          emailMessaging: {
            id: encodeEntityId('677127', 'EmailMessagingRole'),
            operations: {
              sendEmailTo: enabledOperationMock(),
              __typename: 'EmailMessagingOperation'
            },
            __typename: 'EmailMessagingRole'
          },
          __typename: 'Talent'
        }
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('677127', 'EmailMessagingRole'),
          operations: {
            sendEmailTo: enabledOperationMock(),
            __typename: 'EmailMessagingOperation'
          },
          __typename: 'EmailMessagingRole'
        }
      }
    }
  })

export default updateEmailMessageSendEmailStubs
