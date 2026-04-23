import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { createScheduleEngagementFragmentMock } from '../../data/fragments/schedule-engagement-fragment/mock'
import ScheduleInterviewGoogleForm from './ScheduleInterviewGoogleForm'

const arrangeTest = ({
  isClassic = false,
  sendGoogleCalendarInvitation = true
}: Partial<{
  isClassic?: boolean
  sendGoogleCalendarInvitation: boolean
}> = {}) =>
  render(
    <TestWrapper>
      <Form
        initialValues={{ sendGoogleCalendarInvitation }}
        onSubmit={() => {}}
      >
        <ScheduleInterviewGoogleForm
          isClassic={isClassic}
          scheduleEngagement={createScheduleEngagementFragmentMock()}
        />
      </Form>
    </TestWrapper>
  )

describe('ScheduleInterviewGoogleForm', () => {
  it('hides Google calendar invitation field', async () => {
    arrangeTest({ sendGoogleCalendarInvitation: false })

    expect(screen.queryByLabelText(/Event Title/)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Event Description/)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Event Receivers/)).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText(/Additional Event Receivers/)
    ).not.toBeInTheDocument()
  })

  it('shows the Google calendar invitation fields', () => {
    arrangeTest()

    expect(screen.getByLabelText(/Event Title/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Event Description/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Event Receivers/)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/Additional Event Receivers/)
    ).toBeInTheDocument()
  })

  it('shows the checkbox hint', async () => {
    arrangeTest()

    expect(
      await screen.findByText(
        'The talent will get the event in his calendar via TopScheduler'
      )
    ).toBeInTheDocument()
  })

  it('hides the checkbox hint', async () => {
    arrangeTest({ isClassic: true })

    expect(
      screen.queryByText(
        'The talent will get the event in his calendar via TopScheduler'
      )
    ).not.toBeInTheDocument()
  })

  it('hides the classic scheduling data', () => {
    arrangeTest()

    expect(
      screen.queryByText('Talent (Talent Full Name <talent-Toptal-Email>)')
    ).not.toBeInTheDocument()
  })

  it('shows the classic scheduling data', async () => {
    arrangeTest({ isClassic: true })

    expect(
      await screen.findByText('Talent (Talent Full Name <talent-Toptal-Email>)')
    ).toBeInTheDocument()
  })
})
