import fixtures from '@staff-portal/billing/src/_fixtures'

import setupServer from '../../../../../support/commands/setupServer'
import { common } from '../../../../../support/i18n/common'

/// <reference types="cypress" />

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        GetTransfer: {
          data: {
            node: fixtures.MockTransfer
          }
        }
      },
      overriddenResponses
    })
  )
  cy.visit('/?modal=transfer-claim-refund&node_id=589030', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = 'VjEtSW52b2ljZS0zNzcyNDk'
      contentWindow.DATA_MODALS_ONLY = true
    }
  })
  cy.waitForReact()
}

describe('Transfers - Claim Refund', () => {
  describe('when `operation` is enabled', () => {
    beforeEach(() => {
      resetSetup()
    })

    it('General flow', () => {
      cy.getByTestId('ClaimRefundForm-title').contains('Confirm Refund')

      cy.get('#refundAmount')
        .should('be.focused')
        .should('have.value', '499.00')
        .clear()
        .blur()

      cy.getFieldError('refundAmount').should(
        'contain',
        common.validation.required
      )
      cy.get('#refundAmount').type('5')
      cy.getFieldError('refundAmount').should('not.exist')

      cy.get('#comment').focus().blur()
      cy.getFieldError('comment').should('contain', common.validation.required)
      cy.get('#comment').type('This is an example comment')
      cy.getFieldError('comment').should('not.exist')
    })
  })

  describe('when `operation` is disabled', () => {
    beforeEach(() => {
      resetSetup({
        GetTransfer: {
          data: {
            node: {
              ...fixtures.MockTransfer,
              ...{
                operations: {
                  ...fixtures.MockTransfer.operations,
                  claimTransferRefund: {
                    __typename: 'Operation',
                    callable: 'DISABLED',
                    messages: []
                  }
                }
              }
            }
          }
        }
      })
    })

    it('modal should be closed', () => {
      cy.url().should('eq', 'http://localhost:3032/')
    })
  })
})
