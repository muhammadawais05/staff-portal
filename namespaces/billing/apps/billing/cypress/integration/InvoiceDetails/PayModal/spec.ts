import toTitleCase from '@toptal/picasso/utils/to-title-case'
import {
  BillingOptionVerificationStatus,
  BillingOptionStatus
} from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/invoiceDetailsDefault'

/// <reference types="cypress" />

const DATA_INVOICE_ID = 377249
const TYPE = 'Invoice'

const ach = {
  __typename: 'ACHBillingOption',
  billingMethod: 'ACH',
  discountValue: 3,
  discountable: true,
  id: 'VjEtQUNIQmlsbGluZ09wdGlvbi0xMjM0',
  last4Digits: '1234',
  name: 'ACH',
  preferred: false,
  comment: 'Example comment.',
  status: BillingOptionStatus.VERIFIED,
  accountInfo: [],
  operations: {
    __typename: 'ACHBillingOptionOperations',
    preferEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    removeBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    removeEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    unsetPreferredBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    }
  }
}
const ach2 = {
  __typename: 'ACHBillingOption',
  billingMethod: 'ACH',
  discountValue: 3,
  discountable: true,
  id: 'VjEtQUNIQmlsbGluZ09wdGlvbi01Njc4',
  last4Digits: '5678',
  name: 'ACH',
  preferred: false,
  comment: 'Example comment.',
  status: BillingOptionStatus.VERIFIED,
  accountInfo: [],
  operations: {
    __typename: 'ACHBillingOptionOperations',
    preferEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    removeBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    removeEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    unsetPreferredBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    }
  }
}
const creditCard = {
  __typename: 'CreditCardBillingOption',
  billingMethod: 'CREDIT_CARD',
  cardExpired: false,
  discountValue: 0,
  discountable: false,
  id: 'VjEtQ3JlZGl0Q2FyZEJpbGxpbmdPcHRpb24tMjM0NQ',
  last4Digits: '2345',
  name: 'CREDIT_CARD',
  type: null,
  preferred: false,
  comment: 'Example comment.',
  status: BillingOptionStatus.VERIFIED,
  verificationStatuses: [BillingOptionVerificationStatus.CAN_BE_CHARGED],
  accountInfo: [
    { label: 'Name', value: 'John Talbot', __typename: 'AccountInfo' },
    {
      label: 'Number',
      value: '**** **** **** 1324',
      __typename: 'AccountInfo'
    },
    { label: 'Expires', value: '12/2015', __typename: 'AccountInfo' },
    { label: 'Type', value: 'MasterCard', __typename: 'AccountInfo' }
  ],
  operations: {
    __typename: 'CreditCardBillingOptionOperations',
    reverifyCreditCardBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    preferEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    removeBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    removeEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    unsetPreferredBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    }
  }
}
const creditCard2 = {
  __typename: 'CreditCardBillingOption',
  billingMethod: 'CREDIT_CARD',
  cardExpired: false,
  discountValue: 0,
  discountable: false,
  id: 'VjEtQ3JlZGl0Q2FyZEJpbGxpbmdPcHRpb24tNDU2Nw',
  last4Digits: '4567',
  name: 'CREDIT_CARD',
  type: 'Visa',
  preferred: false,
  comment: 'Example comment.',
  status: BillingOptionStatus.VERIFIED,
  verificationStatuses: [BillingOptionVerificationStatus.CAN_BE_CHARGED],
  accountInfo: [
    { label: 'Name', value: 'John Talbot', __typename: 'AccountInfo' },
    {
      label: 'Number',
      value: '**** **** **** 1324',
      __typename: 'AccountInfo'
    },
    { label: 'Expires', value: '12/2015', __typename: 'AccountInfo' },
    { label: 'Type', value: 'MasterCard', __typename: 'AccountInfo' }
  ],
  operations: {
    __typename: 'BillingOptionOperations',
    reverifyCreditCardBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    preferEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    removeBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    removeEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    unsetPreferredBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    }
  }
}
const paypal = {
  __typename: 'OtherBillingOption',
  billingMethod: 'PAYPAL',
  discountValue: 0,
  discountable: false,
  id: 'VjEtT3RoZXJCaWxsaW5nT3B0aW9uLTM0NTY',
  last4Digits: '3456',
  name: 'PAYPAL',
  preferred: false,
  comment: 'Example comment.',
  status: BillingOptionStatus.VERIFIED,
  accountInfo: [],
  operations: {
    __typename: 'BillingOptionOperations',
    reverifyCreditCardBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    preferEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    removeBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    removeEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    },
    unsetPreferredBillingOption: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: []
    }
  }
}

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
  status: 'OUTSTANDING',
  cleanAmountToPay: '1750.00',
  amount: '1500.00',
  discountApplied: true,
  discountedAmountToPay: '1500.00',
  subjectObject: {
    ...invoice.subjectObject,
    availablePrepaymentBalance: '1500.00',
    billingNotes: 'Billing notes example',
    billingOptions: {
      __typename: 'BillingOptionInterfaceConnection',
      nodes: [ach, creditCard, paypal],
      totalCount: 0
    },
    preferredBillingOption: creditCard
  }
}

