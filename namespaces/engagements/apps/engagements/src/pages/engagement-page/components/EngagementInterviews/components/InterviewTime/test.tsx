import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { assertOnTooltipText, TestWrapper } from '@staff-portal/test-utils'

import InterviewTime, { Props } from './InterviewTime'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateTimeFormatter: () => (dateString: string, dateFormat: string) => {
    const { parseAndFormatDateTime } = jest.requireActual(
      '@staff-portal/date-time-utils'
    )

    return parseAndFormatDateTime(dateString, {
      timeZone: 'Europe/Moscow',
      dateFormat
    })
  }
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <InterviewTime {...props} />
    </TestWrapper>
  )

describe('InterviewTime', () => {
  it('renders correctly', () => {
    arrangeTest({
      interviewTime: '2021-06-15T08:30:00-04:00',
      timeZone: {
        name: '(UTC-04:00) America - Grenada',
        value: 'America/Grenada'
      }
    })

    assertOnTooltipText(
      screen.getByText('Jun 15, 2021 at 3:30 PM (UTC +03:00)'),
      'Tuesday Jun 15, 2021 at 8:30 AM (UTC-04:00) America - Grenada'
    )
  })
})
