import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import RecurringPeriodButton, { Props } from './RecurringPeriodButton'

jest.mock('../RecurringPeriodContent', () => ({
  __esModule: true,
  RecurringPeriodContent: () => <div data-testid='recurring-period-content' />
}))

const RECCURING_PERIOD = 3

const arrangeTest = ({ taskId, recurringPeriod, disabled }: Props) =>
  render(
    <TestWrapper>
      <RecurringPeriodButton
        taskId={taskId}
        recurringPeriod={recurringPeriod}
        disabled={disabled}
      />
    </TestWrapper>
  )

describe('RecurringPeriodButton', () => {
  it('renders recurring period icon and tooltip', async () => {
    const { getByTestId } = arrangeTest({
      taskId: 'test-task-id',
      recurringPeriod: RECCURING_PERIOD,
      disabled: true
    })

    const recurringPeriodIcon = getByTestId('recurring-icon')

    assertOnTooltipText(
      recurringPeriodIcon,
      `Recurring period: ${RECCURING_PERIOD}`
    )
  })
})
