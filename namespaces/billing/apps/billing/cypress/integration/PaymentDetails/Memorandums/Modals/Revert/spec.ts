import i18n from '@staff-portal/billing/src/utils/i18n'

import setupServer from '../../../../../support/commands/setupServer'
import defaultResponses from '../../../../../support/defaultResponse/paymentDetailsDefault'

/// <reference types="cypress" />

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.visit('/?node_id=183407&modal=memo-revert', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffPaymentDetailsPage'
      contentWindow.DATA_PAYMENT_ID = 'VjEtUGF5bWVudC0xMTA0NDI4'
      contentWindow.DATA_MODALS_ONLY = true
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - Payment Details', () => {
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

    // TODO: Enable test
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('Will revert memorandum', () => {
      cy.get('#comment').focus().type('Sample comment')
      cy.getByTestId('submit').click()
      cy.get('#react_notification').should(
        'contain',
        i18n.t(
          'commercialDocument:modals.revertCommercialDocumentMemorandum.notification.success'
        )
      )
    })
  })
})
