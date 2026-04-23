import { OpportunityPage } from '~integration/modules/pages/opportunities'
import { opportunityPageStubs } from '~integration/mocks/request-stubs'

describe('Shows opportunity jobs section', () => {
  const page = new OpportunityPage()

  describe('when opportunity is a project opportunity', () => {
    beforeEach(() => {
      cy.stubGraphQLRequests({
        ...opportunityPageStubs({
          type: 'ProjectOpportunity'
        })
      })
    })

    it('shows opportunity jobs table with a stage field', () => {
      page.visit()

      cy.contains('Stage').should('exist')
    })
  })

  describe('when opportunity is a non project opportunity', () => {
    beforeEach(() => {
      cy.stubGraphQLRequests({
        ...opportunityPageStubs({
          type: 'Opportunity'
        })
      })
    })

    it('shows opportunity jobs table without a stage field', () => {
      page.visit()

      cy.contains('Stage').should('not.exist')
    })
  })
})
