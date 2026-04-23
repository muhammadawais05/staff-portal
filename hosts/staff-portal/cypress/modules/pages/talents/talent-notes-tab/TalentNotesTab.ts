import { BasePage } from '~integration/modules/pages'
import { TalentNotesSection } from './sections'

class TalentNotesTab extends BasePage {
  notesSection = new TalentNotesSection()

  visit() {
    cy.visit('/talents/123#notes')
  }
}

export default TalentNotesTab
