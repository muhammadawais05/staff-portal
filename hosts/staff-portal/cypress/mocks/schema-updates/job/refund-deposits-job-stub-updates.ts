import { encodeEntityId } from '@staff-portal/data-layer-service'
import { JobStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getJobOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'

const refundDepositsStubs = () =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE,
      operations: getJobOperations({
        refundJobDeposit: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Job'),
          operations: {
            refundJobDeposit: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    RefundJobDeposit: {
      data: {
        refundJobDeposit: successMutationMock()
      }
    }
  })

export default refundDepositsStubs
