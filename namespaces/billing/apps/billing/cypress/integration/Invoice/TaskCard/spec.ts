import fixtures from '@staff-portal/billing/src/_fixtures'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/invoiceTaskCard'

/// <reference types="cypress" />

// TODO: variants when necessary GraphQL fields are
// fully implemented
// table footer should not be rendered if description is empty

const mockTask = {
  id: 'abc123',
  description: 'Issue is a credit memo amount of 1200 $',
  status: 'pending',
  playbookTemplate: {
    identifier: 'issue_memo_for_invoice'
  }
}

const mockTaskCardConfig = {
  title: 'Invoice task card title',
  subtitle: 'Invoice task card sub title',
  entityId: 'VjEtSW52b2ljZS0zNzcyNDk'
}

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.clock()
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceTaskCard'
      contentWindow.DATA_INVOICE_ID = fixtures.MockInvoice.documentNumber
      contentWindow.DATA_TASK = mockTask
      contentWindow.DATA_TASK_CARD = mockTaskCardConfig
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - Invoice Task Card', () => {
  describe('General flow', () => {
    beforeEach(() => {
      resetSetup()
    })

    it('Invoice Task Card', () => {
      cy.getByTestId('InvoiceTaskCardSummary-status-value')
        .should('contain.text', '—')
        .and('have.css', 'color', 'rgb(69, 80, 101)')
      cy.getByTestId('InvoiceAmountWithColorAndTooltip-amount').should(
        'contain.text',
        '$2,295.00'
      )

      // cy.getByTestId('job-status').should(
      //   'contain.text',
      //   'Active'
      // )
      // cy.getByTestId('job-status').should('have.css', 'color', GREEN)

      cy.getByTestId('InvoiceTaskCardActions-addPayment').click()
      cy.getByTestId('AlertModal-title').should(
        'contain.text',
        'Add Payment for Invoice #377249'
      )
      cy.getByTestId('AlertModal-text').should(
        'contain.text',
        'You can only add payment to pending invoices.'
      )
      cy.getByTestId('cancel').click()

      cy.tick(500)

      cy.getByTestId('InvoiceTaskCardActions-addMemo').click()

      cy.getByTestId('memo-title').should('contain.text', 'Add Memorandum')
      cy.getByTestId('memo-warning-title').should(
        'contain.text',
        'Please note:'
      )
    })
  })
})
