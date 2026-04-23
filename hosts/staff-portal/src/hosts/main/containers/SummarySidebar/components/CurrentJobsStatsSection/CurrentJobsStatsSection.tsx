import React from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getJobsPath } from '@staff-portal/routes'

import SidebarWidget from '../SidebarWidget'
import CounterRow from '../CounterRow'

interface Props {
  numberOfActiveJobs?: number
}

const CurrentJobsStatsSection = ({ numberOfActiveJobs }: Props) => {
  return (
    <SidebarWidget.Section title='Current jobs stats'>
      <CounterRow
        name='Active Jobs'
        counter={
          <Typography size='medium'>
            <Link
              href={getJobsPath({
                company_claimer_id: 'me',
                cumulative_statuses: ['active']
              })}
            >
              {numberOfActiveJobs}
            </Link>
          </Typography>
        }
      />
    </SidebarWidget.Section>
  )
}

export default CurrentJobsStatsSection
