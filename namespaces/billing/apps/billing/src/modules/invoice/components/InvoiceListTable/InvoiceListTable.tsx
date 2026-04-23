import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, Fragment, SyntheticEvent, memo } from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import MonthlyTotals from '@staff-portal/billing/src/components/MonthlyTotals'
import { Entities } from '@staff-portal/billing/src/components/ListContext/ListContext'
import MonthlyTotalsAmount from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/MonthlyTotalsAmount'
import ListTable from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTable'
import { CommercialDocumentTotals } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'
import Skeleton from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/Skeleton'
import { convertTotalGroupsToMapByMonths } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils/convertTotalGroupsToMapByMonths'

import InvoiceListTableHeader from '../InvoiceListTableHeader'
import InvoiceListTableRow from '../InvoiceListTableRow'
import { invoiceTotalSortOrder } from '../../utils'
import {
  Invoices,
  MonthlyTotals as InvoicesMonthlyTotals
} from '../../contexts/invoiceListContext'

const displayName = 'InvoiceListTable'

interface Props {
  invoices: Entities<Invoices>
  totals?: Entities<InvoicesMonthlyTotals>
  loading?: boolean
  handleOnActionClick: (event: SyntheticEvent<HTMLElement, Event>) => void
}

const InvoiceListTable: FC<Props> = memo<Props>(
  ({
    invoices: {
      data: { groups: invoiceGroups = [] } = {},
      loading: invoicesLoading,
      initialLoading: invoicesInitialLoading
    },
    totals: {
      data: { groups: totalGroups = [] } = {},
      loading: totalsLoading = false,
      initialLoading: totalsInitialLoading = true
    } = {},
    handleOnActionClick
  }) => {
    const { t: translate } = useTranslation('invoiceList')
    const totalGroupsByMonths = convertTotalGroupsToMapByMonths(totalGroups)

    return (
      <ListTable
        loading={invoicesLoading}
        initialLoading={invoicesInitialLoading}
        emptyMessage={translate('table.empty.message')}
        header={
          <InvoiceListTableHeader
            isActionsVisible
            isRecipientVisible
            isStatusVisible
          />
        }
        body={invoiceGroups.map(({ invoices, year, month }) => (
          <Fragment key={[year, month].join('_')}>
            <Table.SectionHead>
              <ContentLoader
                loading={totalsLoading}
                showSkeleton={totalsInitialLoading}
                skeletonComponent={
                  <Skeleton.ListTableHeadSection columnsCount={6} />
                }
              >
                <MonthlyTotals<CommercialDocumentTotals>
                  year={year}
                  month={month}
                  totals={totalGroupsByMonths?.[year]?.[month]}
                  sortOrder={invoiceTotalSortOrder}
                >
                  {({ name, total, last }) => (
                    <MonthlyTotalsAmount
                      name={name}
                      total={total}
                      last={last}
                    />
                  )}
                </MonthlyTotals>
              </ContentLoader>
            </Table.SectionHead>
            <Table.Body>
              {invoices.map((invoice, index) => {
                const { id } = invoice

                return (
                  <InvoiceListTableRow
                    handleOnActionClick={handleOnActionClick}
                    invoice={invoice}
                    isEven={Boolean(index % 2)}
                    key={id}
                  />
                )
              })}
            </Table.Body>
          </Fragment>
        ))}
      />
    )
  }
)

InvoiceListTable.displayName = displayName

export default InvoiceListTable
