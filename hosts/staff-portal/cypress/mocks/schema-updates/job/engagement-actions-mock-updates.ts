import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, Engagement, Job } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import {
  emailMessagingEngagementClientMock,
  emailMessagingEngagementTalentMock,
  getJobOperations,
  timeZoneMock
} from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'
import { jobPageStubs } from '~integration/mocks/request-stubs'
import {
  getAvailableTimeZonesResponse,
  getBillingCyclesResponse,
  GetChangeEngagementStartDateDataResponse,
  getEmailContactsResponse,
  getEngagementBreaksResponse,
  getEngagementClientRecipientResponse,
  getEngagementFeedbacksResponse,
  getEngagementResponse,
  getEngagementTalentRecipientResponse,
  getHiredTalentContentResponse,
  getLatestEngagementSurveyAnswers,
  getSendTopModalDataResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'

const updateEngagementActionsMocks = ({
  engagement,
  job
}: {
  engagement?: Partial<Engagement>
  job?: Partial<Job>
}) => {
  const clientEmailMessaging = emailMessagingEngagementClientMock({
    operations: {
      sendEmailTo: enabledOperationMock()
    }
  })
  const talentEmailMessaging = emailMessagingEngagementTalentMock({
    operations: {
      sendEmailTo: enabledOperationMock()
    }
  })

  const client = {
    __typename: 'Client',
    id: encodeEntityId('123', 'Client'),
    contracts: {
      totalCount: 1,
      nodes: []
    },
    ...job?.client
  } as Client

  const mergedEngagement = getEngagementResponse({
    clientEmailMessaging,
    talentEmailMessaging,
    client,
    ...engagement,
    job: {
      talentCount: 2,
      ...engagement?.job
    } as Job
  }).data.node as Engagement

  cy.stubGraphQLRequests({
    ...jobPageStubs({
      talentCount: 2,
      engagements: {
        totalCount: 1,
        nodes: [mergedEngagement],
        edges: []
      },
      client,
      operations: getJobOperations({
        approveJob: enabledOperationMock()
      }),
      ...job
    }),
    GetSendTopModalData: getSendTopModalDataResponse(),
    GetHiredTalent: getHiredTalentContentResponse({
      ...mergedEngagement
    }),
    GetHiredTalentContent: getHiredTalentContentResponse({
      ...mergedEngagement
    }),
    GetLazyOperation: ({ variables }) => {
      if (variables.nodeId === clientEmailMessaging?.id) {
        return {
          data: {
            node: clientEmailMessaging
          }
        }
      }

      if (variables.nodeId === talentEmailMessaging.id) {
        return {
          data: {
            node: talentEmailMessaging
          }
        }
      }

      return {
        data: {
          node: {
            id: encodeEntityId('123', 'Engagement'),
            operations: mergedEngagement?.operations,
            __typename: 'Engagement'
          }
        }
      }
    },
    GetEngagementPausedFeedbacks: () => ({
      data: {
        node: {
          id: encodeEntityId('123', 'Engagement'),
          feedbacks: {
            nodes: [],
            __typename: 'FeedbackConnection'
          },
          __typename: 'Engagement'
        }
      }
    }),
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetEmailContacts: getEmailContactsResponse(),
    SendEmail: {
      data: {
        sendEmailTo: successOperationMock()
      }
    },
    GetGeneralEmailContext: ({ variables }) => {
      if (
        variables.nodeId ===
        encodeEntityId('123', 'EmailMessagingEngagementClient')
      ) {
        return getEngagementClientRecipientResponse()
      }

      return getEngagementTalentRecipientResponse()
    },
    GetEngagement: getEngagementResponse(mergedEngagement),
    GetEngagementBreaks: getEngagementBreaksResponse(mergedEngagement),
    GetEngagementFeedbacks: getEngagementFeedbacksResponse(mergedEngagement),
    GetLatestEngagementSurveyAnswers:
      getLatestEngagementSurveyAnswers(mergedEngagement),
    GetAvailableTimeZones: getAvailableTimeZonesResponse([timeZoneMock()]),
    GetChangeEngagementStartDateData:
      GetChangeEngagementStartDateDataResponse(),
    GetBillingCycles: getBillingCyclesResponse(engagement),
    GetChangeEngagementEndDateData: {
      data: {
        node: {
          id: encodeEntityId('123', 'Engagement'),
          endDate: '2021-11-27',
          __typename: 'Engagement'
        }
      }
    },
    GetImportTopData: {
      data: {
        node: {
          id: encodeEntityId('123', 'Engagement'),
          nextTopNumber: null,
          __typename: 'Engagement'
        }
      }
    },
    GetExperiments: {
      data: {
        experiments: {
          __typename: 'Experiments'
        }
      }
    }
  })
}

export default updateEngagementActionsMocks
