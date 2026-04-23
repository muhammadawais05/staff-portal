import setupServer from '../../../../../support/commands/setupServer'
import defaultResponses from '../../../../../support/defaultResponse/invoiceDetailsDefault'

/// <reference types="cypress" />

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.visit('/?memorandum_id=165326&modal=memo-revert', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = 377249
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - Invoice Details', () => {
  describe('Revert Memorandum Modal', () => {
    before(resetSetup)

    it('Will show validation errors', () => {
      cy.get('#comment').focus().clear()
      cy.getByTestId('submit').click()
      cy.getByTestId('Modals-memo-revert').should(
        'contain',
        'Please complete this field.'
      )
    })

    it('Will revert memorandum', () => {
      cy.get('#comment').focus().type('Sample comment')
      cy.getByTestId('submit').click()
      cy.get('#react_notification').should(
        'contain',
        'The Memorandum was successfully reverted.'
      )
    })
  })
})
