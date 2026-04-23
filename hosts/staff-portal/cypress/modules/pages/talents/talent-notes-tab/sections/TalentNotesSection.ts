import { BasicModal } from '~integration/modules/modals'
import { ActivityModal } from '../components'

class TalentNotesSection {
  activityModal = new ActivityModal()
  removeActivityPromptModal = new BasicModal()

  get addNoteButton() {
    return cy.getByTestId('add-note-button')
  }

  get addActivityNoteButton() {
    return cy.getByTestId('add-activity-button')
  }

  findAction(text: string) {
    return cy.getByTestId('notes-section-actions').find('button').contains(text)
  }

  get secondAnswerField() {
    return cy.get('[id="answers[1].value"]')
  }

  get commentField() {
    return cy.get('[id="comment"]')
  }

  get submitNoteButton() {
    return cy.getByTestId('submit-note-button')
  }

  get closeButton() {
    return cy.get('[data-action="close"]')
  }

  get deleteNoteButton() {
    return cy.get('[aria-label="Delete Note"]')
  }

  get editNoteButton() {
    return cy.get('[aria-label="Edit Note"]')
  }

  get deleteActivityButton() {
    return cy.get('[aria-label="Delete Activity"]')
  }

  get editActivityButton() {
    return cy.get('[aria-label="Edit Activity"]')
  }
}

export default TalentNotesSection
