import { Resolvers } from '@staff-portal/graphql/staff'

import { OpportunityPage } from '~integration/modules/pages/opportunities'
import { opportunityMock } from '~integration/mocks'

const staffMocks: Resolvers = {
  Query: {
    node: opportunityMock
  }
}

describe('Opportunity Page', () => {
  const page = new OpportunityPage()

  it('history page available', () => {
    cy.updateStaffMocks(staffMocks)

    page.visit()

    page.history.openHistory()
    cy.contains('Recent Activity').should('exist')
  })
})
