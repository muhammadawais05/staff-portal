import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  BusinessTypes,
  Client,
  ClientClaimerCategory,
  ClientCumulativeStatus,
  ClientPartnerCategory
} from '@staff-portal/graphql/staff'

import {
  getClientOperations,
  webResourceMock
} from '~integration/mocks/fragments'

export const getInternalTeamDataResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      businessType: BusinessTypes.ENTERPRISE_BUSINESS,
      cumulativeStatus: ClientCumulativeStatus.PENDING_TOS,
      enterpriseSalesExecutive: {
        id: encodeEntityId('14', 'Staff'),
        fullName: 'Amos Burton',
        ...webResourceMock()
      },
      accountOwner: {
        id: encodeEntityId('15', 'Staff'),
        fullName: 'James Holden',
        ...webResourceMock()
      },
      claimerCategory: ClientClaimerCategory.CORE,
      clientPartnerCategory: ClientPartnerCategory.CORE,
      relationshipManager: null,
      projectRelationshipManager: null,
      projectDeliveryManager: null,
      salesAnalyst: null,
      operations: getClientOperations(),
      matchingOperationsCoordinator: {
        id: encodeEntityId('2', 'Staff'),
        fullName: 'Andrea Matus',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/staff/1391315',
          text: 'Andrea Matus',
          __typename: 'Link'
        },
        __typename: 'Staff'
      },
      accountManager: null,
      projectSalesSpecialist: null,
      claimer: {
        id: encodeEntityId('9', 'Staff'),
        fullName: 'Drew Ritter',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/staff/1149929',
          text: 'Drew Ritter',
          __typename: 'Link'
        },
        __typename: 'Staff'
      },
      salesDevelopmentRepresentative: {
        id: encodeEntityId('8', 'Staff'),
        fullName: 'John Wood',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/staff/2746308',
          text: 'John Wood',
          __typename: 'Link'
        },
        __typename: 'Staff'
      },
      matchers: {
        edges: [
          {
            node: {
              id: encodeEntityId('1', 'ClientMatcher'),
              role: {
                id: encodeEntityId('1', 'Staff'),
                fullName: 'Gustavo Katcheroff',
                webResource: {
                  url: 'https://staging.toptal.net/platform/staff/staff/1461035',
                  text: 'Gustavo Katcheroff',
                  __typename: 'Link'
                },
                __typename: 'Staff'
              },
              vertical: {
                id: encodeEntityId('1', 'Vertical'),
                talentType: 'developer',
                __typename: 'Vertical'
              },
              __typename: 'ClientMatcher'
            },
            handoff: null,
            __typename: 'ClientMatcherEdge'
          }
        ],
        __typename: 'ClientMatcherConnection'
      },
      clientPartner: {
        id: encodeEntityId('7', 'Staff'),
        fullName: 'Calvin Gerlach',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/staff/1944952',
          text: 'Calvin Gerlach',
          __typename: 'Link'
        },
        __typename: 'Staff'
      },
      financeTeamMember: {
        id: 'VjEtU3RhZmYtMTIyNzE4Mg',
        fullName: 'Meagon Ortiz',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/staff/1227182',
          text: 'Meagon Ortiz',
          __typename: 'Link'
        },
        __typename: 'Staff'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
