import { Table, SkeletonLoader } from '@toptal/picasso'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { PurchaseOrderSearchFilter } from '@staff-portal/graphql/staff'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import ListPage from '@staff-portal/billing/src/components/ListPage'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { useGetExperimentsQuery } from '@staff-portal/billing/src/data/getExperiments.graphql.types'
import ListTable from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTable'

import PurchaseOrdersListHeader from '../../components/PurchaseOrdersListHeader'
import PurchaseOrderListSearch from '../../components/PurchaseOrderListSearch'
import PurchaseOrdersListTableHeader from '../../components/PurchaseOrdersListTableHeader'
import PurchaseOrdersListTableRow from '../../components/PurchaseOrdersListTableRow'
import {
  PurchaseOrderListQueryParams,
  PurchaseOrders,
  PurchaseOrdersListContext
} from '../../context/PurchaseOrdersListContext'
import { purchaseOrderListUpdateEvents } from '../../utils'
import {
  getGqlParamsConfig,
  getQueryParamsConfig
} from '../../components/PurchaseOrdersListState/PurchaseOrdersListState'
import { useGetPurchaseOrdersListQuery } from '../../data'

const PurchaseOrderList = () => {
  const { t: translate } = useTranslation('purchaseOrderList')
  const { handleOnOpenModalWithUrlSearch } = useModals()
  const handleOnCreateModalClick = useCallback(
    () => handleOnOpenModalWithUrlSearch(ModalKey.purchaseOrderCreate),
    [handleOnOpenModalWithUrlSearch]
  )
  const {
    data: poLinesExperiment,
    loading: poLinesLoading,
    initialLoading: poLinesInitialLoading
  } = useGetExperimentsQuery()
  const poLinesEnabled = Boolean(
    poLinesExperiment?.experiments?.poLines?.enabled
  )

  return (
    <ListPage<
      PurchaseOrders,
      null,
      PurchaseOrderSearchFilter,
      PurchaseOrderListQueryParams
    >
      state={{
        context: PurchaseOrdersListContext,
        updateDataEvents: purchaseOrderListUpdateEvents,
        getQueryParamsConfig,
        getGqlParamsConfig,
        useGetList: ({ gqlVariables }) =>
          useGetData(useGetPurchaseOrdersListQuery, 'purchaseOrders')(
            gqlVariables,
            {
              abortKey: 'PurchaseOrdersList'
            }
          )
      }}
      title={translate('page.header.title')}
      actions={({ list: { data: purchaseOrders, loading, initialLoading } }) =>
        initialLoading || loading || poLinesLoading ? (
          <SkeletonLoader.Button />
        ) : (
          <PurchaseOrdersListHeader
            handleOnClick={handleOnCreateModalClick}
            operation={purchaseOrders?.operations?.createPurchaseOrder}
          />
        )
      }
      search={<PurchaseOrderListSearch />}
      table={({ list: { data: purchaseOrders, loading, initialLoading } }) => (
        <ListTable
          loading={poLinesLoading || loading}
          initialLoading={poLinesInitialLoading || initialLoading}
          emptyMessage={translate('table.empty.message')}
          header={
            <PurchaseOrdersListTableHeader poLinesEnabled={poLinesEnabled} />
          }
          rowsCount={25}
          columnsCount={5}
          body={
            !!purchaseOrders?.nodes?.length && (
              <Table.Body>
                {purchaseOrders?.nodes?.map((purchaseOrder, index) => (
                  <PurchaseOrdersListTableRow
                    key={purchaseOrder.id}
                    purchaseOrder={purchaseOrder}
                    isEven={Boolean(index % 2)}
                    poLinesEnabled={poLinesEnabled}
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

PurchaseOrderList.displayName = 'PurchaseOrderList'

export default PurchaseOrderList
