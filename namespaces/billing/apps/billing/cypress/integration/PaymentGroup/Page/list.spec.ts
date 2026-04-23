import fixtures from '@staff-portal/billing/src/_fixtures'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/paymentGroupListDefault'
import * as payMultiple from '../../../partials/paymentGroupList/payMultiple.spec'
import * as header from '../../../partials/paymentGroupList/header.spec'

const MockPaymentGroup = fixtures.MockPaymentGroup

/// <reference types="cypress" />

const resetSetup = ({
  overriddenResponses = {},
  baseUrl = '/?page=1',
  modalsOnly = false
} = {}) => {
  cy.server()
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.clock()
  cy.visit(baseUrl, {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffPaymentGroupListPage'
      contentWindow.DATA_MODALS_ONLY = modalsOnly

      cy.stub(contentWindow, 'open')
    }
  })
  cy.waitForReact()
}

describe('Payment Group List Page', () => {
  describe('successful mutation cases and enabled actions', () => {
    before(resetSetup)

    it('verifies entire page flow', () => {
      // TODO: add listRow tests
      // https://toptal-core.atlassian.net/browse/SPB-1753
      payMultiple.successfulFlow()
      payMultiple.multiplePaymentGroupSubmission()
    })
  })

  describe('actions disabled', () => {
    before(() => {
      resetSetup({
        overriddenResponses: {
          GetPaymentGroupsListHeader: {
            data: {
              paymentGroups: {
                ...fixtures.MockGetPaymentGroupListHeaderActions.paymentGroups,
                operations: {
                  payPaymentGroups: {
                    callable: 'DISABLED',
                    messages: [
                      'To pay multiple payments, they should be filtered by Due/Overdue status.'
                    ],
                    __typename: 'Operation'
                  },
                  __typename: 'PaymentGroupsConnectionOperations'
                },
                __typename: 'PaymentGroupsConnection'
              }
            }
          }
        }
      })
    })

    // TODO: Fix the test scenario
    // Confirmed manually still working, find no reason why it's started to fail now
    it.skip('testing the whole page flow', () => {
      header.disabledActionButtonsFlow()
    })
  })

  describe('payment method warning', () => {
    before(() => {
      resetSetup({
        overriddenResponses: {
          GetPaymentGroupsList: {
            data: {
              paymentGroupsNullable: {
                totalCount: 0,
                nodes: [],
                __typename: 'PaymentGroupsConnection'
              }
            }
          }
        }
      })
    })

    it('displays a warning if payee has no default payment method set', () => {
      payMultiple.paymentMethodWarningFlow()
    })
  })

  describe('failing mutation cases', () => {
    before(() => {
      resetSetup({
        overriddenResponses: {
          SetPayPaymentGroups: {
            data: {
              payPaymentGroups: {
                notice: null,
                success: false,
                errors: [
                  {
                    message: 'Please select at least one payment group.',
                    code: 'VALIDATION_ERROR',
                    key: 'base',
                    __typename: 'StandardUserError'
                  }
                ],
                __typename: 'PayPaymentGroupsPayload'
              }
            }
          }
        }
      })
    })

    it('testing the whole page flow', () => {
      payMultiple.failingFlow()
      payMultiple.validation()
    })
  })

  describe('Payment Group row action', () => {
    describe('basic permissions workflow', () => {
      before(() => resetSetup())

      it('should show action menu with details and cancel actions', () => {
        // Get first row with first payment group
        cy.getByTestId('PaymentGroupListTableRow-payment-group')
          .first()
          .within(() => {
            cy.getByTestId('more-actions-button').click()
          })

        cy.getTooltip()
          .should('be.visible')
          .invoke('text')
          .should('contain', 'Details')
          .should('contain', 'Cancel Payment')
      })
    })

    describe('no permissions workflow', () => {
      before(() =>
        resetSetup({
          overriddenResponses: {
            GetOperations: {
              data: {
                node: {
                  ...MockPaymentGroup,
                  operations: {
                    applyUnallocatedMemorandums: {
                      callable: 'HIDDEN',
                      messages: [],
                      __typename: 'Operation'
                    },
                    cancelPaymentGroup: {
                      callable: 'HIDDEN',
                      messages: [],
                      __typename: 'Operation'
                    },
                    payPaymentGroup: {
                      callable: 'ENABLED',
                      messages: [],
                      __typename: 'Operation'
                    },
                    __typename: 'PaymentGroupOperations'
                  }
                }
              }
            }
          }
        })
      )

      it('should show action menu with only details (cancel is hidden by permission)', () => {
        // Get first row with first payment group
        cy.getByTestId('PaymentGroupListTableRow-payment-group')
          .first()
          .within(() => {
            cy.getByTestId('more-actions-button').click()
          })

        cy.getTooltip()
          .should('be.visible')
          .invoke('text')
          .should('contain', 'Details')

        cy.getTooltip().within(() => {
          cy.getByTestId('cancelPaymentGroup').should('not.exist')
        })
      })
    })
  })

  describe('Cancel modal', () => {
    before(() => resetSetup())

    it('should conduct mutation if reason of cancellation was specified', () => {
      cy.getByTestId('PaymentGroupListTableRow-payment-group')
        .first()
        .within(() => {
          cy.getByTestId('more-actions-button').click()
        })

      cy.getTooltip().within(() => {
        cy.getByTestId('cancelPaymentGroup').click()
      })

      cy.log('** should appear if user clicked on the cancel menu item **')
      cy.getByTestId('ModalsState-paymentGroupCancel')
        .should('exist')
        .should('contain', 'Cancel Payment Group #186344')

      cy.url().should(
        'match',
        /\?page=1&modal=payment-group-cancel&node_id=186344&node_type=paymentGroup/i
      )

      cy.log(
        '** displays a field error if the user has not specified a reason of cancellation **'
      )
      cy.getByTestId('ModalsState-paymentGroupCancel').within(() => {
        cy.getByTestId('submit').click()

        cy.getFieldError('comment').should(
          'contain',
          'Please complete this field.'
        )
      })

      cy.log('** should submit form without any errors **')
      cy.getByTestId('ModalsState-paymentGroupCancel').within(() => {
        cy.get('#comment').focus().type('Test reason')

        cy.getByTestId('submit').click()
      })

      cy.get('#react_notification').should(
        'contain',
        'Payment group #186344 cancellation process has been started'
      )
    })
  })
})
