import { ToptalPaymentStatus } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const toptalPaymentsConfig: FilterConfig = {
  label: i18n.t('paymentList:filters.fields.common.toptalPayments'),
  name: 'toptal_payments',
  // eslint-disable-next-line
  // @ts-ignore
  options: [
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.toptalPayments.notAcknowledged'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: ToptalPaymentStatus.NOT_ACKNOWLEDGED
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.toptalPayments.noTransferMethod'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: ToptalPaymentStatus.NO_TRANSFER_METHOD
    }
  ],
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  type: 'CHECKBOX'
}

export default toptalPaymentsConfig
