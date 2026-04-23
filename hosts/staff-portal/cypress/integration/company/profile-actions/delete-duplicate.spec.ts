import { updateDeleteDuplicateStubs } from '~integration/mocks/schema-updates/companies'
import { FormModal } from '~integration/modules/modals'
import CompanyProfilePage from '~integration/modules/pages/companies/CompanyProfilePage'

describe('Delete Duplicate', () => {
  const deleteDuplicateModal = new FormModal()
  const page = new CompanyProfilePage()

  beforeEach(() => {
    updateDeleteDuplicateStubs()
  })

  it('opens Delete Duplicate modal', () => {
    page.basicInfoTab.visitTab()

    page.moreDropdown.click()
    page.moreDropdown.contains('Delete Duplicate').click()

    deleteDuplicateModal.setTextArea('originalClientUrl', 'c')
    deleteDuplicateModal.comment.type('c')
    deleteDuplicateModal.submit()

    page
      .getNotification('The company was successfully deleted.')
      .should('be.visible')
  })
})
