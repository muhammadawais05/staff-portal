import { postponeJobStubUpdates } from '~integration/mocks/schema-updates/job'
import { JobPage } from '~integration/modules/pages/jobs'
import { PostponeJobModal } from '~integration/modules/pages/jobs/components'
import { daysFromNow } from '~integration/utils'

describe('Job Page -> Postpone', () => {
  const page = new JobPage()
  const postponeJobModal = new PostponeJobModal()

  it('Postpone job', () => {
    postponeJobStubUpdates()

    page.visit()

    page.actions.click()
    page.actions.contains('Postpone').click()

    postponeJobModal.dueDateField.click().clear().type(daysFromNow(1)).blur()

    postponeJobModal.reasonField.click()
    postponeJobModal.tooltip
      .contains('Client has specific developer requirements')
      .click()

    postponeJobModal.detailsField.type('Some details')

    postponeJobModal.submitButton.click()

    cy.getNotification().should('have.text', 'Job was successfully postponed.')
  })
})
