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

  beforeEach(() => {
    cy.updateStaffMocks(staffMocks)
  })

  it('displays workflows menu item', () => {
    page.visit()

    page.moreDropdown.click().contains('Workflows').should('exist')
  })

  describe('when casesUrl is null', () => {
    it('does not display workflows menu item', () => {
      cy.updateStaffMocks({
        Query: {
          node: () => ({
            ...opportunityMock({
              casesUrl: null
            })
          })
        }
      })

      page.visit()

      page.moreDropdown.click().contains('Workflows').should('not.exist')
    })
  })
})
