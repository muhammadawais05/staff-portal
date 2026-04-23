import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientWillHireAgainResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      feedbackStatistics: {
        nodes: [],
        __typename: 'FeedbackStatisticEntryConnection'
      },
      __typename: 'Talent'
    }
  }
})
