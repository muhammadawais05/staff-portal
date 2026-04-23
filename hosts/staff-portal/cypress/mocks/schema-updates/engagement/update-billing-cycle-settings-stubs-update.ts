import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  BillCycle,
  Engagement,
  EngagementStatus,
  Job,
  WeekDay
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { getUpdateBillingCycleOperationResponse } from '~integration/mocks/responses'

const updateBillingCycleSettingsStubs = (engagement?: Partial<Engagement>) => {
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.ACTIVE,
      billCycle: BillCycle.WEEKLY,
      job: {
        talentCount: 2,
        ...engagement?.job
      } as Job,
      operations: getEngagementOperations({
        changeProductBillingFrequency: enabledOperationMock()
      }),
      ...engagement
    }),
    GetLazyOperation: getUpdateBillingCycleOperationResponse(),
    SetChangeProductBillingFrequency: {
      data: {
        changeProductBillingFrequency: {
          engagement: {
            id: encodeEntityId('123', 'Engagement'),
            billDay: WeekDay.SUNDAY,
            billCycle: BillCycle.WEEKLY,
            __typename: 'Engagement'
          },
          success: true,
          errors: [],
          __typename: 'ChangeProductBillingFrequencyPayload'
        }
      }
    }
  })
}

export default updateBillingCycleSettingsStubs
