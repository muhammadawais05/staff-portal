import { PaymentMethod } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const paymentMethodsFilterConfig: FilterConfig = {
  label: i18n.t('common:filters.fields.common.paymentMethods'),
  name: 'payment_methods',
  // eslint-disable-next-line
  // @ts-ignore
  options: [
    {
      label: i18n.t('paymentMethod:ach') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentMethod.ACH
    },
    {
      label: i18n.t('paymentMethod:creditCard') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentMethod.CREDIT_CARD
    },
    {
      label: i18n.t('paymentMethod:paypal') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentMethod.PAYPAL
    },
    {
      label: i18n.t('paymentMethod:wire') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentMethod.WIRE
    },
    {
      label: i18n.t('paymentMethod:toptalCredit') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentMethod.TOPTAL_CREDIT
    },
    {
      label: i18n.t('paymentMethod:collection') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentMethod.COLLECTION
    },
    {
      label: i18n.t('paymentMethod:check') as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentMethod.CHECK
    }
  ],
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  type: 'CHECKBOX'
}

export default paymentMethodsFilterConfig
