import fixtures from '@staff-portal/billing/src/_fixtures'

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
  cy.clock()
  cy.visit('/?node_id=377249&modal=invoice-dispute-talent', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = fixtures.MockInvoice.id
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - Invoice Details', () => {
  describe('Dispute Talent Modal', () => {
    describe('when submission is successful', () => {
      beforeEach(() => {
        resetSetup()
      })

      it('verify the behaviour', () => {
        cy.getByTestId('InvoiceDisputeTalentModalForm-title').should(
          'contain',
          'Dispute talent payments of Invoice #377249'
        )
        cy.getByTestId('InvoiceDisputeTalentModalForm-intro').should(
          'contain',
          'Are you sure you want to dispute related talent payments for this invoice?'
        )

        cy.get('#comment').focus().blur()
        cy.getFieldError('comment').should(
          'contain',
          'Please complete this field.'
        )
        cy.get('#comment').type('This is an example')
        cy.getFieldError('comment').should('not.exist')

        cy.get('#comment').clear().type('This is an example')
        cy.getByTestId('submit').click()
        cy.get('#react_notification').should(
          'contain',
          'The related Talent Payments were successfully disputed.'
        )
      })
    })

    describe('when submission has been failed', () => {
      beforeEach(() => {
        resetSetup({
          SetDisputeTalentPayments: {
            data: {
              disputeTalentPayments: {
                __typename: 'disputeTalentPaymentsPayload',
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

      it('shows both the form-level and field-level errors', () => {
        cy.get('#comment').clear().type('This is an example comment')
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
