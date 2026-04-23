import AddActivityModal from '~integration/modules/pages/companies/notes-tab/components/AddActivityModal'
import { updateAddActivityStubs } from '~integration/mocks/schema-updates/companies/add-activity-stubs-update'
import CompanyProfilePage from '~integration/modules/pages/companies'
import { ENTER_KEY } from '~integration/utils'

describe('Add Activity action', () => {
  const { notesTab: notes } = new CompanyProfilePage()

  const addActivityModal = new AddActivityModal()

  describe('When submitting the form', () => {
    it('adds the activity and shows the notification message', () => {
      updateAddActivityStubs()

      notes.visitTab()
      notes.notesSectionActions.addActivityButton.click()

      addActivityModal.subtypeSelect
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      addActivityModal.durationField.type('1')
      addActivityModal.outcomeSelect
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })

      notes.modal.clickButton('Add Activity')

      cy.getNotification().should('contain', 'Activity was added successfully.')
    })
  })
})
