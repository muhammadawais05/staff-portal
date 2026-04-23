import { NOT_SELECTED_OPTION } from '@staff-portal/config'
import { TalentQuizQuestionKind } from '@staff-portal/graphql/staff'

export const TYPE_OF_QUIZZES_OPTIONS = [
  NOT_SELECTED_OPTION,
  {
    label: 'Activation',
    value: TalentQuizQuestionKind.ACTIVATION.toLocaleLowerCase()
  },
  {
    label: 'Engagement',
    value: TalentQuizQuestionKind.ENGAGEMENT.toLocaleLowerCase()
  }
]
