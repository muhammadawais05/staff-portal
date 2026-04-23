import requestAvailabilityStubs from '~integration/mocks/schema-updates/job/request-availability-job-stub-updates'
import { JobPage } from '~integration/modules/pages/jobs'
import RequestAvailabilityModal from '~integration/modules/pages/jobs/components/RequestAvailabilityModal'

describe('Job Page -> Request availability', () => {
  const page = new JobPage()
  const modal = new RequestAvailabilityModal()

  it('Request availability', () => {
    requestAvailabilityStubs()

    page.visit()
    page.actions.click()
    page.actions.contains('Request Availability').click()

    modal.fillFromFavoritesButton.click()

    modal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Availability Request was successfully created.'
    )
  })
})
