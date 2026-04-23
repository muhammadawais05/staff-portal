import { Job } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getJobCommissionsResponse = (job?: Partial<Job>) => ({
  data: {
    viewer: {
      permits: {
        canViewJobCommissions: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    },
    node: {
      id: encodeEntityId('123', 'Job'),
      engagements: {
        nodes: [],
        __typename: 'JobEngagementConnection'
      },
      ...job,
      client: {
        id: encodeEntityId('123', 'Client'),
        commissions: null,
        referrer: null,
        ...job?.client,
        __typename: 'Client'
      },
      __typename: 'Job'
    }
  }
})
