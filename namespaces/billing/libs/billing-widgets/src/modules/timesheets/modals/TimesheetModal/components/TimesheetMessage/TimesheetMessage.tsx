import { Container, Notification } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { isOperationEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'

import { BillingCycleItemFragment } from '../../../../../__fragments__/billingCycleItemFragment.graphql.types'
import { getSubmissionOverdueLeft } from '../../../../utils/timesheet'

interface Props {
  timesheet: BillingCycleItemFragment
}

const displayName = 'TimesheetMessage'

const TimesheetMessage: FC<Props> = memo(
  // eslint-disable-next-line complexity
  ({
    timesheet: {
      timesheetOverdue,
      timesheetSubmissionBlocked,
      timesheetSubmissionDeadline,
      timesheetSubmitted,
      timesheetExtraHours,
      operations,
      breaksPeriod
    }
  }) => {
    const { t: translate } = useTranslation('timesheet')
    const canEdit = isOperationEnabled({ operations, key: 'timesheetUpdate' })
    const showBreakPeriodWarning = canEdit && !!breaksPeriod.length

    let content = ''
    const breaksPeriodWarning = (
      <Container bottom={2}>
        <Notification data-testid={`${displayName}-break_day`}>
          {translate('Timesheet.warnings.hasBreak')}
        </Notification>
      </Container>
    )

    if (timesheetOverdue && !timesheetExtraHours) {
      if (timesheetSubmissionBlocked) {
        content = translate(`Timesheet.warnings.blocked` as const)
      } else {
        const days = getSubmissionOverdueLeft({ timesheetSubmissionDeadline })

        content = translate(`Timesheet.warnings.overdue` as const, {
          days
        })
      }
    } else {
      if (canEdit && timesheetSubmitted && !timesheetSubmissionBlocked) {
        content = translate('Timesheet.warnings.submitted')
      }
    }

    if (!content && !showBreakPeriodWarning) {
      return null
    }

    return content ? (
      <Container bottom={2}>
        {showBreakPeriodWarning && breaksPeriodWarning}
        <Notification data-testid={displayName}>{content}</Notification>
      </Container>
    ) : (
      breaksPeriodWarning
    )
  }
)

TimesheetMessage.displayName = displayName

export default TimesheetMessage
