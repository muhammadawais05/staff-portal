import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job } from '@staff-portal/graphql/staff'

export const getJobContractsResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/jobs/123',
        text: 'Job Title',
        __typename: 'Link'
      },
      contracts: {
        nodes: [],
        __typename: 'ContractConnection'
      },
      ...job,
      __typename: 'Job'
    }
  }
})
