import { DocumentStatus } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const statusesFilterConfig: FilterConfig = {
  label: i18n.t('invoiceList:filters.fields.common.statuses'),
  name: 'statuses',
  options: [
    {
      label: i18n.t('common:documents.statuses.outstanding') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.OUTSTANDING
    },
    {
      label: i18n.t('common:documents.statuses.overdue') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.OVERDUE
    },
    {
      label: i18n.t('common:documents.statuses.pendingReceipt') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.PENDING_RECEIPT
    },
    {
      label: i18n.t('common:documents.statuses.disputed') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.DISPUTED
    },
    {
      label: i18n.t('common:documents.statuses.inCollections') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.IN_COLLECTIONS
    },
    {
      label: i18n.t('common:documents.statuses.writtenOff') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.WRITTEN_OFF
    },
    {
      label: i18n.t('common:documents.statuses.paid') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.PAID
    },
    {
      label: i18n.t('common:documents.statuses.draft') as string,
      // @ts-expect-error not declared as a possible option value
      value: DocumentStatus.DRAFT
    }
  ],
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  type: 'CHECKBOX'
}

export default statusesFilterConfig
