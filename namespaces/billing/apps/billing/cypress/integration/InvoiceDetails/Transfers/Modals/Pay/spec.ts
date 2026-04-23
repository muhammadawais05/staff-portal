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
  cy.visit('/?modal=transfer-pay&node_id=589030', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = 'VjEtSW52b2ljZS0zNzcyNDk'
      contentWindow.DATA_MODALS_ONLY = true
    }
  })
  cy.waitForReact()
}

describe('Transfer - Pay', () => {
  describe('when `operation` is enabled', () => {
    beforeEach(() => {
      resetSetup()
    })

    it('General flow', () => {
      cy.getByTestId('PayForm-title').contains('Mark Payment Paid')
      cy.getByTestId('PayForm-intro').contains(
        'Are you sure you want to mark current transaction paid?'
      )
      cy.get('#amount').should('be.focused').clear().blur()

      cy.getFieldError('amount').should(
        'contain',
        i18n.t('common:validation.required') as string
      )
      cy.getByTestId('amount').type('5')
      cy.getFieldError('amount').should('not.exist')

      cy.get('#effectiveDate').focus().clear().type('2019-02-02').blur()

      cy.getFieldError('effectiveDate').should(
        'contain',
        'Cannot be before the date of transfer creation'
      )

      cy.get('#effectiveDate').focus().clear().type('2021-02-13').blur()

      cy.getFieldError('effectiveDate').should(
        'contain',
        'Cannot be in the future'
      )

      cy.get('#effectiveDate').focus().clear().type('2020-02-06').blur()

      cy.getFieldError('effectiveDate').should('not.exist')

      cy.get('#comment').focus().blur()

      cy.getFieldError('comment').should(
        'contain',
        i18n.t('common:validation.required')
      )

      cy.get('#comment').type('This is an example comment')
      cy.getFieldError('comment').should('not.exist')

      cy.get('#comment').type('This is an example comment')
      cy.getByTestId('submit').click()
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
                  payTransfer: {
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
