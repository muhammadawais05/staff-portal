import { JobPage } from '~integration/modules/pages/jobs'
import { updateMatchingNoteStubs } from '~integration/mocks/schema-updates/job'
import { matchingNoteMock } from '~integration/mocks/fragments'
import { BasicModal } from '~integration/modules/modals'

describe('Job Page -> Notes Section', () => {
  const page = new JobPage()
  const { notesSection } = page
  const modal = new BasicModal()

  beforeEach(() => {
    updateMatchingNoteStubs()
    page.visit()
  })

  it('creates a new matching note', () => {
    notesSection.addMatchingNoteButton.click()

    notesSection.editForm.contains('label', 'Title').click().type('Test title')
    notesSection.editForm
      .find('label')
      .contains('Small team of 2 - 6 talent')
      .click()
    notesSection.editForm
      .find('label')
      .contains(
        "There is already a PM on the client's team who will manage the talent"
      )
      .click()
    notesSection.editForm.find('label').contains('Consultancy').click()
    notesSection.editForm.find('label').contains('Within 1 week').click()
    notesSection.editForm.find('label').contains('Speed').click()
    notesSection.editForm.find('label').contains('High quality').click()
    notesSection.editForm.find('label').contains('1-3 days').click()
    notesSection.editForm
      .find('label')
      .contains('Comment')
      .click()
      .type('Test comment')
    notesSection.editForm.submit()

    cy.getNotification().should('contain', 'Matching Note has been added.')
  })

  it('edits the matching note', () => {
    const noteId = matchingNoteMock().id

    notesSection.getEditButton(noteId).click()
    notesSection.getNote(noteId).find('label').contains('Speed').click()
    notesSection
      .getNote(noteId)
      .find('label')
      .contains('More than 10 days')
      .click()

    notesSection.editForm.submit()
  })

  it('deletes the matching note', () => {
    const noteId = matchingNoteMock().id

    notesSection.getDeleteButton(noteId).click()

    modal.clickButton('Delete Note')

    cy.getNotification().should('contain', 'Note has been deleted.')
  })
})
