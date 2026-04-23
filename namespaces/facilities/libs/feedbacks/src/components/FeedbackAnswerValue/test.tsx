import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { assertOnTooltipText, TestWrapper } from '@staff-portal/test-utils'

import { FeedbackAnswerFragment } from '../../data'
import { createFeedbackAnswerMock } from '../../data/feedback-answer-fragment/mock'
import { useUpdateFeedbackAnswer } from './data'
import FeedbackAnswerValue from './FeedbackAnswerValue'

jest.unmock('@staff-portal/editable')

jest.mock('./data', () => ({
  __esModule: true,
  useUpdateFeedbackAnswer: jest.fn(),
  getLazyFeedbackAnswerValueHook: () => () => ({
    request: () => ({}),
    data: undefined,
    loading: false
  }),
  getFeedbackQuestionOptionsHook: () => () => ({
    request: () => {},
    data: [
      { value: '1', text: 'Option 1' },
      { value: '2', text: 'Option 2' }
    ],
    loading: false,
    called: false
  })
}))

const mockReturnValues = () => {
  const mockUseUpdateFeedbackAnswer = useUpdateFeedbackAnswer as jest.Mock

  mockUseUpdateFeedbackAnswer.mockReturnValue([
    () => ({
      data: {
        updateFeedbackAnswer: {
          success: true,
          errors: []
        }
      }
    }),
    { loading: false }
  ])
}

const arrangeTest = (answer: Partial<FeedbackAnswerFragment> = {}) => {
  const answerMock = createFeedbackAnswerMock(answer)

  return render(
    <TestWrapper>
      <FeedbackAnswerValue answer={answerMock} />
    </TestWrapper>
  )
}

describe('FeedbackAnswerValue', () => {
  describe('when tooltip is provided', () => {
    it('shows icon with tooltip', async () => {
      const OPTION_TEXT = 'Option 1'

      mockReturnValues()
      arrangeTest({
        option: { id: '1', value: OPTION_TEXT, question: { id: '1' } },
        tooltip: 'Mock tooltip'
      })
      const infoIcon = screen.getByTestId('feedback-answer-tooltip')

      expect(infoIcon).toBeInTheDocument()
      assertOnTooltipText(infoIcon, 'Mock tooltip')
    })
  })

  describe('when tooltip is not provided', () => {
    it('does not show icon', async () => {
      const OPTION_TEXT = 'Option 1'

      mockReturnValues()
      arrangeTest({
        option: { id: '1', value: OPTION_TEXT, question: { id: '1' } }
      })
      expect(
        screen.queryByTestId('feedback-answer-tooltip')
      ).not.toBeInTheDocument()
    })
  })

  it('change the feedback answer', async () => {
    const OPTION_TEXT = 'Option 1'

    mockReturnValues()

    arrangeTest({
      option: { id: '1', value: OPTION_TEXT, question: { id: '1' } }
    })

    expect(screen.getByText(OPTION_TEXT)).toBeInTheDocument()
    expect(
      screen.queryByTestId('EditableField-toggle-button-optionId')
    ).not.toHaveAttribute('disabled')

    fireEvent.click(screen.getByTestId('EditableField-toggle-button-optionId'))

    expect(
      screen.queryByTestId('EditableField-toggle-button-optionId')
    ).not.toBeInTheDocument()

    const input = document.querySelectorAll('input')[0]

    fireEvent.click(input)

    fireEvent.click(await screen.findByText('Option 2'))

    expect(
      await screen.findByTestId('EditableField-toggle-button-optionId')
    ).toBeInTheDocument()
  })
})
