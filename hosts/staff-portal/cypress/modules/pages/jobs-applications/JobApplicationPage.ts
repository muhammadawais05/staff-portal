/* global cy */
import { BasePage } from '~integration/modules/pages'
import { SendEmailModal } from '~integration/modules/modals'
import { RejectJobApplicationModal } from './components'

class JobApplicationPage extends BasePage {
  sendEmailModal = new SendEmailModal()
  rejectJobApplicationModal = new RejectJobApplicationModal()

  visit() {
    cy.visit('/job_applications/123')
  }

  get approveLink() {
    return cy.getByTestId('approve-link')
  }

  get content() {
    return cy.getByTestId('job-application-content')
  }

  openEmailJobApplicantModal() {
    cy.getByTestId('job-application-actions-email-button').click()
  }

  openRejectJobApplicationModal() {
    cy.getByTestId('reject-job-application-button').click()
  }
}

export default JobApplicationPage
