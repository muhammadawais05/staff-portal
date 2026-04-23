import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientsWithNameResponse = () => ({
  data: {
    viewer: {
      permits: {
        canSeeCompanyTasks: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    },
    clients: {
      nodes: [
        {
          id: encodeEntityId('987', 'Client'),
          fullName: 'Client Name',
          __typename: 'Client'
        },
        {
          id: encodeEntityId('986', 'Client'),
          fullName: 'Hane, Gerlach and Heller',
          __typename: 'Client'
        }
      ],
      totalCount: 2,
      __typename: 'ClientConnection'
    }
  }
})
