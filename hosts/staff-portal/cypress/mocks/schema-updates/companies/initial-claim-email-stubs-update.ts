import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getClientOperations } from '~integration/mocks/fragments'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'
import {
  getClientEmailRecipientResponse,
  getEmailContactsResponse,
  getLatestEmailMessageResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'
import { successMutationMock } from '~integration/mocks/mutations'

const updateInitialClaimEmailStubs = () => {
  const client = {
    operations: {
      ...getClientOperations({
        sendClientClaimEmail: enabledOperationMock()
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
            sendClientClaimEmail: enabledOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },
    SendClientClaimEmail: {
      data: {
        sendClientClaimEmail: successMutationMock()
      }
    },
    GetGeneralEmailContext: getClientEmailRecipientResponse(),
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetEmailContacts: getEmailContactsResponse(),
    GetLatestEmailMessage: getLatestEmailMessageResponse()
  })
}

export default updateInitialClaimEmailStubs
