import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job, JobStatus } from '@staff-portal/graphql/staff'

export const getJobPageTabsPermissionsResponse = (job?: Partial<Job>) => ({
  data: {
    viewer: {
      permits: {
        canViewBillingCycle: false,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    },
    node: {
      id: encodeEntityId('123', 'Job'),
      status: JobStatus.ACTIVE,
      sourcingRequest: null,
      ...job,
      __typename: 'Job'
    }
  }
})
