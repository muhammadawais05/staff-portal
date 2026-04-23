import React from 'react'
import { ApolloClient } from '@apollo/client'
import { searchBarQueryParam } from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { useTranslation } from 'react-i18next'
import { PaymentsFilter } from '@staff-portal/graphql/staff'
import ListPage from '@staff-portal/billing/src/components/ListPage'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { paymentListUpdateDataEvents } from '@staff-portal/billing-widgets/src/modules/payment/messages'
import Skeleton from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/Skeleton/Skeleton'
import { usePaymentGroupActionHandler } from '@staff-portal/billing-widgets/src/modules/paymentGroup/utils'

import { searchBarCategories } from '../../../paymentGroup/components/PaymentGroupListSearch'
import ReceivedPaymentsListHeader from '../../components/ReceivedPaymentsListHeader'
import {
  MonthlyTotals as PaymentsMonthlyTotals,
  PaymentListContext,
  PaymentListQueryParams,
  Payments
} from '../../../payment/context/PaymentListContext'
import { useGetReceivedPaymentsListQuery } from '../../data/getReceivedPaymentsList.graphql.types'
import { useGetPaymentsMonthlyTotalsQuery } from '../../../payment/data/getMonthlyTotalsPaymentsList.graphql.types'
import { getGqlParamsConfig } from '../../../payment/components/PaymentListState/components/PaymentListState'
import PaymentListTable from '../../../payment/components/PaymentListTable'
import ReceivedPaymentsTotals from '../../components/ReceivedPaymentsTotals'
import ReceivedPaymentsListTableHeader from '../../components/ReceivedPaymentsListTableHeader/ReceivedPaymentsListTableHeader'
import ReceivedPaymentListRow from '../../components/ReceivedPaymentListRow'
import { receivedPaymentSortOrder } from '../../utils'
import EmptyIcon from '../../components/EmptyIcon'

const displayName = 'ReceivedPayments'

const getQueryParamsConfig = (
  client: ApolloClient<object>
): QueryParamsOptions => ({
  badges: searchBarQueryParam(searchBarCategories, client)
})

const ReceivedPayments = () => {
  const { handleOnActionClick } = usePaymentGroupActionHandler()
  const { t: translate } = useTranslation('receivedPayments')

  return (
    <ListPage<
      Payments,
      PaymentsMonthlyTotals,
      PaymentsFilter,
      PaymentListQueryParams
    >
      state={{
        context: PaymentListContext,
        updateDataEvents: paymentListUpdateDataEvents,
        getQueryParamsConfig,
        getGqlParamsConfig,
        useGetList: ({ gqlVariables }) =>
          useGetData(useGetReceivedPaymentsListQuery, 'payments')(
            { ...gqlVariables, filter: { myPayments: true } },
            { abortKey: 'PaymentList' }
          ),
        useGetTotals: ({ gqlVariables }) =>
          useGetData(useGetPaymentsMonthlyTotalsQuery, 'payments')(
            { ...gqlVariables, filter: { myPayments: true } },
            { abortKey: 'PaymentListMonthlyTotals' }
          )
      }}
      title={translate('header.title')}
      actions={
        <WidgetErrorBoundary emptyOnError>
          <ReceivedPaymentsListHeader />
        </WidgetErrorBoundary>
      }
      totals={
        <WidgetErrorBoundary emptyOnError>
          <ReceivedPaymentsTotals />
        </WidgetErrorBoundary>
      }
      table={({ list: payments, totals }) => (
        <PaymentListTable
          emptyMessage={translate('table.empty')}
          emptyIcon={<EmptyIcon />}
          payments={payments}
          totals={totals}
          totalsSortOrder={receivedPaymentSortOrder}
          handleOnActionClick={handleOnActionClick}
          Header={ReceivedPaymentsListTableHeader}
          Row={ReceivedPaymentListRow}
          SkeletonComponent={
            <Skeleton.ListContent
              header={<ReceivedPaymentsListTableHeader />}
              rowsCount={25}
              columnsCount={7}
            />
          }
        />
      )}
    />
  )
}

ReceivedPayments.displayName = displayName

export default ReceivedPayments
