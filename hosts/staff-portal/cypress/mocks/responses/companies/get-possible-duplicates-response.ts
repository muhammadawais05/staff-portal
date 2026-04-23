import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getPossibleDuplicatesResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      ...client,
      id: encodeEntityId('123', 'Client'),
      __typename: 'Client',
      unresolvedPossibleDuplicates: {
        edges: [
          {
            node: {
              investigations: {
                nodes: [],
                __typename: 'ClientInvestigationConnection'
              },
              __typename: 'Client',
              id: 'VjEtQ2xpZW50LTExMDA2',
              cumulativeStatus: 'REJECTED',
              webResource: {
                text: 'Jewess, Schiller and King',
                url: 'https://staging.toptal.net/platform/staff/companies/111103',
                __typename: 'Link'
              }
            },
            explanation: 'same email domain',
            __typename: 'ClientUnresolvedPossibleDuplicateEdge'
          }
        ]
      }
    }
  }
})
