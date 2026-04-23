import { gql, useGetData } from '@staff-portal/data-layer-service'
import { useMemo } from 'react'

import { GetActiveJobPositionQuestionTemplatesDocument } from './get-active-job-position-question-templates.staff.gql.types'

export default gql`
  query GetActiveJobPositionQuestionTemplates {
    activeJobPositionQuestionTemplates {
      nodes {
        id
        question
        sticky
      }
    }
  }
`

export const useActiveJobPositionQuestionTemplates = (
  skipStickyQuestions?: boolean
) => {
  const { data, ...restOptions } = useGetData(
    GetActiveJobPositionQuestionTemplatesDocument,
    'activeJobPositionQuestionTemplates'
  )(undefined, {
    fetchPolicy: 'cache-first'
  })

  return {
    ...restOptions,
    data: useMemo(() => {
      if (!skipStickyQuestions) {
        return data?.nodes
      }

      return data?.nodes.filter(({ sticky }) => !sticky)
    }, [skipStickyQuestions, data])
  }
}
