import {
  Client,
  Engagement,
  EngagementStatus
} from '@staff-portal/graphql/staff'

import { getEngagementOperations } from '../../fragments/get-engagement-operations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import {
  getAcceptCandidateModalDataResponse,
  getAcceptCandidateOperationResponse,
  getAvailableTimeZonesResponse
} from '~integration/mocks/responses'
import { successMutationMock } from '~integration/mocks/mutations'
import { timeZoneMock } from '~integration/mocks/fragments'

const updateAcceptCandidateStubs = (engagement?: Partial<Engagement>) => {
  const client = {
    contracts: {
      totalCount: 1,
      nodes: []
    },
    ...engagement?.client
  } as Client

  return cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.PENDING,
      operations: getEngagementOperations({
        scheduleEngagementActivationStartDate: enabledOperationMock()
      }),
      client,
      ...engagement
    }),
    GetLazyOperation: getAcceptCandidateOperationResponse(),
    GetAcceptCandidateModalData: getAcceptCandidateModalDataResponse(),
    GetAvailableTimeZones: getAvailableTimeZonesResponse([timeZoneMock()]),
    ScheduleEngagementActivationStartDate: {
      data: {
        scheduleEngagementActivationStartDate: successMutationMock({
          __typename: 'ScheduleEngagementActivationStartDatePayload'
        })
      }
    }
  })
}

export default updateAcceptCandidateStubs
