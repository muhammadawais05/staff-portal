import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, ClientCumulativeStatus } from '@staff-portal/graphql/staff'

import { getClientOperations } from '~integration/mocks/fragments'

export const getLinkedClientResponse = (client?: Partial<Client>) => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Client'),
      fullName: 'DuBuque, Cruickshank and Volkman',
      children: {
        nodes: [
          {
            id: 'VjEtQ2xpZW50LTUxMzI3MA',
            investigations: {
              nodes: [],
              __typename: 'ClientInvestigationConnection'
            },
            __typename: 'Client',
            webResource: {
              text: 'Roberts-Feeney KK',
              url: 'https://staging.toptal.net/platform/staff/companies/2434362',
              __typename: 'Link'
            },
            badLead: false,
            fullName: 'Roberts-Feeney KK',
            cumulativeStatus: ClientCumulativeStatus.PENDING_TOS,
            currentNegotiation: null,
            operations: getClientOperations()
          }
        ],
        __typename: 'ClientChildrenConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
