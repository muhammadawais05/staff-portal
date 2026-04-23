import { Modal, Typography, Container } from '@toptal/picasso'
import React, { FC, ReactNode, memo } from 'react'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'

import { BillingCycleItemFragment } from '../../../../__fragments__/billingCycleItemFragment.graphql.types'
import TimesheetStatus from '../../../components/TimesheetStatus'

interface Props {
  timesheet: BillingCycleItemFragment
  children: ReactNode
}

const displayName = 'TimesheetModalTitle'

const TimesheetModalTitle: FC<Props> = memo(({ timesheet, children }) => {
  const { startDate, endDate } = timesheet

  return (
    <Modal.Title data-testid={displayName}>
      <Container bottom={0.5}>
        <Typography
          as='span'
          data-testid={`${displayName}-header`}
          size='medium'
          variant='heading'
        >
          {children}
          {startDate &&
            endDate &&
            ` (${formatDateMed(startDate)} - ${formatDateMed(endDate)})`}
        </Typography>
      </Container>
      <TimesheetStatus timesheet={timesheet} />
    </Modal.Title>
  )
})

TimesheetModalTitle.displayName = displayName

export default TimesheetModalTitle
