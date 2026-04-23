import {
  FiltersConfig,
  FiltersKeyMapConfig
} from '@staff-portal/billing/src/_lib/filters/filters-types'
import {
  buildAmountFilter,
  buildDateRangeFilter
} from '@staff-portal/billing/src/_lib/filters/filters-builders'
import { fullFillConfig } from '@staff-portal/billing/src/_lib/filters/filters-config'
import i18n from '@staff-portal/billing/src/utils/i18n'

import {
  businessTypesFilterConfig,
  kindsFilterConfig,
  paymentMethodsFilterConfig,
  preferredBillingMethodsFilterConfig,
  statusesFilterConfig
} from '../filters'
import { getInvoicesListFiltersQuerySource } from '../data'
import { buildInvoiceDropdownFilter } from '../utils'

const ME = 'ME'
const NONE = 'NONE'

const NONE_ME_VALUES = [
  { label: i18n.t('common:filters.fields.dropdown.none'), value: NONE },
  { label: i18n.t('common:filters.fields.dropdown.me'), value: ME }
]
const createOn = buildDateRangeFilter('created_on', 'issuedOn')

const dueDate = buildDateRangeFilter('due_date', 'dueOn')

const amount = buildAmountFilter('amount')

const paidAt = buildDateRangeFilter('paid_at', 'paidOn')

const financeTeamMember = buildInvoiceDropdownFilter(
  'finance_team_member_id',
  getInvoicesListFiltersQuerySource('companyFinanceTeamMembers')
)

const enterpriseClientPartner = buildInvoiceDropdownFilter(
  'client_partner_id',
  getInvoicesListFiltersQuerySource('companyClientPartners'),
  NONE_ME_VALUES
)

const claimer = buildInvoiceDropdownFilter(
  'company_claimer_id',
  getInvoicesListFiltersQuerySource('companyClaimers'),
  NONE_ME_VALUES
)

const projectSalesSpecialist = buildInvoiceDropdownFilter(
  'company_project_sales_specialist_id',
  getInvoicesListFiltersQuerySource('companySmbProjectSalesSpecialists'),
  NONE_ME_VALUES
)

const projectRelationshipManager = buildInvoiceDropdownFilter(
  'company_project_relationship_manager_id',
  getInvoicesListFiltersQuerySource('companySmbProjectRelationshipManagers'),
  NONE_ME_VALUES
)

const relationshipManager = buildInvoiceDropdownFilter(
  'company_relationship_manager_id',
  getInvoicesListFiltersQuerySource('opportunitySmbRelationshipManagers'),
  NONE_ME_VALUES
)

const accountManager = buildInvoiceDropdownFilter(
  'company_account_manager_id',
  getInvoicesListFiltersQuerySource('companySmbAccountManagers'),
  NONE_ME_VALUES
)

export const FILTERS_CONFIG: FiltersKeyMapConfig = [
  createOn,
  dueDate,
  amount,
  paidAt,
  [financeTeamMember, enterpriseClientPartner],
  [claimer, projectSalesSpecialist],
  projectRelationshipManager,
  [relationshipManager, accountManager],
  statusesFilterConfig,
  kindsFilterConfig,
  preferredBillingMethodsFilterConfig,
  paymentMethodsFilterConfig,
  businessTypesFilterConfig
]

export const useFiltersConfig = (): {
  filtersConfig: FiltersConfig
  loading: boolean
} => {
  const { config: filtersConfig, loading } = fullFillConfig(FILTERS_CONFIG)

  return {
    filtersConfig,
    loading
  }
}
