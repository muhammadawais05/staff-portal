import { ClientSurveyAnswerInput } from '@staff-portal/graphql/staff'

import { isEngagementSelected } from '../is-engagement-selected'

export const validate = (
  answers: ClientSurveyAnswerInput,
  engagementsCount: number
) => {
  const errors = {
    negative: Array(answers.scores.length).fill(null)
  }

  if (engagementsCount > 1) {
    errors.negative = isEngagementSelected(answers)
  }

  return errors
}
