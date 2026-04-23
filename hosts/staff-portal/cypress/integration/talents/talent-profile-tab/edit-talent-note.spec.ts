import { updateEditNotesStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'

describe('Talent Profile Tab > Edit note', () => {
  const page = new TalentProfilePage()

  const {
    generalSection: { notesField }
  } = page

  beforeEach(() => {
    updateEditNotesStubs()

    page.visit()
  })

  it('edits the note', () => {
    notesField.toggleNotesEditMode()

    notesField.updateNotesValue('a').save()

    updateEditNotesStubs({ billingNotes: 'a' })

    notesField.value.should('have.text', ' a ')
    page.getNotification('Contact information updated.').should('be.visible')
  })
})
