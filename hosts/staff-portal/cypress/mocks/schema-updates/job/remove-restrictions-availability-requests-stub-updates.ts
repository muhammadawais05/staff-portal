import { encodeEntityId } from '@staff-portal/data-layer-service'
import { JobStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getJobOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'

const removeRestrictionsForAvailabilityRequestsStubs = () =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.CLOSED,
      operations: getJobOperations({
        removeJobAvailabilityRequestsRestriction: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Job'),
          operations: {
            removeJobAvailabilityRequestsRestriction: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    RemoveJobAvailabilityRequestsRestriction: {
      data: {
        removeJobAvailabilityRequestsRestriction: successMutationMock()
      }
    }
  })

export default removeRestrictionsForAvailabilityRequestsStubs
