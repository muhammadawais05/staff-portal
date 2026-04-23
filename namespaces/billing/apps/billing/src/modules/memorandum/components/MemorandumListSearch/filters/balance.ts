import { FilterConfigType } from '@staff-portal/filters'
import { MemorandumBalance } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const statusesFilterConfig: FilterConfig = {
  label: i18n.t('memorandumList:filters.fields.common.balance'),
  name: 'balance',
  options: [
    {
      label: i18n.t('common:filters.fields.dropdown.empty'),
      value: ''
    },
    {
      label: i18n.t('memorandumList:filters.fields.radio.balance.debit'),
      value: MemorandumBalance.DEBIT
    },
    {
      label: i18n.t('memorandumList:filters.fields.radio.balance.credit'),
      value: MemorandumBalance.CREDIT
    }
  ],
  type: FilterConfigType.RADIO
}

export default statusesFilterConfig
