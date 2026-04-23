import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentFeedbackStatsResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      feedbackStatistics: {
        nodes: [],
        __typename: 'FeedbackStatisticEntryConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
