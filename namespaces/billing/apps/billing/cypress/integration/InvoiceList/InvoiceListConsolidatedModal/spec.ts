import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/invoiceListDefault'

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceListPage'
    }
  })
  cy.waitForReact()
}

const openModal = () =>
  cy.getByTestId('InvoiceListHeaderConsolidatedButton').click()

describe('Widget - Staff - Create consolidated invoice', () => {
  before(() => {
    resetSetup()
    openModal()
  })

  describe('Invoice List - Create consolidated invoice modal', () => {
    it('displays the modal', () => {
      cy.get('div[role=dialog]').should('have.length', 1)
    })

    it('pre-selects the preferred net term', () => {
      cy.get('[name="netTerms"]').should('have.value', 'Net 45')
    })

    it('renders non-consolidatable invoice as "disabled"', () => {
      cy.getByTestId('ClientMultiSelector-checkbox').click()
      cy.getByTestId('InvoiceListRow')
        .last()
        .within(() => {
          cy.get('[type="checkbox"]').should('have.attr', 'disabled')
        })
      cy.getByTestId('ClientMultiSelector-checkbox').click()
    })

    it('validates the form on submission', () => {
      cy.get('[name="isEverythingSelected"]').uncheck()

      cy.getByTestId('submit').click()

      cy.contains('Multiple invoices required to consolidate.')
    })
  })
  describe('Selective consolidation', () => {
    it('displays/hides the invoices accordingly when clients are added/removed', () => {
      cy.getByTestId('InvoiceListRow').should('have.length', 0)
      cy.getByTestId('ClientMultiSelector-checkbox').click()

      cy.getByTestId('InvoiceListRow').should('have.length', 3)
    })
    it('leaves any pre-selected intact', () => {
      cy.getByTestId('InvoiceListRow')
        .first()
        .within(() => {
          cy.get('[type="checkbox"]').check()
        })

      cy.getByTestId('ClientMultiSelector-checkbox').click()

      cy.getByTestId('InvoiceListRow')
        .first()
        .within(() => {
          cy.get('[type="checkbox"]')
        })
    })
  })
})
