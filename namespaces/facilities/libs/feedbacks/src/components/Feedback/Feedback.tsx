import React from 'react'
import { SectionProps } from '@toptal/picasso/Section'
import { SubSection } from '@staff-portal/ui'
import { TypographyOverflow } from '@toptal/picasso'

import {
  FeedbackDetailsFragment,
  FeedbackWithAnswersFragment
} from '../../data'
import FeedbackAnswers from '../FeedbackAnswers'
import FeedbackDetails from '../FeedbackDetails'

export interface Props {
  feedback: FeedbackDetailsFragment | FeedbackWithAnswersFragment
  labelColumnWidth?: number
  onMarkOutdated: () => void
  sectionVariant?: SectionProps['variant']
}

const isFeedbackWithAnswers = (
  feedback: FeedbackDetailsFragment | FeedbackWithAnswersFragment
): feedback is FeedbackWithAnswersFragment => {
  const feedbackWithAnswers = feedback as FeedbackWithAnswersFragment

  return (
    !!feedbackWithAnswers.clientAnswers ||
    !!feedbackWithAnswers.matcherAnswers ||
    !!feedbackWithAnswers.talentAnswers
  )
}

const Feedback = ({
  feedback,
  labelColumnWidth,
  onMarkOutdated,
  sectionVariant
}: Props) => {
  const {
    reason: { action }
  } = feedback

  const showAnswers =
    'additionalQuestions' in feedback && feedback.additionalQuestions

  return (
    <SubSection
      title={
        <TypographyOverflow weight='inherit' color='black'>
          {`${action?.name} Feedback`}
        </TypographyOverflow>
      }
      variant={sectionVariant}
      data-testid='Feedback-section'
    >
      <FeedbackDetails
        feedback={feedback}
        labelColumnWidth={labelColumnWidth}
        onMarkOutdated={onMarkOutdated}
      />

      {showAnswers && isFeedbackWithAnswers(feedback) && (
        <FeedbackAnswers
          feedbackId={feedback.id}
          feedbackStatus={feedback.status}
          clientAnswers={feedback.clientAnswers.nodes}
          matcherAnswers={feedback.matcherAnswers.nodes}
          talentAnswers={feedback.talentAnswers.nodes}
          labelColumnWidth={labelColumnWidth}
          createFeedbackClientAnswersOperation={
            feedback.operations.createFeedbackClientAnswers
          }
          createFeedbackMatcherAnswersOperation={
            feedback.operations.createFeedbackMatcherAnswers
          }
        />
      )}
    </SubSection>
  )
}

export default Feedback
