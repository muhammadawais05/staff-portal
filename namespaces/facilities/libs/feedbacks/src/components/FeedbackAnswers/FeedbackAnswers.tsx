import React from 'react'
import { FeedbackStatus, Operation } from '@staff-portal/graphql/staff'
import { isOperationHidden } from '@staff-portal/operations'

import { FeedbackAnswerFragment } from '../../data'
import CreateFeedbackClientAnswersButton from '../CreateFeedbackClientAnswersButton'
import CreateFeedbackMatcherAnswersButton from '../CreateFeedbackMatcherAnswersButton'
import FeedbackAnswersSection from '../FeedbackAnswersSection'

export interface Props {
  feedbackId: string
  feedbackStatus: FeedbackStatus
  clientAnswers: FeedbackAnswerFragment[]
  matcherAnswers: FeedbackAnswerFragment[]
  talentAnswers: FeedbackAnswerFragment[]
  createFeedbackClientAnswersOperation: Operation
  createFeedbackMatcherAnswersOperation: Operation
  labelColumnWidth?: number
}

const FeedbackAnswers = ({
  feedbackId,
  feedbackStatus,
  clientAnswers,
  matcherAnswers,
  talentAnswers,
  createFeedbackClientAnswersOperation,
  createFeedbackMatcherAnswersOperation,
  labelColumnWidth
}: Props) => {
  const isLeaveFeedbackButtonVisible = (answers: FeedbackAnswerFragment[]) =>
    feedbackStatus === FeedbackStatus.ACTIVE && !answers.length

  return (
    <>
      {!(
        !clientAnswers.length &&
        isOperationHidden(createFeedbackClientAnswersOperation)
      ) && (
        <FeedbackAnswersSection
          title='Client Feedback'
          data-testid='feedback-answers-client'
          answers={clientAnswers}
          labelColumnWidth={labelColumnWidth}
          actionButton={
            isLeaveFeedbackButtonVisible(clientAnswers) && (
              <CreateFeedbackClientAnswersButton
                feedbackId={feedbackId}
                initialOperation={createFeedbackClientAnswersOperation}
              />
            )
          }
        />
      )}

      {!(
        !matcherAnswers.length &&
        isOperationHidden(createFeedbackMatcherAnswersOperation)
      ) && (
        <FeedbackAnswersSection
          title='Matcher Feedback'
          data-testid='feedback-answers-matcher'
          answers={matcherAnswers}
          labelColumnWidth={labelColumnWidth}
          actionButton={
            isLeaveFeedbackButtonVisible(matcherAnswers) && (
              <CreateFeedbackMatcherAnswersButton
                feedbackId={feedbackId}
                initialOperation={createFeedbackMatcherAnswersOperation}
              />
            )
          }
        />
      )}

      {Boolean(talentAnswers.length) && (
        <FeedbackAnswersSection
          title='Talent Feedback'
          data-testid='feedback-answers-talent'
          answers={talentAnswers}
          labelColumnWidth={labelColumnWidth}
        />
      )}
    </>
  )
}

export default FeedbackAnswers
