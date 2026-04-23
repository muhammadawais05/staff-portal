import { startCase, camelCase, lowerCase } from 'lodash-es'
import {
  CreditCardBillingOption,
  BillingOptionInterface
} from '@staff-portal/graphql/staff'
import en from '@staff-portal/billing/src/translations/en'

interface GetCommercialDocumentPaymentMethod {
  rawPaymentMethod: string
  billingOption: BillingOptionInterface | CreditCardBillingOption
  gateway?: string
}

type PaymentMethods = keyof typeof en['paymentMethod']

export const getCommercialDocumentPaymentMethod = ({
  rawPaymentMethod,
  billingOption,
  gateway
}: GetCommercialDocumentPaymentMethod) => {
  // TODO:
  // Remove once paymentMethod is a proper payment enum
  // Sadly paymentMethod is a string which is not matching with any enums
  const i18Key = camelCase(rawPaymentMethod) as unknown as PaymentMethods
  const isCreditCard = i18Key === 'creditCard'
  const isStripeACH =
    i18Key === ('ach' as const) && lowerCase(gateway) === 'stripe'

  const isCreditCardExtendedData =
    isCreditCard &&
    (billingOption as CreditCardBillingOption)?.last4Digits &&
    (billingOption as CreditCardBillingOption)?.type

  // If payment is failed, no billing options
  if (isCreditCardExtendedData) {
    return {
      i18Key: 'creditCardDetailed',
      last4Digits: (billingOption as CreditCardBillingOption)?.last4Digits,
      type: startCase(
        lowerCase((billingOption as CreditCardBillingOption)?.type)
      )
    }
  }

  if (isStripeACH) {
    return { i18Key: 'stripeAch' }
  }

  return {
    i18Key
  }
}
