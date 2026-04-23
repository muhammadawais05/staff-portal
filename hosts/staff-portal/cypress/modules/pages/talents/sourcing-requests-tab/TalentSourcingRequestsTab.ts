import { BasePage } from '~integration/modules/pages'
import { SourcingRequests } from './sections'

class TalentSourcingRequestsTab extends BasePage {
  sourcingRequestsSection = new SourcingRequests()

  visit() {
    cy.visit('/talents/123#sourcing_requests')
  }
}

export default TalentSourcingRequestsTab
