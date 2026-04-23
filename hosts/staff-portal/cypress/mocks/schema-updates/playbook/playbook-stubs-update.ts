import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getPlaybookResponse } from '~integration/mocks/responses'
import { successMutationMock } from '~integration/mocks/mutations'
import { enabledOperationMock } from '~integration/mocks'
import { playbookTemplateMock } from '~integration/mocks/fragments'

const updatePlaybookPageStubs = () =>
  cy.stubGraphQLRequests({
    GetPlaybook: {
      ...getPlaybookResponse()
    },
    GetPlaybookTemplate: {
      data: {
        node: {
          ...playbookTemplateMock()
        }
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          __typename: 'PlaybookTemplate',
          id: encodeEntityId('123', 'PlaybookTemplate'),
          operations: {
            updatePlaybookTemplate: enabledOperationMock(),
            __typename: 'PlaybookTemplateOperations'
          }
        }
      }
    },
    UpdatePlaybookTemplate: {
      data: {
        updatePlaybookTemplate: successMutationMock()
      }
    }
  })

export default updatePlaybookPageStubs
