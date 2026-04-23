import { OpportunityPage } from '~integration/modules/pages/opportunities'
import { opportunityPageStubs } from '~integration/mocks/request-stubs'

describe('Show Salesforce Connection Pop-up', () => {
  const page = new OpportunityPage()
  const notificationText =
    'This opportunity was created in Salesforce. Certain fields cannot be edited in the platform and should be edited using Salesforce.'

  beforeEach(() => {
    cy.stubGraphQLRequests({
      ...opportunityPageStubs({
        salesforceId: null
      })
    })
  })

  it('does not show a Salesforce connection popup', () => {
    page.visit()

    cy.get('div[role="alert"]').should('not.exist')
  })

  describe('when opportunity originates from Salesforce', () => {
    it('shows a Salesforce connection popup', () => {
      cy.stubGraphQLRequests({
        ...opportunityPageStubs({
          salesforceId: 'salesforceId'
        })
      })

      page.visit()

      cy.get('div[role="alert"]').first().should('have.text', notificationText)
    })
  })
})
