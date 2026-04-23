import { JobPage } from '~integration/modules/pages/jobs'
import { updateEstimatedWeeklyRevenueMock } from '~integration/mocks/schema-updates/job'
import { JobInformation } from '~integration/modules/pages/jobs/components'

describe('Job Information', () => {
  const page = new JobPage()
  const jobInformation = new JobInformation()

  describe('when user chooses to change Estimated Weekly Revenue value', () => {
    // notification is not rendered after setting the revenue
    it('makes the field editable', () => {
      updateEstimatedWeeklyRevenueMock()

      page.visit()

      jobInformation.estimatedWeeklyRevenueEditButton.click()

      jobInformation.estimatedWeeklyRevenueInput.type('2545')
      updateEstimatedWeeklyRevenueMock('2545')
      jobInformation.estimatedWeeklyRevenueInput.blur()
      jobInformation.estimatedWeeklyRevenueField.should('contain', '$2,545')
    })
  })
})
