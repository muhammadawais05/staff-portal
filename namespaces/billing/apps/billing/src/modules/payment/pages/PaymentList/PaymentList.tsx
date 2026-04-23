import { useTranslation } from 'react-i18next'
import React from 'react'
import { PaymentsFilter } from '@staff-portal/graphql/staff'
import ListPage from '@staff-portal/billing/src/components/ListPage'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import {
  paymentListUpdateDataEvents,
  usePaymentActionHandler
} from '@staff-portal/billing-widgets/src/modules/payment/utils'

import PaymentListTable from '../../components/PaymentListTable'
import ListSearch from '../../components/ListSearch'
import PaymentListHeader from '../../components/PaymentListHeader'
import PaymentListTotals from '../../components/PaymentListTotals'
import PaymentListChart from '../../components/PaymentListChart'
import {
  MonthlyTotals as PaymentsMonthlyTotals,
  PaymentListContext,
  PaymentListQueryParams,
  Payments
} from '../../context/PaymentListContext'
import {
  getGqlParamsConfig,
  getQueryParamsConfig
} from '../../components/PaymentListState/components/PaymentListState'
import { useGetPaymentsListQuery } from '../../data/getPaymentsList.graphql.types'
import { useGetPaymentsMonthlyTotalsQuery } from '../../data/getMonthlyTotalsPaymentsList.graphql.types'

const PaymentList = () => {
  const { t: translate } = useTranslation('paymentList')
  const { handleOnActionClick } = usePaymentActionHandler()

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
          useGetData(useGetPaymentsListQuery, 'payments')(gqlVariables, {
            abortKey: 'PaymentList'
          }),
        useGetTotals: ({ gqlVariables }) =>
          useGetData(useGetPaymentsMonthlyTotalsQuery, 'payments')(
            gqlVariables,
            {
              abortKey: 'PaymentListMonthlyTotals'
            }
          )
      }}
      title={translate('header.title')}
      header={({ list: payments, initialLoading }) =>
        !payments.error && (
          <WidgetErrorBoundary emptyOnError>
            <PaymentListChart loading={initialLoading} />
          </WidgetErrorBoundary>
        )
      }
      actions={
        <WidgetErrorBoundary emptyOnError>
          <PaymentListHeader />
        </WidgetErrorBoundary>
      }
      search={<ListSearch />}
      totals={
        <WidgetErrorBoundary emptyOnError>
          <PaymentListTotals />
        </WidgetErrorBoundary>
      }
      table={({ list: payments, totals }) => (
        <PaymentListTable
          payments={payments}
          totals={totals}
          handleOnActionClick={handleOnActionClick}
        />
      )}
    />
  )
}

PaymentList.displayName = 'PaymentList'

export default PaymentList
