import {
  DocumentStatus,
  PaymentOptionPaymentMethod
} from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const presetsFilterConfig: FilterConfig = {
  label: i18n.t('paymentList:filters.fields.common.presets'),
  name: 'preset',
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  type: 'PRESET',
  // eslint-disable-next-line
  // @ts-ignore
  options: [
    {
      label: i18n.t('paymentMethod:toptalPayments') as string,
      // @ts-expect-error not declared as a possible option value
      key: 'toptalPayments',
      values: [
        {
          filter: 'preferred_payment_methods',
          value: [PaymentOptionPaymentMethod.TOPTAL_PAYMENTS]
        }
      ]
    },
    {
      label: i18n.t('paymentMethod:payoneer') as string,
      // @ts-expect-error not declared as a possible option value
      key: 'payoneer',
      values: [
        {
          filter: 'preferred_payment_methods',
          value: [PaymentOptionPaymentMethod.PAYONEER]
        }
      ]
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.radio.preset.staffCommissions'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      key: 'staffCommissions',
      values: [
        {
          filter: 'statuses',
          value: [DocumentStatus.DUE, DocumentStatus.OVERDUE]
        },
        { filter: 'payee_roles', value: ['STAFF'] }
      ]
    }
  ]
}

export default presetsFilterConfig
