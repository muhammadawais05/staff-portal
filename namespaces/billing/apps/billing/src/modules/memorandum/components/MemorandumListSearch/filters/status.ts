import { FilterConfigType } from '@staff-portal/filters'
import { MemorandumStatus } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const statusesFilterConfig: FilterConfig = {
  label: i18n.t('memorandumList:filters.fields.common.status'),
  name: 'status',
  options: [
    {
      label: i18n.t('common:filters.fields.dropdown.empty'),
      value: ''
    },
    {
      label: i18n.t('memorandumList:filters.fields.radio.status.allocated'),
      value: MemorandumStatus.ALLOCATED
    },
    {
      label: i18n.t('memorandumList:filters.fields.radio.status.unallocated'),
      value: MemorandumStatus.UNALLOCATED
    }
  ],
  type: FilterConfigType.RADIO
}

export default statusesFilterConfig
