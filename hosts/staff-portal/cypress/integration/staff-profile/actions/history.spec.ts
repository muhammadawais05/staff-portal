import StaffProfilePage from '~integration/modules/pages/staff-profile'
import { updateStaffProfileStubs } from '~integration/mocks/schema-updates/staff-profile'

describe('History Action', () => {
  const staffProfilePage = new StaffProfilePage()

  beforeEach(() => {
    updateStaffProfileStubs()

    staffProfilePage.visit()
  })

  it('shows history modal', () => {
    staffProfilePage.showHistory.click()

    cy.contains('Recent Activity').should('exist')
  })
})
