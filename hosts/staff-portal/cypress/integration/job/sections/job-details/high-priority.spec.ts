import { JobPage } from '~integration/modules/pages/jobs'
import { updateHighPriorityMock } from '~integration/mocks/schema-updates/job'
import { JobInformation } from '~integration/modules/pages/jobs/components'
import { FormModal } from '~integration/modules/modals'

describe('Job Information', () => {
  const page = new JobPage()
  const jobInformation = new JobInformation()
  const jobPriorityModal = new FormModal()

  describe('when user chooses to change High Priority value', () => {
    it('opens Update Job Priority modal', () => {
      updateHighPriorityMock()

      page.visit()

      jobInformation.highPriorityEditButton.click()
      jobPriorityModal.setDropdown('highPriority', 'No')
      jobPriorityModal.setTextArea('comment', 'test')
      jobPriorityModal.submit()

      page
        .getNotification('The job priority was successfully updated')
        .should('be.visible')
    })
  })
})
