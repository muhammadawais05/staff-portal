import { JobApplicationPage } from '~integration/modules/pages/jobs-applications'
import { updateRejectJobApplicationMocks } from '~integration/mocks/schema-updates/job-application'

describe('Job Application Page -> Reject Application', () => {
  const page = new JobApplicationPage()

  beforeEach(() => {
    updateRejectJobApplicationMocks()

    page.visit()
  })

  it('opens modal and rejects the application', () => {
    page.openRejectJobApplicationModal()

    page.rejectJobApplicationModal.selectReason()
    page.rejectJobApplicationModal.getCommentField().click().type('C')

    page.rejectJobApplicationModal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'You have successfully rejected job application.'
    )
  })
})
