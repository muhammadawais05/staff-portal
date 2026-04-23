import { DocumentStatus } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const statusesFilterConfig: FilterConfig = {
  label: i18n.t('paymentList:filters.fields.common.statuses'),
  name: 'statuses',
  options: [
    {
      label: i18n.t('common:documents.statuses.outstanding') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.OUTSTANDING
    },
    {
      label: i18n.t('common:documents.statuses.onHold') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.ON_HOLD
    },
    {
      label: i18n.t('common:documents.statuses.paid') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.PAID
    },
    {
      label: i18n.t('common:documents.statuses.due') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.DUE
    },
    {
      label: i18n.t('common:documents.statuses.overdue') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.OVERDUE
    },
    {
      label: i18n.t('common:documents.statuses.disputed') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.DISPUTED
    }
  ],
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  type: 'CHECKBOX'
}

export default statusesFilterConfig
