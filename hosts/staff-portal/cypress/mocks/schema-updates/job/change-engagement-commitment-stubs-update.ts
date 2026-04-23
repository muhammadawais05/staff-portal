import {
  Engagement,
  Job,
  JobStatus,
  EngagementStatus
} from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { jobPageStubs } from '~integration/mocks/request-stubs'
import {
  getEmailContactsResponse,
  getEngagementBreaksResponse,
  getEngagementFeedbacksResponse,
  getEngagementResponse,
  getHiredTalentContentResponse,
  getLatestEngagementSurveyAnswers,
  getPendoVisitorResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'
import { enabledOperationMock } from '~integration/mocks'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'

const updateChangeEngagementCommitmentStubs = ({
  engagement
}: {
  engagement?: Partial<Engagement>
}) => {
  const mergedEngagement = getEngagementResponse({
    status: EngagementStatus.ON_TRIAL,
    cumulativeStatus: EngagementCumulativeStatus.ON_TRIAL,
    operations: getEngagementOperations({
      changeEngagementCommitment: enabledOperationMock()
    }),
    companyHourlyRate: '166.00',
    companyPartTimeRate: '3320.00',
    companyFullTimeRate: '6640.00',
    talentHourlyRate: '100.00',
    talentPartTimeRate: '2000.00',
    talentFullTimeRate: '4000.00',
    partTimeDiscount: '0',
    fullTimeDiscount: '0',
    markup: '66',
    job: {
      talentCount: 2,
      ...engagement?.job
    } as Job,
    ...engagement
  }).data.node as Engagement

  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE,
      engagements: {
        totalCount: 1,
        nodes: [mergedEngagement],
        edges: []
      }
    }),
    GetPendoVisitor: getPendoVisitorResponse(),
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetHiredTalent: getHiredTalentContentResponse({
      ...mergedEngagement
    }),
    GetHiredTalentContent: getHiredTalentContentResponse({
      ...mergedEngagement
    }),
    GetUserOperation: {
      data: {
        operations: {
          createTalent: enabledOperationMock(),
          __typename: 'QueryOperations'
        }
      }
    },
    GetEngagement: getEngagementResponse(mergedEngagement),
    GetEngagementBreaks: getEngagementBreaksResponse(mergedEngagement),
    GetEngagementFeedbacks: getEngagementFeedbacksResponse(mergedEngagement),
    GetLatestEngagementSurveyAnswers:
      getLatestEngagementSurveyAnswers(mergedEngagement),
    GetEngagementPausedFeedbacks: {
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
    },
    GetEmailContacts: getEmailContactsResponse(),
    GetUnfilledCallsCount: {
      data: {
        viewer: {
          calls: {
            totalCount: 0,
            __typename: 'CallsConnection'
          },
          __typename: 'Viewer'
        }
      }
    }
  })
}

export default updateChangeEngagementCommitmentStubs
