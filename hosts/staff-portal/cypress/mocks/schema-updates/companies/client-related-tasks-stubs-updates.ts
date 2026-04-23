import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'
import {
  completedTask,
  activeTask
} from '~integration/mocks/responses/companies/get-related-tasks-response'
import {
  getTaskMetaDataResponse,
  getTaskCardCompanyResponse
} from '~integration/mocks/responses/tasks'

const updateLinkedCompaniesStubs = () => {
  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(),
    GetRelatedTasks: ({ variables }) => {
      const showCompleted = (variables as { filter: { completed: boolean } })
        .filter.completed

      return {
        data: {
          staffNode: {
            id: encodeEntityId('123', 'Client'),
            __typename: 'Client',
            relatedTasks: {
              completedCount: 2,
              nodes: showCompleted ? [activeTask, completedTask] : [activeTask],
              __typename: 'RelatedTasksConnection'
            }
          }
        }
      }
    },
    GetCreateTaskOperation: {
      data: {
        operations: {
          createTask: enabledOperationMock(),
          __typename: 'QueryOperations'
        }
      }
    },
    GetTaskMetadata: getTaskMetaDataResponse(),
    GetTaskCardCompany: getTaskCardCompanyResponse({
      company: { id: encodeEntityId('123', 'Client') }
    })
  })

  return { completedTask, activeTask }
}

export default updateLinkedCompaniesStubs
