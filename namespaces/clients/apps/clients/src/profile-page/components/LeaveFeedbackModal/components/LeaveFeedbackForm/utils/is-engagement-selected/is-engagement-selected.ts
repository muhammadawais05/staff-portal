import { ClientSurveyAnswerInput } from '@staff-portal/graphql/staff'

import { NEGATIVE_VALUE } from '../../LeaveFeedbackForm'

export const isEngagementSelected = (answers: ClientSurveyAnswerInput) =>
  answers.scores.map((score, index) => {
    if (score == NEGATIVE_VALUE) {
      if (!answers.negative?.find(negative => negative.index === index)) {
        return 'Please select an engagement.'
      }
    }
  })
