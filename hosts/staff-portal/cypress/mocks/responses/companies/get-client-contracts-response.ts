import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '~integration/mocks'
import { getClientOperations } from '~integration/mocks/fragments'

export const getClientContractsResponse = (client?: Partial<Client>) => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Client'),
      contact: {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE1NDQ4NDQ',
        fullName: "Ruben D'Amore",
        email: 'dhar-ed0c9b2ff6f3b805@toptal.io',
        __typename: 'CompanyRepresentative'
      },
      contracts: {
        nodes: [
          {
            id: 'VjEtQ29udHJhY3QtMTgzNDg4',
            guid: 'F7LPBDI4UJN6UCLKSHDI3F',
            resentAt: null,
            resentCount: 0,
            receiver: {
              id: 'VjEtQ2xpZW50LTMzNzkzOQ',
              fullName: 'DuBuque, Cruickshank and Volkman',
              __typename: 'Client'
            },
            sender: {
              id: 'VjEtU3RhZmYtMTI4OTE3',
              fullName: 'Nova Champlin',
              __typename: 'Staff'
            },
            subject: {
              __typename: 'Client'
            },
            kind: 'STA',
            sentAt: '2019-07-12T12:42:55-03:00',
            signatureReceivedAt: '2019-07-12T12:43:13-03:00',
            status: 'SIGNED',
            webResource: {
              text: 'American Family Insurance - ENTERPRISE STA',
              url: 'https://staging.toptal.net/platform/staff/contracts/183488',
              __typename: 'Link'
            },
            __typename: 'Contract',
            operations: {
              destroyContract: hiddenOperationMock(),
              resendContract: hiddenOperationMock(),
              verifyContract: hiddenOperationMock(),
              __typename: 'ContractOperations'
            }
          }
        ],
        __typename: 'ContractConnection'
      },
      children: {
        totalCount: 1,
        __typename: 'ClientChildrenConnection'
      },
      operations: getClientOperations(),
      ...client,
      __typename: 'Client'
    }
  }
})
