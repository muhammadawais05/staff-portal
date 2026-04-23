import {
  BusinessTypes,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { OpportunityFragment } from '@staff-portal/opportunities'

import {
  OpportunitiesFragment,
  GetOpportunitiesQuery
} from './get-company-opportunities-data.staff.gql.types'

export const createGetCompanyOpportunitiesQueryMock = (
  partialClient: Partial<GetOpportunitiesQuery['staffNode']> = {},
  partialOpportunities: Partial<OpportunitiesFragment>[] = [{}]
): GetOpportunitiesQuery => {
  const defaultClient = {
    id: '123',
    businessTypeV2: BusinessTypes.ENTERPRISE_BUSINESS,
    children: { totalCount: 0 },
    createOpportunityUrl: {
      enabled: true,
      url: 'https://staging.toptal.net/platform/staff/clients/520176/opportunities/create',
      messages: []
    },
    opportunities: {
      nodes: partialOpportunities.map(partialOpportunity =>
        createOpportunityMock(partialOpportunity)
      ),
      __typename: 'OpportunityConnection'
    },
    __typename: 'Client'
  }

  return {
    staffNode: {
      ...defaultClient,
      ...partialClient
    }
  }
}

const createOpportunityMock = (
  partialOpportunity: Partial<OpportunitiesFragment>
): OpportunityFragment => ({
  id: '123',
  type: 'SMBOpportunity',
  jobs: {
    nodes: [
      {
        id: '123'
      }
    ]
  },
  tasks: {
    nodes: [
      {
        id: '123',
        status: 'pending'
      }
    ]
  },
  weightedValue: '12345',
  updatedAt: '2021-01-09T18:30:03+03:00',
  name: 'Test opp',
  webResource: {
    text: 'Test opp',
    url: 'http://toptal.com'
  },
  operations: {
    deleteOpportunity: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  ...partialOpportunity
})
