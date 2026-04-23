import React from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from '@toptal/picasso'
import { ApolloClient } from '@apollo/client'
import { GqlParams, searchBarQueryParam } from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { PaymentGroupsFilter } from '@staff-portal/graphql/staff'
import ListPage from '@staff-portal/billing/src/components/ListPage'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { configureSearchParams } from '@staff-portal/billing/src/utils/listSearch'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { Model } from '@staff-portal/billing/src/utils/listSearch/configureSearchParameters'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import ListTable from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTable'
import {
  paymentGroupListUpdateDataEvents,
  usePaymentGroupActionHandler
} from '@staff-portal/billing-widgets/src/modules/paymentGroup/utils'

import PaymentGroupListHeader from '../../components/PaymentGroupListHeader'
import PaymentGroupListTableHeader from '../../components/PaymentGroupListTableHeader'
import PaymentGroupListTableRow from '../../components/PaymentGroupListTableRow'
import {
  PaymentGroupListContext,
  PaymentGroupListQueryParams,
  PaymentGroups
} from '../../context/PaymentGroupListContext'
import { useGetPaymentGroupsListQuery } from '../../data'
import PaymentGroupListSearch, {
  searchBarCategories
} from '../../components/PaymentGroupListSearch'

const displayName = 'PaymentGroupListPage'

const getQueryParamsConfig = (
  client: ApolloClient<object>
): QueryParamsOptions => ({
  badges: searchBarQueryParam(searchBarCategories, client)
})

const model: Model = {
  payee_ids: 'payeeIds',
  ids: ['ids', (id: string) => encodeId({ id, type: 'paymentGroup' })]
}

const getGqlParamsConfig = (): GqlParams => ({
  badges: [configureSearchParams(model)]
})

const PaymentGroupListPage = () => {
  const { t: translate } = useTranslation('paymentGroupList')
  const { handleOnActionClick } = usePaymentGroupActionHandler()

  return (
    <ListPage<
      PaymentGroups,
      null,
      PaymentGroupsFilter,
      PaymentGroupListQueryParams
    >
      state={{
        context: PaymentGroupListContext,
        updateDataEvents: paymentGroupListUpdateDataEvents,
        getQueryParamsConfig,
        getGqlParamsConfig,
        useGetList: ({ gqlVariables }) =>
          useGetData(useGetPaymentGroupsListQuery, 'paymentGroupsNullable')(
            gqlVariables,
            {
              abortKey: 'PaymentGroupList'
            }
          )
      }}
      isTotalCountVisible={false}
      title={translate('header.title')}
      actions={
        <WidgetErrorBoundary emptyOnError>
          <PaymentGroupListHeader />
        </WidgetErrorBoundary>
      }
      search={<PaymentGroupListSearch />}
      table={({ list: { data, loading, initialLoading } }) => (
        <ListTable
          loading={loading}
          initialLoading={initialLoading}
          emptyMessage={translate('table.empty.message')}
          header={<PaymentGroupListTableHeader />}
          body={
            !!data?.nodes?.length && (
              <Table.Body>
                {data?.nodes?.map((group, index) => (
                  <PaymentGroupListTableRow
                    key={group.id}
                    group={group}
                    handleOnActionClick={handleOnActionClick}
                    isEven={Boolean(index % 2)}
                  />
                ))}
              </Table.Body>
            )
          }
        />
      )}
    />
  )
}

PaymentGroupListPage.displayName = displayName

export default PaymentGroupListPage
