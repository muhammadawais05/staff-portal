import { Job, Engagement } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '../../mutations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { jobPageStubs } from '../../request-stubs'
import { getEngagementOperations } from '../../fragments/get-engagement-operations'

const updateCancelEngagementJobMocks = (job?: Partial<Job>) =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      currentEngagement: {
        id: encodeEntityId('123', 'Engagement'),
        job: {
          talentCount: 1
        },
        operations: getEngagementOperations({
          cancelEngagementTrial: enabledOperationMock()
        }),
        __typename: 'Engagement'
      } as unknown as Engagement,
      ...job
    }),
    GetLazyOperation: {
      data: {
        node: {
          __typename: 'Engagement',
          id: encodeEntityId('123', 'Engagement'),
          operations: {
            cancelEngagementTrial: enabledOperationMock(),
            __typename: 'EngagementOperations'
          }
        }
      }
    },
    CancelEngagement: {
      data: {
        cancelEngagementTrial: successMutationMock()
      }
    }
  })

export default updateCancelEngagementJobMocks
