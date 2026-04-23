import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import FeedbackDetailsFollowupTask from './FeedbackDetailsFollowupTask'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <FeedbackDetailsFollowupTask
        task={{
          id: '1',
          createdAt: '2020-12-16T00:00:00+00:00',
          status: 'pending'
        }}
      />
    </TestWrapper>
  )

describe('FeedbackDetailsFollowupTask', () => {
  it('shows followup tasks', () => {
    arrangeTest()

    expect(
      screen.getByTestId('feedback-details-followup-task')
    ).toHaveTextContent('2020-12-16T00:00:00+00:00 — Pending')
  })
})
