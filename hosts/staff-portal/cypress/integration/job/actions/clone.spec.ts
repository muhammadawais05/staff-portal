import { updateJobCloneStubs } from '~integration/mocks/schema-updates/job'
import { JobPage } from '~integration/modules/pages/jobs'
import { CloneJobModal } from '~integration/modules/pages/jobs/components'
import { daysFromNow } from '~integration/utils'

describe('Job Page -> Clone', () => {
  const page = new JobPage()
  const cloneJobModal = new CloneJobModal()

  describe('when the form information is correct', () => {
    it('submits the modal and displays the success notification message', () => {
      updateJobCloneStubs()

      page.visit()

      page.actions.contains('Clone').click()

      cloneJobModal.startDateField.clear().type(daysFromNow(7)).blur()

      cloneJobModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The Job was successfully cloned.'
      )
    })
  })
})
