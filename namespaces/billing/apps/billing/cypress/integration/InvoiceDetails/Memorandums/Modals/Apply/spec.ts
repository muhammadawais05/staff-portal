import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import setupServer from '../../../../../support/commands/setupServer'
import defaultResponses from '../../../../../support/defaultResponse/invoiceDetailsDefault'

/// <reference types="cypress" />

const DATA_DOCUMENT_NUMBER = 377249
const DATA_INVOICE_ID = encodeId({
  id: DATA_DOCUMENT_NUMBER.toString(),
  type: 'invoice'
})

const openModal = () => {
  cy.visit(`/?node_id=${DATA_DOCUMENT_NUMBER}&modal=invoice-apply-memos`, {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = DATA_INVOICE_ID
      contentWindow.DATA_MODALS_ONLY = true
    }
  })
  cy.waitForReact()
}

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  openModal()
}

describe('Widget - Staff - Invoice Details', () => {
  describe('Apply Memos Modal', () => {
    beforeEach(() => {
      resetSetup()
    })

    it('full flow', () => {
      cy.getByTestId('ApplyUnallocatedMemorandumsForm-title').should(
        'contain',
        `Allocate memorandums to Invoice #${DATA_DOCUMENT_NUMBER}`
      )

      const successMessage = `The memorandums were successfully allocated to invoice #${DATA_DOCUMENT_NUMBER}.`

      cy.getByTestId('submit').click()
      cy.getByTestId('FormBaseErrorContainer-error').contains(
        'At least one item must be selected.'
      )

      cy.getByTestId('applyPrepayments').click()
      cy.getByTestId('submit').click()
      cy.get('#react_notification').contains(successMessage)

      openModal()

      cy.getByTestId('MemosListWithHeader-creditMemorandums-0').click()
      cy.getByTestId('submit').click()
      cy.get('#react_notification').contains(successMessage)
    })
  })
})
