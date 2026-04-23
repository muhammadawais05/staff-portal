import { EngagementStatus, TimeZone } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import {
  getAvailableTimeZonesResponse,
  GetChangeEngagementStartDateDataResponse,
  getChangeEngagementStartDateOperationResponse,
  getChangeEngagementStartDateResponse
} from '~integration/mocks/responses'

const updateChangeStartDateMocks = () =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.ON_TRIAL,
      timeZone: {
        name: 'Europe/London',
        value: 'Europe/London',
        __typename: 'TimeZone'
      } as unknown as TimeZone,
      operations: getEngagementOperations({
        changeEngagementStartDate: enabledOperationMock()
      })
    }),
    GetAvailableTimeZones: getAvailableTimeZonesResponse([
      {
        name: 'Europe/London',
        value: 'Europe/London',
        __typename: 'TimeZone'
      } as unknown as TimeZone
    ]),
    GetChangeEngagementStartDateData:
      GetChangeEngagementStartDateDataResponse(),
    ChangeEngagementStartDate: getChangeEngagementStartDateResponse(),
    GetLazyOperation: getChangeEngagementStartDateOperationResponse()
  })

export default updateChangeStartDateMocks
