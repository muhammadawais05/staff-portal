import { BasePage } from '~integration/modules/pages'
import { TopscreenPositionsSection } from './sections'

class TopscreenTab extends BasePage {
  topscreenPositionsSection = new TopscreenPositionsSection()

  visitTab() {
    return cy.visit('/clients/123#topscreen')
  }
}

export default TopscreenTab
