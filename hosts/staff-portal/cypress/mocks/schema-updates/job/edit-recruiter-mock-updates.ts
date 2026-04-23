import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { jobOperationsMock } from '~integration/mocks/fragments/job-operations-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '../../request-stubs'

const updateRecruiterMock = () => {
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      operations: jobOperationsMock({
        updateJobClaimer: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('222', 'Job'),
          operations: {
            updateJobClaimer: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    GetTalentMatchers: {
      data: {
        roles: {
          nodes: [
            {
              id: 'VjEtU3RhZmYtNDAzNDYx',
              fullName: 'Alessa Queiroz',
              teams: {
                nodes: [
                  {
                    id: 'VjEtVGVhbS0xMQ',
                    name: 'Developer Matchers',
                    __typename: 'Team'
                  }
                ],
                __typename: 'TeamConnection'
              },
              __typename: 'Staff'
            }
          ],
          __typename: 'StaffConnection'
        }
      }
    },
    UpdateJobClaimer: {
      data: {
        updateJobClaimer: successMutationMock()
      }
    }
  })
}

export default updateRecruiterMock
