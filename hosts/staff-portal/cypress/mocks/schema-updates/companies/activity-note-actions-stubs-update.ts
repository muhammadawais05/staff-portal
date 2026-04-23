import {
  Activity,
  ActivityOperations,
  Client
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getActivityNote } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { companiesNotesTabStubs } from '~integration/mocks/request-stubs/companies/tabs'
import { enabledOperationMock } from '../../enabled-operation-mock'

export const updateActivityNoteActionsStubs = (client?: Partial<Client>) => {
  const mockedClient = {
    activitiesAndNotes: {
      totalCount: 1,
      nodes: [
        getActivityNote({
          operations: {
            updateActivity: enabledOperationMock(),
            removeActivity: enabledOperationMock(),
            __typename: 'ActivityOperations'
          } as ActivityOperations
        }) as Activity
      ]
    },
    ...client
  }

  cy.stubGraphQLRequests({
    ...companiesNotesTabStubs(mockedClient),

    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Activity'),
          operations: {
            updateActivity: enabledOperationMock(),
            removeActivity: enabledOperationMock(),
            __typename: 'ActivityOperations'
          },
          __typename: 'Activity'
        }
      }
    },
    UpdateActivity: {
      data: {
        updateActivity: {
          activity: {},
          success: true,
          errors: []
        }
      }
    },
    RemoveActivity: {
      data: {
        removeActivity: successMutationMock()
      }
    }
  })
}
