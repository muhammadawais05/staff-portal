import { encodeEntityId } from '@staff-portal/data-layer-service'
import { JobStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getJobOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'

const requestAvailabilityStubs = () =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE,
      operations: getJobOperations({
        createAvailabilityRequestForJob: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Job'),
          operations: {
            createAvailabilityRequestForJob: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    createAvailabilityRequestForJob: {
      data: {
        createAvailabilityRequestForJob: successMutationMock()
      }
    }
  })

export default requestAvailabilityStubs
