import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { FeedbackWithAnswersFragment } from '../../data'
import { createFeedbackWithAnswersMock } from '../../data/feedback-with-answers-fragment/mock'
import Feedback from './Feedback'
import FeedbackAnswers from '../FeedbackAnswers'
import FeedbackDetails from '../FeedbackDetails'

jest.mock('../FeedbackDetails', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../FeedbackAnswers', () => ({
  __esModule: true,
  default: jest.fn()
}))

const FeedbackDetailsMock = FeedbackDetails as jest.Mock
const FeedbackAnswersMock = FeedbackAnswers as jest.Mock

const arrangeTest = (feedback: FeedbackWithAnswersFragment) =>
  render(
    <TestWrapper>
      <Feedback feedback={feedback} onMarkOutdated={() => {}} />
    </TestWrapper>
  )

describe('Feedback', () => {
  beforeEach(() => {
    FeedbackDetailsMock.mockImplementation(() => (
      <div data-testid='feedback-details' />
    ))
    FeedbackAnswersMock.mockImplementation(() => (
      <div data-testid='feedback-answers' />
    ))
  })

  describe('when feedback has answers', () => {
    it('shows the feedback answers', () => {
      const feedback = createFeedbackWithAnswersMock({
        clientAnswers: {
          nodes: []
        }
      })

      arrangeTest(feedback)

      expect(screen.getByTestId('feedback-answers')).toBeInTheDocument()
    })

    it('passes correct props to the `FeedbackAnswers` component', () => {
      const clientAnswers: FeedbackWithAnswersFragment['clientAnswers'] = {
        nodes: []
      }
      const matcherAnswers: FeedbackWithAnswersFragment['matcherAnswers'] = {
        nodes: []
      }
      const talentAnswers: FeedbackWithAnswersFragment['talentAnswers'] = {
        nodes: []
      }

      const feedback = createFeedbackWithAnswersMock({
        clientAnswers,
        matcherAnswers,
        talentAnswers
      })

      arrangeTest(feedback)

      expect(FeedbackAnswersMock).toHaveBeenCalledWith(
        expect.objectContaining({
          clientAnswers: clientAnswers.nodes,
          matcherAnswers: matcherAnswers.nodes,
          talentAnswers: talentAnswers.nodes
        }),
        expect.anything()
      )
    })
  })

  describe('when feedback has `additionalQuestions` flag set to false', () => {
    it('hides the feedback answers', () => {
      const feedback = createFeedbackWithAnswersMock({
        additionalQuestions: false
      })

      arrangeTest(feedback)

      expect(screen.queryByTestId('feedback-answers')).not.toBeInTheDocument()
    })
  })

  describe('when feedback does not have answers', () => {
    it('hides the feedback answers', () => {
      const feedback = createFeedbackWithAnswersMock({
        additionalQuestions: true,
        clientAnswers: undefined,
        matcherAnswers: undefined,
        talentAnswers: undefined
      })

      arrangeTest(feedback)

      expect(screen.queryByTestId('feedback-answers')).not.toBeInTheDocument()
    })
  })
})
