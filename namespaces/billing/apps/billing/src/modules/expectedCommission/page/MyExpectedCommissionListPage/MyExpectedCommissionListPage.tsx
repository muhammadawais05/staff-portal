import React from 'react'
import { useTranslation } from 'react-i18next'
import { ApolloClient } from '@apollo/client'
import { Notification } from '@toptal/picasso'
import {
  DateRangeGqlParam,
  dateRangeQueryParam,
  enumQueryParam,
  EnumToGqlParam,
  GqlParams,
  searchBarQueryParam
} from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { ExpectedCommissionKind } from '@staff-portal/graphql/staff'
import ListPage from '@staff-portal/billing/src/components/ListPage'
import { configureSearchParams } from '@staff-portal/billing/src/utils/listSearch'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'

import ExpectedCommissionsListTable from '../../components/ExpectedCommissionsListTable'
import {
  MyExpectedCommissions,
  MyExpectedCommissionsTotals,
  MyExpectedCommissionsListContext,
  MyExpectedCommissionsListQueryParams
} from '../../context/MyExpectedCommissionsListContext'
import { expectedCommissionsUpdateDataEvents } from '../../utils'
import {
  useGetMyExpectedCommissionsFormattedData,
  useGetMyExpectedCommissionsQuery,
  useGetMyExpectedCommissionsTotalsQuery
} from '../../data'
import { searchBarCategories } from '../../components/ExpectedCommissionsListSearch/utils/searchAutocompleteConfig'
import ExpectedCommissionsPageActions from '../../components/ExpectedCommissionsPageActions'
import MyExpectedCommissionsListTableHeader from '../../components/MyExpectedCommissionsListTableHeader'
import MyExpectedCommissionsListTableRow from '../../components/MyExpectedCommissionsListTableRow'
import ExpectedComissionsTotals from '../../components/ExpectedComissionsTotals'

const displayName = 'MyExpectedCommissionListPage'

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

const MyExpectedCommissionListPage = () => {
  const { t: translate } = useTranslation('expectedCommissions')

  return (
    <>
      <ListPage<
        MyExpectedCommissions,
        MyExpectedCommissionsTotals,
        void,
        MyExpectedCommissionsListQueryParams
      >
        state={{
          context: MyExpectedCommissionsListContext,
          updateDataEvents: expectedCommissionsUpdateDataEvents,
          getQueryParamsConfig,
          getGqlParamsConfig,
          useGetList: ({ gqlVariables }) =>
            useGetMyExpectedCommissionsFormattedData<MyExpectedCommissions>(
              useGetMyExpectedCommissionsQuery({
                variables: gqlVariables
              })
            ),
          useGetTotals: ({ gqlVariables }) =>
            useGetMyExpectedCommissionsFormattedData<MyExpectedCommissionsTotals>(
              useGetMyExpectedCommissionsTotalsQuery({
                variables: gqlVariables
              })
            )
        }}
        title={translate('header.title')}
        actions={<ExpectedCommissionsPageActions />}
        totals={
          <>
            <Notification>{translate('generalNotice')}</Notification>
            <WidgetErrorBoundary emptyOnError>
              <ExpectedComissionsTotals />
            </WidgetErrorBoundary>
          </>
        }
        table={({ list: expectedCommissions, totals }) => (
          <ExpectedCommissionsListTable
            totals={totals}
            expectedCommissions={expectedCommissions}
            Header={MyExpectedCommissionsListTableHeader}
            Row={MyExpectedCommissionsListTableRow}
            emptyMessage={translate('table.empty.message')}
          />
        )}
      />
    </>
  )
}

MyExpectedCommissionListPage.displayName = displayName

export default MyExpectedCommissionListPage
