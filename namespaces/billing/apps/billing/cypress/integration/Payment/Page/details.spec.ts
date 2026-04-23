import fixtures from '@staff-portal/billing/src/_fixtures'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/paymentDetailsDefault'
import * as payModal from './../../../partials/modal-pay.spec'

// TODO: variants when necessary GraphQL fields are
// fully implemented
// table footer should not be rendered if description is empty

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.clock()
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffPaymentDetailsPage'
      contentWindow.DATA_PAYMENT_ID = fixtures.MockPayment.documentNumber
    }
  })
  cy.waitForReact()
}

describe('Payment Details spec', () => {
  describe('General flow', () => {
    before(() => {
      resetSetup({
        GetPayModalPayment: {
          data: {
            node: {
              ...defaultResponses.GetPayModalPayment.data.node,
              operations: {
                ...defaultResponses.GetPayModalPayment.data.node.operations,
                applyUnallocatedMemorandumsToCommercialDocument: {
                  __typename: 'Operation',
                  callable: 'DISABLED',
                  messages: []
                }
              },
              status: 'OVERDUE',
              subject: {
                ...defaultResponses.GetPayModalPayment.data.node.subject,
                availablePrepaymentBalanceNullable: '1500.0'
              }
            }
          }
        },
        GetPaymentDetailsHeader: {
          data: {
            node: {
              ...defaultResponses.GetPaymentDetailsHeader.data.node,
              status: 'DUE',
              operations: {
                ...defaultResponses.GetPaymentDetailsHeader.data.node
                  .operations,
                payPayment: {
                  callable: 'ENABLED',
                  messages: [],
                  __typename: 'Operation'
                }
              }
            }
          }
        }
      })
    })

    it('Payment Details', () => {
      // -------- Add Invoice Note ------- //
      cy.getByTestId('DetailsHeader-more-actions-button').click()
      cy.getByTestId('editDocumentNote').click()
      cy.get('#note').focus().type('Test').blur()
      cy.closeModal()

      // cy.getByTestId('DetailsHeader-more-actions-button').click()
      // cy.getByTestId('cancelPayment').click()
      // cy.getByTestId('CancelPaymentForm-intro').should(
      //   'contain',
      //   "By canceling payment you acknowledge that it was moved to the paid status by mistake, no real funds were transferred, and understand that this isn't going to affect anyones local account."
      // )
      // cy.closeModal()

      payModal.successfulFlow()
    })
  })

  describe('Negative action cases', () => {
    beforeEach(() => {
      resetSetup({
        GetPaymentDetailsHeader: {
          data: {
            node: {
              ...defaultResponses.GetPaymentDetailsHeader.data.node,
              status: 'DUE',
              operations: {
                ...defaultResponses.GetPaymentDetailsHeader.data.node
                  .operations,
                payPayment: {
                  callable: 'ENABLED',
                  messages: [],
                  __typename: 'Operation'
                }
              }
            }
          }
        },
        GetPayModalPayment: {
          data: {
            node: {
              ...defaultResponses.GetPayModalPayment.data.node,
              operations: {
                ...defaultResponses.GetPayModalPayment.data.node.operations,
                applyUnallocatedMemorandumsToCommercialDocument: {
                  __typename: 'Operation',
                  callable: 'DISABLED',
                  messages: []
                }
              },
              status: 'OVERDUE',
              subject: {
                ...defaultResponses.GetPayModalPayment.data.node.subject,
                availablePrepaymentBalanceNullable: '1500.0'
              }
            }
          }
        },
        SetPayPayment: {
          data: {
            payPayment: {
              __typename: 'PayPaymentPayload',
              payment: {
                id: 'VjEtUGF5bWVudC0xMjIzNTk3',
                balanceDue: '100',
                documentNumber: 1223597,
                status: 'DUE',
                __typename: 'Payment',
                operations: {
                  applyUnallocatedMemorandumsToCommercialDocument: {
                    callable: 'HIDDEN',
                    messages: [],
                    __typename: 'Operation'
                  },
                  payPayment: {
                    callable: 'DISABLED',
                    messages: [
                      'Can only pay outstanding, due or overdue payments'
                    ],
                    __typename: 'Operation'
                  },
                  __typename: 'PaymentOperations'
                }
              },
              commercialDocument: null,
              notice: '',
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
                  code: 'comment',
                  key: 'comment',
                  message: 'Comment is not nice'
                }
              ]
            }
          }
        }
      })
    })

    it('Payment Details', () => {
      payModal.failureFlow()
    })
  })

  payModal.modalSwitchingFlow(resetSetup)
})
