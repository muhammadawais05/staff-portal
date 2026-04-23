import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { getBasicInfoOperationsMock } from './basic-info-operations-mock'
import { parentLinkMock } from '~integration/mocks'
import {
  getCompanyAutocompleteResponse,
  getCompanyParentResponse,
  getUpdateCascadeParentInfoResponse
} from '~integration/mocks/responses/companies'

const updateClientParentLinkStubs = () => {
  const mockedClient = {
    operations: getClientOperations(getBasicInfoOperationsMock())
  }

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(mockedClient),

    GetCompanyParentLink: getCompanyParentResponse(),
    GetClientAutocomplete: getCompanyAutocompleteResponse(),
    GetUpdateCascadeParentInfo: getUpdateCascadeParentInfoResponse(),
    SetUpdateClientParentLink: {
      data: {
        updateClientParent: successMutationMock({
          client: {
            id: encodeEntityId('123', 'Client'),
            parent: parentLinkMock(),
            operations: {
              removeClientParent: enabledOperationMock(),
              updateClientParent: enabledOperationMock(),
              cascadeClientParentUpdates: enabledOperationMock(),
              __typename: 'ClientOperations'
            },
            __typename: 'Client'
          }
        })
      }
    },
    SetCascadeClientParentUpdates: {
      data: {
        cascadeClientParentUpdates: successMutationMock({
          client: {
            ...companiesBasicTabStubs(mockedClient)
          }
        })
      }
    }
  })
}

export default updateClientParentLinkStubs
