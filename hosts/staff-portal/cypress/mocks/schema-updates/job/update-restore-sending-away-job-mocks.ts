import { Job, JobOperations } from '@staff-portal/graphql/staff'

import { successMutationMock } from '../../mutations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { jobPageStubs } from '../../request-stubs'
import { getRestoreSendingAwayJobOperationResponse } from '../../responses'

const updateRestoreSendingAwayJobMocks = (job?: Partial<Job>) =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      operations: {
        resumeSendingJobAway: enabledOperationMock()
      } as unknown as JobOperations,
      ...job
    }),
    GetLazyOperation: getRestoreSendingAwayJobOperationResponse(),
    ResumeSendingJobAway: {
      data: {
        resumeSendingJobAway: successMutationMock()
      }
    }
  })

export default updateRestoreSendingAwayJobMocks
