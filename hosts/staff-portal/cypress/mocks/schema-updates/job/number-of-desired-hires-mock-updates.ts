import { JobStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { jobOperationsMock } from '~integration/mocks/fragments/job-operations-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { getJobFeedbackReasonsResponse } from '~integration/mocks/responses'
import { jobPageStubs } from '../../request-stubs'

const updateNumberOfDesiredHiresMock = () => {
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE,
      operations: jobOperationsMock({
        updateJobTalentCount: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('222', 'Job'),
          operations: {
            updateJobTalentCount: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    GetFeedbackReasons: getJobFeedbackReasonsResponse(),
    UpdateJobTalentCount: {
      data: {
        updateJobTalentCount: successMutationMock()
      }
    }
  })
}

export default updateNumberOfDesiredHiresMock
