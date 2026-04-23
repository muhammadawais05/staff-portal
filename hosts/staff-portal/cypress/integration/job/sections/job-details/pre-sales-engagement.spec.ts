import { JobPage } from '~integration/modules/pages/jobs'
import { updatePreSalesEngagementMock } from '~integration/mocks/schema-updates/job'
import { JobInformation } from '~integration/modules/pages/jobs/components'
import { FormModal } from '~integration/modules/modals'

describe('Job Information', () => {
  const page = new JobPage()
  const jobInformation = new JobInformation()
  const editPreSalesEngagementModal = new FormModal()

  describe('when user chooses to change Pre-Sales Engagement value', () => {
    it('opens Edit Pre-sales Engagement modal', () => {
      updatePreSalesEngagementMock()

      page.visit()

      jobInformation.preSalesEngagementEditButton.click()
      editPreSalesEngagementModal.getRadio('presalesEngagement', 'Yes').click()
      editPreSalesEngagementModal.setTextArea(
        'presalesEngagementComment',
        'test'
      )
      editPreSalesEngagementModal.submit()

      page
        .getNotification('The Pre-sales Engagement was successfully updated')
        .should('be.visible')
    })
  })
})
