import { Engagement } from '@staff-portal/graphql/staff'

import { JobPage } from '~integration/modules/pages/jobs'
import {
  updateJobProfileEngagementActionsStubs,
  updateEmailTalentStubs,
  updateEngagementClientStubs
} from '~integration/mocks/schema-updates/job'
import { enabledOperationMock } from '~integration/mocks'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { SendEmailModal } from '~integration/modules/modals'

describe('Job More Actions -> Engagement Actions', () => {
  const page = new JobPage()

  const sendEmailModal = new SendEmailModal()

  describe('when clicking on the menu item', () => {
    it('opens the modal', () => {
      updateJobProfileEngagementActionsStubs({
        currentEngagement: {
          operations: getEngagementOperations({
            changeEngagementCommitment: enabledOperationMock(),
            changeEngagementStartDate: enabledOperationMock(),
            changeEngagementEndDate: enabledOperationMock(),
            cancelEngagementTrial: enabledOperationMock(),
            rejectEngagementTrial: enabledOperationMock(),
            reactivateEngagement: enabledOperationMock(),
            reopenExpiredEngagement: enabledOperationMock(),
            terminateEngagement: enabledOperationMock()
          })
        } as unknown as Engagement
      })

      page.visit()

      // Change Engagement Commitment
      page.moreButton().click()
      page.moreDropdown.contains('Change Commitment').click()

      cy.getByTestId('cancel').click()

      // Change Engagement Start Date
      page.moreButton().click()
      page.moreDropdown.contains('Change Start Date').click()

      // Needed to close the datepicker so the cancel button can be seen and clicked
      cy.getByTestId('day-button-15').click()

      cy.get('button').contains('Cancel').click()

      // Change Engagement End Date
      page.moreButton().click()
      page.moreDropdown.contains('Change End Date').click()

      // Needed to close the datepicker so the cancel button can be seen and clicked
      cy.get('[role="tooltip"]').findByTestId('day-button-15').click()

      cy.get('button').contains('Cancel').click()

      // Cancel Engagement Trial
      page.moreButton().click()
      page.moreDropdown.contains('Cancel Engagement').click()

      cy.get('button').contains('Cancel').click()

      // Reactivate Engagement/Job
      page.moreButton().click()
      page.moreDropdown.contains('Reactivate Job').click()

      cy.get('button').contains('Cancel').click()

      // Reject Engagement Trial
      page.moreButton().click()
      page.moreDropdown.contains('Reject Trial').click()

      cy.get('button').contains('Cancel').click()

      // Reopen Engagement and Approve Trial
      page.moreButton().click()
      cy.get('button').contains('Reopen Engagement and Approve Trial').click()

      cy.get('button').contains('Cancel').click()

      // Terminate Engagement/Job
      page.moreButton().click()
      page.moreDropdown.contains('End Job').click()

      // Needed to close the datepicker so the cancel button can be seen and clicked
      cy.focused().blur()

      cy.get('button').contains('Cancel').click()
    })

    // Added in a separate test to avoid conflicts with Reject Trial menu item naming
    it('opens the `Reject Approved Trial` modal', () => {
      updateJobProfileEngagementActionsStubs({
        currentEngagement: {
          operations: getEngagementOperations({
            rejectApprovedEngagementTrial: enabledOperationMock()
          })
        } as unknown as Engagement
      })

      cy.reload()

      page.moreButton().click()
      page.moreDropdown.contains('Reject Trial').click()

      cy.get('button').contains('Cancel').click()
    })

    it('opens the `Email Company` modal', () => {
      updateEngagementClientStubs()

      cy.reload()

      page.moreButton().click()
      page.moreDropdown.contains('Email Company').click()

      sendEmailModal.cancelButton.click()
    })

    it('opens the `Email Talent` modal', () => {
      updateEmailTalentStubs()

      cy.reload()

      page.moreButton().click()
      page.moreDropdown.contains('Email Talent').click()

      sendEmailModal.cancelButton.click()
    })
  })
})
