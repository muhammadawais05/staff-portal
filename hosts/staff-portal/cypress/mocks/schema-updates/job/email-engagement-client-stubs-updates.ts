import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  EmailMessagingEngagementClient,
  Engagement
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getEngagementMock } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'
import {
  getEmailContactsResponse,
  getEngagementClientEmailRecipientResponse,
  getLatestEmailMessageResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'

const updateEngagementClientStubs = () =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      currentEngagement: getEngagementMock({
        clientEmailMessaging: {
          id: encodeEntityId('236', 'EmailMessagingEngagementClient'),
          operations: {
            sendEmailTo: enabledOperationMock(),
            __typename: 'EmailMessagingOperation'
          },
          __typename: 'EmailMessagingEngagementClient'
        } as EmailMessagingEngagementClient
      }) as Engagement
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: 'VjEtRW1haWxNZXNzYWdpbmdFbmdhZ2VtZW50VGFsZW50LTI4MDc4OA',
          operations: {
            sendEmailTo: enabledOperationMock(),
            __typename: 'EmailMessagingOperation'
          },
          __typename: 'EmailMessagingEngagementClient'
        }
      }
    },
    GetGeneralEmailContext: getEngagementClientEmailRecipientResponse(),
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetEmailContacts: getEmailContactsResponse(),
    GetLatestEmailMessage: getLatestEmailMessageResponse(),
    SendEmail: {
      data: {
        sendEmailTo: successMutationMock()
      }
    }
  })

export default updateEngagementClientStubs
