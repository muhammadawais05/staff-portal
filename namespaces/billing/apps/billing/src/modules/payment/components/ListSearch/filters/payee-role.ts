import { camelCase } from 'lodash-es'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { buildCheckboxFilter } from '@staff-portal/billing/src/_lib/filters/filters-builders'

import { useGetRolesQuery } from '../data'

export const getPayeeRolesFilters = () => () => {
  const { data, loading } = useGetRolesQuery()

  const options = (data?.payeeRoles || []).map(role => ({
    label: i18n.t(
      `paymentList:filters.fields.checkboxes.payeeRole.${camelCase(role)}`
    ),
    value: role
  }))

  return {
    options,
    loading
  }
}

export const payeeRoleTypesConfig = buildCheckboxFilter(
  'payee_roles',
  i18n.t('paymentList:filters.fields.common.payeeRole'),
  getPayeeRolesFilters()
)

export default payeeRoleTypesConfig
