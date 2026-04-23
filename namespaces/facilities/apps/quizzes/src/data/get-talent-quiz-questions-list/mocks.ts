import { TalentQuizQuestionKind } from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { TalentQuizQuestionFragment } from '../../data/talent-quiz-question-fragment/talent-quiz-question-fragment.staff.gql.types'

export const crateTalentQuizQuestionMock = ({
  id,
  operations
}: {
  id?: string
  operations?: Partial<TalentQuizQuestionFragment['operations']>
} = {}): TalentQuizQuestionFragment => ({
  id: id || 'VjEtVGFsZW50UXVpelF1ZXN0aW9uLTMx',
  body: 'My client doesn’t have a proper source control setup. What should I do?',
  feedback:
    'Talk to the client and suggest getting something in place so they have more transparency on the project. If needed, set up a free Bitbucket repo, and give them ownership and access.\n',
  kind: TalentQuizQuestionKind.ENGAGEMENT,
  talentType: 'Developer',
  visibleIf: null,
  correctAnswer: 'Help the client',
  wrongAnswer: 'Ignore it',
  operations: {
    destroyTalentQuizQuestion: createOperationMock(),
    updateTalentQuizQuestion: createOperationMock(),
    ...operations
  }
})
