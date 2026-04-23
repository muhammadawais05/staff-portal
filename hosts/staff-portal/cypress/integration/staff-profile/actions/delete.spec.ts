import StaffProfilePage from '~integration/modules/pages/staff-profile'
import { updateStaffProfileDeleteStubs } from '~integration/mocks/schema-updates/staff-profile'
import { BasicModal } from '~integration/modules/modals'

describe('Staff Delete Action', () => {
  const staffProfilePage = new StaffProfilePage()
  const actions = staffProfilePage.actions
  const restoreModal = new BasicModal()

  it('deletes Staff', () => {
    updateStaffProfileDeleteStubs()

    staffProfilePage.visit()

    staffProfilePage.moreDropdown.click()
    actions.deleteMenuOption.click()

    restoreModal.clickButton('Delete')

    cy.getNotification().should(
      'have.text',
      'The Staff account for Ashleigh Alexander was successfully deleted.'
    )
  })
})
