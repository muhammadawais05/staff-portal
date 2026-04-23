import { JobPage } from '~integration/modules/pages/jobs'
import { updateMatchersQuestionsMock } from '~integration/mocks/schema-updates/job'
import { JobInformation } from '~integration/modules/pages/jobs/components'
import { FormModal } from '~integration/modules/modals'

describe('Job Information', () => {
  const page = new JobPage()
  const jobInformation = new JobInformation()
  const matchersQuestionsModal = new FormModal()

  describe('when user chooses to edit Matchers Questions', () => {
    it('opens Matchers Questions modal', () => {
      updateMatchersQuestionsMock()

      page.visit()

      jobInformation.matchersQuestionsEditButton.click()
      matchersQuestionsModal.submit()

      page
        .getNotification(
          "The Job Matcher's Questions were successfully updated"
        )
        .should('be.visible')
    })
  })
})
