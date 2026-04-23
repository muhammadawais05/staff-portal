/// <reference types="cypress" />

import toTitleCase from '@toptal/picasso/utils/to-title-case'
import fixtures from '@staff-portal/billing/src/_fixtures'

import defaultResponses from '../support/defaultResponse/paymentDetailsDefault'

const defaultGetPaymentData = defaultResponses.GetPayModalPayment.data.node
const payModalTitle = `Pay Notice of Payment #${defaultGetPaymentData.documentNumber}`

const applyMemosNode =
  defaultResponses.GetApplyUnallocatedMemorandumsToCommercialDocument.data.node

const GetApplyUnallocatedMemorandumsToCommercialDocument = {
  data: {
    node: {
      documentNumber: applyMemosNode.documentNumber,
      id: applyMemosNode.id,
      operations: applyMemosNode.operations,
      subjectObject: {
        id: applyMemosNode.subjectObject.id,
        availablePrepaymentBalanceNullable: '1500.0',
        unallocatedMemorandums: {
          __typename: 'MemorandumConnection',
          nodes: []
        },
        __typename: 'Client'
      },
      __typename: 'Payment'
    }
  }
}

const GetPaymentDetailsHeader = {
  data: {
    node: {
      ...defaultResponses.GetPaymentDetailsHeader.data.node,
      status: 'DUE',
      operations: {
        ...defaultResponses.GetPaymentDetailsHeader.data.node.operations,
        payPayment: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        }
      },
      subjectObject: {
        ...defaultGetPaymentData.subject,
        availablePrepaymentBalanceNullable: '1500.0'
      }
    }
  }
}

const successfulFlow = () => {
  cy.getByTestId('add-payment').should('be.visible').click()

  // check preferred method selection
  cy.getByTestId('PaymentPayModalFormContent-paymentMethod').within(() => {
    cy.get('option[value="ULTIPRO"]').should(
      'have.attr',
      'aria-selected',
      'true'
    )
  })

  cy.getByTestId('CommercialDocumentBillingNotes').should(
    'contain',
    'Billing Notes test'
  )

  // error display
  cy.getByTestId('PaymentPayModalForm-submit').click()
  cy.getFieldError('comment').should('contain', 'Please complete this field.')

  // submission success/failure
  cy.getByTestId('PaymentPayModalFormContent-comment').type('Test')
  cy.getByTestId('PaymentPayModalForm-submit').click()
  cy.get('#react_notification').should(
    'contain',
    `Notice of Payment #${defaultGetPaymentData.documentNumber} was successfully paid.`
  )
}

const failureFlow = () => {
  cy.getByTestId('add-payment').should('be.visible').click()

  cy.getByTestId('PaymentPayModalFormContent-comment').type('Test')
  cy.getByTestId('PaymentPayModalForm-submit').click()

  cy.getByTestId('FormBaseErrorContainer-error').should(
    'contain',
    'Example form level error'
  )

  cy.getFieldError('comment').should('contain', 'Comment is not nice')

  cy.closeModal()
}

