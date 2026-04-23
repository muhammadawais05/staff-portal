import { ClientWillHireAgainFragment } from './client-will-hire-again-fragment.staff.gql.types'

export const createClientWillHireAgainFragmentMock = ({
  answers,
  totalCount
}: {
  answers?: { label: string; score: number }[]
  totalCount?: number
} = {}): ClientWillHireAgainFragment['feedbackStatistics'] => ({
  nodes:
    answers && totalCount
      ? [
          {
            answers: {
              nodes: answers,
              totalCount
            }
          }
        ]
      : []
})
