import { rehireJobStubs } from '~integration/mocks/schema-updates/job'
import { JobPage } from '~integration/modules/pages/jobs'
import { RehireJobModal } from '~integration/modules/pages/jobs/components'
import { daysFromNow } from '~integration/utils'

describe('Job Page -> Rehire', () => {
  const page = new JobPage()
  const modal = new RehireJobModal()

  it('Rehire a job', () => {
    rehireJobStubs()

    page.visit()

    page.actions.click()
    page.actions.contains('Rehire').click()

    modal.startDateFeild.click().clear().type(daysFromNow(1)).blur()

    modal.commitmentFeild.click()
    modal.tooltip.contains('Hourly').click()

    modal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'Job rehiring process has been started.'
    )
  })
})
