import React from 'react'
import { useTranslation } from 'react-i18next'
import { ApolloClient } from '@apollo/client'
import {
  DateRangeGqlParam,
  dateRangeQueryParam,
  enumQueryParam,
  EnumToGqlParam,
  GqlParams,
  searchBarQueryParam
} from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import {
  ExpectedCommissionKind,
  ExpectedCommissionsFilter
} from '@staff-portal/graphql/staff'
import ListPage from '@staff-portal/billing/src/components/ListPage'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { configureSearchParams } from '@staff-portal/billing/src/utils/listSearch'

import ExpectedCommissionsListTable from '../../components/ExpectedCommissionsListTable'
import {
  ExpectedCommissionsListContext,
  ExpectedCommissionsListQueryParams,
  ExpectedCommissions,
  ExpectedCommissionsTotals
} from '../../context/ExpectedCommissionsListContext'
import { expectedCommissionsUpdateDataEvents } from '../../utils'
import {
  useGetExpectedCommissionsListQuery,
  useGetExpectedCommissionsTotalsQuery
} from '../../data'
import ExpectedCommissionsListSearch from '../../components/ExpectedCommissionsListSearch'
import { searchBarCategories } from '../../components/ExpectedCommissionsListSearch/utils/searchAutocompleteConfig'

const displayName = 'ExpectedCommissionsListPage'

const getQueryParamsConfig = (
  client: ApolloClient<object>
): QueryParamsOptions => ({
  badges: searchBarQueryParam(searchBarCategories, client),
  expected_date: dateRangeQueryParam,
  kinds: enumQueryParam
})

const model = {
  payee_ids: 'payeeIds'
}

const getGqlParamsConfig = (): GqlParams => ({
  badges: [configureSearchParams(model)],
  expected_date: [DateRangeGqlParam(), 'expectedDate'],
  kinds: [EnumToGqlParam(ExpectedCommissionKind)]
})

const ExpectedCommissionsListPage = () => {
  const { t: translate } = useTranslation('expectedCommissionList')

  return (
    <ListPage<
      ExpectedCommissions,
      ExpectedCommissionsTotals,
      ExpectedCommissionsFilter,
      ExpectedCommissionsListQueryParams
    >
      state={{
        context: ExpectedCommissionsListContext,
        updateDataEvents: expectedCommissionsUpdateDataEvents,
        getQueryParamsConfig,
        getGqlParamsConfig,
        useGetList: ({ gqlVariables }) =>
          useGetData(useGetExpectedCommissionsListQuery, 'expectedCommissions')(
            gqlVariables,
            {
              abortKey: 'ExpectedCommissionsList'
            }
          ),
        useGetTotals: ({ gqlVariables }) =>
          useGetData(
            useGetExpectedCommissionsTotalsQuery,
            'expectedCommissions'
          )(gqlVariables, {
            abortKey: 'ExpectedCommissionsTotals'
          })
      }}
      title={translate('header.title')}
      // TODO
      // actions={<ExpectedCommissionListHeader />}
      search={<ExpectedCommissionsListSearch />}
      table={({ list: expectedCommissions, totals }) => (
        <ExpectedCommissionsListTable
          totals={totals}
          expectedCommissions={expectedCommissions}
        />
      )}
    />
  )
}

ExpectedCommissionsListPage.displayName = displayName

export default ExpectedCommissionsListPage
