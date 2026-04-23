import { updateActivityNoteActionsStubs } from '~integration/mocks/schema-updates/companies/activity-note-actions-stubs-update'
import CompanyProfilePage from '~integration/modules/pages/companies'
import ActivityNote from '~integration/modules/pages/companies/notes-tab/components/ActivityNote'

describe('Activity Note actions', () => {
  const { notesTab: notes } = new CompanyProfilePage()

  const activityNote = new ActivityNote()

  beforeEach(() => {
    updateActivityNoteActionsStubs()

    notes.visitTab()
  })

  describe('When submitting the modals', () => {
    it('edits the activity note and shows the notification message', () => {
      activityNote.editButton.click()
      notes.modal.clickButton('Edit Activity')

      cy.getNotification().should(
        'contain',
        'Activity was edited successfully.'
      )
    })

    it('deletes the activity note and shows the notification message', () => {
      activityNote.deleteButton.click()
      notes.modal.clickButton('Delete Activity')

      cy.getNotification().should('contain', 'Activity has been deleted.')
    })
  })
})
