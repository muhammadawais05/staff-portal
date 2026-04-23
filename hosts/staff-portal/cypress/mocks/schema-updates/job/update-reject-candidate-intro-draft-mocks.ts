import { Engagement, EngagementStatus, Job } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { jobPageStubs } from '../../request-stubs'
import {
  getEngagementResponse,
  getPitchSnippetEngagementsResponse
} from '../../responses'
import { enabledOperationMock } from '~integration/mocks'

const updateRejectCandidateIntroDraftsMocks = (job?: Partial<Job>) => {
  const engagement = getEngagementResponse({
    status: EngagementStatus.DRAFT,
    detailedStatus: 'Draft',
    cumulativeStatus: 'draft',
    companyHourlyRate: '80.0',
    talentHourlyRate: '50.0',
    operations: {
      rejectDraftEngagement: enabledOperationMock()
    },
    viewIntroDraftV2: {
      enabled: true,
      messages: [],
      url: null,
      __typename: 'UrlWithMessages'
    },
    feedbacks: {
      totalCount: 0,
      nodes: []
    },
    talent: {
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Some Full Name',
      webResource: {
        text: 'Some Full Name',
        url: 'https://staging.toptal.net/platform/staff/talents/507726',
        __typename: 'Link'
      },
      __typename: 'Talent'
    }
  } as unknown as Engagement).data.node

  cy.stubGraphQLRequests({
    ...jobPageStubs(job),
    GetPitchSnippetEngagements: getPitchSnippetEngagementsResponse(),
    GetLazyOperation: {
      data: {
        node: {
          __typename: 'Engagement',
          id: engagement.id,
          operations: {
            rejectDraftEngagement: enabledOperationMock(),
            __typename: 'EngagementOperations'
          }
        }
      }
    },
    GetFeedbackReasons: {
      data: {
        feedbackReasons: {
          nodes: [
            {
              id: 'VjEtRmVlZGJhY2tSZWFzb24tMTIzNQ',
              identifier: 'other',
              name: 'Other',
              description: null,
              group: null,
              __typename: 'FeedbackReason'
            }
          ],
          __typename: 'FeedbackReasonConnection'
        }
      }
    },
    GetCandidateIntroDrafts: {
      data: {
        node: {
          id: 'VjEtSm9iLTI1NTI5NQ',
          candidateIntroDrafts: {
            nodes: [engagement],
            edges: [],
            __typename: 'JobEngagementConnection'
          },
          __typename: 'Job'
        }
      }
    }
  })
}

export default updateRejectCandidateIntroDraftsMocks
