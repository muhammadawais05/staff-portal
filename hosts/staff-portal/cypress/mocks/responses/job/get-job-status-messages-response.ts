import { Job } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getJobStatusMessagesResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      statusMessages: {
        nodes: [],
        __typename: 'StatusMessageConnection'
      },
      ...job,
      __typename: 'Job'
    }
  }
})
