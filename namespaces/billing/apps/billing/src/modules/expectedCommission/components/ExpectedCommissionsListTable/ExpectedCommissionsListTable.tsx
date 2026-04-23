import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, Fragment, memo } from 'react'
import { Entities } from '@staff-portal/billing/src/components/ListContext/ListContext'
import MonthlyTotals from '@staff-portal/billing/src/components/MonthlyTotals'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import ListTable from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTable/ListTable'
import Skeleton from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/Skeleton'
import { convertTotalGroupsToMapByMonths } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils/convertTotalGroupsToMapByMonths'

import ExpectedCommissionsListTableHeader from '../ExpectedCommissionsListTableHeader'
import ExpectedCommissionsListTableRow from '../ExpectedCommissionsListTableRow'
import MonthlyTotalsAmount from '../MonthlyTotalsAmount'
import {
  ExpectedCommissions,
  ExpectedCommissionsTotals
} from '../../context/ExpectedCommissionsListContext'
import { ExpectedCommissionsListTableRowProps } from '../ExpectedCommissionsListTableRow/ExpectedCommissionsListTableRow'
import EmptyIcon from '../../../receivedPayments/components/EmptyIcon'

const displayName = 'ExpectedCommissionsListTable'

interface Props {
  totals?: Entities<ExpectedCommissionsTotals>
  expectedCommissions: Entities<ExpectedCommissions>
  Header?: FC
  Row?: FC<ExpectedCommissionsListTableRowProps>
  emptyMessage?: string
}

const ExpectedCommissionsListTable: FC<Props> = memo<Props>(
  ({
    totals: {
      data: { groups: totalGroups = [] } = {},
      loading: totalsLoading = false,
      initialLoading: totalsInitialLoading = true
    } = {},
    expectedCommissions: {
      data: { groups = [] } = {},
      loading,
      initialLoading
    },
    Row = ExpectedCommissionsListTableRow,
    Header = ExpectedCommissionsListTableHeader,
    emptyMessage
  }) => {
    const { t: translate } = useTranslation('expectedCommissionList')
    const totalGroupsByMonths = convertTotalGroupsToMapByMonths(totalGroups)

    return (
      <ListTable
        loading={loading}
        initialLoading={initialLoading}
        emptyMessage={emptyMessage || translate('table.empty.message')}
        emptyIcon={<EmptyIcon />}
        header={<Header />}
        body={groups.map(({ expectedCommissions, year, month }) => (
          <Fragment key={[year, month].join('_')}>
            <Table.SectionHead>
              <ContentLoader
                loading={totalsLoading}
                showSkeleton={totalsInitialLoading}
                skeletonComponent={
                  <Skeleton.ListTableHeadSection columnsCount={6} />
                }
              >
                <MonthlyTotals<{ amount: string }>
                  year={year}
                  month={month}
                  totals={totalGroupsByMonths?.[year]?.[month]}
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
              {expectedCommissions.map((expectedCommission, index) => {
                return (
                  <Row
                    key={expectedCommission.id}
                    expectedCommission={expectedCommission}
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

ExpectedCommissionsListTable.displayName = displayName

export default ExpectedCommissionsListTable
