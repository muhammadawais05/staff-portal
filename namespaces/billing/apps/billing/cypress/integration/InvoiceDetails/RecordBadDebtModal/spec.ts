import fixtures from '@staff-portal/billing/src/_fixtures'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/invoiceDetailsDefault'
import { common } from '../../../support/i18n/common'
/// <reference types="cypress" />

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.clock()
  cy.visit('/?node_id=377249&modal=invoice-record-bad-debt', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = fixtures.MockInvoice.id
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - Invoice Details', () => {
  describe('Record Bad Debt Modal', () => {
    describe('when submission is successful', () => {
      beforeEach(() => {
        resetSetup()
      })

      it('verify the behaviour', () => {
        cy.getByTestId('InvoiceRecordBadDebtModalForm-title').contains(
          'Record Invoice #377249 as bad debt'
        )

        cy.getByTestId('InvoiceRecordBadDebtModalForm-warning').contains(
          'Are you sure you want to record this invoice as bad debt?'
        )

        cy.getByTestId('comment').focused().blur()
        cy.getFieldError('comment').should(
          'contain.text',
          common.validation.required
        )
        cy.get('#comment')
          .focus()
          .clear()
          .type('This is an example comment')
          .blur()

        cy.getByTestId('submit').click()
        cy.get('#react_notification').contains(
          '#377249 has been recorded as a bad debt.'
        )
      })
    })

    describe('when submission is failed', () => {
      beforeEach(() => {
        resetSetup({
          SetRecordBadDebt: {
            data: {
              recordBadDebt: {
                __typename: 'RecordBadDebtPayload',
                notice: null,
                errors: [
                  {
                    __typename: 'UserError',
                    code: 'base',
                    key: 'base',
                    message: 'Example form level error'
                  },
                  {
                    __typename: 'UserError',
                    code: 'comment',
                    key: 'comment',
                    message: 'Comment is not nice'
                  }
                ],
                invoice: fixtures.MockInvoice,
                success: false
              }
            }
          }
        })
      })

      it('form in error', () => {
        cy.getByTestId('comment').type('This is an example comment')

        cy.getByTestId('submit').click()

        cy.getByTestId('FormBaseErrorContainer-error').should(
          'contain.text',
          'Example form level error'
        )
        cy.getFieldError('comment').should(
          'contain.text',
          'Comment is not nice'
        )
      })
    })
  })
})
