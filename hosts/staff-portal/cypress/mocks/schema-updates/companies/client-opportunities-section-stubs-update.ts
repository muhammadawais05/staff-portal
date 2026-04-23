import { Opportunity } from '@staff-portal/graphql/staff'

import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateClientCompanyOpportunitiesStubs = (
  opportunities: Opportunity[] = []
) => {
  const mockedClient = {
    opportunities: {
      nodes: opportunities,
      totalCount: 2,
      __typename: 'OpportunityConnection'
    }
  }

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(mockedClient)
  })
}

export default updateClientCompanyOpportunitiesStubs
