import { Container, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

import { useEngagementContext } from '../../../../../engagement/context'

const displayName = 'TimesheetJobTitle'

export const TimesheetJobTitle: FC = memo(() => {
  const engagement = useEngagementContext()
  const { t: translate } = useTranslation('timesheet')
  const jobTitle = engagement?.job?.title

  if (!jobTitle) {
    return null
  }

  return (
    <Container bottom={2} data-testid={displayName}>
      <Typography
        data-testid='job-title-header'
        size='medium'
        variant='heading'
      >
        {translate('TimesheetJobTitle.title')}
      </Typography>
      <Typography data-testid='job-title' size='medium' weight='semibold'>
        {jobTitle}
      </Typography>
    </Container>
  )
})

TimesheetJobTitle.displayName = displayName

export default TimesheetJobTitle
