import { palette } from '@toptal/picasso/utils'
import Color from 'color'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/purchaseOrdersListDefault'

const YELLOW = Color(palette.yellow.main).toString()
const RED = Color(palette.red.main).toString()
const GRAY = Color(palette.grey.dark).toString()

const resetSetup = (overriddenResponses = {}) => {
  cy.clock(new Date(2020, 11, 16).getTime())
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffPurchaseOrderListPage'
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - Purchase Orders List Page', () => {
  beforeEach(resetSetup)

  describe('Purchase Orders List', () => {
    it('displays the header', () => {
      cy.getByTestId('PurchaseOrdersListTableHeader-head').should('be.visible')
    })

    it('verifies required parts of page flow', () => {
      // -------- Proper colors on invoiced total amounts ------- //
      cy.getByTestId('PurchaseOrdersListTableRow-invoicedAmount-text')
        .eq(9)
        .should('have.css', 'color', YELLOW)

      cy.getByTestId('PurchaseOrdersListTableRow-invoicedAmount-text')
        .eq(10)
        .should('have.css', 'color', GRAY)

      cy.getByTestId('PurchaseOrdersListTableRow-invoicedAmount-text')
        .eq(14)
        .should('have.css', 'color', YELLOW)

      cy.getByTestId('PurchaseOrdersListTableRow-invoicedAmount-text')
        .eq(17)
        .should('have.css', 'color', RED)

      // -------- Create Purchase Order modal ------- //
      cy.log('Create Purchase Order modal')
      cy.getByTestId('PurchaseOrdersListHeader-create').click()

      cy.getByTestId('CompanyAutocomplete')
        .click()
        .type('P')
        .tick(501)
        .getByTestId('CompanyAutocomplete')
        .type('{enter}')

      cy.getByTestId('PurchaseOrderCreateModalForm-number')
        .find('input')
        .click()
        .type('test 123 ABC')
        .blur()
        .should('have.value', 'test 123 ABC')

      cy.getByTestId('PurchaseOrderCreateModalForm-amount')
        .find('input')
        .click()
        .type('0abcDeF,+-"12')
        .should('have.value', '012')
        .blur()
        .should('have.value', '12')

      // numeric input formatting
      cy.getByTestId('PurchaseOrderCreateModalForm-threshold')
        .find('input')
        .click()
        .type('#abcDeF,+-"12.0')
        .should('have.value', '12.0')
        .blur()
        .should('have.value', '12.00')

      cy.getByTestId('PurchaseOrderCreateModalForm-expiryDate')
        .find('input')
        .click()
        .type('2020-12-15')
        .blur()
        .should('have.value', '')
        .focus()
        .type('2020-12-17')
        .blur()
        .should('have.value', '2020-12-17')

      cy.getByTestId('submit').click()

      cy.get('#react_notification').should(
        'contain',
        'The purchase order has been successfully created'
      )
    })
  })

  describe('Purchase Order lines', () => {
    beforeEach(() =>
      resetSetup({
        GetExperiments: {
          data: {
            experiments: {
              poLines: { enabled: true }
            }
          }
        },
        SetCreatePurchaseOrder: {
          data: {
            createPurchaseOrder: {
              purchaseOrder: {
                id: 'VjEtUHVyY2hhc2VPcmRlci0yMTAx',
                __typename: 'PurchaseOrder'
              },
              notice: null,
              success: false,
              errors: [
                {
                  __typename: 'StandardUserError',
                  code: 'VALIDATION_ERROR',
                  key: 'purchaseOrderLinesAttributes.0.amount',
                  message: `Can't be nullified when a threshold is set`
                }
              ],
              __typename: 'CreatePurchaseOrderPayload'
            }
          }
        }
      })
    )

    it('displays PO line fields', () => {
      // -------- Create Purchase Order modal ------- //
      cy.getByTestId('PurchaseOrdersListHeader-create').click()

      cy.getByTestId('CompanyAutocomplete')
        .click()
        .type('P')
        .tick(501)
        .getByTestId('CompanyAutocomplete')
        .type('{enter}')

      cy.getByTestId('PurchaseOrderCreateModalForm-number')
        .find('input')
        .type('1')
        .should('have.value', '1')

      cy.getByTestId('purchase-order-line-field-number.0')
        .find('input')
        .type('1')
        .should('have.value', '1')

      cy.getByTestId('purchase-order-line-field-amount.0')
        .find('input')
        .click()
        .type('abcDeF,+-"12')
        .should('have.value', '12')
        .clear()

      cy.getByTestId('purchase-order-line-field-threshold.0')
        .find('input')
        .click()
        .type('12')

      cy.getByTestId('delete-button').should('not.exist')
      cy.getByTestId('addPOLine').click()
      cy.getByTestId('delete-button.0').should('be.visible')
      cy.getByTestId('delete-button.1').should('be.visible')
      cy.getByTestId('delete-button.1').click()
      cy.getByTestId('delete-button').should('not.exist')

      cy.getByTestId('submit').click()

      cy.getFieldError('purchaseOrderLinesAttributes.0.amount').should(
        'contain',
        "Can't be nullified when a threshold is set"
      )
    })
  })

  describe('Negative action cases', () => {
    beforeEach(() =>
      resetSetup({
        SetCreatePurchaseOrder: {
          data: {
            createPurchaseOrder: {
              purchaseOrder: {
                id: 'VjEtUHVyY2hhc2VPcmRlci0yMTAx',
                __typename: 'PurchaseOrder'
              },
              notice: null,
              success: false,
              errors: [
                {
                  __typename: 'UserError',
                  code: 'base',
                  key: 'base',
                  message: 'Example form level error'
                },
                {
                  __typename: 'UserError',
                  code: 'number',
                  key: 'number',
                  message: 'Number is invalid'
                }
              ],
              __typename: 'CreatePurchaseOrderPayload'
            }
          }
        }
      })
    )

    it('Create Purchase Order modal', () => {
      cy.getByTestId('PurchaseOrdersListHeader-create').click()

      cy.getByTestId('PurchaseOrderCreateModalForm-number')
        .find('input')
        .click()
        .type('test 123 ABC')

      cy.getByTestId('CompanyAutocomplete')
        .type('P')
        .tick(501)
        .getByTestId('CompanyAutocomplete')
        .type('{enter}')
        .type('aa')
        .tick(501)

      cy.getByTestId('submit').click()
      cy.getFieldError('clientId__fake').should(
        'contain',
        "You can't leave this empty"
      )

      cy.getByTestId('CompanyAutocomplete')
        .click()
        .type('P')
        .tick(501)
        .getByTestId('CompanyAutocomplete')
        .type('{enter}')

      cy.getByTestId('submit').click()

      cy.getByTestId('FormBaseErrorContainer-error').should(
        'contain',
        'Example form level error'
      )

      cy.getFieldError('number').should('contain', 'Number is invalid')

      cy.closeModal()
    })
  })
})
