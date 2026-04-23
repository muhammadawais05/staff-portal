import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { disabledOperationMock } from '../../disabled-operation-mock'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

export const updateProfileActionsStubs = (client?: Partial<Client>) => {
  const mockedClient = {
    ...client,
    operations: {
      ...getClientOperations({
        markClientAsBadLead: disabledOperationMock(['markClientAsBadLead']),
        pauseClient: disabledOperationMock(['pauseClient']),
        enableMobileAppForClient: enabledOperationMock(),
        disableMobileAppForClient: enabledOperationMock(),
        enableEmbeddedSigning: enabledOperationMock(),
        disableEmbeddedSigning: enabledOperationMock(),
        addClientRoleFlag: enabledOperationMock(),
        updateClientSalesAnalyst: enabledOperationMock(),
        createClientDepositInvoice: enabledOperationMock(),
        createClientServiceInvoice: enabledOperationMock(),
        claimClientEnterprise: enabledOperationMock(),
        deleteDuplicateClient: enabledOperationMock(),
        sendMobileAppInvitationsToClient: enabledOperationMock()
      })
    }
  }

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(mockedClient),

    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Client'),
          operations: {
            markClientAsBadLead: disabledOperationMock(['markClientAsBadLead']),
            pauseClient: disabledOperationMock(['pauseClient']),
            enableMobileAppForClient: enabledOperationMock(),
            disableMobileAppForClient: enabledOperationMock(),
            enableEmbeddedSigning: enabledOperationMock(),
            disableEmbeddedSigning: enabledOperationMock(),
            addClientRoleFlag: enabledOperationMock(),
            updateClientSalesAnalyst: enabledOperationMock(),
            createClientDepositInvoice: enabledOperationMock(),
            createClientServiceInvoice: enabledOperationMock(),
            claimClientEnterprise: enabledOperationMock(),
            deleteDuplicateClient: enabledOperationMock(),
            sendMobileAppInvitationsToClient: enabledOperationMock(),
            callClient: enabledOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },
    EnableMobileApp: {
      data: {
        enableMobileAppForClient: successMutationMock({
          client: {
            id: encodeEntityId('123', 'Client')
          }
        })
      }
    },
    DisableMobileApp: {
      data: {
        disableMobileAppForClient: successMutationMock({
          client: {
            id: encodeEntityId('123', 'Client')
          }
        })
      }
    },
    EnableEmbeddedSigning: {
      data: {
        enableEmbeddedSigning: successMutationMock({
          client: {
            id: encodeEntityId('123', 'Client')
          }
        })
      }
    },
    DisableEmbeddedSigning: {
      data: {
        disableEmbeddedSigning: successMutationMock({
          client: {
            id: encodeEntityId('123', 'Client')
          }
        })
      }
    },
    DeleteDuplicate: {
      data: {
        deleteDuplicateClient: successMutationMock()
      }
    },
    CreateClientDepositInvoice: {
      data: {
        createClientDepositInvoice: successMutationMock()
      }
    },
    CreateClientServiceInvoice: {
      data: {
        createClientServiceInvoice: successMutationMock()
      }
    },
    ClaimClientEnterprise: {
      data: {
        claimClientEnterprise: successMutationMock({
          client: {
            id: client?.id ?? encodeEntityId('123', 'Client')
          }
        })
      }
    },
    SendMobileAppInvitationsToClient: {
      data: {
        sendMobileAppInvitationsToClient: successMutationMock({
          client: {
            id: encodeEntityId('123', 'Client')
          }
        })
      }
    }
  })
}
