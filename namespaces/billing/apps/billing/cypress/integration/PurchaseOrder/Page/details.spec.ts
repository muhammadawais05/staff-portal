/// <reference types="cypress" />

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/purchaseOrderDetailsDefault'

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.clock(new Date(2020, 1, 12).getTime())
  cy.visit(`/2003`, {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffPurchaseOrderDetailsPage'
    }
  })
  cy.waitForReact()
}

describe('Purchase Order Details spec', () => {
  describe('When updatePurchaseOrder operation is disabled', () => {
    beforeEach(() => {
      resetSetup({
        GetPurchaseOrderDetails: {
          data: {
            node: {
              ...defaultResponses.GetPurchaseOrderDetails.data.node,
              operations: {
                ...defaultResponses.GetPurchaseOrderDetails.data.node
                  .operations,
                updatePurchaseOrder: {
                  callable: 'DISABLED',
                  messages: ['Disabled'],
                  __typename: 'Operation'
                },
                __typename: 'PurchaseOrderOperations'
              }
            }
          }
        }
      })
    })

    it('disable editor buttons', () => {
      cy.getByTestId('PurchaseOrderPropertyEditor-amount-toggle').should(
        'have.attr',
        'aria-disabled',
        'true'
      )
      cy.getByTestId('PurchaseOrderPropertyEditor-threshold-toggle').should(
        'have.attr',
        'aria-disabled',
        'true'
      )

      cy.getByTestId('PurchaseOrderPropertyEditor-expiryDate-toggle').should(
        'have.attr',
        'aria-disabled',
        'true'
      )
    })
  })

  describe('General flow', () => {
    before(() => {
      resetSetup({
        GetPurchaseOrderDetails: {
          data: {
            node: {
              ...defaultResponses.GetPurchaseOrderDetails.data.node,
              threshold: '74.66',
              totalAmount: '12345.91'
            }
          }
        }
      })
    })

    beforeEach(() => cy.clock(new Date(2020, 1, 12).getTime()))

    describe('Purchase Order Details', () => {
      // -------- Purchase Order Inline Editors ------- //
      it('amount field accepts only numeric input', () => {
        cy.getByTestId('PurchaseOrderPropertyEditor-amount-toggle').click()

        cy.log('has default value, decimal part is removed on init')
        cy.getByTestId('PurchaseOrderPropertyEditor-amount-input')
          .find('input')
          .should('have.value', '12345')

        cy.log('only numbers should left on input')
        cy.getByTestId('PurchaseOrderPropertyEditor-amount-input')
          .find('input')
          .focus()
          .clear()
          .type('123abc')
          .should('have.value', '123')
          // field editor will be closed on escape key press
          .type('{esc}')

        // re-open field editor
        cy.getByTestId('PurchaseOrderPropertyEditor-amount-toggle').click()

        cy.log('should be closed on escape key press')
        cy.getByTestId('PurchaseOrderPropertyEditor-amount-input')
          .find('input')
          .focus()
          // field editor will be closed on escape key press
          .type('{esc}')
      })

      it('amount update works', () => {
        // re-open field editor
        cy.getByTestId('PurchaseOrderPropertyEditor-amount-toggle').click()

        cy.log('mutation should be submitted by pressing enter')
        cy.getByTestId('PurchaseOrderPropertyEditor-amount-input')
          .find('input')
          .focus()
          .type('{moveToStart}{rightArrow}{rightArrow}{rightArrow}{backspace}8')
          // mutation submitted by pressing enter
          .type('{enter}')

        cy.log('notification should appear')
        cy.get('#react_notification').should(
          'have.text',
          'The purchase order amount has been updated'
        )

        cy.closeNotifications()
      })

      it('threshold workflow', () => {
        cy.getByTestId('PurchaseOrderPropertyEditor-threshold-toggle').click()

        // number is rounded on init
        cy.getByTestId('PurchaseOrderPropertyEditor-threshold-input')
          .find('input')
          .should('have.value', '75')

        // mutation submitted on blur
        cy.getByTestId('PurchaseOrderPropertyEditor-threshold-input')
          .find('input')
          .focus()
          .clear()
          .type('90')
          .blur()

        cy.get('#react_notification').should(
          'have.text',
          'The purchase order threshold has been updated'
        )

        cy.closeNotifications()
      })

      it('expiryDate workflow', () => {
        cy.getByTestId('PurchaseOrderPropertyEditor-expiryDate-toggle').click()

        // checks that selecting a past date is disabled
        cy.getByTestId('day-button-11')
          .invoke('attr', 'class')
          .should('contain', 'disabled')

        cy.getByTestId('day-button-12').click()

        cy.get('#react_notification').should(
          'have.text',
          'The purchase order expiration date has been updated'
        )

        cy.closeNotifications()
      })
    })

    it('Pagination shows all the control elements', () => {
      cy.getByTestId('InvoiceListRow').should('have.length', 15)
      cy.get('button').contains('Prev')
      cy.get('button').contains('1')
      cy.get('button').contains('30')
      cy.get('button').contains('Next')
    })
  })

  describe('Integration case - exit edit mode of Details table', () => {
    beforeEach(() => {
      resetSetup({
        SetArchivePurchaseOrder: {
          data: {
            archivePurchaseOrder: {
              purchaseOrder: {
                ...defaultResponses.GetPurchaseOrderDetails.data.node,
                archived: true
              },
              notice: null,
              success: true,
              errors: [],
              __typename: 'ArchivePurchaseOrderPayload'
            }
          }
        },
        GetPurchaseOrderDetailsAttributes: {
          data: {
            node: {
              ...defaultResponses.GetPurchaseOrderDetails.data.node,
              archived: false
            }
          }
        },
        SetUpdatePurchaseOrder: {
          data: {
            updatePurchaseOrder: {
              purchaseOrder: null,
              notice: null,
              success: false,
              errors: [
                {
                  __typename: 'UserError',
                  code: '',
                  key: 'amount',
                  message: 'Amount error'
                }
              ],
              __typename: 'UpdatePurchaseOrderPayload'
            }
          }
        }
      })
    })

    // TODO: restore as soon as SPB-1949 be resolved
    it.skip('when archive/unarchive has been changed', () => {
      // -- amount --
      cy.getByTestId('PurchaseOrderPropertyEditor-amount-toggle').click()

      // Change value of amount
      cy.getByTestId('PurchaseOrderPropertyEditor-amount-input')
        .find('input')
        .focus()
        .clear()
        .type('1')
        .blur()

      cy.get(
        '[data-testid="PurchaseOrderPropertyEditor-amount-input"] [class*="FormError-error"]'
      ).should('have.text', 'Amount error')

      // Mock server again according new value archive attribute
      cy.mockGraphQL((operationName: string) =>
        setupServer({
          operationName,
          defaultResponses,
          overriddenResponses: {
            GetPurchaseOrderDetailsAttributes: {
              data: {
                node: {
                  ...defaultResponses.GetPurchaseOrderDetails.data.node,
                  archived: true
                }
              }
            }
          }
        })
      )

      // Change archive attribute
      cy.get('[data-testid="archive-purchase-order"]').click()

      // Check old value of amount
      cy.get('[data-testid="PurchaseOrderPropertyEditor-amount"]').should(
        'have.text',
        '$114,400.00'
      )
    })
  })

  describe('Negative action cases', () => {
    beforeEach(() => {
      resetSetup({
        SetUpdatePurchaseOrder: {
          data: {
            updatePurchaseOrder: {
              purchaseOrder: null,
              notice: null,
              success: false,
              errors: [
                {
                  __typename: 'UserError',
                  code: '',
                  key: 'amount',
                  message: 'Amount error'
                },
                {
                  __typename: 'UserError',
                  code: '',
                  key: 'threshold',
                  message: 'Threshold error'
                },
                {
                  __typename: 'UserError',
                  code: '',
                  key: 'expiryDate',
                  message: 'Expiration date error'
                }
              ],
              __typename: 'UpdatePurchaseOrderPayload'
            }
          }
        }
      })
    })

    describe('Purchase Order Details', () => {
      // -------- Purchase Order Inline Editors ------- //
      it('amount field', () => {
        cy.getByTestId('PurchaseOrderPropertyEditor-amount-toggle').click()

        cy.getByTestId('PurchaseOrderPropertyEditor-amount-input')
          .find('input')
          .focus()
          .clear()
          .type('1')
          .blur()

        cy.get(
          '[data-testid="PurchaseOrderPropertyEditor-amount-input"] [class*="FormError-error"]'
        ).should('have.text', 'Amount error')
      })

      it('threshold field', () => {
        cy.getByTestId('PurchaseOrderPropertyEditor-threshold-toggle').click()

        cy.getByTestId('PurchaseOrderPropertyEditor-threshold-input')
          .find('input')
          .focus()
          .clear()
          .type('0')
          .blur()

        cy.get(
          '[data-testid="PurchaseOrderPropertyEditor-threshold-input"] [class*="FormError-error"]'
        ).should('have.text', 'Threshold error')
      })

      it('expiryDate field', () => {
        cy.getByTestId('PurchaseOrderPropertyEditor-expiryDate-toggle').click()

        cy.getByTestId('PurchaseOrderPropertyEditor-expiryDate-input')
          .find('input')
          .focus()
          .clear()
          .blur()

        cy.get(
          '[data-testid="PurchaseOrderPropertyEditor-expiryDate-input"] [class*="FormError-error"]'
        ).should('not.exist')

        cy.getByTestId('PurchaseOrderPropertyEditor-expiryDate-toggle').click()

        cy.getByTestId('PurchaseOrderPropertyEditor-expiryDate-input')
          .find('input')
          .focus()
          .clear()
          .type('2020-02-12{enter}')

        cy.get(
          '[data-testid="PurchaseOrderPropertyEditor-expiryDate-input"] [class*="FormError-error"]'
        ).should('have.text', 'Expiration date error')
      })
    })
  })
})

