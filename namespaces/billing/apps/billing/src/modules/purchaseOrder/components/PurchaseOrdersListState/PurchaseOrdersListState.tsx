import { ApolloClient } from '@apollo/client'
import { GqlParams, searchBarQueryParam } from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { configureSearchParams } from '@staff-portal/billing/src/utils/listSearch'

import { searchBarCategories } from '../PurchaseOrderListSearch'

export const getQueryParamsConfig = (
  client: ApolloClient<object>
): QueryParamsOptions => ({
  badges: searchBarQueryParam(searchBarCategories, client)
})

const model = {
  company_ids: 'clientIds',
  numbers: 'numbers'
}

export const getGqlParamsConfig = (): GqlParams => ({
  badges: [configureSearchParams(model)]
})
