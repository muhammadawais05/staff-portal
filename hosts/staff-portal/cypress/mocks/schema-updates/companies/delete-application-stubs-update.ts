import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateDeleteApplicationStubs = () => {
  const client = {
    operations: {
      ...getClientOperations({
        rejectClient: enabledOperationMock()
      })
    }
  }

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(client),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Client'),
          operations: {
            rejectClient: enabledOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },
    RejectClient: {
      data: {
        rejectClient: successMutationMock()
      }
    },
    GetFeedbackReasons: {
      data: {
        feedbackReasons: {
          nodes: [
            {
              id: encodeEntityId('174', 'FeedbackReason'),
              identifier: 'other',
              name: 'Other',
              description: null,
              group: null,
              __typename: 'FeedbackReason'
            }
          ],
          __typename: 'FeedbackReasonConnection'
        }
      }
    }
  })
}

export default updateDeleteApplicationStubs
