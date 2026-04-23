import { BillingMethodName } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const preferredMethodFilterConfig: FilterConfig = {
  label: i18n.t('invoiceList:filters.fields.common.preferredMethod'),
  name: 'preferred_billing_methods',
  // eslint-disable-next-line
  // @ts-ignore
  options: [
    {
      label: i18n.t('paymentMethod:ach') as string,
      // @ts-expect-error not declared as a possible option value
      value: BillingMethodName.ACH
    },
    {
      label: i18n.t('paymentMethod:creditCard') as string,
      // @ts-expect-error not declared as a possible option value
      value: BillingMethodName.CREDIT_CARD
    },
    {
      label: i18n.t('paymentMethod:paypal') as string,
      // @ts-expect-error not declared as a possible option value
      value: BillingMethodName.PAYPAL
    },
    {
      label: i18n.t('paymentMethod:wire') as string,
      // @ts-expect-error not declared as a possible option value
      value: BillingMethodName.WIRE
    }
  ],
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  type: 'CHECKBOX'
}

export default preferredMethodFilterConfig
