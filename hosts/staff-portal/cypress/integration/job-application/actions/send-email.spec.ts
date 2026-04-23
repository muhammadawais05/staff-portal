import { JobApplicationPage } from '~integration/modules/pages/jobs-applications'
import { updateEmailJobApplicantMocks } from '~integration/mocks/schema-updates/job-application'
import { ENTER_KEY } from '~integration/utils'

describe('Job Application Page -> Email Applicant', () => {
  const page = new JobApplicationPage()

  beforeEach(() => {
    updateEmailJobApplicantMocks()

    page.visit()
  })

  it('opens modal and sends email to job applicant', () => {
    page.openEmailJobApplicantModal()

    page.sendEmailModal.emailTemplateField
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })

    page.sendEmailModal.submitButton.click()

    cy.getNotification().should('have.text', 'The email was successfully sent.')
  })
})
