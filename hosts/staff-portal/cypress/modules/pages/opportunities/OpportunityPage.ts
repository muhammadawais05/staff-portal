/* global cy */
import { BasePage } from '~integration/modules/pages'
import History from './sections/History'

class OpportunityPage extends BasePage {
  history = new History()

  visit() {
    cy.visit('/opportunities/123')
  }
}

export default OpportunityPage
