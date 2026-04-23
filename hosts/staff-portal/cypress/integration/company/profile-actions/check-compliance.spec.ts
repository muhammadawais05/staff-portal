import { updateCheckComplianceStubs } from '~integration/mocks/schema-updates/companies'
import { CheckComplianceModal } from '~integration/modules/modals'
import CompanyProfilePage from '~integration/modules/pages/companies/CompanyProfilePage'
import { ENTER_KEY } from '~integration/utils'

describe('Check Compliance', () => {
  const checkComplianceModal = new CheckComplianceModal()
  const page = new CompanyProfilePage()

  it('opens the Check Compliance modal', () => {
    updateCheckComplianceStubs({ topscreenClient: null })

    page.basicInfoTab.visitTab()

    page.primaryActions.checkComplianceButton.click()

    checkComplianceModal.countryField
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })

    checkComplianceModal.timeZoneField
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })

    checkComplianceModal.submit()

    cy.contains('Checking compliance for DuBuque, Cruickshank and Volkman')

    page
      .getNotification(
        'DuBuque, Cruickshank and Volkman has passed the compliance check.'
      )
      .should('be.visible')
  })
})
