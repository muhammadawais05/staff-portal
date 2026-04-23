import {
  BigDecimalRangeGqlParam,
  DateRangeGqlParam,
  dateRangeQueryParam,
  EnumToGqlParam,
  enumQueryParam,
  GqlParams,
  searchBarQueryParam
} from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { ApolloClient } from '@apollo/client'
import {
  DocumentStatus,
  PaymentKind,
  PaymentOptionPaymentMethod,
  ToptalPaymentStatus
} from '@staff-portal/graphql/staff'
import { configureSearchParams } from '@staff-portal/billing/src/utils/listSearch'

import { searchBarCategories } from '../../ListSearch'
import {
  PaymentListPresetQueryParam,
  PayeeRolesQueryParam,
  PayeeRolesToGqlParam
} from '../utils'
import { PresetGqlParam } from '../utils/filters'

export const getQueryParamsConfig = (
  client: ApolloClient<object>
): QueryParamsOptions => ({
  badges: searchBarQueryParam(searchBarCategories, client),
  created_on: dateRangeQueryParam,
  due_date: dateRangeQueryParam,
  kinds: enumQueryParam,
  paid_at: dateRangeQueryParam,
  statuses: enumQueryParam,
  payee_roles: PayeeRolesQueryParam,
  preset: PaymentListPresetQueryParam,
  toptal_payments: enumQueryParam,
  preferred_payment_methods: enumQueryParam
})

const model = {
  payee_ids: 'payeeIds',
  jobs: 'jobTitles',
  company_ids: 'clientIds',
  talent_ids: 'talentIds'
}

export const getGqlParamsConfig = (): GqlParams => ({
  amount: [BigDecimalRangeGqlParam()],
  badges: [configureSearchParams(model)],
  created_on: [DateRangeGqlParam(), 'createdOn'],
  due_date: [DateRangeGqlParam(), 'dueDate'],
  paid_at: [DateRangeGqlParam(), 'paidAt'],
  kinds: [EnumToGqlParam(PaymentKind)],
  statuses: [EnumToGqlParam(DocumentStatus)],
  payee_roles: [PayeeRolesToGqlParam, 'payeeRoles'],
  preset: [PresetGqlParam()],
  toptal_payments: [EnumToGqlParam(ToptalPaymentStatus), 'toptalPayments'],
  preferred_payment_methods: [
    EnumToGqlParam(PaymentOptionPaymentMethod),
    'preferredPaymentMethods'
  ]
})
