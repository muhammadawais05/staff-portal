import { updateRepauseCompanyStubs } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'
import { daysFromNow, ENTER_KEY } from '~integration/utils'

describe('Company page -> Repause Company', () => {
  const page = new CompanyProfilePage()

  beforeEach(() => {
    updateRepauseCompanyStubs()

    page.basicInfoTab.visitTab()
  })

  describe('when the form information is correct', () => {
    it('submits the form and repauses the client', () => {
      page.primaryActions.repauseCompanyButton.click()

      page.repauseCompanyModal.dueDateField
        .click()
        .type(daysFromNow(7))
        .trigger('keydown', { keyCode: ENTER_KEY })
        .blur()
      page.repauseCompanyModal.detailsField.type('some details')

      page.repauseCompanyModal.submitButton.click()

      cy.getNotification().should('have.text', 'Company has been repaused.')
    })
  })
})
