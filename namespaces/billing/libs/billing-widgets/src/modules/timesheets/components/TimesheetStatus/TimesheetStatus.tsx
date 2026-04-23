import { TFunction } from 'i18next'
import { Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

import { BillingCycleItemFragment } from '../../../__fragments__/billingCycleItemFragment.graphql.types'
import { getSubmissionOverdueLeft } from '../../utils/timesheet'

interface Props {
  inline?: boolean
  timesheet: BillingCycleItemFragment
}

interface GetMessage {
  timesheet: BillingCycleItemFragment
  translate: TFunction
}

const displayName = 'TimesheetStatus'

// eslint-disable-next-line complexity
const getMessage = ({
  timesheet: {
    timesheetApproved,
    timesheetOverdue,
    timesheetRejected,
    timesheetRequiresApproval,
    timesheetSubmissionBlocked,
    timesheetSubmissionDeadline,
    timesheetSubmitted,
    timesheetExtraHours
  },
  translate
}: GetMessage): string => {
  let content = ''

  if (timesheetRejected || timesheetOverdue) {
    if (timesheetRejected) {
      content = translate('TimesheetStatus.warning.rejected')
    }

    if (timesheetOverdue && !timesheetExtraHours) {
      const days = getSubmissionOverdueLeft({ timesheetSubmissionDeadline })

      const overdueMessage = translate('TimesheetStatus.warning.overdue', {
        desc: timesheetSubmissionBlocked
          ? translate('TimesheetStatus.warning.blocked')
          : translate('TimesheetStatus.warning.left', { days })
      })

      content = content ? `${content}. ${overdueMessage}` : overdueMessage
    }
  } else {
    if (!timesheetSubmitted) {
      content = translate('TimesheetStatus.notSubmitted')
    }

    if (timesheetSubmitted) {
      if (timesheetApproved) {
        content = translate('TimesheetStatus.approved')
      } else {
        content = timesheetRequiresApproval
          ? translate('TimesheetStatus.waitApproval')
          : ''
      }
    }
  }

  return content ? `(${content})` : content
}

const TimesheetStatus: FC<Props> = memo(({ inline, timesheet }) => {
  const { timesheetOverdue, timesheetRejected, timesheetApproved } = timesheet
  const { t: translate } = useTranslation('timesheet')
  const content = getMessage({ translate, timesheet })
  const isWarning = timesheetOverdue || timesheetRejected

  return !content ? null : (
    <Typography
      as={inline ? 'span' : undefined}
      color={isWarning ? 'red' : timesheetApproved ? 'green' : 'yellow'}
      data-testid={displayName}
      inline={inline}
      size='medium'
    >
      {content}
    </Typography>
  )
})

TimesheetStatus.displayName = displayName

export default TimesheetStatus
