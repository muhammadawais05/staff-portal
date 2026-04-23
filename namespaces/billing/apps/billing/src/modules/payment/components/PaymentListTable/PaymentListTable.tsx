import { Table } from '@toptal/picasso'
import React, {
  FC,
  Fragment,
  SyntheticEvent,
  memo,
  ReactElement,
  ReactNode
} from 'react'
import { useTranslation } from 'react-i18next'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import MonthlyTotals from '@staff-portal/billing/src/components/MonthlyTotals'
import { Entities } from '@staff-portal/billing/src/components/ListContext/ListContext'
import Skeleton from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/Skeleton'
import MonthlyTotalsAmount from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/MonthlyTotalsAmount'
import ListTable from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTable'
import { CommercialDocumentTotals } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'
import { convertTotalGroupsToMapByMonths } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils/convertTotalGroupsToMapByMonths'
import { paymentTotalSortOrder } from '@staff-portal/billing-widgets/src/modules/payment/utils'

import {
  MonthlyTotals as PaymentsMonthlyTotals,
  Payments
} from '../../context/PaymentListContext'
import PaymentListRow from '../PaymentListRow'
import PaymentListTableHeader from '../PaymentListTableHeader'
import { PaymentListRowProps } from '../PaymentListRow/PaymentListRow'
import * as styles from './styles'

const displayName = 'PaymentListTable'

interface Props {
  payments?: Entities<Payments>
  totals?: Entities<PaymentsMonthlyTotals>
  Header?: FC
  Row?: FC<PaymentListRowProps>
  SkeletonComponent?: ReactElement
  totalsSortOrder?: (keyof CommercialDocumentTotals)[]
  handleOnActionClick: (event: SyntheticEvent<HTMLElement, Event>) => void
  emptyMessage?: string
  emptyIcon?: ReactNode
}

const PaymentListTable: FC<Props> = memo<Props>(
  ({
    payments: {
      data: { groups: paymentGroups = [] } = {},
      loading: paymentsLoading,
      initialLoading: paymentsInitialLoading
    } = {},
    totals: {
      data: { groups: totalGroups = [] } = {},
      loading: totalsLoading = false,
      initialLoading: totalsInitialLoading = true
    } = {},
    Header = PaymentListTableHeader,
    Row = PaymentListRow,
    SkeletonComponent,
    totalsSortOrder = paymentTotalSortOrder,
    handleOnActionClick,
    emptyMessage,
    emptyIcon
  }) => {
    const { t: translate } = useTranslation('paymentList')
    const totalGroupsByMonths = convertTotalGroupsToMapByMonths(
      totalGroups || []
    )

    return (
      <ListTable
        loading={paymentsLoading}
        initialLoading={paymentsInitialLoading}
        emptyMessage={emptyMessage ?? translate('table.empty.message')}
        emptyIcon={emptyIcon}
        header={<Header />}
        skeletonComponent={SkeletonComponent}
        body={(paymentGroups || []).map(({ year, month, payments }) => (
          <Fragment key={[year, month].join('_')}>
            <colgroup>
              <col />
              <col css={styles.statusColumn} />
            </colgroup>
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
                  sortOrder={totalsSortOrder}
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
              {payments.map((payment, index) => {
                const { id } = payment

                return (
                  <Row
                    handleOnActionClick={handleOnActionClick}
                    payment={payment}
                    key={id}
                    isEven={Boolean(index % 2)}
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

PaymentListTable.displayName = displayName

export default PaymentListTable
