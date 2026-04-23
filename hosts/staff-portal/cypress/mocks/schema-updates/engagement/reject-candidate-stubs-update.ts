import { Engagement, EngagementStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { getEngagementOperations } from '../../fragments/get-engagement-operations'
import { getRejectCandidateOperationResponse } from '~integration/mocks/responses'
import { enabledOperationMock } from '../../enabled-operation-mock'

const updateRejectCandidateMocks = (engagement?: Partial<Engagement>) => {
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.PENDING,
      operations: getEngagementOperations({
        rejectEngagementOnInterview: enabledOperationMock()
      }),
      ...engagement
    }),
    GetLazyOperation: getRejectCandidateOperationResponse(),
    RejectEngagementOnInterview: {
      data: {
        rejectEngagementOnInterview: {
          engagement: {
            id: encodeEntityId('123', 'Engagement'),
            job: {
              id: encodeEntityId('123', 'Job'),
              __typename: 'Job'
            },
            __typename: 'Engagement'
          },
          errors: [],
          success: true,
          __typename: 'RejectEngagementOnInterviewPayload'
        }
      }
    }
  })
}

export default updateRejectCandidateMocks
