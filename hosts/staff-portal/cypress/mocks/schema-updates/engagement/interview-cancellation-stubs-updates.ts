import { EngagementStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { enabledOperationMock } from '../../enabled-operation-mock'
import { successMutationMock } from '../../mutations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'

const updateCancelInterviewStubs = (
  status = EngagementStatus.PENDING,
  cumulativeStatus = EngagementCumulativeStatus.PENDING
) => {
  const engagementOperations = getEngagementOperations({
    cancelEngagementInInterview: enabledOperationMock(),
    cancelEngagementDraftInInterview: enabledOperationMock()
  })

  return cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status,
      cumulativeStatus,
      operations: engagementOperations
    }),
    GetLazyOperation: () => ({
      data: {
        node: {
          id: encodeEntityId('123', 'Engagement'),
          operations: engagementOperations,
          __typename: 'Engagement'
        }
      }
    }),
    CancelEngagementInInterview: {
      data: { cancelEngagementInInterview: successMutationMock() }
    },
    CancelEngagementDraftInInterview: {
      data: { cancelEngagementDraftInInterview: successMutationMock() }
    }
  })
}

export default updateCancelInterviewStubs
