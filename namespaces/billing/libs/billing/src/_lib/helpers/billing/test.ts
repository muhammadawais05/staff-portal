import {
  DocumentStatus,
  InvoicePaymentSources,
  InvoicesTotalsCategory,
  PaymentsTotalsCategory
} from '@staff-portal/graphql/staff'

import {
  BillingMethodOption,
  InvoicePayModalFormValues,
  PaymentSource,
  getBillingOptionsFromClient,
  getColorForAmountLeft,
  getDocumentStatusColor,
  paymentOptionIsDiscountable,
  sortByPaymentSourcesOrder,
  sortByPrimaryAndNumericId
} from '.'
import { encodeId } from '../apollo'

describe.each([
  [InvoicesTotalsCategory.CREDITED, 'yellow'],
  [PaymentsTotalsCategory.DEBITED, 'yellow'],
  [DocumentStatus.DRAFT, 'dark-grey'],
  [DocumentStatus.OUTSTANDING, 'yellow'],
  [DocumentStatus.PAID, 'green'],
  [DocumentStatus.DISPUTED, 'red'],
  [DocumentStatus.IN_COLLECTIONS, 'red'],
  [DocumentStatus.WRITTEN_OFF, 'red'],
  [DocumentStatus.DUE, 'red'],
  [DocumentStatus.OVERDUE, 'red'],
  [DocumentStatus.ON_HOLD, 'yellow'],
  [DocumentStatus.PENDING_RECEIPT, 'yellow']
])('#getDocumentStatusColor', (variant, color) => {
  describe(`when variant is ${JSON.stringify(variant)}`, () => {
    it(`it should be ${color}`, () => {
      expect(getDocumentStatusColor(variant)).toBe(color)
    })
  })
})

