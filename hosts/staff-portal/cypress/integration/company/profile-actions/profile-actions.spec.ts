import { updateProfileActionsStubs } from '~integration/mocks/schema-updates/companies/profile-actions-update'
import { FormModal } from '~integration/modules/modals'
import CompanyProfilePage from '~integration/modules/pages/companies/CompanyProfilePage'

describe('Company Profile Actions', () => {
  const confirmationModal = new FormModal()
  const page = new CompanyProfilePage()

  beforeEach(() => {
    updateProfileActionsStubs()
  })

  describe('Confirmation modals', () => {
    it('Enable Mobile App Access', () => {
      page.basicInfoTab.visitTab()

      page.moreDropdown.click()

      page.moreDropdown.contains('Enable Access to Mobile App').click()

      confirmationModal.comment.type('c')
      confirmationModal.submitButton.click()

      page
        .getNotification('Mobile access has been enabled for this company.')
        .should('be.visible')
      cy.getNotification().find('button').click()
    })

    it('Disable Mobile App Access', () => {
      page.moreDropdown.click()

      page.moreDropdown.contains('Disable Access to Mobile App').click()

      confirmationModal.comment.type('c')
      confirmationModal.submitButton.click()

      page
        .getNotification('Mobile access has been disabled for this company.')
        .should('be.visible')
      cy.getNotification().find('button').click()
    })

    it('Enable Embedded Contract Signing', () => {
      page.moreDropdown.click()

      page.moreDropdown.contains('Enable Embedded Contract Signing').click()

      confirmationModal.comment.type('c')
      confirmationModal.submitButton.click()

      page
        .getNotification('Embedded Contract Signing has been enabled.')
        .should('be.visible')
      cy.getNotification().find('button').click()
    })

    it('Disable Embedded Contract Signing', () => {
      page.moreDropdown.click()

      page.moreDropdown.contains('Disable Embedded Contract Signing').click()

      confirmationModal.comment.type('c')
      confirmationModal.submitButton.click()

      page
        .getNotification('Embedded Contract Signing has been disabled.')
        .should('be.visible')
      cy.getNotification().find('button').click()
    })

    it('Send Client App Invitation Email', () => {
      page.moreDropdown.click()

      page.moreDropdown.contains('Send Client App Invitation Email').click()

      confirmationModal.clickButton('Send')

      page
        .getNotification('Invitations for this client has been sent')
        .should('be.visible')
      cy.getNotification().find('button').click()
    })
  })

  describe('Check that all unique modals open', () => {
    it('Claim Enterprise Lead', () => {
      page.moreDropdown.click()

      page.moreDropdown.contains('Claim Enterprise').click()

      confirmationModal.toggleCheckbox('successfulCall')
      confirmationModal.submit()

      page
        .getNotification('Your call was successfully logged.')
        .should('be.visible')
    })
  })
})
