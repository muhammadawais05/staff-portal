import { restorePostponedJobStubs } from '~integration/mocks/schema-updates/job'
import { JobPage } from '~integration/modules/pages/jobs'
import { RestorePostponeJobModal } from '~integration/modules/pages/jobs/components'

describe('Job Page -> Restore postponed', () => {
  const page = new JobPage()
  const modal = new RestorePostponeJobModal()

  it('Restore postponed', () => {
    restorePostponedJobStubs()

    page.visit()

    page.actions.click()
    page.actions.contains('Restore Postponed').click()
    modal.submitButton.click()

    cy.getNotification().should('have.text', 'Job has been restored.')
  })
})
