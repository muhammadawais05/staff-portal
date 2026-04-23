import { successOperationMock } from '~integration/mocks/operations'
import { jobListPageStubs } from '~integration/mocks/request-stubs'

const updateEditInvoiceNoteMocks = () => {
  cy.stubGraphQLRequests({
    ...jobListPageStubs(),
    EditJobInvoiceNote: {
      data: {
        editJobInvoiceNote: successOperationMock()
      }
    }
  })
}

export default updateEditInvoiceNoteMocks
