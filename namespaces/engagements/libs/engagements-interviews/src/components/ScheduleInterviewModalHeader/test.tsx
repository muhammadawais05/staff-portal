import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import ScheduleInterviewModalHeader, {
  Props
} from './ScheduleInterviewModalHeader'

const arrangeTest = ({
  isTopSchedulerAvailable = true,
  isClassic = false,
  showClaimerWarning = true,
  onToggle = () => {}
}: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <ScheduleInterviewModalHeader
        isTopSchedulerAvailable={isTopSchedulerAvailable}
        isClassic={isClassic}
        showClaimerWarning={showClaimerWarning}
        onToggle={onToggle}
      />
    </TestWrapper>
  )

describe('ScheduleInterviewModalHeader', () => {
  it('hides the claimer warning', () => {
    arrangeTest({ showClaimerWarning: false })

    expect(
      screen.queryByText(
        'This job is not claimed by you. The job claimer will receive interview feedback.'
      )
    ).not.toBeInTheDocument()
  })

  it('hides the scheduling switcher', () => {
    arrangeTest({ isTopSchedulerAvailable: false })

    expect(screen.queryByText('Use Classic Scheduling')).not.toBeInTheDocument()
  })

  it('shows classic scheduling description', () => {
    arrangeTest({ isClassic: true })

    expect(
      screen.getByText(
        'Please set the date, time, and time zone of the interview. You may pick up to three options. The candidate will then be notified and will confirm the interview time from the options you choose. If the candidate cannot make the proposed times, then you will able to reschedule.'
      )
    ).toBeInTheDocument()

    expect(screen.getByText('Use TopScheduler Scheduling')).toBeInTheDocument()

    expect(
      screen.getByText(
        'This job is not claimed by you. The job claimer will receive interview feedback.'
      )
    ).toBeInTheDocument()
  })

  it('shows TopScheduler description', () => {
    arrangeTest()

    expect(
      screen.getByText(
        'Please set the date, time, and time zone to schedule this interview via Top Scheduler. The candidate will be notified and the interview will be instantly confirmed. If the candidate cannot make the proposed time, then you will able to reschedule.'
      )
    ).toBeInTheDocument()

    expect(screen.getByText('Use Classic Scheduling')).toBeInTheDocument()

    expect(
      screen.getByText(
        'This job is not claimed by you. The job claimer will receive interview feedback.'
      )
    ).toBeInTheDocument()
  })
})
