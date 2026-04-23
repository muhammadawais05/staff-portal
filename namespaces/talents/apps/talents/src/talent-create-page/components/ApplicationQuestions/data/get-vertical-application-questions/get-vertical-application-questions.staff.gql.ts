import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetVerticalApplicationQuestionsDocument } from './get-vertical-application-questions.staff.gql.types'

export default gql`
  query GetVerticalApplicationQuestions($verticalId: ID!) {
    node(id: $verticalId) {
      ... on Vertical {
        id
        talentDefaultApplicationAnswers {
          nodes {
            ...ApplicationQuestionFragment
          }
        }
      }
    }
  }

  fragment ApplicationQuestionFragment on ApplicationAnswer {
    id
    question {
      id
      kind
      label
      options {
        totalCount
        nodes {
          id
          content
        }
      }
      requiredForStaff
    }
  }
`

export const useGetVerticalApplicationQuestions = (verticalId: string) => {
  const { data, ...restOptions } = useGetNode(
    GetVerticalApplicationQuestionsDocument
  )(
    { verticalId },
    {
      throwOnError: true
    }
  )

  return {
    applicationQuestions: data?.talentDefaultApplicationAnswers?.nodes,
    ...restOptions
  }
}
