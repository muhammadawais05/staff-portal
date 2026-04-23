import {
  dataQueryParam,
  DateRangeGqlParam,
  dateRangeQueryParam,
  GqlParams,
  HiddenToGqlParam,
  searchBarQueryParam
} from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { ApolloClient } from '@apollo/client'
import {
  MemorandumBalance,
  MemorandumStatus
} from '@staff-portal/graphql/staff'
import { configureSearchParams } from '@staff-portal/billing/src/utils/listSearch'

import { searchBarCategories } from '../MemorandumListSearch'
import { EnumValueToGqlParam } from './enum-value-to-gql-param'
import { EnumValueQueryParam } from './enum-value-query-param'
import { engagementQueryParamConfig } from './utils'

export const getQueryParamsConfig = (
  client: ApolloClient<object>
): QueryParamsOptions => ({
  badges: searchBarQueryParam(searchBarCategories, client),
  creation_date: dateRangeQueryParam,
  allocation_date: dateRangeQueryParam,
  balance: EnumValueQueryParam,
  status: EnumValueQueryParam,
  engagement_id: dataQueryParam(engagementQueryParamConfig, client)
})

const model = {
  company_ids: 'clientIds',
  talent_ids: 'talentIds',
  manager_ids: 'managerIds'
}

export const getGqlParamsConfig = (): GqlParams => ({
  badges: [configureSearchParams(model)],
  creation_date: [DateRangeGqlParam(), 'createdOn'],
  allocation_date: [DateRangeGqlParam(), 'allocatedOn'],
  balance: [EnumValueToGqlParam(MemorandumBalance)],
  status: [EnumValueToGqlParam(MemorandumStatus)],
  engagement_id: [HiddenToGqlParam('Engagement'), 'engagementId']
})
