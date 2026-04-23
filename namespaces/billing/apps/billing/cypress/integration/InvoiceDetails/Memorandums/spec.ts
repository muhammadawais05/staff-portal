import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/invoiceDetailsDefault'
/// <reference types="cypress" />

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.visit('', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = 377249
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - Invoice Memorandums', () => {
  beforeEach(() => {
    resetSetup()
  })

  describe('Invoice Memorandums Section', () => {
    it('displays all the memorandums as table rows', () => {
      cy.getByTestId('TableRow').should('have.length', 2)
    })

    // TODO: Enable test
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('displays the portions properly', () => {
      cy.getByTestId('AllocatedDocumentLinks').within($portionSection => {
        expect($portionSection.find('a')).to.have.length(3)

        assert.exists($portionSection.first().find('p'))
      })
    })

    it('displays the dropdown with export actions', () => {
      cy.getByTestId('TableRowActions-button').first().click()

      cy.getByTestId('downloadHtmlUrl').should('exist')

      cy.getByTestId('downloadPdfUrl').should('exist')

      cy.getByTestId('TableRowActions-revert-prepayment').should('not.exist')

      // close dropdown
      cy.getByTestId('TableRowActions-button').first().click()
    })

    // TODO: Enable test
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('displays the dropdown with revertPrepayment disabled', () => {
      cy.getByTestId('TableRowActions-button').eq(1).click()

      cy.getByTestId('TableRowActions-revert-prepayment').should('exist')

      cy.getByTestId('TableRowActions-revert-prepayment')
        .should('have.attr', 'aria-disabled')
        .and('equal', 'true')

      // close dropdown
      cy.getByTestId('TableRowActions-button').eq(1).click()
    })

    // TODO: Enable test
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('displays the dropdown with revertPrepayment enabled', () => {
      cy.getByTestId('TableRowActions-button').eq(2).click()

      cy.getByTestId('TableRowActions-revert-prepayment').should('exist')

      cy.getByTestId('TableRowActions-revert-prepayment')
        .should('have.attr', 'aria-disabled')
        .and('equal', 'false')

      cy.getByTestId('TableRowActions-button').eq(2).click()
    })
  })
})
