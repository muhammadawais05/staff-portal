import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientAvailabilityRequestsResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      jobs: {
        nodes: [
          {
            id: encodeEntityId('123', 'Job'),
            title: 'Lead Brand Experience Engager Developer (281903)',
            __typename: 'Job'
          }
        ],
        __typename: 'ClientJobConnection'
      },
      __typename: 'Client'
    }
  }
})
