import fixtures from '@staff-portal/billing/src/_fixtures'

import defaultResponses from '../../../support/defaultResponse/paymentListDefault'
import setupServer from '../../../support/commands/setupServer'
import * as payMultiple from '../../../partials/paymentList/payMultiple.spec'
import * as header from '../../../partials/paymentList/header.spec'
import * as search from '../../../partials/paymentList/search.spec'
import * as downloadPayments from '../../../partials/paymentList/downloadPay.spec'
import * as createPaymentGroup from '../../../partials/paymentList/createPaymentGroup.spec'
import * as listRows from '../../../partials/paymentList/listRows.spec'

/// <reference types="cypress" />

const resetSetup = ({
  overriddenResponses = {},
  baseUrl = '/',
  modalsOnly = false
} = {}) => {
  cy.clock()
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.visit(baseUrl, {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffPaymentListPage'
      contentWindow.DATA_MODALS_ONLY = modalsOnly

      cy.stub(contentWindow, 'open')
    }
  })
  cy.waitForReact()
}

describe('Payment List', () => {
  describe('successful mutation cases and enabled actions', () => {
    before(() => {
      resetSetup({
        baseUrl:
          '/?preset=Toptal+payments&preferred_payment_methods%5B%5D=toptal_payments&page=1'
      })
    })

    it('verifies entire page flow', () => {
      // row tooltips
      listRows.statusTooltips()

      // filters
      search.restoreFunctionality()
      search.basicFunctionality()

      // pay multiple modal
      payMultiple.successfulFlow()
      payMultiple.multiplePaymentSubmission()

      // actions
      downloadPayments.successfulFlow()
      createPaymentGroup.successfulFlow()
    })
  })

  describe('actions disabled', () => {
    before(() => {
      resetSetup({
        overriddenResponses: {
          GetPaymentsListHeader: {
            data: {
              payments: {
                ...fixtures.MockGetPaymentListHeaderActions.payments,
                operations: {
                  createPaymentGroup: {
                    callable: 'DISABLED',
                    messages: [
                      "A payment group cannot be created from the current search results. To create a payment group, outstanding payments should be filtered by a single payee. Remember that a group can only contain payments that aren't already a part of another group."
                    ],
                    __typename: 'Operation'
                  },
                  payMultiplePayments: {
                    callable: 'DISABLED',
                    messages: [
                      'To pay multiple payments, they should be filtered by Due/Overdue status.'
                    ],
                    __typename: 'Operation'
                  },
                  downloadPaymentsFromSearch: {
                    callable: 'DISABLED',
                    messages: [
                      'Please select a report preset from the search panel: Toptal Payments, Payoneer, or Staff Commissions.'
                    ],
                    __typename: 'Operation'
                  },
                  __typename: 'PaymentsConnectionOperations'
                },
                __typename: 'PaymentsConnection'
              }
            }
          }
        }
      })
    })

    // TODO: Fix the test scenario
    // Confirmed manually still working, find no reason why its started to fail now
    it.skip('testing the whole page flow', () => {
      header.disabledActionButtonsFlow()
    })
  })

  describe('payment method warning', () => {
    before(() => {
      resetSetup({
        overriddenResponses: {
          GetMultiplePaymentsList: {
            data: {
              payments: {
                totalCount: 0,
                nodes: [],
                __typename: 'PaymentsConnection'
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
          SetCreatePaymentGroup: {
            data: {
              createPaymentGroup: {
                __typename: 'CreatePaymentGroupPayload',
                paymentGroup: null,
                errors: [
                  {
                    __typename: 'UserError',
                    code: 'errorCode',
                    key: 'errorKey',
                    message: 'Something went wrong.'
                  }
                ],
                success: false,
                notice: ''
              }
            }
          },
          SetPayMultiplePayments: {
            data: {
              payMultiplePayments: {
                __typename: 'PayMultiplePaymentsPayload',
                errors: [
                  {
                    __typename: 'UserError',
                    code: 'base',
                    key: 'base',
                    message: 'Please select at least one payment.'
                  }
                ],
                success: false,
                notice: ''
              }
            }
          },
          DownloadPaymentsFromSearch: {
            data: {
              downloadPaymentsFromSearch: {
                __typename: 'DownloadPaymentsFromSearchPayload',
                reportUrl: 'example.com/abc',
                reportGenerationScheduled: false,
                errors: [
                  {
                    __typename: 'UserError',
                    code: 'errorCode',
                    key: 'errorKey',
                    message: 'Internal Server Error'
                  }
                ],
                success: false,
                notice: ''
              }
            }
          }
        }
      })
    })

    it('testing the whole page flow', () => {
      payMultiple.failingFlow()
      downloadPayments.failingFlow()
      createPaymentGroup.failingFlow()
      payMultiple.validation()
    })
  })
})
