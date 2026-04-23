import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { FeedbackAnswerFragment } from '../../data'
import { createFeedbackAnswerMock } from '../../data/feedback-answer-fragment/mock'
import FeedbackAnswerLabel from './FeedbackAnswerLabel'

const TOOLTIP_CONTENT = 'Tooltip Content'
const FEEDBACK_QUESTION = 'Feedback Question'

const arrangeTest = (answer: Partial<FeedbackAnswerFragment> = {}) => {
  const answerMock = createFeedbackAnswerMock(answer)

  return render(
    <TestWrapper>
      <FeedbackAnswerLabel answer={answerMock} />
    </TestWrapper>
  )
}

describe('FeedbackAnswerLabel', () => {
  it('shows tooltip', async () => {
    arrangeTest({ tooltip: TOOLTIP_CONTENT })

    fireEvent.mouseOver(screen.getByText(FEEDBACK_QUESTION))

    expect(await screen.findByText(TOOLTIP_CONTENT)).toBeInTheDocument()
  })

  it('hides tooltip', () => {
    arrangeTest()

    fireEvent.mouseOver(screen.getByText(FEEDBACK_QUESTION))

    expect(screen.queryByText(TOOLTIP_CONTENT)).not.toBeInTheDocument()
  })
})