describe('Edit Purchase Order Lines', () => {
  before(() =>
    resetSetup({
      GetExperiments: {
        data: {
          experiments: {
            poLines: {
              enabled: true
            }
          }
        }
      }
    })
  )

  it('displays PO lines fields', () => {
    cy.getByTestId('edit-purchase-order').click()

    // we have 1 archived po line and 2 normal ones
    // the archived purchaseOrderLine should not be shown
    cy.getByTestId('purchase-order-line-field').should('have.length', 2)

    cy.getByTestId('CompanyAutocomplete')
      .find('input')
      .should('have.value', 'Jacobs, Nikolaus and Leuschke')
      .and('be.disabled')

    cy.getByTestId('purchase-order-line-field-number.0')
      .find('input')
      .should('have.value', '1')
      .and('be.disabled')

    cy.getByTestId('purchase-order-line-field-amount.0')
      .find('input')
      .should('have.value', '5.0')
      .and('not.be.disabled')

    cy.getByTestId('purchase-order-line-field-expiryDate.0')
      .find('input')
      .should('not.be.disabled')

    cy.getByTestId('purchase-order-line-field-threshold.0')
      .find('input')
      .should('not.be.disabled')

    cy.getByTestId('purchase-order-line-field-number.1')
      .find('input')
      .should('have.value', '2')
      .and('be.disabled')

    cy.getByTestId('purchase-order-line-field-amount.1')
      .find('input')
      .should('have.value', '500.0')
      .and('not.be.disabled')

    cy.getByTestId('purchase-order-line-field-expiryDate.1')
      .find('input')
      .should('not.be.disabled')

    cy.getByTestId('purchase-order-line-field-threshold.1')
      .find('input')
      .should('not.be.disabled')

    cy.getByTestId('addPOLine').click()
    cy.getByTestId('delete-button.0').should('not.exist')
    cy.getByTestId('delete-button.1').should('not.exist')
    cy.getByTestId('delete-button.2').should('be.visible')
    cy.getByTestId('purchase-order-line-field-number.2')
      .find('input')
      .should('be.enabled')

    cy.getByTestId('delete-button').should('not.exist')
  })
})
