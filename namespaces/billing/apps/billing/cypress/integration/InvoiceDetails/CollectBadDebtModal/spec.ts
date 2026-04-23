import fixtures from '@staff-portal/billing/src/_fixtures'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import { common } from '../../../support/i18n/common'
import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/invoiceDetailsDefault'

const VALIDATION_MESSAGE_REQUIRED = common.validation.required
const DATA_DOCUMENT_NUMBER = 377249
const DATA_INVOICE_ID = encodeId({
  id: DATA_DOCUMENT_NUMBER.toString(),
  type: 'invoice'
})
const invoice = fixtures.MockInvoice
const invoiceEndpointOverride = {
  ...invoice,
  id: DATA_INVOICE_ID,
  documentNumber: DATA_DOCUMENT_NUMBER,
  status: 'IN_COLLECTIONS'
}

const componentName = 'InvoiceCollectBadDebtModalForm'

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        ...defaultResponses,
        GetInvoiceDetailsTable: {
          data: { node: fixtures.MockInvoice }
        },
        GetPayModalInvoice: {
          data: {
            node: invoiceEndpointOverride
          }
        },
        SetCollectBadDebtInvoice: {
          data: {
            collectBadDebtInvoice: {
              __typename: 'CollectBadDebtInvoicePayload',
              notice: null,
              errors: [],
              invoice: {
                ...fixtures.MockInvoice,
                id: 'VjEtSW52b2ljZS0zODA2MDA',
                actionDueOn: '2019-08-20'
              },
              success: true
            }
          }
        }
      },
      overriddenResponses
    })
  )
  cy.visit(
    `/?node_id=${DATA_DOCUMENT_NUMBER}&node_type=invoice&modal=invoice-pay`,
    {
      onBeforeLoad: contentWindow => {
        contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
        contentWindow.DATA_INVOICE_ID = DATA_DOCUMENT_NUMBER
        contentWindow.DATA_MODALS_ONLY = true
      }
    }
  )
  cy.waitForReact()
}

describe('Widget - Staff - Invoice Details', () => {
  describe('Collect Bad Debt Modal', () => {
    beforeEach(() => {
      resetSetup()
    })

    it('has the proper title', () => {
      cy.getByTestId(`${componentName}-title`).should(
        'contain.text',
        i18n.t('invoice:collectBadDebtModal.title', {
          invoiceDocumentNumber: DATA_DOCUMENT_NUMBER
        })
      )
    })

    it('properly validates input fields', () => {
      cy.get('#transferAmount').focus().blur()
      cy.getFieldError('transferAmount').should(
        'contain.text',
        VALIDATION_MESSAGE_REQUIRED
      )

      cy.get('#transferAmount').focus().clear().type('0').blur()

      cy.getFieldError('transferAmount').should(
        'contain.text',
        i18n.t('common:validation.positive')
      )

      cy.get('#transferAmount').focus().clear().type('1').blur()
      cy.getFieldError('transferAmount').should('not.exist')

      cy.get('#feeAmount').focus().blur()
      cy.getFieldError('feeAmount').should(
        'contain.text',
        VALIDATION_MESSAGE_REQUIRED
      )

      cy.get('#feeAmount').focus().clear().type('0').blur()
      cy.getFieldError('feeAmount').should('not.exist')

      cy.get('#comment').focus().blur()
      cy.getFieldError('comment').should(
        'contain.text',
        VALIDATION_MESSAGE_REQUIRED
      )
      cy.get('#comment')
        .focus()
        .clear()
        .type('This is an example comment')
        .blur()
      cy.getFieldError('comment').should('not.exist')
    })

    it('when submission is successful', () => {
      cy.get('#transferAmount').focus().clear().type('1').blur()
      cy.get('#feeAmount').focus().clear().type('1').blur()
      cy.get('#comment')
        .focus()
        .clear()
        .type('This is an example comment')
        .blur()

      cy.getByTestId('submit').click()
      cy.get('#react_notification').should(
        'contain.text',
        i18n.t('invoice:collectBadDebtModal.notification.success', {
          collectedAmount: '$2.00',
          documentNumber: DATA_DOCUMENT_NUMBER
        })
      )
    })

    describe('when submission is failed', () => {
      beforeEach(() => {
        resetSetup({
          SetCollectBadDebtInvoice: {
            data: {
              collectBadDebtInvoice: {
                __typename: 'SetCollectBadDebtInvoicePayload',
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
                invoice: {
                  ...fixtures.MockInvoice,
                  id: 'VjEtSW52b2ljZS0zODA2MDA'
                },
                success: false
              }
            }
          }
        })
      })

      it('shows both the base and field form error', () => {
        cy.get('#transferAmount').focus().clear().type('1').blur()
        cy.get('#feeAmount').focus().clear().type('1').blur()
        cy.get('#comment')
          .focus()
          .clear()
          .type('This is an example comment')
          .blur()

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
