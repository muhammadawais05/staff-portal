import { EngagementStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import {
  getChangeEngagementEndDateOperationResponse,
  getChangeEngagementEndDateResponse
} from '~integration/mocks/responses'

const updateChangeEndDateMocks = () =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      cumulativeStatus: EngagementCumulativeStatus.ON_TRIAL,
      status: EngagementStatus.ON_TRIAL,
      operations: getEngagementOperations({
        changeEngagementEndDate: enabledOperationMock()
      })
    }),
    ChangeEngagementEndDate: getChangeEngagementEndDateResponse(),
    GetLazyOperation: getChangeEngagementEndDateOperationResponse(),
    GetChangeEngagementEndDateData: {
      data: {
        node: {
          id: encodeEntityId('123', 'Engagement'),
          endDate: '2021-11-27',
          __typename: 'Engagement'
        }
      }
    }
  })

export default updateChangeEndDateMocks
