import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { useMemo } from 'react'

import { GetMatchersQuestionModalDataDocument } from './get-matchers-question-modal-data.staff.gql.types'
import { convertToFormQuestions } from '../../utils'

export const GET_MATCHERS_QUESTION_MODAL_DATA = gql`
  query GetMatchersQuestionModalData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        requiredApplicationPitch
        positionQuestions {
          nodes {
            id
            template {
              id
              question
              sticky
            }
            label
            comment
            required
          }
        }
      }
    }
  }
`

export const useGetMatchersQuestionModalData = (jobId: string) => {
  const { data, ...restOptions } = useGetNode(
    GetMatchersQuestionModalDataDocument
  )({ jobId })

  return {
    ...restOptions,
    data: useMemo(
      () => ({
        requiredApplicationPitch: Boolean(data?.requiredApplicationPitch),
        jobPositionQuestions:
          convertToFormQuestions(data?.positionQuestions) ?? []
      }),
      [data]
    )
  }
}
