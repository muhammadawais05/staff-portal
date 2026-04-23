import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { FeedbackReasonFragment } from '@staff-portal/feedbacks'

import EngagementTalentSwap from './EngagementTalentSwap'

const REASONS: FeedbackReasonFragment[] = [
  { id: '1', identifier: 'test-1', name: 'Reason 1' },
  { id: '2', identifier: 'hiring_replacement', name: 'Reason 2' },
  { id: '3', identifier: 'test-2', name: 'Reason 3' }
]

const arrangeTest = (reasonId = '1') =>
  render(
    <TestWrapper>
      <Form initialValues={{ reasonId }} onSubmit={() => {}}>
        <EngagementTalentSwap reasons={REASONS} />
      </Form>
    </TestWrapper>
  )

describe('EngagementTalentSwap', () => {
  it('hides the talent swap section', () => {
    arrangeTest()

    expect(
      screen.queryByText('Replacement with another Toptal talent?')
    ).not.toBeInTheDocument()
  })

  it('shows the talent swap section', () => {
    arrangeTest('2')

    expect(
      screen.getByText('Replacement with another Toptal talent?')
    ).toBeInTheDocument()
  })
})
