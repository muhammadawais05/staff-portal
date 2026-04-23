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
  cy.visit(
    '/?node_id=377249&node_type=invoice&modal=commercial-document-dispute-resolve',
    {
      onBeforeLoad: contentWindow => {
        contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
        contentWindow.DATA_INVOICE_ID = fixtures.MockInvoice.id
      }
    }
  )
  cy.waitForReact()
}

describe('Widget - Staff - Invoice Details', () => {
  describe('Dispute Resolve Modal', () => {
    describe('when submission is successful', () => {
      beforeEach(() => {
        resetSetup()
      })

      it('verify the behaviour', () => {
        cy.getByTestId('DisputeResolveModalForm-title').should(
          'contain',
          'Resolve dispute for Invoice #377249'
        )
        cy.getByTestId('DisputeResolveModalForm-intro').should(
          'contain',
          'Are you sure you want to resolve this dispute?'
        )
        cy.get('#comment').focus().blur()
        cy.getFieldError('comment').should(
          'contain',
          'Please complete this field.'
        )
        cy.get('#comment').type('This is an example')
        cy.getFieldError('comment').should('not.exist')

        cy.getByTestId('submit').click()
        cy.get('#react_notification').should(
          'contain',
          'The Invoice Dispute was successfully resolved.'
        )
      })
    })

    describe('when submission has been failed', () => {
      beforeEach(() => {
        resetSetup({
          SetResolveDisputeResolution: {
            data: {
              resolveDisputeOfCommercialDocument: {
                __typename: 'RequestDisputeResolutionPayload',
                notice: null,
                errors: [
                  {
                    __typename: 'UserError',
                    code: 'exampleCode',
                    key: 'base',
                    message: ['Example form level error']
                  },
                  {
                    __typename: 'UserError',
                    code: 'exampleCode',
                    key: 'comment',
                    message: ['Comment is not nice']
                  }
                ],
                commercialDocument: fixtures.MockInvoice,
                success: false
              }
            }
          }
        })
      })

      it('verify the behaviour', () => {
        cy.get('#comment').clear().type('This is an example')
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
