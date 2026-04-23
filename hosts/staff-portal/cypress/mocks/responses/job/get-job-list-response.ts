import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getJobListResponse = () => ({
  data: {
    jobs: {
      nodes: [
        {
          id: encodeEntityId('123', 'Job'),
          __typename: 'Job'
        },
        {
          id: encodeEntityId('123', 'Job'),
          __typename: 'Job'
        },
        {
          id: encodeEntityId('123', 'Job'),
          __typename: 'Job'
        },
        {
          id: encodeEntityId('123', 'Job'),
          __typename: 'Job'
        }
      ],
      totalCount: 4,
      __typename: 'JobConnection'
    }
  }
})
