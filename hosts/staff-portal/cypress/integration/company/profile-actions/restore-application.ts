import { updateRestoreApplicationStubs } from '~integration/mocks/schema-updates/companies'
import { FormModal } from '~integration/modules/modals'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Company page -> Restore Application', () => {
  const page = new CompanyProfilePage()
  const confirmationModal = new FormModal()

  beforeEach(() => {
    updateRestoreApplicationStubs()

    page.basicInfoTab.visitTab()
  })

  describe('when the form information is correct', () => {
    it('submits the form and restore application', () => {
      page.primaryActions.restoreApplication.click()

      confirmationModal.comment.type('c')

      confirmationModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The Applicant was successfully restored.'
      )
    })
  })
})
