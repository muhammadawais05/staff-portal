import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, Engagement, Job } from '@staff-portal/graphql/staff'

import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import {
  getSendTopModalDataResponse,
  getTopOperationsResponse
} from '~integration/mocks/responses'
import { enabledOperationMock } from '../../enabled-operation-mock'

const updateSendTopMocks = (engagement?: Partial<Engagement>) =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      client: {
        contracts: {
          totalCount: 1,
          nodes: []
        },
        ...engagement?.client
      } as Client,
      job: {
        talentCount: 2,
        ...engagement?.job
      } as Job,
      operations: getEngagementOperations({
        sendTop: enabledOperationMock(),
        importTop: enabledOperationMock(),
        importContractAsTop: enabledOperationMock()
      })
    }),
    GetLazyOperation: getTopOperationsResponse(),
    GetSendTopModalData: getSendTopModalDataResponse(),
    GetImportTopData: {
      data: {
        node: {
          id: encodeEntityId('123', 'Engagement'),
          nextTopNumber: 11,
          __typename: 'Engagement'
        }
      }
    },
    SendTop: {
      data: {
        sendTop: {
          engagement: {
            id: encodeEntityId('123', 'Engagement'),
            job: {
              id: encodeEntityId('123', 'Job'),
              __typename: 'Job'
            },
            __typename: 'Engagement'
          },
          errors: [],
          success: true
        }
      }
    },
    ImportTop: {
      data: {
        importTop: {
          engagement: {
            id: encodeEntityId('123', 'Engagement'),
            job: {
              id: encodeEntityId('123', 'Job'),
              __typename: 'Job'
            },
            __typename: 'Engagement'
          },
          errors: [],
          success: true
        }
      }
    },
    ImportContractAsTop: {
      data: {
        importContractAsTop: {
          engagement: {
            id: encodeEntityId('123', 'Engagement'),
            job: {
              id: encodeEntityId('123', 'Job'),
              __typename: 'Job'
            },
            __typename: 'Engagement'
          },
          errors: [],
          success: true
        }
      }
    }
  })

export default updateSendTopMocks