const payModalTitle = i18n.t('invoice:payModal.title', {
  documentNumber: DATA_INVOICE_ID
})

const subjectObjectWithBillingOptions = nodes => ({
  ...fixtures.MockInvoice.subjectObject,
  billingOptions: {
    __typename: 'BillingOptionInterfaceConnection',
    nodes,
    totalCount: 0
  }
})

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        ...defaultResponses,
        Invoice: {
          data: {
            nodes: [invoiceEndpointOverride]
          }
        },
        GetInvoiceDetailsTable: {
          data: { node: fixtures.MockInvoice }
        },
        GetPayModalInvoice: {
          data: {
            node: invoiceEndpointOverride
          }
        }
      },
      overriddenResponses
    })
  )
  cy.clock()
  cy.visit(`/?node_id=${DATA_INVOICE_ID}&node_type=invoice&modal=invoice-pay`, {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = documentId
      contentWindow.DATA_MODALS_ONLY = true
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - Invoice Details', () => {
  describe('Add Payment Modal', () => {
    before(resetSetup)

    const defaultNotice = i18n.t(
      'invoice:payModal.fields.creditCard.fields.info.defaultHelp'
    )
    const alternativeNotice = i18n.t(
      'invoice:payModal.fields.creditCard.fields.info.alternativeHelp'
    )

    it('has the proper title', () => {
      const title = i18n.t('invoice:payModal.title', {
        documentNumber: DATA_INVOICE_ID
      })

      cy.getByTestId('InvoicePayModalForm-title').should('contain', title)
    })

    it('has the proper payment methods', () => {
      cy.get('input[type=radio][value=RECORD]').click()
      cy.getByTestId('external-payment-method').click()
      cy.getTooltip().within(() =>
        ['Check', 'Citibank Wire', 'PayPal', 'Wells Fargo Wire'].map(
          (text, index) => cy.get('li').eq(index).should('have.text', text)
        )
      )

      cy.get('input[type=radio][value=PENDING_RECEIPT]').click()

      cy.getByTestId('pending-receipt-method').click()

      cy.getTooltip().within(() =>
        ['Check', 'Citibank Wire', 'Wells Fargo Wire'].map((text, index) =>
          cy.get('li').eq(index).should('have.text', text)
        )
      )
    })

    it('has the proper initial amount', () => {
      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        '1500.00'
      )
    })

    it('displays discount notice if discountApplied', () => {
      cy.getByTestId('InvoicePayModalForm-amountToPay-discounted').should(
        'contain',
        '$1,500.00 (if paid by ACH, Wire, Unapplied Cash or Check)'
      )
      cy.getByTestId('InvoicePayModalForm-amountToPay-undiscounted').should(
        'contain',
        '$1,750.00 (if paid by Credit Card or PayPal)'
      )
    })

    it('displays billing notes when available', () => {
      cy.getByTestId('CommercialDocumentBillingNotes').should(
        'contain',
        'Billing notes example'
      )
    })

    it('displays alternative payment option notice', () => {
      cy.get('input[type=radio][value=CREDIT_CARD]').click()
      cy.getByTestId('InvoicePayModalFormCreditCard').should(
        'contain',
        alternativeNotice
      )
    })

    it('adjusts the amount automatically if discountApplied', () => {
      const discountedAmountToPay = '1500.00'
      const cleanAmountToPay = '1750.00'

      cy.get('input[type=radio][value=ACH]').click()
      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        discountedAmountToPay
      )

      cy.get('input[type=radio][value=CREDIT_CARD]').click()
      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        cleanAmountToPay
      )

      cy.get('input[type=radio][value=PENDING_RECEIPT]').click()
      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        discountedAmountToPay
      )

      cy.selectByValue({ field: 'pending-receipt-method', value: 'CHECK' })

      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        discountedAmountToPay
      )

      cy.selectByValue({
        field: 'pending-receipt-method',
        value: 'WELLS_FARGO_WIRE'
      })

      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        discountedAmountToPay
      )

      cy.get('input[type=radio][value=RECORD]').click()
      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        cleanAmountToPay
      )

      cy.selectByValue({ field: 'external-payment-method', value: 'CHECK' })

      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        discountedAmountToPay
      )

      cy.selectByValue({ field: 'external-payment-method', value: 'PAYPAL' })

      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        cleanAmountToPay
      )

      cy.selectByValue({
        field: 'external-payment-method',
        value: 'WELLS_FARGO_WIRE'
      })

      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        discountedAmountToPay
      )

      // When the amount is manually changed, it should not be automatically updated any more
      const manualAmount = '1400.00'

      cy.getByTestId('InvoicePayModalForm-amount')
        .clear()
        .type(manualAmount)
        .blur()

      cy.get('input[type=radio][value=ACH]').click()
      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        manualAmount
      )

      cy.get('input[type=radio][value=CREDIT_CARD]').click()
      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        manualAmount
      )

      cy.get('input[type=radio][value=RECORD]').click()
      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        manualAmount
      )

      cy.get('input[type=radio][value=PENDING_RECEIPT]').click()
      cy.getByTestId('InvoicePayModalForm-amount').should(
        'have.value',
        manualAmount
      )
    })

    describe('Unapplied cash', () => {
      it('renders unapplied cash hierarchy', () => {
        cy.get('input[type=radio][value=UNAPPLIED_CASH]').click()

        cy.getByTestId('payment-unapplied-cash-client')

        cy.getByTestId('InvoicePayModalFormSource-field').within(() => {
          cy.get('label').last().should('have.text', 'Unapplied Cash')
        })

        cy.selectByValue({
          field: 'payment-unapplied-cash-client',
          value: 'VjEtVW5hcHBsaWVkQ2FzaC0xMjQ'
        })
      })

      describe('when there is only a single client with a single UC entry', () => {
        it('hides the selection dropdown', () => {
          resetSetup({
            GetPayModalInvoice: {
              data: {
                node: {
                  ...invoiceEndpointOverride,
                  client: {
                    __typename: 'Client',
                    billingNotes: '',
                    id: 'VjEtQ2xpZW50LTQ5Mjk3OA',
                    billingOptions: {
                      __typename: 'BillingOptionInterfaceConnection',
                      nodes: [],
                      totalCount: 0
                    },
                    fullName: 'Some company',
                    preferredBillingOption: null
                  },
                  subjectObject: {
                    ...invoiceEndpointOverride.subjectObject,
                    id: 'VjEtQ2xpZW50LTQ5Mjk3OA',
                    fullName: 'Runolfsson, Heaney and Mraz',
                    hierarchy: {
                      __typename: 'ClientHierarchy',
                      clients: {
                        __typename: 'ClientHierarchyClientsConnection',
                        nodes: [
                          {
                            __typename: 'Client',
                            id: 'VjEtQ2xpZW50LTQ5Mjk3OA',
                            _companyId: 2325393,
                            fullName: 'Runolfsson, Heaney and Mraz',
                            unappliedCashBalance: '1500.0',
                            unappliedCashEntries: {
                              nodes: [
                                {
                                  __typename: 'UnappliedCash',
                                  id: 'VjEtVW5hcHBsaWVkQ2FzaC0xMjQ',
                                  effectiveDate: '2022-04-21',
                                  availableAmount: '1500.0'
                                },
                                {
                                  __typename: 'UnappliedCash',
                                  id: 'VjEtVW5hcHBsaWVkQ2FzaC0xMjA',
                                  effectiveDate: '2022-04-21',
                                  availableAmount: '0.0'
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              }
            }
          })
          cy.get('input[type=radio][value=UNAPPLIED_CASH]').click()

          cy.getByTestId('payment-unapplied-cash-client').should('not.exist')
          cy.getByTestId('payment-unapplied-cash-date').should('exist')
          cy.getByTestId('InvoicePayModalFormSource-field').within(() => {
            cy.get('label')
              .last()
              .should('have.text', 'Unapplied Cash $1,500.00')
          })
        })
      })
    })

    describe('when there are unavailable payment sources', () => {
      before(() => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                subjectObject: subjectObjectWithBillingOptions([])
              }
            }
          }
        })
      })

      it('disables unavailable payment sources', () => {
        cy.get('input[type=radio][value=ACH]').should('be.disabled')
        cy.get('input[type=radio][value=CREDIT_CARD]').should('be.disabled')
      })

      it('displays proper Expected Clearance Date', () => {
        cy.get('input[type=radio][value=PENDING_RECEIPT]').click()

        cy.getByTestId('pending-receipt-date').should(
          'have.value',
          fixtures.MockInvoice.expectedClearanceDateForNewPendingReceipt
        )
      })
    })

    describe('when payment source is credit card', () => {
      before(() => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                subjectObject: subjectObjectWithBillingOptions([creditCard])
              }
            }
          }
        })
      })
      it('displays default credit card notice', () => {
        cy.get('input[type=radio][value=CREDIT_CARD]').click()
        cy.getByTestId('InvoicePayModalFormCreditCard').should(
          'contain',
          defaultNotice
        )
      })

      it('displays a single credit card properly', () => {
        cy.get('input[type=radio][value=CREDIT_CARD]').click()
        cy.getByTestId('InvoicePayModalFormCreditCard').should(
          'contain.text',
          '**** **** **** 2345'
        )
        cy.getByTestId('InvoicePayModalFormCreditCard').should(
          'not.contain.text',
          '**** **** **** 4567'
        )
      })
    })

    describe('Validate various payment methods', () => {
      it('displays multiple credit cards as a radio group', () => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                subjectObject: subjectObjectWithBillingOptions([
                  creditCard,
                  creditCard2
                ])
              }
            }
          }
        })

        cy.get('input[type=radio][value=CREDIT_CARD]').click()
        cy.getByTestId('InvoicePayModalFormCreditCard').should(
          'contain.text',
          '**** **** **** 2345'
        )
        cy.getByTestId('InvoicePayModalFormCreditCard').should(
          'contain.text',
          '**** **** **** 4567'
        )
      })

      it('properly labels primary credit card payment option', () => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                subjectObject: {
                  ...subjectObjectWithBillingOptions([
                    ach,
                    ach2,
                    creditCard,
                    creditCard2
                  ]),
                  preferredBillingOption: creditCard2
                }
              }
            }
          }
        })

        cy.get('input[type=radio][value=CREDIT_CARD]').click()
        cy.contains('**** **** **** 4567').should('contain.text', 'Primary')
        cy.contains('**** **** **** 2345').should('not.contain.text', 'Primary')

        cy.get('input[type=radio][value=ACH]').click()
        cy.contains('***** 1234').should('not.contain.text', 'Primary')
        cy.contains('***** 5678').should('not.contain.text', 'Primary')
      })

      it('displays a single ACH option properly', () => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                subjectObject: subjectObjectWithBillingOptions([ach])
              }
            }
          }
        })

        cy.get('input[type=radio][value=ACH]').click()
        cy.getByTestId('InvoicePayModalFormAch').should(
          'contain.text',
          '***** 1234'
        )
        cy.getByTestId('InvoicePayModalFormAch').should(
          'not.contain.text',
          '***** 5678'
        )
      })

      it('displays multiple ACH options as a radio group', () => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                subjectObject: subjectObjectWithBillingOptions([ach, ach2])
              }
            }
          }
        })

        cy.get('input[type=radio][value=ACH]').click()
        cy.getByTestId('InvoicePayModalFormAch').should(
          'contain.text',
          '***** 1234'
        )
        cy.getByTestId('InvoicePayModalFormAch').should(
          'contain.text',
          '***** 5678'
        )
      })

      it('properly labels primary ACH payment option', () => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                subjectObject: {
                  ...subjectObjectWithBillingOptions([
                    ach,
                    ach2,
                    creditCard,
                    creditCard2
                  ]),
                  preferredBillingOption: ach
                }
              }
            }
          }
        })
        cy.get('input[type=radio][value=ACH]').click()
        cy.contains('***** 1234').should('contain.text', 'Primary')
        cy.contains('***** 5678').should('not.contain.text', 'Primary')

        cy.get('input[type=radio][value=CREDIT_CARD]').click()
        cy.contains('**** **** **** 4567').should('not.contain.text', 'Primary')
        cy.contains('**** **** **** 2345').should('not.contain.text', 'Primary')
      })

      it('displays errors properly', () => {
        const errorRequired = i18n.t('common:validation.required')
        // TODO : restore after Picasso past date validation will be fixed https://github.com/toptal/picasso/issues/1458
        // const errorDateInThePast = i18n.t('common:validation.todayOrLater')
        const errorPositive = i18n.t('common:validation.positive')
        const errorLessThanOrEqual = i18n.t(
          'common:validation.lessThanOrEqualValue'
        )

        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                amount: '1500.0',
                cleanAmountToPay: '1500.0',
                discountedAmountToPay: '1500.0',
                subjectObject: subjectObjectWithBillingOptions([
                  ach,
                  ach2,
                  creditCard,
                  creditCard2
                ])
              }
            }
          }
        })

        // payment source
        cy.getByTestId('InvoicePayModalForm-submit').click()
        cy.getByTestId('InvoicePayModalFormSource-field').should(
          'contain',
          i18n.t('invoice:payModal.fields.paymentSource.validationError')
        )

        // ACH
        cy.get('input[type=radio][value=ACH]').click()
        cy.getByTestId('InvoicePayModalForm-submit').click()
        cy.getByTestId('ach-payment-method-field').should(
          'contain',
          errorRequired
        )

        cy.getByTestId('payment-processing-date').clear().blur()
        cy.getByTestId('payment-processing-date-error').should(
          'contain',
          errorRequired
        )

        // TODO : restore after Picasso past date validation will be fixed https://github.com/toptal/picasso/issues/1458
        // cy.getByTestId('payment-processing-date')
        //   .clear()
        //   .type('2019-07-15')
        //   .blur()
        // cy.getByTestId('payment-processing-date-error').should(
        //   'contain',
        //   errorDateInThePast
        // )

        // credit card
        cy.get('input[type=radio][value=CREDIT_CARD]').click()
        cy.getByTestId('InvoicePayModalForm-submit').click()
        cy.getByTestId('credit-card-payment-method-field').should(
          'contain',
          errorRequired
        )

        cy.getByTestId('payment-processing-date').clear().blur()
        cy.getByTestId('payment-processing-date-error').should(
          'contain',
          errorRequired
        )

        // TODO : restore after Picasso past date validation will be fixed https://github.com/toptal/picasso/issues/1458
        // cy.getByTestId('payment-processing-date')
        //   .clear()
        //   .type('2019-07-15')
        //   .blur()
        // cy.getByTestId('payment-processing-date-error').should(
        //   'contain',
        //   errorDateInThePast
        // )

        // amount
        cy.getByTestId('InvoicePayModalForm-amount').clear().blur()
        cy.getByTestId('InvoicePayModalForm-amount-error').should(
          'contain',
          errorRequired
        )

        cy.getByTestId('InvoicePayModalForm-amount').clear().type('0').blur()
        cy.getByTestId('InvoicePayModalForm-amount-error').should(
          'contain',
          errorPositive
        )

        cy.getByTestId('InvoicePayModalForm-amount').clear().type('1600').blur()
        cy.getByTestId('InvoicePayModalForm-amount-error').should(
          'contain',
          errorLessThanOrEqual
        )

        // comment
        cy.getByTestId('InvoicePayModalForm-comment').clear().blur()
        cy.getByTestId('InvoicePayModalForm-comment-error').should(
          'contain',
          i18n.t('invoice:payModal.fields.comment.validationError')
        )
      })
    })

    describe('submission', () => {
      it('failure', () => {
        resetSetup({
          CreateTransferInvoice: {
            data: {
              createTransferInvoice: {
                __typename: 'CreateTransferInvoicePayload',
                errors: [
                  {
                    __typename: 'UserError',
                    code: 'exampleCode',
                    key: 'base',
                    message: ['Example form level error']
                  }
                ],
                invoice: fixtures.MockInvoice,
                notice: '',
                success: false
              }
            }
          }
        })

        cy.get('input[type=radio][value=CREDIT_CARD]').click()

        cy.getByTestId('InvoicePayModalForm-comment')
          .clear()
          .type('test comment')
        cy.getByTestId('InvoicePayModalForm-submit').click()
        cy.getByTestId('FormBaseErrorContainer-error').should(
          'contain',
          'Example form level error'
        )
      })

      it('success', () => {
        resetSetup()

        const successMessage = i18n.t('invoice:payModal.notification.success', {
          documentNumber: DATA_INVOICE_ID
        })

        cy.get('input[type=radio][value=CREDIT_CARD]').click()
        cy.getByTestId('InvoicePayModalForm-comment')
          .clear()
          .type('test comment')
        cy.getByTestId('InvoicePayModalForm-submit').click()
        cy.get('#react_notification').should('contain', successMessage)
      })
    })

    describe('correctly switches modals depending on conditions', () => {
      // InvoicePayModal
      it('ApplyPrepaymentsModal > InvoicePayModal on successful submission', () => {
        resetSetup({
          SetApplyUnallocatedMemorandumsToCommercialDocument: {
            data: {
              applyUnallocatedMemorandumsToCommercialDocument: {
                __typename:
                  'SetApplyUnallocatedMemorandumsToCommercialDocumentPayload',
                errors: [],
                commercialDocument: {
                  ...fixtures.MockInvoice,
                  status: 'OVERDUE'
                },
                notice: '',
                success: true
              }
            }
          },
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                operations: {
                  ...fixtures.MockInvoice.operations,
                  applyUnallocatedMemorandumsToCommercialDocument: {
                    __typename: 'Operation',
                    callable: 'ENABLED',
                    messages: []
                  }
                },
                status: 'OVERDUE',
                subjectObject: {
                  ...fixtures.MockInvoice.subjectObject,
                  availablePrepaymentBalanceNullable: '1500.0'
                }
              }
            }
          }
        })

        cy.getByTestId('submit').should(
          'have.text',
          toTitleCase(
            i18n.t(
              'commercialDocument:modals.applyMemos.actions.skipAndContinue'
            )
          )
        )
        cy.getByTestId('submit').should('have.attr', 'type', 'button')

        cy.getByTestId('applyPrepayments').click()
        cy.getByTestId('submit').should(
          'have.text',
          toTitleCase(
            i18n.t(
              'commercialDocument:modals.applyMemos.actions.submitAndContinue'
            )
          )
        )
        cy.getByTestId('submit').should('have.attr', 'type', 'submit')

        cy.getByTestId('submit').click()
        cy.get('#react_notification').should(
          'contain',
          i18n.t('commercialDocument:modals.applyMemos.notification.success', {
            id: DATA_INVOICE_ID,
            type: TYPE
          })
        )
        cy.getByTestId('InvoicePayModalForm-title').should(
          'contain',
          payModalTitle
        )
      })

      it('ApplyPrepaymentsModal > InvoicePayModal when manually skipped', () => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                operations: {
                  ...fixtures.MockInvoice.operations,
                  applyUnallocatedMemorandumsToCommercialDocument: {
                    __typename: 'Operation',
                    callable: 'ENABLED',
                    messages: []
                  }
                },
                status: 'OVERDUE',
                subjectObject: {
                  ...fixtures.MockInvoice.subjectObject,
                  availablePrepaymentBalanceNullable: '1500.0'
                }
              }
            }
          }
        })

        cy.getByTestId('submit').click()
        cy.getByTestId('InvoicePayModalForm-title').should(
          'contain',
          payModalTitle
        )
      })

      it('ApplyPrepaymentsModal >> InvoicePayModal when operation disabled', () => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                operations: {
                  ...fixtures.MockInvoice.operations,
                  applyUnallocatedMemorandumsToCommercialDocument: {
                    __typename: 'Operation',
                    callable: 'DISABLED',
                    messages: []
                  }
                },
                status: 'OVERDUE',
                subjectObject: {
                  ...fixtures.MockInvoice.subjectObject,
                  availablePrepaymentBalance: '1500.0'
                }
              }
            }
          }
        })

        cy.getByTestId('InvoicePayModalForm-title').should(
          'contain',
          payModalTitle
        )
      })

      // InvoiceCollectBadDebtModal // collectBadDebtInvoice
      it('ApplyPrepaymentsModal > CollectBadDebtModal on successful submission', () => {
        resetSetup({
          SetApplyUnallocatedMemorandumsToCommercialDocument: {
            data: {
              applyUnallocatedMemorandumsToCommercialDocument: {
                __typename:
                  'SetApplyUnallocatedMemorandumsToCommercialDocumentPayload',
                errors: [],
                commercialDocument: {
                  ...fixtures.MockInvoice,
                  status: 'IN_COLLECTIONS'
                },
                notice: '',
                success: true
              }
            }
          },
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                operations: {
                  ...fixtures.MockInvoice.operations,
                  applyUnallocatedMemorandumsToCommercialDocument: {
                    __typename: 'Operation',
                    callable: 'ENABLED',
                    messages: []
                  }
                },
                status: 'IN_COLLECTIONS',
                subjectObject: {
                  ...fixtures.MockInvoice.subjectObject,
                  availablePrepaymentBalanceNullable: '1500.0'
                }
              }
            }
          }
        })

        cy.getByTestId('submit').should(
          'have.text',
          toTitleCase(
            i18n.t(
              'commercialDocument:modals.applyMemos.actions.skipAndContinue'
            )
          )
        )
        cy.getByTestId('submit').should('have.attr', 'type', 'button')

        cy.getByTestId('applyPrepayments').click()
        cy.getByTestId('submit').should(
          'have.text',
          toTitleCase(
            i18n.t(
              'commercialDocument:modals.applyMemos.actions.submitAndContinue'
            )
          )
        )
        cy.getByTestId('submit').should('have.attr', 'type', 'submit')

        cy.getByTestId('submit').click()
        cy.get('#react_notification').should(
          'contain',
          i18n.t('commercialDocument:modals.applyMemos.notification.success', {
            id: DATA_INVOICE_ID,
            type: TYPE
          })
        )

        cy.getByTestId('InvoiceCollectBadDebtModalForm-title').should(
          'contain',
          payModalTitle
        )
      })

      it('ApplyPrepaymentsModal > InvoiceCollectBadDebtModal when manually skipped', () => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                operations: {
                  ...fixtures.MockInvoice.operations,
                  applyUnallocatedMemorandumsToCommercialDocument: {
                    __typename: 'Operation',
                    callable: 'ENABLED',
                    messages: []
                  }
                },
                status: 'IN_COLLECTIONS',
                subjectObject: {
                  ...fixtures.MockInvoice.subjectObject,
                  availablePrepaymentBalance: '1500.0'
                }
              }
            }
          }
        })

        cy.getByTestId('submit').click()
        cy.getByTestId('InvoiceCollectBadDebtModalForm-title').should(
          'contain',
          payModalTitle
        )
      })

      it('ApplyPrepaymentsModal >> InvoiceCollectBadDebtModal when operation disabled', () => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                operations: {
                  ...fixtures.MockInvoice.operations,
                  applyUnallocatedMemorandumsToCommercialDocument: {
                    __typename: 'Operation',
                    callable: 'DISABLED',
                    messages: []
                  }
                },
                status: 'IN_COLLECTIONS',
                subjectObject: {
                  ...fixtures.MockInvoice.subjectObject,
                  availablePrepaymentBalance: '1500.0'
                }
              }
            }
          }
        })

        cy.getByTestId('InvoiceCollectBadDebtModalForm-title').should(
          'contain',
          payModalTitle
        )
      })

      it('ApplyPrepaymentsModal > close modal when applied payment fully covers the invoice', () => {
        resetSetup({
          GetPayModalInvoice: {
            data: {
              node: {
                ...invoiceEndpointOverride,
                operations: {
                  ...fixtures.MockInvoice.operations,
                  applyUnallocatedMemorandumsToCommercialDocument: {
                    __typename: 'Operation',
                    callable: 'ENABLED',
                    messages: []
                  }
                },
                status: 'OVERDUE',
                subjectObject: {
                  ...fixtures.MockInvoice.subjectObject,
                  availablePrepaymentBalance: '2295.0'
                }
              }
            }
          },
          SetApplyUnallocatedMemorandumsToCommercialDocument: {
            data: {
              applyUnallocatedMemorandumsToCommercialDocument: {
                __typename:
                  'SetApplyUnallocatedMemorandumsToCommercialDocumentPayload',
                errors: [],
                commercialDocument: {
                  ...invoiceEndpointOverride,
                  status: 'PAID'
                },
                notice: '',
                success: true
              }
            }
          }
        })

        cy.getByTestId('applyPrepayments').click()
        cy.getByTestId('submit').click()
        cy.getByTestId('InvoicePayModalForm-title').should('not.exist')
      })
    })
  })
})
