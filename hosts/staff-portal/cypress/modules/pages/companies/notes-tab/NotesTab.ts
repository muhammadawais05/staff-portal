import { BasePage } from '~integration/modules/pages'
import { NotesSection, NotesSectionActions } from './sections'

class NotesTab extends BasePage {
  notesSection = new NotesSection()
  notesSectionActions = new NotesSectionActions()

  visitTab() {
    return cy.visit('/clients/1939407#notes')
  }
}

export default NotesTab
