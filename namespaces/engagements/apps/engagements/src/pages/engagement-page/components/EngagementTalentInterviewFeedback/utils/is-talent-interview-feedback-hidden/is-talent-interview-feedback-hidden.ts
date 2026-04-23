import { isNotNullish } from '@staff-portal/utils'

import { SurveyAnswerFragment } from '../../data/get-talent-interview-feedback'

export const isTalentInterviewFeedbackHidden = (
  surveyAnswer: SurveyAnswerFragment
) => !isNotNullish(surveyAnswer.comment) && !isNotNullish(surveyAnswer.rating)
