import { QuizItem } from '@staff-portal/graphql/staff'
import { mapToTypename } from '@staff-portal/test-utils'

import { GET_TALENT_QA } from './get-talent-qa.staff.gql'

export const createGetTalentQAMock = ({
  talentId,
  quizItems = [
    {
      questionLabel: 'Question without answer',
      readableValue: ['']
    },
    {
      questionLabel: 'Question with 1 answer',
      readableValue: ['Single answer']
    },
    {
      questionLabel: 'Question with multiple answers',
      readableValue: ['Answer 1', 'Answer 1', 'Answer 3']
    }
  ]
}: {
  talentId: string
  quizItems?: QuizItem[]
}) => ({
  request: { query: GET_TALENT_QA, variables: { talentId } },
  result: {
    data: {
      node: {
        id: talentId,
        quizItems: {
          nodes: mapToTypename(quizItems, 'QuizItem'),
          __typename: 'QuizItemConnection'
        },
        __typename: 'Talent'
      },
      __typename: 'Query'
    }
  }
})

export const createGetTalentQAFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: { query: GET_TALENT_QA, variables: { talentId } },
  error: new Error('Network error occurred')
})
