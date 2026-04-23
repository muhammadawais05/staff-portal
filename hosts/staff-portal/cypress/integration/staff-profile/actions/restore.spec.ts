import StaffProfilePage from '~integration/modules/pages/staff-profile'
import { updateStaffProfileRestoreStubs } from '~integration/mocks/schema-updates/staff-profile'
import { BasicModal } from '~integration/modules/modals'

describe('Staff Restore Action', () => {
  const staffProfilePage = new StaffProfilePage()
  const actions = staffProfilePage.actions
  const restoreModal = new BasicModal()

  it('restores Staff', () => {
    updateStaffProfileRestoreStubs()

    staffProfilePage.visit()

    staffProfilePage.moreDropdown.click()
    actions.restoreMenuOption.click()

    restoreModal.clickButton('Restore')

    cy.getNotification().should(
      'have.text',
      'The Staff account for Ashleigh Alexander was successfully restored.'
    )
  })
})
