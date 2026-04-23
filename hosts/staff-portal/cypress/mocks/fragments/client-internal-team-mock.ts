import {
  ClientClaimerCategory,
  ClientCumulativeStatus,
  ClientPartnerCategory
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const internalTeamMock = (node = {}) => ({
  cumulativeStatus: ClientCumulativeStatus.SOURCED,
  claimerCategory: ClientClaimerCategory.CORE,
  clientPartnerCategory: ClientPartnerCategory.CORE,
  accountManager: {
    id: encodeEntityId('123', 'Staff'),
    fullName: 'Rosa Diaz',
    webResource: {
      text: 'Rosa Diaz',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    }
  },
  claimer: {
    id: encodeEntityId('9', 'Staff'),
    fullName: 'Trudy Judy',
    webResource: {
      text: 'Trudy Judy',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    }
  },
  matchers: {
    edges: [
      {
        node: {
          id: encodeEntityId('1', 'ClientMatcher'),
          role: {
            id: encodeEntityId('1', 'Staff'),
            fullName: 'Jason Stentley',
            webResource: {
              text: 'Jason Stentley',
              url: 'https://cool.page'
            }
          },
          vertical: {
            id: encodeEntityId('1', 'Vertical'),
            talentType: 'developer'
          }
        },
        handoff: null
      }
    ]
  },
  clientPartner: {
    id: encodeEntityId('7', 'Staff'),
    fullName: 'Gina Linetti',
    webResource: {
      text: 'Gina Linetti',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    }
  },
  ...node
})
