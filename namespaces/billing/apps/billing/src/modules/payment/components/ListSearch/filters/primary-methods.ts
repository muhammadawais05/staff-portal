import { PaymentOptionPaymentMethod } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const primaryMethodsConfig: FilterConfig = {
  label: i18n.t('paymentList:filters.fields.common.preferredPaymentMethod'),
  name: 'preferred_payment_methods',
  // eslint-disable-next-line
  // @ts-ignore
  options: [
    {
      label: i18n.t('paymentMethod:payPal') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentOptionPaymentMethod.PAYPAL
    },
    {
      label: i18n.t('paymentMethod:bankWire') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentOptionPaymentMethod.BANK_WIRE
    },
    {
      label: i18n.t('paymentMethod:payoneer') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentOptionPaymentMethod.PAYONEER
    },
    {
      label: i18n.t('paymentMethod:toptalPayments') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentOptionPaymentMethod.TOPTAL_PAYMENTS
    },
    {
      label: i18n.t('paymentMethod:ultiPro') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentOptionPaymentMethod.ULTIPRO
    }
  ],
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  type: 'CHECKBOX'
}

export default primaryMethodsConfig
