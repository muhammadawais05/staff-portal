import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getCompanyTabsInfoResponse = (client?: Partial<Client>) => ({
  data: {
    viewer: {
      permits: {
        canViewJob: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    },
    node: {
      id: encodeEntityId('123', 'Client'),
      fullName: 'DuBuque, Cruickshank and Volkman',
      topscreenClient: null,
      jobs: {
        totalCount: 2,
        __typename: 'ClientJobConnection'
      },
      representatives: {
        totalCount: 1,
        __typename: 'ClientRepresentativesConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
