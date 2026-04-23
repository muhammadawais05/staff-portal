import fixtures from '@staff-portal/billing/src/_fixtures'

import defaultResponses from '../../support/defaultResponse/billingSettingsDefault'
import setupServer from '../../support/commands/setupServer'

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffBillingSettingsPage'
    }
  })
  cy.waitForReact()
}

describe('Billing Settings Page', () => {
  before(() => resetSetup(resetSetup))

  it('Engagement Selector', () => {
    cy.getByTestId('engagement-selector')
      .within(() => {
        cy.get('input').should('have.value', 'Clorinda Lehner')
      })
      .click()

    cy.getTooltip().within(() => {
      cy.get('li').first().should('have.text', 'Clorinda Lehner')
      cy.get('li').last().should('have.text', 'Jalisa Goodwin')
    })
  })

  it('Invoice Note Update', () => {
    cy.getByTestId('InvoiceSettingsDetailsTable').within(() => {
      cy.getByTestId('edit').last().click()
    })
    cy.get('#invoiceNote').contains('Some note here')

    // close form
    cy.getByTestId('cancel').click()
  })
  it('Display Extra Expenses', () => {
    cy.getByTestId('BillingSettingsExtraExpenses').within(() => {
      cy.getByTestId('paidCompany').should(
        'contain',
        defaultResponses.GetExtraExpenses.data.node.extraExpenses
          .extraExpenseTotals.paidCompany
      )
    })
  })
  it('Add Extra Expenses', () => {
    cy.getByTestId('BillingSettingsExtraExpenses').within(() => {
      cy.getByTestId('edit').click()
      cy.getByTestId('submit').click()
      cy.getFieldError('talentAmount').should(
        'contain',
        'Please complete this field.'
      )

      cy.getByTestId('cancel').click()
      cy.getByTestId('edit').should('contain', 'Add Extra Expenses')
    })
  })
  it('Display Placement Fees', () => {
    cy.getByTestId('BillingDetailsPlacementFees').within(() => {
      cy.getByTestId('description').should(
        'contain',
        defaultResponses.GetPlacementFees.data.node.placementFees.nodes[0]
          .invoice.description
      )
    })
  })
  it('Add Placement Fees', () => {
    cy.getByTestId('BillingDetailsPlacementFees').within(() => {
      cy.getByTestId('edit').click()
      cy.getByTestId('InlineSectionForm').should('be.visible')
      // Check if we trigger validation errors when continuing to the next step
      cy.getByTestId('continue').click()
      cy.getByTestId('installments[0].amount-error').should('be.visible')
      // Enter a value and continue
      cy.getByTestId('installments[0].amount').type('12')
      cy.getByTestId('continue').click()
      cy.getByTestId('AddModalFormConfirm-subtitle').should(
        'contain',
        'Please review and confirm the payment plan'
      )
      cy.getByTestId('submit').click()
      cy.getByTestId('edit').should('be.visible')
    })
  })
  it('Display Timesheets', () => {
    cy.getByTestId('TimesheetList').within(() => {
      const visibleTimesheets =
        defaultResponses.GetBillingCyclesWithTimesheets.data.billingCyclesWithTimesheets.slice(
          0,
          3
        )

      visibleTimesheets.forEach(timesheet => {
        cy.get(`[data-id=${timesheet.id}]`).should('be.visible')
      })
    })
  })

  it('Change Billing Cycle Settings', () => {
    cy.getByTestId('billing-settings-edit').within(() => {
      cy.getByTestId('edit').click()
      cy.getByTestId('billCycle-label').should('be.visible')
      cy.getByTestId('billCycle').should('be.visible')
    })
  })

  describe('Edit PO', () => {
    beforeEach(() => resetSetup(resetSetup))

    // TODO: Keep only 'Edit Purchase Order Lines' block when
    // po lines are officially released https://toptal-core.atlassian.net/browse/BILL-2144
    it('Edit Purchase Order', () => {
      cy.getByTestId('InvoiceSettingsDetailsTable').within(() => {
        cy.getByTestId('purchase-order-link').contains('FAKEPO-0000')
        cy.getByTestId('edit').first().click()
      })

      cy.getByTestId('PurchaseOrderEditForm-autocomplete')
      cy.getByTestId('PurchaseOrderEditForm-comment')
      cy.getByTestId('submit').click()
      cy.getFieldError('comment').should(
        'contain',
        'Please complete this field.'
      )
      // close form
      cy.getByTestId('cancel').click()
    })

    it('Edit Next Purchase Order', () => {
      cy.getByTestId('InvoiceSettingsDetailsTable').within(() => {
        cy.getByTestId('next-purchase-order-link').contains('NEXT-FAKEPO-0000')
        cy.getByTestId('edit').eq(1).click()
      })

      cy.getByTestId('NextPurchaseOrderEditForm-autocomplete')
      cy.getByTestId('NextPurchaseOrderEditForm-comment')
      cy.getByTestId('submit').click()
      cy.getFieldError('comment').should(
        'contain',
        'Please complete this field.'
      )
      // close form
      cy.getByTestId('cancel').click()
    })
  })

  describe('When Edit Purchase Order form receives an async error', () => {
    before(() => {
      resetSetup({
        AssignJobPurchaseOrder: {
          data: {
            assignJobPurchaseOrder: {
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
              job: {
                id: 'VjEtSm9iLTE2OTM4Ng',
                purchaseOrder: {
                  id: '1234',
                  poNumber: '1234',
                  webResource: {
                    url: 'url',
                    text: 'text'
                  }
                }
              },
              notice: null,
              success: false
            }
          }
        }
      })
    })

    it('the form remains open and displays the error', () => {
      cy.getByTestId('InvoiceSettingsDetailsTable').within(() => {
        cy.getByTestId('purchase-order-link').contains('FAKEPO-0000')
        cy.getByTestId('edit').first().click()
      })

      cy.getByTestId('PurchaseOrderEditForm-comment').type('m')
      cy.getByTestId('submit').click()
      cy.getByTestId('FormBaseErrorContainer-error').should(
        'contain',
        'Example form level error'
      )
      cy.getFieldError('comment').should('contain', 'Comment is not nice')
      // close form
      cy.getByTestId('cancel').click()
    })
  })

  describe('When a user with reduced privileges opens the page', () => {
    before(() => {
      const reducedAbilities = {
        operations: {
          assignPurchaseOrder: {
            callable: 'HIDDEN',
            messages: [],
            __typename: 'Operation'
          },
          assignNextPurchaseOrder: {
            callable: 'HIDDEN',
            messages: [],
            __typename: 'Operation'
          },
          updateAttachTimesheetsToInvoices: {
            callable: 'HIDDEN',
            messages: [],
            __typename: 'Operation'
          },
          editJobInvoiceNote: {
            callable: 'HIDDEN',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'JobOperations'
        }
      }

      resetSetup({
        GetJob: {
          data: {
            node: {
              ...fixtures.MockBillingSettingsJob.data.node,
              invoiceNote: null,
              ...reducedAbilities
            }
          }
        },
        GetEngagement: {
          data: {
            node: {
              ...fixtures.MockGetEngagement.data.node,
              operations: {
                changeProductBillingFrequency: {
                  callable: 'HIDDEN',
                  messages: [],
                  __typename: 'Operation'
                },
                changeEngagementCommitment: {
                  callable: 'HIDDEN',
                  messages: ['You cannot change a working commitment.'],
                  __typename: 'Operation'
                },
                __typename: 'EngagementOperations'
              }
            }
          }
        }
      })
    })

    it('the forms protected by operations should not be active', () => {
      cy.getByTestId('InvoiceSettingsDetailsTable').within(() => {
        // Buttons to edit should not exist
        cy.getByTestId('edit').should('not.exist')
        // Asserting that the <Select> has turned into <Typography> and displays the same value
        cy.getByTestId('AddTimesheetToInvoice')
          .get('form p')
          .should('contain', 'Yes')
      })
      // The entire section for Change Billing Cycle Settings should not exist
      cy.getByTestId('billing-settings-edit').should('not.exist')
    })
  })

  describe('When po lines is enabled', () => {
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

    it('ignore purchase order data', () => {
      cy.getByTestId('InvoiceSettingsDetailsTable').within(() => {
        cy.getByTestId('po-link').should('not.exist')
      })
    })
  })

  describe('when PO line & next PO line have been assigned', () => {
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
        },
        GetJob: {
          data: {
            node: {
              ...fixtures.MockBillingSettingsJob.data.node,
              nextPurchaseOrderLine: {
                purchaseOrder: {
                  id: 'NEXT-FAKEPO-0001',
                  poNumber: 'NEXT-FAKEPO-0001',
                  webResource: {
                    text: 'NEXT-FAKEPO-0001',
                    url: 'https://staff-portal.toptal.net/purchase_orders/0001'
                  },
                  __typename: 'PurchaseOrder'
                },
                id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
                poLineNumber: 'NEXT-FAKEPO-0001-L-0001',
                webResource: {
                  text: 'NEXT-FAKEPO-0001-L-0001',
                  url: 'https://staff-portal.toptal.net/purchase_orders/0001/lines/1522',
                  __typename: 'Link'
                },
                __typename: 'PurchaseOrderLine'
              },
              purchaseOrderLine: {
                purchaseOrder: {
                  id: 'FAKEPO-0000',
                  poNumber: 'FAKEPO-0000',
                  webResource: {
                    text: 'FAKEPO-0000',
                    url: 'https://staff-portal.toptal.net/purchase_orders/0000/'
                  },
                  __typename: 'PurchaseOrder'
                },
                id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
                poLineNumber: 'FAKEPO-0000-L-0000',
                webResource: {
                  text: 'FAKEPO-0000-L-0000',
                  url: 'https://staff-portal.toptal.net/purchase_orders/0000/lines/1522',
                  __typename: 'Link'
                },
                __typename: 'PurchaseOrderLine'
              }
            }
          }
        }
      })
    )

    // TODO: Remove 'Edit Purchase Order' block when
    // po lines are officially released https://toptal-core.atlassian.net/browse/BILL-2144
    it('Edit Purchase Order Lines', () => {
      cy.getByTestId('InvoiceSettingsDetailsTable').within(() => {
        cy.getByTestId('po-link').first().should('have.text', 'FAKEPO-0000')

        cy.getByTestId('po-line-link')
          .first()
          .should('have.text', 'FAKEPO-0000-L-0000')

        cy.getByTestId('po-link').last().should('have.text', 'NEXT-FAKEPO-0001')

        cy.getByTestId('po-line-link')
          .last()
          .should('have.text', 'NEXT-FAKEPO-0001-L-0001')

        cy.getByTestId('edit').first().click()
      })

      cy.getByTestId('purchase-order')
      cy.getByTestId('purchase-order-line').click().type('-3').type('{enter}')

      cy.getByTestId('submit').click()
      cy.getFieldError('comment').should(
        'contain',
        'Please complete this field.'
      )

      // close form
      cy.getByTestId('cancel').click()
    })
  })
})
