import { camelCase } from 'lodash-es'
import {
  InvoicePaymentMethods,
  PaymentOptionPaymentMethod,
  PaymentMethod
} from '@staff-portal/graphql/staff'

import { getCommercialDocumentPaymentMethod } from './getCommercialDocumentPaymentMethod'

describe('#getCommercialDocumentPaymentMethod', () => {
  describe.each([
    [
      { rawPaymentMethod: PaymentMethod.ACH, gateway: 'stripe' },
      {
        i18Key: 'stripeAch'
      }
    ],
    [
      { rawPaymentMethod: PaymentMethod.ACH },
      {
        i18Key: camelCase(PaymentMethod.ACH)
      }
    ],
    [
      { rawPaymentMethod: PaymentMethod.CHECK },
      {
        i18Key: camelCase(PaymentMethod.CHECK)
      }
    ],
    [
      { rawPaymentMethod: PaymentMethod.COLLECTION },
      {
        i18Key: camelCase(PaymentMethod.COLLECTION)
      }
    ],
    [
      { rawPaymentMethod: PaymentMethod.CREDIT_CARD, billingOption: {} },
      {
        i18Key: camelCase(PaymentMethod.CREDIT_CARD)
      }
    ],
    [
      { rawPaymentMethod: PaymentMethod.CREDIT_CARD, billingOption: null },
      {
        i18Key: camelCase(PaymentMethod.CREDIT_CARD)
      }
    ],
    [
      {
        rawPaymentMethod: PaymentMethod.CREDIT_CARD,
        billingOption: { last4Digits: '4567' }
      },
      {
        i18Key: camelCase(PaymentMethod.CREDIT_CARD)
      }
    ],
    [
      {
        rawPaymentMethod: PaymentMethod.CREDIT_CARD,
        billingOption: { last4Digits: '4567', type: 'VISA' }
      },
      {
        i18Key: 'creditCardDetailed',
        last4Digits: '4567',
        type: 'Visa'
      }
    ],
    [
      {
        rawPaymentMethod: 'Credit Card',
        billingOption: { last4Digits: '4567', type: 'American Express' }
      },
      {
        i18Key: 'creditCardDetailed',
        last4Digits: '4567',
        type: 'American Express'
      }
    ],
    [
      { rawPaymentMethod: PaymentMethod.PAYPAL },
      {
        i18Key: camelCase(PaymentMethod.PAYPAL)
      }
    ],
    [
      { rawPaymentMethod: PaymentMethod.TOPTAL_CREDIT },
      {
        i18Key: camelCase(PaymentMethod.TOPTAL_CREDIT)
      }
    ],
    [
      { rawPaymentMethod: PaymentMethod.WIRE },
      {
        i18Key: camelCase(PaymentMethod.WIRE)
      }
    ],
    [
      { rawPaymentMethod: InvoicePaymentMethods.WELLS_FARGO_WIRE },
      {
        i18Key: camelCase(InvoicePaymentMethods.WELLS_FARGO_WIRE)
      }
    ],
    [
      { rawPaymentMethod: InvoicePaymentMethods.CHECK },
      {
        i18Key: camelCase(InvoicePaymentMethods.CHECK)
      }
    ],
    [
      { rawPaymentMethod: PaymentOptionPaymentMethod.BANK_WIRE },
      {
        i18Key: camelCase(PaymentOptionPaymentMethod.BANK_WIRE)
      }
    ],
    [
      { rawPaymentMethod: PaymentOptionPaymentMethod.PAYONEER },
      {
        i18Key: camelCase(PaymentOptionPaymentMethod.PAYONEER)
      }
    ],
    [
      { rawPaymentMethod: PaymentOptionPaymentMethod.TOPTAL_PAYMENTS },
      {
        i18Key: camelCase(PaymentOptionPaymentMethod.TOPTAL_PAYMENTS)
      }
    ],
    [
      { rawPaymentMethod: PaymentOptionPaymentMethod.ULTIPRO },
      {
        i18Key: camelCase(PaymentOptionPaymentMethod.ULTIPRO)
      }
    ]
  ])('variations', (options, result) => {
    const { rawPaymentMethod, billingOption } = options

    describe(`when rawPaymentMethod is ${rawPaymentMethod}${
      billingOption ? ', and options are ' + JSON.stringify(billingOption) : ''
    }`, () => {
      it('returns the proper i18n config', () => {
        expect(getCommercialDocumentPaymentMethod(options)).toEqual(result)
      })
    })
  })
})
