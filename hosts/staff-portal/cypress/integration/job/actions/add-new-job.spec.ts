import { updateAddNewJobMocks } from '~integration/mocks/schema-updates/job'
import { JobListPage } from '~integration/modules/pages/jobs'
import { AddJobModal } from '~integration/modules/pages/jobs/components'
import { ENTER_KEY } from '~integration/utils'

describe('Job List Page -> Add New Job', () => {
  const page = new JobListPage()
  const modal = new AddJobModal()

  beforeEach(() => {
    updateAddNewJobMocks()

    page.visit()
  })

  describe('when the Add New Job button is clicked', () => {
    it('submits the modal and redirects to the Job Create page', () => {
      page.addNewJobButton.click()

      modal.clientField
        .type('a')
        .wait(500)
        .trigger('keydown', { keyCode: ENTER_KEY })

      modal.submitButton.contains('Continue').click()

      cy.url().should(
        'include',
        Cypress.config().baseUrl + '/jobs/new?company_id='
      )
    })
  })
})
