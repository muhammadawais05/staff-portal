import fixtures from '@staff-portal/billing/src/_fixtures'

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
  cy.clock()
  cy.visit(`/?node_id=377249&node_type=invoice&modal=memo-add`, {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = fixtures.MockInvoice.id
    }
  })
}

const MemoAddModal = () => cy.getByTestId('Modals-memo-add')
const ModalContainer = () => cy.get('#react_modal')

describe('Widget - Staff - Invoice', () => {
  describe('Add memorandum Modal', () => {
    describe('when submission is successful', () => {
      beforeEach(() => {
        resetSetup()
      })

      it('verify the behaviour when comment is not modified', () => {
        cy.getByTestId('memo-balanceType').within(() => {
          cy.getByTestId('trigger').last().click()
        })

        cy.get('#amount')
          .focus()
          .type('100')
          .blur()
          .should('have.value', '100.00')

        cy.getByTestId('memo-select-category')
          .find('input:last')
          .click()
          // TODO: remove { force: true } in scope of
          // https://toptal-core.atlassian.net/browse/SPB-2967
          .type('{downarrow}{downarrow}{enter}', { force: true })

        cy.get('#comment').should(
          'have.value',
          'The engagement with Bertie Davis on Job title was closed on February 6, 2020. This resulted in a credit of {working_period} that has been applied to invoice #377249.'
        )

        // check that no confirmations were opened,
        // and current modal is still in place
        ModalContainer()
          .last()
          .within(() => {
            cy.getByTestId('memo-title').should('contain', 'Add Memorandum')
          })
      })

      it('verify the behaviour when comment is modified', () => {
        cy.getByTestId('memo-warning-text').should(
          'have.html',
          'Credit memorandums, applied to the deposit invoice, adjust the balance due on the invoice but create <strong>no</strong> accounting transactions. You <strong>cannot</strong> apply debit memorandums to the deposit invoice.'
        )

        cy.getByTestId('memo-invoice-link').should('not.exist')

        cy.getByTestId('memo-balanceType').contains('Credit').click()

        cy.get('#amount')
          .focus()
          .type('100.50.0')
          .blur()
          .should('have.value', '100.50')

        cy.get('#comment').type('Some comment')

        cy.getByTestId('memo-select-category')
          .find('input:last')
          .click()
          // TODO: remove { force: true } in scope of
          // https://toptal-core.atlassian.net/browse/SPB-2967
          .type('{downarrow}{downarrow}{downarrow}{enter}', { force: true })

        cy.log(
          '**Check if confirmation modal was opened on top of Add Memo modal**'
        )

        ModalContainer()
          .getByTestId('Confirmation')
          .within(() => {
            cy.getByTestId('Confirmation-title').should('contain', 'Confirm')

            cy.getByTestId('Confirmation-description').should(
              'contain',
              'You have manually modified the comment. Are you OK with losing those changes?'
            )

            cy.getByTestId('Confirmation-action').contains('Yes').click()
          })

        MemoAddModal().within(() => {
          cy.getByTestId('notify-receiver-checkbox').click()
          cy.getByTestId('submit').click()
        })

        cy.getNotification().should(
          'contain',
          'The Memorandum has been successfully added to invoice.'
        )
      })
    })
  })

  describe('when submission fails', () => {
    beforeEach(() => {
      resetSetup({
        SetAddMemorandumToCommercialDocument: {
          data: {
            addMemorandumToCommercialDocument: {
              __typename: 'AddMemorandumToCommercialDocumentPayload',
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
              invoice: fixtures.MockInvoice,
              success: false
            }
          }
        }
      })
    })

    it('verify the behaviour', () => {
      cy.get('#amount').focus().type('100.50.0000')

      cy.get('input[name="balanceType"]').first().click()

      cy.getByTestId('memo-select-category')
        .find('input:last')
        .click()
        // TODO: remove { force: true } in scope of
        // https://toptal-core.atlassian.net/browse/SPB-2967
        .type('{downarrow}{downarrow}{enter}', { force: true })

      cy.get('#comment').clear().type('nice comment')

      cy.getByTestId('submit').click()

      cy.getByTestId('FormBaseErrorContainer-error').should(
        'contain',
        'Example form level error'
      )
      cy.getFieldError('comment').should('contain', 'Comment is not nice')
    })
  })
})
