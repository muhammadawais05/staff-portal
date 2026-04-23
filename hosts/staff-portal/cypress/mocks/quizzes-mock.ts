import {
  OperationCallableTypes,
  TalentQuizQuestionKind
} from '@staff-portal/graphql/staff'
import { TalentQuizQuestionFragment } from '@staff-portal/quizzes-app'

const quizzes: TalentQuizQuestionFragment[] = [
  {
    id: '1',
    body: 'Should I ever speak about rates with my Toptal client?',
    feedback:
      'There is never a need to speak about rates with a Toptal client. If your client asks about your rates, tell them to contact {% if recruiter != blank %} {{recruiter}}. {% else %} your recruiter. {% endif %}\n',
    kind: TalentQuizQuestionKind.ENGAGEMENT,
    talentType: 'Developer',
    visibleIf: null,
    wrongAnswer: 'Yes',
    correctAnswer: 'No',
    operations: {
      destroyTalentQuizQuestion: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateTalentQuizQuestion: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }
  },
  {
    id: '2',
    body: 'Who should I contact if I get stuck on a problem or have an issue with my engagement, an interview, or anything related to my client?',
    feedback:
      'If you have any problems, first contact the recruiter assigned to the engagement{% if recruiter != blank %} ({{recruiter}}){% endif %}! He or she will help you. Never send unprofessional communications to the client.\r\n',
    kind: TalentQuizQuestionKind.ENGAGEMENT,
    talentType: 'Developer',
    visibleIf: null,
    wrongAnswer: 'toptal.com/contact',
    correctAnswer:
      'Your recruiter {% if recruiter != blank %} ({{recruiter}}){% endif %}',
    operations: {
      destroyTalentQuizQuestion: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateTalentQuizQuestion: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }
  }
]

export default quizzes
