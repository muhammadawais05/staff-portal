import { Container } from '@toptal/picasso'
import React, { FC, memo, useState } from 'react'
import {
  BillingOverview,
  OverviewAccessLevel
} from '@staff-portal/billing/src/@types/types'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'
import { OverviewContext } from '@staff-portal/billing/src/_lib/context/overviewContext'
import {
  TimePeriod,
  getOneMonthAgoDate,
  getStartDateForPeriod
} from '@staff-portal/billing/src/_lib/dateTime/helper'

import EntOverviewBilling from '../EntOverviewBilling'
import { useOverviewInvoicesQuery } from './data/queryOverview.graphql.types'
import { useGetBillingOverviewDetails } from './data/get-billing-overview-details.graphql'

const displayName = 'StaffOverviewPage'

export const StaffOverviewPage: FC = memo(() => {
  const [accessLevel, setAccessLevel] = useState(OverviewAccessLevel.MyBilling)
  const [sinceDate, setSinceDate] = useState(TimePeriod.Quarter)
  const sinceDateAbs = getStartDateForPeriod(sinceDate).toISODate()
  const timesheetsSinceDate = getOneMonthAgoDate()
  const { manageesHaveSupervisedCompanies } = useGetBillingOverviewDetails()

  const { data, loading, initialLoading } = useOverviewInvoicesQuery({
    fetchPolicy: 'network-only',
    variables: { accessLevel, sinceDate: sinceDateAbs, timesheetsSinceDate }
  })

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<TableSkeleton row={3} column={4} />}
    >
      <OverviewContext.Provider
        value={{
          accessLevel,
          isTeamLead: manageesHaveSupervisedCompanies,
          setAccessLevel,
          setSinceDate,
          sinceDate
        }}
      >
        {data?.overview && (
          <Container
            bordered
            rounded
            top='large'
            padded='medium'
            data-testid={displayName}
          >
            <EntOverviewBilling data={data.overview as BillingOverview} />
          </Container>
        )}
      </OverviewContext.Provider>
    </ContentLoader>
  )
})

StaffOverviewPage.displayName = displayName

export default StaffOverviewPage
