import { useTranslation } from 'react-i18next'
import React, { useCallback } from 'react'
import { InvoicesFilter } from '@staff-portal/graphql/staff'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import ListPage from '@staff-portal/billing/src/components/ListPage'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { invoiceListUpdateDataEvents } from '@staff-portal/billing-widgets/src/modules/invoice/messages'

import { invoiceActionHandler } from '../../utils'
import { useActionsInvoice } from '../../utils/useActionsInvoice'
import InvoiceListSearch from '../../components/InvoiceListSearch'
import InvoiceListTable from '../../components/InvoiceListTable'
import InvoiceListHeader from '../../components/InvoiceListHeader'
import InvoiceListTotals from '../../components/InvoiceListTotals'
import {
  InvoiceListContext,
  InvoiceListQueryParams,
  Invoices,
  MonthlyTotals as InvoicesMonthlyTotals
} from '../../contexts/invoiceListContext'
import {
  useGetInvoicesListQuery,
  useGetInvoicesMonthlyTotalsQuery
} from '../../data'
import {
  getGqlParamsConfig,
  getQueryParamsConfig
} from '../../components/InvoiceListState/InvoiceListState'

const InvoiceListPage = () => {
  const { t: translate } = useTranslation('invoiceList')
  const { handleOnOpenModalWithUrlSearch } = useModals()
  const { handleOnApplyPromotions } = useActionsInvoice()
  const handleOnInvoiceActionsClick = useCallback(
    invoiceActionHandler({
      handleOnApplyPromotions,
      handleOnOpenModal: handleOnOpenModalWithUrlSearch
    }),
    [handleOnOpenModalWithUrlSearch, handleOnApplyPromotions]
  )

  return (
    <ListPage<
      Invoices,
      InvoicesMonthlyTotals,
      InvoicesFilter,
      InvoiceListQueryParams
    >
      state={{
        context: InvoiceListContext,
        updateDataEvents: invoiceListUpdateDataEvents,
        getQueryParamsConfig,
        getGqlParamsConfig,
        useGetList: ({ gqlVariables }) =>
          useGetData(useGetInvoicesListQuery, 'invoices')(gqlVariables, {
            abortKey: 'InvoiceList'
          }),
        useGetTotals: ({ gqlVariables }) =>
          useGetData(useGetInvoicesMonthlyTotalsQuery, 'invoices')(
            gqlVariables,
            {
              abortKey: 'InvoiceListMonthlyTotals'
            }
          )
      }}
      title={translate('header.title')}
      actions={
        <WidgetErrorBoundary emptyOnError>
          <InvoiceListHeader />
        </WidgetErrorBoundary>
      }
      search={<InvoiceListSearch />}
      totals={
        <WidgetErrorBoundary emptyOnError>
          <InvoiceListTotals />
        </WidgetErrorBoundary>
      }
      table={({ list: invoices, totals }) => (
        <InvoiceListTable
          totals={totals}
          invoices={invoices}
          handleOnActionClick={handleOnInvoiceActionsClick}
        />
      )}
    />
  )
}

export default InvoiceListPage
