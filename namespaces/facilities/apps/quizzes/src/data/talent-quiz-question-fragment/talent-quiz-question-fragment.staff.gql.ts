import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const TALENT_QUIZ_QUESTION_FRAGMENT = gql`
  fragment TalentQuizQuestionFragment on TalentQuizQuestion {
    id
    body
    feedback
    kind
    talentType
    visibleIf
    correctAnswer
    wrongAnswer
    operations {
      destroyTalentQuizQuestion {
        ...OperationFragment
      }
      updateTalentQuizQuestion {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
