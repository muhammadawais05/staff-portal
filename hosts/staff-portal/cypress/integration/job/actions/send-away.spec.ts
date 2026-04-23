import { sendAwayJobStubs } from '~integration/mocks/schema-updates/job'
import { JobPage } from '~integration/modules/pages/jobs'
import { SendAwayJobModal } from '~integration/modules/pages/jobs/components'

describe('Job Page -> Send away', () => {
  const page = new JobPage()
  const modal = new SendAwayJobModal()

  beforeEach(() => {
    sendAwayJobStubs()
    page.visit()
  })

  it('Send a job away', () => {
    page.actions.click()
    page.actions.contains('Send Away Job').click()

    modal.reasonField.click()
    modal.tooltip.contains('Client budget is too small').click()

    modal.comment.type('Some comment')

    modal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Job was successfully sent away.'
    )
  })
})
