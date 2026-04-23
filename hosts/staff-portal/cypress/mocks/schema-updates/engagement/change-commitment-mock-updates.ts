import {
  EngagementCommitmentEnum,
  EngagementStatus
} from '@staff-portal/graphql/staff'

import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { getChangeEngagementCommitmentOperationResponse } from '~integration/mocks/responses'

const updateChangeCommitmentMocks = () =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.CLOSED,
      commitment: EngagementCommitmentEnum.HOURLY,
      operations: getEngagementOperations({
        changeEngagementCommitment: enabledOperationMock()
      })
    }),
    GetLazyOperation: getChangeEngagementCommitmentOperationResponse(),
    SetChangeCommitment: {
      data: {
        changeEngagementCommitment: {
          engagement: {
            id: 'VjEtRW5nYWdlbWVudC0yODIwNzE',
            experiments: {}
          },
          errors: [],
          success: true,
          __typename: 'ChangeEngagementCommitmentPayload'
        }
      }
    }
  })

export default updateChangeCommitmentMocks
