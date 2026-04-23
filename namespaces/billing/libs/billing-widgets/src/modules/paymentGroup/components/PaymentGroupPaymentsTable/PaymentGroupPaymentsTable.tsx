import React, { Fragment, useState } from 'react'
import { Table, Container } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { Pagination, toGqlPagination } from '@staff-portal/filters'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import MonthlyTotals from '@staff-portal/billing/src/components/MonthlyTotals'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import { useGetPaymentGroupDetailsPaymentsQuery } from '../../data'
import Skeleton from '../../../commercialDocument/components/Skeleton'
import { paymentTotalSortOrder } from '../../../payment/utils'
import PaymentGroupPaymentsRow from '../PaymentGroupPaymentsRow'
import PaymentGroupPaymentsTableHeader from '../PaymentGroupPaymentsTableHeader'
import {
  paymentGroupListUpdateDataEvents,
  usePaymentGroupActionHandler
} from '../../utils'
import { convertTotalGroupsToMapByMonths } from '../../../commercialDocument/utils/convertTotalGroupsToMapByMonths'
import { CommercialDocumentTotals } from '../../../commercialDocument/utils'
import MonthlyTotalsAmount from '../../../commercialDocument/components/MonthlyTotalsAmount'
import ListTable from '../../../commercialDocument/components/ListTable'

const displayName = 'PaymentGroupPaymentsTable'

const updateDataEvents = paymentGroupListUpdateDataEvents

interface Props {
  paymentGroupId: string
}

const PAGE_ITEMS = 25
const START_PAGE = 1

const PaymentGroupPaymentsTable = ({ paymentGroupId }: Props) => {
  const [activePage, changePage] = useState(START_PAGE)
  const pagination = toGqlPagination(PAGE_ITEMS, activePage)
  const { t: translate } = useTranslation('paymentGroup')
  const { handleOnActionClick } = usePaymentGroupActionHandler()
  const {
    data,
    loading,
    initialLoading,
    refetch: refetchPayments
  } = useGetNode(useGetPaymentGroupDetailsPaymentsQuery)(
    {
      nodeId: paymentGroupId,
      pagination
    },
    {
      abortKey: 'PaymentGroupPaymentsTablePayments'
    }
  )

  useRefetch(updateDataEvents, refetchPayments)

  const groups = data?.payments?.groups || []
  const totalCount = data?.payments?.totalCount || 0
  const totalGroupsByMonths = convertTotalGroupsToMapByMonths(groups)

  return (
    <>
      <ListTable
        data-testid={displayName}
        rowsCount={5}
        columnsCount={6}
        loading={loading}
        initialLoading={initialLoading}
        emptyMessage={translate('paymentsTable.empty.message')}
        header={<PaymentGroupPaymentsTableHeader />}
        body={groups.map(({ year, month, payments }) => (
          <Fragment key={[year, month].join('_')}>
            <Table.SectionHead colSpan={6}>
              <ContentLoader
                loading={loading}
                showSkeleton={initialLoading}
                skeletonComponent={
                  <Skeleton.ListTableHeadSection columnsCount={6} />
                }
              >
                <MonthlyTotals<CommercialDocumentTotals>
                  year={year}
                  month={month}
                  totals={totalGroupsByMonths?.[year]?.[month]}
                  sortOrder={paymentTotalSortOrder}
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
                  <PaymentGroupPaymentsRow
                    handleOnActionClick={handleOnActionClick}
                    payment={payment}
                    paymentGroupId={paymentGroupId}
                    key={id}
                    isEven={Boolean(index % 2)}
                  />
                )
              })}
            </Table.Body>
          </Fragment>
        ))}
      />
      <Container data-testid={`${displayName}-Pagination`}>
        <Pagination
          activePage={activePage}
          onPageChange={changePage}
          limit={PAGE_ITEMS}
          itemCount={totalCount}
        />
      </Container>
    </>
  )
}

export default PaymentGroupPaymentsTable
