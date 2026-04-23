import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getCompanyApplicantMock } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { companyApplicantsPageStubs } from '~integration/mocks/request-stubs'
import {
  getCreateClaimerDetailsResponse,
  getFeedbackReasonsResponse
} from '~integration/mocks/responses'

const updateCompanyApplicantsActionsStubs = (client?: Partial<Client>) => {
  cy.stubGraphQLRequests({
    ...companyApplicantsPageStubs(client),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Client'),
          operations: {
            approveClient: enabledOperationMock(),
            pauseClient: enabledOperationMock(),
            createClientClaimer: enabledOperationMock(),
            restoreClient: enabledOperationMock(),
            rejectClient: enabledOperationMock(),
            markClientAsBadLead: enabledOperationMock(),
            restoreClientFromBadLead: enabledOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },

    GetFeedbackReasons: getFeedbackReasonsResponse(),
    GetCreateClaimerDetails: getCreateClaimerDetailsResponse(),
    GetClient: {
      data: {
        node: getCompanyApplicantMock(client)
      }
    },
    RestoreClient: {
      data: {
        restoreClient: successMutationMock()
      }
    },
    RejectClient: {
      data: {
        rejectClient: successMutationMock()
      }
    },
    MarkClientAsBadLead: {
      data: {
        markClientAsBadLead: successMutationMock()
      }
    },
    RestoreClientFromBadLead: {
      data: {
        restoreClientFromBadLead: successMutationMock()
      }
    },
    CreateClientClaimer: {
      data: {
        createClientClaimer: successMutationMock({
          nextActionName: null,
          pendingCallbackRequest: null,
          emailTemplate: null
        })
      }
    }
  })
}

export default updateCompanyApplicantsActionsStubs
