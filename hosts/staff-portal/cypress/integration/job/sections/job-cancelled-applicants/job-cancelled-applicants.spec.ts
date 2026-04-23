import { JobPage } from '~integration/modules/pages/jobs'
import updateJobCancelledApplicantsMock from '~integration/mocks/schema-updates/job/job-cancelled-applicants-mocks-update'
import { SendEmailModal } from '~integration/modules/modals'
import { CancelledJobApplicantsSection } from '~integration/modules/pages/jobs/sections'

const APPROVE_URL = Cypress.config().baseUrl + '/jobs/456'

describe('Job cancelled Applicants actions', () => {
  const page = new JobPage()
  const emailApplicantModal = new SendEmailModal()
  const cancelledJobApplicantsSection = new CancelledJobApplicantsSection()

  describe('when user clicks Email Developer button', () => {
    it('opens New Email modal', () => {
      updateJobCancelledApplicantsMock({ approveUrl: APPROVE_URL })
      page.visit()

      cancelledJobApplicantsSection.emailApplicantButton.click()
      emailApplicantModal.setDropdown('template', '1SS')

      emailApplicantModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The email was successfully sent.'
      )
    })
  })

  describe('when user clicks Approve application button', () => {
    it('opens Approve Job Application Link', () => {
      updateJobCancelledApplicantsMock({ approveUrl: APPROVE_URL })
      page.visit()

      page.approveLink.click()

      cy.url().should('eq', APPROVE_URL)
    })
  })
})
