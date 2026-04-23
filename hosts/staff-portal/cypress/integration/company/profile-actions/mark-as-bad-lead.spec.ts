import { updateMarkAsBadLeadStubs } from '~integration/mocks/schema-updates/companies'
import { MarkAsBadLeadModal } from '~integration/modules/modals'
import CompanyProfilePage from '~integration/modules/pages/companies/CompanyProfilePage'
import { ENTER_KEY } from '~integration/utils'

describe('Mark as Bad Lead', () => {
  const markAsBadLeadModal = new MarkAsBadLeadModal()
  const page = new CompanyProfilePage()

  beforeEach(() => {
    updateMarkAsBadLeadStubs()
  })

  it('opens Mark as Bad Lead modal', () => {
    page.basicInfoTab.visitTab()

    page.moreDropdown.click()
    page.moreDropdown
      .findByTestId('actions-dropdown-lazy-operation-MarkasBadLead')
      .click()

    markAsBadLeadModal.reasonField
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })
    markAsBadLeadModal.commentField.type('c')
    markAsBadLeadModal.submit()

    page
      .getNotification('Client has been marked as bad lead.')
      .should('be.visible')
  })
})
