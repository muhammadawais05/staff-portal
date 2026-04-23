import { Button, Container, Dropdown, Update16 } from '@toptal/picasso'
import React from 'react'
import { WrapWithTooltip } from '@staff-portal/ui'

import RecurringPeriodContent from '../RecurringPeriodContent'

export interface Props {
  taskId: string
  recurringPeriod?: number | null
  disabled?: boolean
}

const RecurringPeriodButton = ({
  taskId,
  recurringPeriod,
  disabled = false
}: Props) => {
  if (disabled && !recurringPeriod) {
    return null
  }

  const color = recurringPeriod ? 'blue' : undefined
  const tooltipContent = `Recurring period: ${recurringPeriod}`

  const button = (
    <WrapWithTooltip
      delay='long'
      enableTooltip={Boolean(recurringPeriod)}
      content={tooltipContent}
      interactive
    >
      <Container as='span' data-testid='recurring-icon'>
        <Button.Circular
          disabled={disabled}
          variant='flat'
          aria-label='Update Recurring Period'
          icon={<Update16 color={color} />}
        />
      </Container>
    </WrapWithTooltip>
  )

  if (disabled) {
    return button
  }

  return (
    <Dropdown
      content={
        <RecurringPeriodContent
          taskId={taskId}
          recurringPeriod={recurringPeriod}
        />
      }
      disableAutoClose
      disablePortal
    >
      {button}
    </Dropdown>
  )
}

export default RecurringPeriodButton
