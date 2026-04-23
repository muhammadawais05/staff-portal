import {
  Client,
  ClientStatus,
  PositionStatus,
  TopscreenClient,
  TopscreenStepType
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTopscreenPositionsResponse } from '~integration/mocks/responses'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'
import { getClientOperations } from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'

export const companiesTopscreenTabStubs = (partialClient?: Partial<Client>) => {
  const topscreenClient = {
    id: encodeEntityId('123', 'TopscreenClient'),
    name: 'top-screen-client-1',
    operations: {
      approveTopscreenFeature: enabledOperationMock(),
      cancelTopscreenFeature: enabledOperationMock(),
      createTopscreenPosition: enabledOperationMock()
    },
    status: ClientStatus.APPROVED,
    __typename: 'TopscreenClient',
    topscreenPositions: {
      totalCount: 1,
      nodes: [
        {
          id: 'position-123',
          title: 'Position Stub',
          description: 'JavaScript',
          contactEmail: 'yo.da@toptal.com',
          contactName: 'Jon Doe',
          jobUrl: 'http://testing.io',
          status: PositionStatus.PENDING,
          stepTypes: {
            totalCount: 4,
            nodes: [
              TopscreenStepType.ENGLISH,
              TopscreenStepType.ONLINE_TEST,
              TopscreenStepType.TECHNICAL_ONE,
              TopscreenStepType.TECHNICAL_TWO
            ]
          },
          topscreenApplications: {
            totalCount: 0,
            nodes: []
          },
          topscreenSubscribers: {
            totalCount: 0,
            nodes: []
          },
          operations: {
            activateTopscreenPosition: enabledOperationMock(),
            updateTopscreenPosition: enabledOperationMock()
          },
          __typename: 'TopscreenPosition'
        }
      ]
    }
  } as TopscreenClient

  const client = {
    topscreenClient,
    operations: getClientOperations({
      enableTopscreenFeature: enabledOperationMock()
    }),
    ...partialClient
  }

  return {
    ...companiesBasicTabStubs(client),
    GetTopscreenPositions: getTopscreenPositionsResponse(topscreenClient)
  }
}
