import { encodeEntityId } from '@staff-portal/data-layer-service'
import { JobWorkType } from '@staff-portal/graphql/staff'

export const getJobCreateOpportunityResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Opportunity'),
      __typename: 'Opportunity',
      jobType: JobWorkType.REMOTE,
      estimatedStartWorkDate: '2022-06-01',
      estimatedEndWorkDate: '2022-30-10',
      companyRepresentatives: {
        nodes: []
      },
      webResource: {
        text: 'Company representative',
        url: 'url.to',
        __typename: 'Link'
      }
    }
  }
})
