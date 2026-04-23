import { activityMock, noteMock } from '~integration/mocks/fragments'
import { updateCompanyProfileNotesTabMock } from '~integration/mocks/schema-updates/engagement'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Company Profile Page -> Notes tab', () => {
  const { notesTab } = new CompanyProfilePage()

  describe('when Show Activities is unchecked', () => {
    it('shows only Notes', () => {
      updateCompanyProfileNotesTabMock({
        companyNotes: [noteMock()]
      })

      notesTab.visitTab()

      const noteId = noteMock().id
      const activityId = activityMock().id

      notesTab.notesSection
        .getNote(noteId)
        .should('contain', 'Send away averted')
      notesTab.notesSection.getActivity(activityId).should('not.exist')
    })
  })

  describe('when Show Activities is checked', () => {
    it('shows both Note and Activity', () => {
      updateCompanyProfileNotesTabMock({
        companyNotes: [noteMock(), activityMock()]
      })

      const noteId = noteMock().id
      const activityId = activityMock().id

      notesTab.notesSectionActions.getShowActivitiesCheckbox().click()
      notesTab.notesSection
        .getNote(noteId)
        .should('contain', 'Send away averted')
      notesTab.notesSection
        .getActivity(activityId)
        .should('contain', 'Nisi officiis et accusantium enim.')
      notesTab.notesSectionActions.getShowActivitiesCheckbox().click()
    })
  })
})
