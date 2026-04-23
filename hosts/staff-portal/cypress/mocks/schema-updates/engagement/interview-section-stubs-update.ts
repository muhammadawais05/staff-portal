import {
  InterviewCumulativeStatus,
  InterviewStatus,
  InterviewType
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { interviewMock } from '~integration/mocks/fragments'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { getRateForClientOperationResponse } from '~integration/mocks/responses'

const updateInterviewSectionStubs = () => {
  const interviews = [
    interviewMock({
      interview: {
        id: encodeEntityId('12345', 'Interview'),
        cumulativeStatus: InterviewCumulativeStatus.PENDING,
        interviewType: InterviewType.BEHAVIORAL
      },
      operations: {
        rateForClientInterview: enabledOperationMock()
      }
    }),
    interviewMock()
  ]

  return cy.stubGraphQLRequests({
    ...engagementPageStubs({
      interviews: {
        totalCount: 1,
        nodes: interviews
      }
    }),
    GetLazyOperation: getRateForClientOperationResponse(),
    GetClientInterviewRating: {
      data: {
        node: {
          id: encodeEntityId('12345', 'Interview'),
          status: InterviewStatus.SCHEDULED,
          rating: null,
          ratingComment: null,
          __typename: 'Interview'
        }
      }
    },
    RateForClientInterview: {
      data: {
        rateForClientInterview: {
          success: true,
          errors: [],
          __typename: 'RateForClientInterviewPayload',
          interview: {
            id: 'VjEtSW50ZXJ2aWV3LTIwNzM0Mg',
            rating: 1,
            ratingComment: 'c',
            __typename: 'Interview'
          }
        }
      }
    }
  })
}

export default updateInterviewSectionStubs
