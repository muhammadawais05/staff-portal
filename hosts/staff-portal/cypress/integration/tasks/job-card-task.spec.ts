import { Subject, JobOperations } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { updateJobCardTaskStubs } from '~integration/mocks/schema-updates/tasks'
import { BasicModal } from '~integration/modules/modals'
import { TasksPage } from '~integration/modules/pages/tasks'
import { enabledOperationMock } from '~integration/mocks'

describe('Tasks Page -> Job Card Task -> Actions', () => {
  const page = new TasksPage()
  const basicModal = new BasicModal()

  const subjects = [
    {
      id: encodeEntityId('123', 'Job'),
      title: 'Lead Manager',
      jobType: 'type',
      __typename: 'Job'
    } as unknown as Subject
  ]

  describe('Job Card Task', () => {
    describe('Restore Postponed', () => {
      it('opens Restore Postponed modal', () => {
        const jobOperations = {
          resumePostponedJob: enabledOperationMock()
        } as unknown as JobOperations

        updateJobCardTaskStubs({ jobOperations, subjects })
        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.jobTaskCard.restorePostponedButton.click()
        basicModal.close()
      })
    })

    describe('Claim And Approve Job', () => {
      it('opens Claim And Approve Job modal', () => {
        const jobOperations = {
          approveJob: enabledOperationMock()
        } as unknown as JobOperations

        updateJobCardTaskStubs({ jobOperations, subjects })
        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.jobTaskCard.claimAndApproveJobButton.click()
        basicModal.close()
      })
    })

    describe('Send Engagement Client Email', () => {
      it('opens Send Engagement Client Email modal', () => {
        updateJobCardTaskStubs({ subjects })
        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.jobTaskCard.sendEngagementClientEmailButton.click()
        basicModal.close()
      })
    })

    describe('More Dropdown -> Delete Job', () => {
      it('opens Delete Job modal', () => {
        const jobOperations = {
          removeJob: enabledOperationMock()
        } as unknown as JobOperations

        updateJobCardTaskStubs({ jobOperations, subjects })
        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.jobTaskCard.moreButton.click()
        page.jobTaskCard.moreDropdown.contains('Delete').click()
        basicModal.close()
      })
    })

    describe('More Dropdown -> Send Engagement Talent Email', () => {
      it('opens Send Engagement Talent Email modal', () => {
        updateJobCardTaskStubs({ subjects })
        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.jobTaskCard.moreButton.click()
        page.jobTaskCard.moreDropdown.contains('Email Talent').click()
        basicModal.close()
      })
    })
  })
})
