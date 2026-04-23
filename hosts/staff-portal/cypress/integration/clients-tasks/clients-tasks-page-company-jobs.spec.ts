import { updateTasksByClientPageStubs } from '~integration/mocks/schema-updates/tasks-by-client'
import { TasksByClientPage } from '~integration/modules/pages/companies/tasks-by-client-page'
import {
  deleteJobStubUpdates,
  postponeJobStubUpdates,
  sendAwayJobStubs,
  restorePostponedJobStubs
} from '~integration/mocks/schema-updates/job'
import { FormModal } from '~integration/modules/modals'
import { updateEngagementModalStubs } from '~integration/mocks/schema-updates/engagement'

describe('Clients Tasks Page', () => {
  const page = new TasksByClientPage()

  describe('Company jobs list', () => {
    beforeEach(() => {
      updateTasksByClientPageStubs()
    })

    describe('Engagement actions', () => {
      it('Expire engagement open modal', () => {
        const expireEngagementModal = new FormModal()

        updateEngagementModalStubs('expireEngagement')

        page.visit()
        page.sectionActions.first().click()
        page.jobList.moreButtons.eq(1).click()
        page.jobList.expireEngagementMenuItem.click()
        expireEngagementModal.close()
      })

      it('Cancel interview open modal', () => {
        const cancelInterviewModal = new FormModal()

        updateEngagementModalStubs('cancelEngagementInInterview')

        page.visit()
        page.sectionActions.first().click()
        page.jobList.moreButtons.eq(1).click()
        page.jobList.cancelInterviewMenuItem.click()
        cancelInterviewModal.close()
      })
    })

    describe('Job actions', () => {
      it('Delete job open modal', () => {
        const deleteJobModal = new FormModal()

        deleteJobStubUpdates()

        page.visit()
        page.sectionActions.first().click()
        page.jobList.moreButtons.first().click()
        page.jobList.deleteJobMenuItem.click()
        deleteJobModal.close()
      })

      it('Postpone job open modal', () => {
        const postponeJobModal = new FormModal()

        postponeJobStubUpdates()

        page.visit()
        page.sectionActions.first().click()
        page.jobList.moreButtons.first().click()
        page.jobList.postponeJobMenuItem.click()
        postponeJobModal.close()
      })

      it('Send away job open modal', () => {
        const sendAwayJobModal = new FormModal()

        sendAwayJobStubs()

        page.visit()
        page.sectionActions.first().click()
        page.jobList.moreButtons.first().click()
        page.jobList.sendAwayJobMenuItem.click()
        sendAwayJobModal.close()
      })

      it('Restore postpone job open modal', () => {
        const restorePostponeModal = new FormModal()

        restorePostponedJobStubs()

        page.visit()
        page.sectionActions.first().click()
        page.jobList.moreButtons.first().click()
        page.jobList.restorePostponeJobMenuItem.click()
        restorePostponeModal.close()
      })
    })
  })
})
