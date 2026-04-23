import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentRelatedTasksResponse = (talent?: Partial<Talent>) => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Talent'),
      relatedTasks: {
        completedCount: 0,
        nodes: [],
        __typename: 'RelatedTasksConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
