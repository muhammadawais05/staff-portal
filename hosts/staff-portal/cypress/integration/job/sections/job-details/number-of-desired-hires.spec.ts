import { JobPage } from '~integration/modules/pages/jobs'
import { updateNumberOfDesiredHiresMock } from '~integration/mocks/schema-updates/job'
import {
  EditNumberOfDesiredHiresModal,
  JobInformation
} from '~integration/modules/pages/jobs/components'

describe('Job Information', () => {
  const page = new JobPage()
  const jobInformation = new JobInformation()
  const editNumberOfDesiredHiresModal = new EditNumberOfDesiredHiresModal()

  describe('when user chooses to change Number of Desired Hires', () => {
    it('opens Edit Number of Desired Hires modal', () => {
      updateNumberOfDesiredHiresMock()

      page.visit()

      jobInformation.numberOfDesiredHiresEditButton.click()
      editNumberOfDesiredHiresModal.increaseCount.click()
      editNumberOfDesiredHiresModal.setDropdown('reasonId', 'Budget')
      editNumberOfDesiredHiresModal.setTextArea('comment', 'test')
      editNumberOfDesiredHiresModal.submit()

      page
        .getNotification('Number of Desired Hires was successfully updated')
        .should('be.visible')
    })
  })
})
