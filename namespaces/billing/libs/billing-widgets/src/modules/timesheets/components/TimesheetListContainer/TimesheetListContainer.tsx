import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, SectionProps } from '@toptal/picasso'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'

import TimesheetList from '../TimesheetList'
import { useGetBillingCyclesWithTimesheetsQuery } from '../../data/getBillingCyclesWithTimesheets.graphql.types'

interface Props {
  limitElements?: number
  engagementId: string
  variant?: SectionProps['variant']
}

const displayName = 'TimesheetListContainer'

const TimesheetListContainer: FC<Props> = memo<Props>(
  ({ limitElements, engagementId, variant = 'default' }) => {
    const { t: translate } = useTranslation('timesheet')

    const { data, loading, refetch, initialLoading } =
      useGetBillingCyclesWithTimesheetsQuery({
        variables: {
          engagementId
        }
      })

    const timesheets = data?.billingCyclesWithTimesheets || []

    const normalTimesheets = timesheets.filter(
      timesheet => !timesheet.timesheetExtraHours
    )
    const extraHoursTimesheets = timesheets.filter(
      timesheet => timesheet.timesheetExtraHours
    )

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <Section
            variant={variant}
            title={translate('TimesheetList.title.normal')}
          >
            <TableSkeleton row={5} column={3} />
          </Section>
        }
      >
        <TimesheetList
          sectionVariant={variant}
          limitElements={limitElements}
          refetch={refetch}
          timesheets={normalTimesheets}
          variant='normal'
        />
        <TimesheetList
          sectionVariant={variant}
          limitElements={limitElements}
          refetch={refetch}
          timesheets={extraHoursTimesheets}
          variant='extraHours'
        />
      </ContentLoader>
    )
  }
)

TimesheetListContainer.displayName = displayName

export default TimesheetListContainer
