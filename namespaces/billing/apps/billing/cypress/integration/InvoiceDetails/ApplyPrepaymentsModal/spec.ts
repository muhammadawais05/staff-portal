import fixtures from '@staff-portal/billing/src/_fixtures'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/invoiceDetailsDefault'

/// <reference types="cypress" />

const DATA_INVOICE_ID = 413986
const documentId = encodeId({
  id: DATA_INVOICE_ID.toString(),
  type: 'invoice'
})
const invoice = fixtures.MockInvoice
const invoiceEndpointOverride = {
  ...invoice,
  id: documentId,
  documentNumber: DATA_INVOICE_ID,
  invoiceKind: 'COMPANY_BILL',
  operations: {
    ...invoice.operations,
    applyPrepayments: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    }
  },
  status: 'OUTSTANDING',
  subjectObject: {
    ...invoice.subjectObject,
    availablePrepaymentBalance: '1500.00'
  }
}

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        ...defaultResponses,
        GetInvoiceForPrepayment: {
          data: {
            node: invoiceEndpointOverride
          }
        }
      },
      overriddenResponses
    })
  )
  cy.clock()
  cy.visit(`/?node_id=${DATA_INVOICE_ID}&modal=invoice-apply-prepayments`, {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = fixtures.MockInvoice.id
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - Invoice Details', () => {
  describe('Apply Prepayments Modal', () => {
    it('has the proper title', () => {
      resetSetup()
      const title = i18n.t('invoice:applyPrepaymentsModal.title', {
        documentNumber: DATA_INVOICE_ID
      })

      cy.getByTestId('InvoiceApplyPrepaymentsModalForm-title').should(
        'contain',
        title
      )

      const errorRequired = i18n.t('common:validation.required')
      const errorPositive = i18n.t('common:validation.positive')
      const errorLessThanOrEqual = i18n.t(
        'common:validation.lessThanOrEqualValue'
      )

      cy.getByTestId('InvoiceApplyPrepaymentsModalForm-amount').clear().blur()
      cy.getByTestId('InvoiceApplyPrepaymentsModalForm-amount-error').should(
        'contain',
        errorRequired
      )

      cy.getByTestId('InvoiceApplyPrepaymentsModalForm-amount')
        .clear()
        .type('0.00')
        .blur()
      cy.getByTestId('InvoiceApplyPrepaymentsModalForm-amount-error').should(
        'contain',
        errorPositive
      )

      cy.getByTestId('InvoiceApplyPrepaymentsModalForm-amount')
        .clear()
        .type('1600.00')
        .blur()
      cy.getByTestId('InvoiceApplyPrepaymentsModalForm-amount-error').should(
        'contain',
        errorLessThanOrEqual
      )
    })

    it('displays alert modal when invalid invoice kind', () => {
      resetSetup({
        GetInvoiceForPrepayment: {
          data: {
            node: { ...invoiceEndpointOverride, invoiceKind: 'COMPANY_DEPOSIT' }
          }
        }
      })

      const errorInvalidKind = i18n.t(
        'invoice:applyPrepaymentsModal.warningCannotAllocateMemorandums'
      )

      cy.getByTestId('AlertModal-text').should('contain', errorInvalidKind)
    })

    it('displays alert modal when invalid invoice status', () => {
      resetSetup({
        GetInvoiceForPrepayment: {
          data: {
            node: { ...invoiceEndpointOverride, status: 'PAID' }
          }
        }
      })

      const errorInvalidKind = i18n.t(
        'invoice:applyPrepaymentsModal.warningCannotAllocateMemorandums'
      )

      cy.getByTestId('AlertModal-text').should('contain', errorInvalidKind)
    })

    it('displays alert modal when not insufficient prepayment balance', () => {
      resetSetup({
        GetInvoiceForPrepayment: {
          data: {
            node: {
              ...invoiceEndpointOverride,
              subjectObject: {
                ...invoice.subjectObject,
                availablePrepaymentBalance: '0.00'
              }
            }
          }
        }
      })

      const errorPrepaymentsBalance = i18n.t(
        'invoice:applyPrepaymentsModal.warningNoPrepaymentsAvailable'
      )

      cy.getByTestId('AlertModal-text').should(
        'contain',
        errorPrepaymentsBalance
      )
    })

    describe('submission', () => {
      it('success', () => {
        resetSetup()

        const successMessage = i18n.t(
          'invoice:applyPrepaymentsModal.notification.success',
          {
            documentNumber: DATA_INVOICE_ID
          }
        )

        cy.getByTestId('InvoiceApplyPrepaymentsModalForm-submit').click()
        cy.get('#react_notification').should('contain', successMessage)
      })

      it('failure', () => {
        resetSetup({
          SetApplyPrepayments: {
            data: {
              applyPrepayments: {
                __typename: 'ApplyPrepaymentsPayload',
                notice: null,
                errors: [
                  {
                    __typename: 'UserError',
                    code: 'exampleCode',
                    key: 'base',
                    message: ['Example form level error']
                  }
                ],
                invoice: {
                  ...fixtures.MockInvoice,
                  id: 'VjEtSW52b2ljZS0zODA2MDA',
                  actionDueOn: '2019-08-20'
                },
                success: false
              }
            }
          }
        })

        cy.getByTestId('InvoiceApplyPrepaymentsModalForm-submit').click()
        cy.getByTestId('FormBaseErrorContainer-error').should(
          'contain',
          'Example form level error'
        )
      })
    })
  })
})
