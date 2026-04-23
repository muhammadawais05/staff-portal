import { updateRestoreCompanyFromBlackFlagStubs } from '~integration/mocks/schema-updates/companies'
import { FormModal } from '~integration/modules/modals'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Company page -> Restore Company From Black Flag', () => {
  const page = new CompanyProfilePage()
  const confirmationModal = new FormModal()

  beforeEach(() => {
    updateRestoreCompanyFromBlackFlagStubs()

    page.basicInfoTab.visitTab()
  })

  describe('when the form information is correct', () => {
    it('submits the form and resumes the client', () => {
      page.primaryActions.restoreCompanyFromBlackFlagButton.click()

      confirmationModal.comment.type('c')

      confirmationModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'Company has been restored from Black Flag status.'
      )
    })
  })
})
