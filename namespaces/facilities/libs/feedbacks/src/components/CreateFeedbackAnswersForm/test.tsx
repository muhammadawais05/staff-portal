import { Form } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { createFeedbackQuestionEdgeMock } from '../../data/feedback-question-edge-fragment/mock'
import CreateFeedbackAnswersForm from './CreateFeedbackAnswersForm'

const MATCH_AGAIN_IDENTIFIER = 'match_again'
const WHY_IDENTIFIER = 'why'
const QUESTION_ONE = 'Question One'
const QUESTION_TWO = 'Question Two'
const TOOLTIP_CONTENT = 'Tooltip Content'

const QUESTIONS = [
  createFeedbackQuestionEdgeMock({
    text: QUESTION_ONE,
    node: {
      id: '1',
      identifier: MATCH_AGAIN_IDENTIFIER,
      options: {
        nodes: [
          { id: '1', value: 'No' },
          { id: '2', value: 'Yes', tooltip: TOOLTIP_CONTENT }
        ]
      }
    }
  }),
  createFeedbackQuestionEdgeMock({
    text: QUESTION_TWO,
    node: {
      id: '2',
      identifier: WHY_IDENTIFIER,
      options: {
        nodes: [
          { id: '1', value: 'The pairing was the main problem' },
          { id: '2', value: 'Client was the main problem' }
        ]
      }
    }
  })
]

const arrangeTest = (interactive = false) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <CreateFeedbackAnswersForm
          interactive={interactive}
          questions={QUESTIONS}
        />
      </Form>
    </TestWrapper>
  )

describe('CreateFeedbackAnswersForm', () => {
  it('shows all questions when is not interactive', () => {
    arrangeTest()

    expect(screen.getByText(QUESTION_ONE)).toBeInTheDocument()
    expect(screen.getByText(QUESTION_TWO)).toBeInTheDocument()

    fireEvent.mouseEnter(screen.getByLabelText(/Yes/))

    expect(screen.getByText(TOOLTIP_CONTENT)).toBeInTheDocument()
  })

  it('shows question conditionally when interactive', async () => {
    arrangeTest(true)

    expect(screen.getByText(QUESTION_ONE)).toBeInTheDocument()
    expect(screen.queryByText(QUESTION_TWO)).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText(/No/))

    expect(screen.getByText(QUESTION_TWO)).toBeInTheDocument()
    expect(screen.getByText(QUESTION_TWO)).toBeInTheDocument()
    expect(
      screen.getByText('The pairing was the main problem')
    ).toBeInTheDocument()
  })
})
