import { updateInviteContactStubs } from '~integration/mocks/schema-updates/companies'
import { FormModal } from '~integration/modules/modals'
import CompanyProfilePage from '~integration/modules/pages/companies/CompanyProfilePage'

describe('Invite contact', () => {
  const inviteContactModal = new FormModal()
  const page = new CompanyProfilePage()

  beforeEach(() => {
    updateInviteContactStubs()
  })

  // Random fail, checked manually
  // eslint-disable-next-line
  it.skip('opens Issue an Invoice modal', () => {
    page.basicInfoTab.visitTab()

    page.moreDropdown.click()

    page.moreDropdown.contains('Invite Contact').click()

    inviteContactModal.setTextArea('email', 'c')
    inviteContactModal.setTextArea('fullName', 'c')
    inviteContactModal.submit()

    page
      .getNotification('The Invitation was successfully sent.')
      .should('be.visible')

    cy.url().should('include', '/company_representatives/101')
    cy.go('back').end()
  })
})