const modalSwitchingFlow = resetSetup => {
  describe('PaymentPayModal correctly switches modals depending on conditions', () => {
    // PaymentPayModal
    it('ApplyUnallocatedMemorandums > PaymentPayModal on successful submission', () => {
      resetSetup({
        GetPaymentDetailsHeader,
        GetApplyUnallocatedMemorandumsToCommercialDocument,
        SetApplyUnallocatedMemorandumsToCommercialDocument: {
          data: {
            applyUnallocatedMemorandumsToCommercialDocument: {
              __typename:
                'SetApplyUnallocatedMemorandumsToCommercialDocumentPayload',
              commercialDocument: {
                ...fixtures.MockInvoice,
                status: 'OVERDUE'
              },
              errors: [],
              notice: '',
              success: true
            }
          }
        },
        GetPayModalPayment: {
          data: {
            node: {
              ...defaultGetPaymentData,
              operations: {
                ...defaultGetPaymentData.operations,
                applyUnallocatedMemorandumsToCommercialDocument: {
                  __typename: 'Operation',
                  callable: 'ENABLED',
                  messages: []
                }
              },
              status: 'OVERDUE',
              subject: {
                ...defaultGetPaymentData.subject,
                availablePrepaymentBalanceNullable: '1500.0'
              }
            }
          }
        }
      })

      cy.getByTestId('add-payment').click()

      cy.getByTestId('submit').should(
        'have.text',
        toTitleCase('Skip and continue')
      )
      cy.getByTestId('submit').should('have.attr', 'type', 'button')

      cy.getByTestId('applyPrepayments').click()
      cy.getByTestId('submit').should(
        'have.text',
        toTitleCase('Allocate selected and continue')
      )
      cy.getByTestId('submit').should('have.attr', 'type', 'submit')

      cy.getByTestId('submit').click()
      cy.get('#react_notification').should(
        'contain',
        `The memorandums were successfully allocated to payment #${defaultGetPaymentData.documentNumber}.`
      )
      cy.getByTestId('PaymentPayModalForm-title').should(
        'contain',
        payModalTitle
      )
    })

    it('ApplyUnallocatedMemorandums > PaymentPayModal when manually skipped', () => {
      resetSetup({
        GetPaymentDetailsHeader,
        GetPayModalPayment: {
          data: {
            node: {
              ...defaultGetPaymentData,
              operations: {
                ...defaultGetPaymentData.operations,
                applyUnallocatedMemorandumsToCommercialDocument: {
                  __typename: 'Operation',
                  callable: 'ENABLED',
                  messages: []
                }
              },
              status: 'OVERDUE',
              subjectObject: {
                ...defaultGetPaymentData.subject,
                availablePrepaymentBalanceNullable: '1500.0'
              }
            }
          }
        }
      })

      cy.getByTestId('add-payment').click()

      cy.getByTestId('submit').click()
      cy.getByTestId('PaymentPayModalForm-title').should(
        'contain',
        payModalTitle
      )
    })

    it('ApplyUnallocatedMemorandums >> PaymentPayModal when operation disabled', () => {
      resetSetup({
        GetPaymentDetailsHeader,
        GetPayModalPayment: {
          data: {
            node: {
              ...defaultGetPaymentData,
              operations: {
                ...defaultGetPaymentData.operations,
                applyUnallocatedMemorandumsToCommercialDocument: {
                  __typename: 'Operation',
                  callable: 'DISABLED',
                  messages: []
                }
              },
              status: 'OVERDUE',
              subjectObject: {
                ...defaultGetPaymentData.subject,
                availablePrepaymentBalanceNullable: '1500.0'
              }
            }
          }
        }
      })

      cy.getByTestId('add-payment').click()

      cy.getByTestId('PaymentPayModalForm-title').should(
        'contain',
        payModalTitle
      )
    })

    it('ApplyUnallocatedMemorandums > close modal when applied payment fully covers the invoice', () => {
      resetSetup({
        GetPaymentDetailsHeader,
        GetApplyUnallocatedMemorandumsToCommercialDocument,
        GetPayModalPayment: {
          data: {
            node: {
              ...defaultGetPaymentData,
              operations: {
                ...defaultGetPaymentData.operations,
                applyUnallocatedMemorandumsToCommercialDocument: {
                  __typename: 'Operation',
                  callable: 'ENABLED',
                  messages: []
                }
              },
              status: 'DUE',
              subjectObject: {
                ...defaultGetPaymentData.subject,
                availablePrepaymentBalanceNullable: '2295.0'
              }
            }
          }
        },
        SetApplyUnallocatedMemorandumsToCommercialDocument: {
          data: {
            applyUnallocatedMemorandumsToCommercialDocument: {
              __typename:
                'SetApplyUnallocatedMemorandumsToCommercialDocumentPayload',
              commercialDocument: {
                amount: '100.0',
                balanceDue: '100.0',
                creditedAmount: '0',
                debitedAmount: '0',
                paidAmount: '0',
                paidAt: null,
                transfers: fixtures.MockTransfers,
                documentNumber: applyMemosNode.documentNumber,
                id: applyMemosNode.id,
                memorandums: [],
                operations: {
                  applyUnallocatedMemorandumsToCommercialDocument: {
                    __typename: 'Operation',
                    callable: 'ENABLED',
                    messages: []
                  },
                  __typename: 'PaymentOperations'
                },
                status: 'PAID',
                subjectObject: {
                  id: applyMemosNode.subjectObject.id,
                  availablePrepaymentBalanceNullable: '1500.0',
                  unallocatedMemorandums: {
                    __typename: 'MemorandumConnection',
                    nodes: []
                  },
                  __typename: 'Client'
                },
                __typename: 'Payment'
              },
              errors: [],
              notice: '',
              success: true
            }
          }
        }
      })

      cy.getByTestId('add-payment').click()

      cy.getByTestId('applyPrepayments').click()
      cy.getByTestId('submit').click()
      cy.getByTestId('PaymentPayModalForm-title').should('not.exist')
    })
  })
}

// TODO: Transform tests into Cypress page object approach
// eslint-disable-next-line jest/no-export
export { successfulFlow, failureFlow, modalSwitchingFlow }
