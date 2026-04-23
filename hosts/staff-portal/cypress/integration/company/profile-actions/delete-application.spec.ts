import { updateDeleteApplicationStubs } from '~integration/mocks/schema-updates/companies'
import { DeleteApplicationModal } from '~integration/modules/modals'
import CompanyProfilePage from '~integration/modules/pages/companies/CompanyProfilePage'
import { ENTER_KEY } from '~integration/utils'

describe('Delete Application', () => {
  const deleteApplicationModal = new DeleteApplicationModal()
  const page = new CompanyProfilePage()

  beforeEach(() => {
    updateDeleteApplicationStubs()
  })

  it('opens Delete Application modal', () => {
    page.basicInfoTab.visitTab()

    page.moreDropdown.click()
    page.moreDropdown.contains('Delete Application').click()

    deleteApplicationModal.reasonField
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })
    deleteApplicationModal.commentField.type('c')
    deleteApplicationModal.submit()

    page
      .getNotification('The Company Application was successfully deleted.')
      .should('be.visible')
  })
})
