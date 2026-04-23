import { Job, Engagement } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '../../mutations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { jobPageStubs } from '../../request-stubs'
import { getEngagementOperations } from '../../fragments/get-engagement-operations'

const updateReactivateEngagementJobMocks = (job?: Partial<Job>) =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      currentEngagement: {
        id: encodeEntityId('123', 'Engagement'),
        job: {
          talentCount: 1
        },
        operations: getEngagementOperations({
          reactivateEngagement: enabledOperationMock()
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
            reactivateEngagement: enabledOperationMock(),
            __typename: 'EngagementOperations'
          }
        }
      }
    },
    ReactivateEngagement: {
      data: {
        reactivateEngagement: successMutationMock()
      }
    }
  })

export default updateReactivateEngagementJobMocks
