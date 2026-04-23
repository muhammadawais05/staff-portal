import { Job } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getCandidateIntroDraftsResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      candidateIntroDrafts: {
        nodes: [],
        edges: [],
        ...job?.engagements,
        __typename: 'JobEngagementConnection'
      },
      ...job,
      __typename: 'Job'
    }
  }
})
