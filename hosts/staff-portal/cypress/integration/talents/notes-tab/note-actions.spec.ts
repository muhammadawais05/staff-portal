import TalentNotesTab from '~integration/modules/pages/talents/talent-notes-tab'
import { BasicModal } from '~integration/modules/modals'
import { updateTalentNoteStubs } from '~integration/mocks/schema-updates/talents'

describe('Talent Notes Tab > Notes Section > Note', () => {
  const page = new TalentNotesTab()

  const { notesSection: note } = page
  const modal = new BasicModal()

  it('opens the edit mode and delete modal for the note', () => {
    updateTalentNoteStubs()

    page.visit()

    // EDIT MODE FORM
    note.editNoteButton.click()
    note.closeButton.click()

    // DELETE NOTE MODAL
    note.deleteNoteButton.click()
    modal.clickButton('Cancel')
  })
})
