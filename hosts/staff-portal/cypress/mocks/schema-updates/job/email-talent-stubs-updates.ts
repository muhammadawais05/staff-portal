import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  EmailMessagingEngagementTalent,
  Engagement
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getEngagementMock } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'
import {
  getEmailContactsResponse,
  getLatestEmailMessageResponse,
  getTalentEmailRecipientResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'

const updateEmailTalentStubs = () =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      currentEngagement: getEngagementMock({
        talentEmailMessaging: {
          id: encodeEntityId('753', 'EmailMessagingEngagementTalent'),
          operations: {
            sendEmailTo: enabledOperationMock(),
            __typename: 'EmailMessagingOperation'
          },
          __typename: 'EmailMessagingEngagementTalent'
        } as EmailMessagingEngagementTalent
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
          __typename: 'EmailMessagingEngagementTalent'
        }
      }
    },
    GetGeneralEmailContext: getTalentEmailRecipientResponse(),
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetEmailContacts: getEmailContactsResponse(),
    GetLatestEmailMessage: getLatestEmailMessageResponse(),
    SendEmail: {
      data: {
        sendEmailTo: successMutationMock()
      }
    }
  })

export default updateEmailTalentStubs
