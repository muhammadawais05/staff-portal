import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Flag } from '@staff-portal/graphql/staff'

import {
  clientFiltersStubs,
  tasksByClientPageStubs
} from '~integration/mocks/request-stubs'
import {
  getClientIndustriesResponse,
  getClientStaffOptionsResponse,
  getVerticalsWithMatchersResponse
} from '~integration/mocks/responses'
import { getFlagsResponse } from '~integration/mocks/responses/talents/talent-list'
import { OperationValue } from '~integration/types'

const updateTasksByClientPageStubs = ({
  filtersData
}: {
  filtersData?: Record<string, OperationValue>
} = {}) => {
  cy.stubGraphQLRequests({
    ...clientFiltersStubs(filtersData),
    ...tasksByClientPageStubs()
  })
}

export const matcherFiltersMocks = {
  GetVerticalsWithMatchers: getVerticalsWithMatchersResponse({
    id: encodeEntityId('002', 'Staff'),
    fullName: 'Staff Name'
  })
}

export const staffFiltersMocks = {
  GetClientStaffOptions: getClientStaffOptionsResponse({
    id: encodeEntityId('002', 'Staff'),
    fullName: 'Staff Name'
  })
}

export const industriesFiltersMocks = {
  GetClientIndustries: getClientIndustriesResponse(['Fashion'])
}

export const flagsFilterMocks = {
  GetFlags: getFlagsResponse([
    {
      id: encodeEntityId('0001', 'Flag'),
      title: 'Cool Flag',
      __typename: 'Flag'
    } as unknown as Flag
  ])
}

export default updateTasksByClientPageStubs