describe('billing shared helpers', () => {
  describe('#getColorForAmountLeft', () => {
    describe('when amount is below threshold', () => {
      it('return black', () => {
        expect(
          getColorForAmountLeft({
            amountLeft: 35,
            threshold: 80,
            totalAmount: 100
          })
        ).toBe('black')
      })
    })

    describe('when amount is beyond threshold', () => {
      it('return yellow', () => {
        expect(
          getColorForAmountLeft({
            amountLeft: 12,
            threshold: 80,
            totalAmount: 100
          })
        ).toBe('yellow')
      })
    })

    describe('when amount is negative', () => {
      it('return red', () => {
        expect(
          getColorForAmountLeft({
            amountLeft: -45,
            threshold: 80,
            totalAmount: 100
          })
        ).toBe('red')
      })
    })
  })

  describe('#sortByPaymentSourcesOrder', () => {
    const testOptions1 = [
      { value: InvoicePaymentSources.ACH },
      { value: InvoicePaymentSources.RECORD },
      { value: InvoicePaymentSources.PENDING_RECEIPT },
      { value: InvoicePaymentSources.CREDIT_CARD }
    ] as PaymentSource[]

    it('be sorted in proper order', () => {
      testOptions1.sort(sortByPaymentSourcesOrder)

      expect(testOptions1[0].value).toStrictEqual(InvoicePaymentSources.RECORD)
      expect(testOptions1[1].value).toStrictEqual(
        InvoicePaymentSources.CREDIT_CARD
      )
      expect(testOptions1[2].value).toStrictEqual(InvoicePaymentSources.ACH)
      expect(testOptions1[3].value).toStrictEqual(
        InvoicePaymentSources.PENDING_RECEIPT
      )
    })
  })

  describe('#sortByPrimaryAndNumericId', () => {
    const testOptions1 = [
      { numericId: 123, primary: false },
      { numericId: 234, primary: false },
      { numericId: 345, primary: true }
    ] as BillingMethodOption[]

    const testOptions2 = [
      { numericId: 345, primary: false },
      { numericId: 123, primary: false },
      { numericId: 234, primary: false }
    ] as BillingMethodOption[]

    describe('when there is a primary option', () => {
      it('be set as the first option', () => {
        testOptions1.sort(sortByPrimaryAndNumericId)

        expect(testOptions1[0]).toStrictEqual({
          numericId: 345,
          primary: true
        })
      })
    })

    describe('when there is no primary option', () => {
      it('be sorted only by `numericId`', () => {
        testOptions2.sort(sortByPrimaryAndNumericId)

        expect(testOptions2[0]).toStrictEqual({
          numericId: 123,
          primary: false
        })
        expect(testOptions2[1]).toStrictEqual({
          numericId: 234,
          primary: false
        })
      })
    })
  })

  describe('#getBillingOptionsFromClient', () => {
    describe('when there are no billing options available', () => {
      it('return an empty object', () => {
        const clientData = [
          { billingOptions: { nodes: [], totalCount: 0 } },
          { billingOptions: null }
        ]

        clientData.forEach(data => {
          expect(getBillingOptionsFromClient(data)).toStrictEqual({})
        })
      })
    })

    describe('when there are billing options available', () => {
      it('return a properly structured object', () => {
        const clientData = {
          billingOptions: {
            nodes: [
              { __typename: 'PaypalBillingOption' },
              {
                billingMethod: 'CREDIT_CARD',
                cardExpired: false,
                id: encodeId({
                  id: '1234',
                  type: 'billingCreditCard'
                }),
                last4Digits: '1234',
                type: 'Visa'
              },
              {
                billingMethod: 'CREDIT_CARD',
                cardExpired: false,
                id: encodeId({
                  id: '2345',
                  type: 'billingCreditCard'
                }),
                last4Digits: '2345',
                type: 'Mastercard'
              },
              {
                billingMethod: 'ACH',
                id: encodeId({
                  id: '3456',
                  type: 'billingAch'
                }),
                last4Digits: '3456'
              },
              {
                billingMethod: 'ACH',
                id: encodeId({
                  id: '4567',
                  type: 'billingAch'
                }),
                last4Digits: '4567'
              },
              {
                billingMethod: 'PAYPAL',
                id: encodeId({
                  id: '5678',
                  type: 'billingOther'
                })
              },
              {
                billingMethod: 'WIRE',
                id: encodeId({
                  id: '6789',
                  type: 'billingOther'
                })
              }
            ]
          }
        }

        const result = getBillingOptionsFromClient(clientData)

        expect(result).toStrictEqual({
          ACH: {
            newestId: 4567,
            options: [
              {
                disabled: false,
                id: 'VjEtQUNIQmlsbGluZ09wdGlvbi0zNDU2',
                last4Digits: '3456',
                numericId: 3456,
                primary: false
              },
              {
                disabled: false,
                id: 'VjEtQUNIQmlsbGluZ09wdGlvbi00NTY3',
                last4Digits: '4567',
                numericId: 4567,
                primary: false
              }
            ],
            preferred: false
          },
          CREDIT_CARD: {
            newestId: 2345,
            options: [
              {
                disabled: false,
                id: 'VjEtQ3JlZGl0Q2FyZEJpbGxpbmdPcHRpb24tMTIzNA',
                last4Digits: '1234',
                numericId: 1234,
                primary: false
              },
              {
                disabled: false,
                id: 'VjEtQ3JlZGl0Q2FyZEJpbGxpbmdPcHRpb24tMjM0NQ',
                last4Digits: '2345',
                numericId: 2345,
                primary: false
              }
            ],
            preferred: false
          },
          PAYPAL: {
            newestId: 5678,
            options: [
              {
                disabled: false,
                id: 'VjEtT3RoZXJCaWxsaW5nT3B0aW9uLTU2Nzg',
                last4Digits: '',
                numericId: 5678,
                primary: false
              }
            ],
            preferred: false
          },
          WIRE: {
            newestId: 6789,
            options: [
              {
                disabled: false,
                id: 'VjEtT3RoZXJCaWxsaW5nT3B0aW9uLTY3ODk',
                last4Digits: '',
                numericId: 6789,
                primary: false
              }
            ],
            preferred: false
          }
        })
      })

      describe('if a preferred method exists', () => {
        it('be marked as such', () => {
          const clientData = {
            billingOptions: {
              nodes: [
                { __typename: 'PaypalBillingOption' },
                {
                  billingMethod: 'CREDIT_CARD',
                  cardExpired: false,
                  id: encodeId({
                    id: '1234',
                    type: 'billingCreditCard'
                  }),
                  last4Digits: '1234',
                  type: 'Visa'
                },
                {
                  billingMethod: 'PAYPAL',
                  id: encodeId({
                    id: '4567',
                    type: 'billingOther'
                  })
                }
              ]
            },
            preferredBillingOption: {
              billingMethod: 'CREDIT_CARD',
              discountValue: '100',
              discountable: false,
              id: encodeId({
                id: '1234',
                type: 'billingCreditCard'
              }),
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
          }

          expect(getBillingOptionsFromClient(clientData)).toStrictEqual({
            CREDIT_CARD: {
              newestId: 1234,
              options: [
                {
                  disabled: false,
                  id: 'VjEtQ3JlZGl0Q2FyZEJpbGxpbmdPcHRpb24tMTIzNA',
                  last4Digits: '1234',
                  numericId: 1234,
                  primary: true
                }
              ],
              preferred: true
            },
            PAYPAL: {
              newestId: 4567,
              options: [
                {
                  disabled: false,
                  id: 'VjEtT3RoZXJCaWxsaW5nT3B0aW9uLTQ1Njc',
                  last4Digits: '',
                  numericId: 4567,
                  primary: false
                }
              ],
              preferred: false
            }
          })
        })
      })
    })

    describe('if a card is expired', () => {
      it('be disabled', () => {
        const clientData = {
          billingOptions: {
            nodes: [
              { __typename: 'PaypalBillingOption' },
              {
                billingMethod: 'CREDIT_CARD',
                cardExpired: true,
                id: encodeId({
                  id: '1234',
                  type: 'billingCreditCard'
                }),
                last4Digits: '1234',
                type: 'Visa'
              }
            ]
          }
        }

        const result = getBillingOptionsFromClient(clientData)

        expect(result).toStrictEqual({
          CREDIT_CARD: {
            newestId: 1234,
            options: [
              {
                disabled: true,
                id: 'VjEtQ3JlZGl0Q2FyZEJpbGxpbmdPcHRpb24tMTIzNA',
                last4Digits: '1234',
                numericId: 1234,
                primary: false
              }
            ],
            preferred: false
          }
        })
      })
    })
  })

  describe('#paymentOptionIsDiscountable', () => {
    it.each`
      paymentMethod         | paymentSource        | result
      ${''}                 | ${''}                | ${false}
      ${''}                 | ${'ACH'}             | ${true}
      ${''}                 | ${'PENDING_RECEIPT'} | ${true}
      ${''}                 | ${'UNAPPLIED_CASH'}  | ${true}
      ${''}                 | ${'CREDIT_CARD'}     | ${false}
      ${''}                 | ${'RECORD'}          | ${false}
      ${'PAYPAL'}           | ${'RECORD'}          | ${false}
      ${'CHECK'}            | ${'RECORD'}          | ${true}
      ${'WELLS_FARGO_WIRE'} | ${'RECORD'}          | ${true}
    `(
      'when paymentMethod is $paymentMethod and paymentSource is $paymentSource return $result',
      ({ paymentMethod, paymentSource, result }) => {
        const formData = {
          paymentMethod,
          paymentSource
        } as InvoicePayModalFormValues

        expect(paymentOptionIsDiscountable(formData)).toBe(result)
      }
    )
  })
})
