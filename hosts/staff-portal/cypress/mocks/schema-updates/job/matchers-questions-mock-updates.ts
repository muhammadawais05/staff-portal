import { JobStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { jobOperationsMock } from '~integration/mocks/fragments/job-operations-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { getActiveJobPositionQuestionTemplatesResponse } from '~integration/mocks/responses'
import { jobPageStubs } from '../../request-stubs'

const updateMatchersQuestionsMock = () => {
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE,
      operations: jobOperationsMock({
        updateJobMatcherQuestions: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('333', 'Job'),
          operations: {
            updateJobMatcherQuestions: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    GetMatchersQuestionModalData: {
      data: {
        node: {
          id: encodeEntityId('333', 'Job'),
          requiredApplicationPitch: true,
          positionQuestions: {
            nodes: [],
            __typename: 'JobPositionQuestionConnection'
          },
          __typename: 'Job'
        }
      }
    },
    GetActiveJobPositionQuestionTemplates:
      getActiveJobPositionQuestionTemplatesResponse(),
    updateJobMatcherQuestions: {
      data: {
        updateJobMatcherQuestions: successMutationMock()
      }
    }
  })
}

export default updateMatchersQuestionsMock
