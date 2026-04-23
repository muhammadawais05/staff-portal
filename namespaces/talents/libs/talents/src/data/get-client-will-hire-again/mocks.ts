import { mapToTypename } from '@staff-portal/test-utils'

import { GET_CLIENT_WILL_HIRE_AGAIN } from './get-client-will-hire-again.staff.gql'

export const createGetClientWillHireAgainMock = ({
  talentId,
  totalCount,
  answers
}: {
  talentId: string
  totalCount: number
  answers?: { label: string; score: number }[]
}) => ({
  request: {
    query: GET_CLIENT_WILL_HIRE_AGAIN,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        feedbackStatistics: {
          nodes: answers
            ? [
                {
                  answers: {
                    nodes: mapToTypename(
                      answers,
                      'FeedbackStatisticAnswerEntry'
                    ),
                    totalCount,
                    __typename: 'FeedbackStatisticAnswerEntryConnection'
                  },
                  __typename: 'FeedbackStatisticEntry'
                }
              ]
            : [],
          __typename: 'FeedbackStatisticEntryConnection'
        },
        __typename: 'Talent'
      }
    }
  }
})

export const createGetClientWillHireAgainFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: GET_CLIENT_WILL_HIRE_AGAIN,
    variables: { talentId }
  },
  error: new Error('Mocked Error')
})
