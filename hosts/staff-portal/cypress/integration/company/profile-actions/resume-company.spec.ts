import { updateResumeCompanyStubs } from '~integration/mocks/schema-updates/companies'
import { FormModal } from '~integration/modules/modals'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Company page -> Resume Company', () => {
  const page = new CompanyProfilePage()
  const confirmationModal = new FormModal()

  beforeEach(() => {
    updateResumeCompanyStubs()

    page.basicInfoTab.visitTab()
  })

  describe('when the form information is correct', () => {
    it('submits the form and resumes the client', () => {
      page.primaryActions.resumeCompanyButton.click()

      confirmationModal.comment.type('c')

      confirmationModal.submitButton.click()

      cy.getNotification().should('have.text', 'Company has been resumed.')
    })
  })
})
