import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job } from '@staff-portal/graphql/staff'

export const getCancelledJobApplicantsResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      ...job,
      id: encodeEntityId('123', 'Job'),
      applications: {
        nodes: [],
        __typename: 'JobApplicationConnection'
      },
      __typename: 'Job'
    }
  }
})
