import { updateRestoreSendingAwayJobMocks } from '~integration/mocks/schema-updates/job'
import { BasicModal } from '~integration/modules/modals'
import { JobPage } from '~integration/modules/pages/jobs'

describe('Job page -> Restore Sending Away Job', () => {
  const page = new JobPage()
  const restoreSendingAway = new BasicModal()

  beforeEach(() => {
    updateRestoreSendingAwayJobMocks()

    page.visit()
  })

  describe('when the form information is correct', () => {
    it('submits the modal and displays the success notification message', () => {
      page.moreButton().click()
      page.moreDropdown.contains('Restore Sending Away').click()

      restoreSendingAway.clickButton('Restore Sending Away')

      cy.getNotification().should(
        'have.text',
        'The Job was successfully restored.'
      )
    })
  })
})
