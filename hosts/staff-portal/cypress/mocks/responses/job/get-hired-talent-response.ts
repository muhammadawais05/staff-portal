import { Job } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getHiredTalentResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      engagements: {
        nodes: [],
        __typename: 'JobEngagementConnection'
      },
      ...job,
      __typename: 'Job'
    }
  }
})
