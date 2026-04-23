import { JobPage } from '~integration/modules/pages/jobs'
import { updatePendingTalentReasonMock } from '~integration/mocks/schema-updates/job'
import { JobInformation } from '~integration/modules/pages/jobs/components'
import { FormModal } from '~integration/modules/modals'

describe('Job Information', () => {
  const page = new JobPage()
  const jobInformation = new JobInformation()
  const updatePendingTalentReasonModal = new FormModal()

  describe('when user chooses to change Pending Talent Reason value', () => {
    it('opens Update Pending Talent Reason modal', () => {
      updatePendingTalentReasonMock()

      page.visit()

      jobInformation.pendingTalentReasonEditButton.click()
      updatePendingTalentReasonModal.setDropdown('reason', 'Waiting')
      updatePendingTalentReasonModal.setTextArea('reasonNotes', 'notes')
      updatePendingTalentReasonModal.submit()

      page
        .getNotification('The Pending Talent Reason was successfully updated')
        .should('be.visible')
    })
  })
})
