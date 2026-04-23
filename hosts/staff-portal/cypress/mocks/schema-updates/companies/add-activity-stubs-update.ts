import { Client } from '@staff-portal/graphql/staff'

import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { companiesNotesTabStubs } from '~integration/mocks/request-stubs/companies/tabs'
import { enabledOperationMock } from '../../enabled-operation-mock'
import {
  getAddActivityModalClientDataResponse,
  getAddActivityOperationResponse
} from '~integration/mocks/responses'

export const updateAddActivityStubs = (client?: Partial<Client>) => {
  const clientOperations = getClientOperations({
    createActivity: enabledOperationMock(),
    createGeneralInformationClientNote: enabledOperationMock(),
    logClientSalesCall: enabledOperationMock(),
    checkClientCompliance: enabledOperationMock()
  })

  const mockedClient = {
    operations: clientOperations,
    ...client
  }

  cy.stubGraphQLRequests({
    ...companiesNotesTabStubs(mockedClient),
    GetLazyOperation: getAddActivityOperationResponse(),
    GetAddActivityModalClientData: getAddActivityModalClientDataResponse(),
    CreateActivity: {
      data: {
        createActivity: successMutationMock()
      }
    }
  })
}
