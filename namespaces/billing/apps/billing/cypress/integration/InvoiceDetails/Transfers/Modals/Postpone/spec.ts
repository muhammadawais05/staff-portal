import fixtures from '@staff-portal/billing/src/_fixtures'
import i18n from '@staff-portal/billing/src/utils/i18n'

import setupServer from '../../../../../support/commands/setupServer'
/// <reference types="cypress" />

const resetSetup = (overriddenResponses = {}) => {
  cy.clock(Date.UTC(2020, 8, 29), ['Date'])
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
  cy.visit('/?modal=transfer-postpone&node_id=589030', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = 'VjEtSW52b2ljZS0zNzcyNDk'
      contentWindow.DATA_MODALS_ONLY = true
    }
  })
  cy.waitForReact()
}

describe('Transfers - Postpone', () => {
  describe('when `operation` is enabled', () => {
    before(() => {
      resetSetup()
    })

    it('General flow', () => {
      cy.get('#pendingReceiptOn')
        .should('exist')
        .and('value', '2020-02-05')
        .clear()

      cy.getByTestId('submit').click()
      cy.get('#comment').focus()

      cy.getFieldError('pendingReceiptOn').should(
        'contain',
        i18n.t('common:validation.required') as string
      )

      cy.get('#pendingReceiptOn').type('2020-01-30')

      cy.get('#pendingReceiptOn').invoke('val').should('eq', '2020-01-30')

      cy.get('#comment').focus()

      cy.getFieldError('comment').should(
        'contain',
        i18n.t('common:validation.required') as string
      )

      cy.get('#comment').type('Some comment')
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
                  postponeTransfer: {
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
