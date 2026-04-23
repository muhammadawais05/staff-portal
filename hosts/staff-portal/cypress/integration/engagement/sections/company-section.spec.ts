import { Client } from '@staff-portal/graphql/staff'

import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { Engagement } from '~integration/modules/pages/engagements'

describe('Engagement Page -> Company Section', () => {
  const page = new Engagement()

  const { companySection } = page

  describe('when clicking on the phone number link', () => {
    it('starts call', () => {
      cy.stubGraphQLRequests({
        ...engagementPageStubs({
          client: { billingPhone: '+14699899514' } as Client
        })
      })

      page.visit()

      companySection.phoneNumber().click()

      cy.url().should('be.equal', Cypress.config().baseUrl + '/engagements/911')
    })
  })
})
