import {
  BigDecimalRangeGqlParam,
  DateRangeGqlParam,
  dateRangeQueryParam,
  EnumToGqlParam,
  enumQueryParam,
  GqlParams,
  gqlIdQueryParam,
  IdGqlParam,
  searchBarQueryParam
} from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { ApolloClient } from '@apollo/client'
import {
  BillingMethodName,
  BusinessTypes,
  DocumentStatus,
  InvoiceKind,
  PaymentMethod
} from '@staff-portal/graphql/staff'
import { configureSearchParams } from '@staff-portal/billing/src/utils/listSearch'
import { GqlNoneMeIdQueryParam } from '@staff-portal/billing-widgets/src/modules/invoice/utils/gqlNoneMeIdQueryParam'

import { searchBarCategories } from '../InvoiceListSearch/components/searchAutocompleteConfig'

const staffQueryParam = GqlNoneMeIdQueryParam('Staff')

export const getQueryParamsConfig = (
  client: ApolloClient<object>
): QueryParamsOptions => ({
  badges: searchBarQueryParam(searchBarCategories, client),

  business_types: enumQueryParam,

  client_partner_id: staffQueryParam,
  finance_team_member_id: gqlIdQueryParam('Staff'),
  company_claimer_id: staffQueryParam,
  company_project_sales_specialist_id: staffQueryParam,
  company_project_relationship_manager_id: staffQueryParam,
  company_relationship_manager_id: staffQueryParam,
  company_account_manager_id: staffQueryParam,

  created_on: dateRangeQueryParam,
  due_date: dateRangeQueryParam,
  kinds: enumQueryParam,
  paid_at: dateRangeQueryParam,
  payment_methods: enumQueryParam,
  preferred_billing_methods: enumQueryParam,
  statuses: enumQueryParam
})

const model = {
  jobs: 'jobTitles',
  company_ids: 'clientIds',
  talent_ids: 'talentIds'
}

export const getGqlParamsConfig = (): GqlParams => ({
  amount: [BigDecimalRangeGqlParam()],
  badges: [configureSearchParams(model)],
  business_types: [EnumToGqlParam(BusinessTypes), 'businessTypes'],

  client_partner_id: [IdGqlParam(), 'clientPartnerIdNoneMe'],
  finance_team_member_id: [IdGqlParam(), 'financeTeamMemberId'],
  company_claimer_id: [IdGqlParam(), 'companyClaimerIdNoneMe'],
  company_project_sales_specialist_id: [
    IdGqlParam(),
    'companyProjectSalesSpecialistIdNoneMe'
  ],
  company_project_relationship_manager_id: [
    IdGqlParam(),
    'companyProjectRelationshipManagerIdNoneMe'
  ],
  company_relationship_manager_id: [
    IdGqlParam(),
    'companyRelationshipManagerIdNoneMe'
  ],
  company_account_manager_id: [IdGqlParam(), 'companyAccountManagerIdNoneMe'],

  created_on: [DateRangeGqlParam(), 'createdOn'],
  due_date: [DateRangeGqlParam(), 'dueDate'],
  kinds: [EnumToGqlParam(InvoiceKind)],
  paid_at: [DateRangeGqlParam(), 'paidAt'],
  payment_methods: [EnumToGqlParam(PaymentMethod), 'paymentMethods'],
  preferred_billing_methods: [
    EnumToGqlParam(BillingMethodName),
    'preferredBillingMethods'
  ],
  statuses: [EnumToGqlParam(DocumentStatus)]
})
