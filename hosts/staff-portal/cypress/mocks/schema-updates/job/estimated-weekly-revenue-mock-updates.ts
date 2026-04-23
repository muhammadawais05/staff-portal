import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, JobStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { jobOperationsMock } from '~integration/mocks/fragments/job-operations-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '../../request-stubs'

const updateEstimatedWeeklyRevenueMock = (revenue?: string) => {
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.PENDING_ENGINEER,
      estimatedWeeklyRevenueTalent: revenue,
      operations: jobOperationsMock({
        updateJobEstimatedWeeklyRevenueTalent: enabledOperationMock()
      }),
      client: { enterprise: true } as unknown as Client
    }),
    GetEstimatedWeeklyRevenueTalent: {
      data: {
        node: {
          id: encodeEntityId('123', 'Job'),
          estimatedWeeklyRevenueTalent: null,
          operations: {
            updateJobEstimatedWeeklyRevenueTalent: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    UpdateJobEstimatedWeeklyRevenueTalent: {
      data: {
        job: { id: encodeEntityId('123', 'Job') },
        estimatedWeeklyRevenueTalent: '2545',
        updateJobEstimatedWeeklyRevenueTalent: successMutationMock()
      }
    }
  })
}

export default updateEstimatedWeeklyRevenueMock
