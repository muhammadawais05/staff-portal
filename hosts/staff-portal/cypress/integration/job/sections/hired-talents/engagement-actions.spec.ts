import { EngagementStatus } from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { JobPage } from '~integration/modules/pages/jobs'
import { updateEngagementActionsMocks } from '~integration/mocks/schema-updates/job'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import {
  FormModal,
  BasicModal,
  SendEmailModal
} from '~integration/modules/modals'
import {
  ChangeEndDateModal,
  ChangeStartDateModal,
  ImportTopModal,
  RejectTrial,
  ScheduleBreakModal,
  SendTopModal,
  TerminateEngagement,
  UpdateBillingCycleSettings
} from '~integration/modules/pages/engagements/components'
import { enabledOperationMock } from '~integration/mocks'

describe('Job page -> Hired Talent -> More -> engagement actions', () => {
  const jobPage = new JobPage()
  const { hiredTalentSection } = jobPage

  const confirmationModal = new FormModal()

  const reopenModal = new FormModal()
  const importContractAsTopModal = new BasicModal()

  const sendEmailModal = new SendEmailModal()
  const reasonModal = new RejectTrial()
  const terminateEngagementModal = new TerminateEngagement()
  const changeStartDate = new ChangeStartDateModal()
  const changeEndDate = new ChangeEndDateModal()
  const sendTopModal = new SendTopModal()
  const importTopModal = new ImportTopModal()
  const updateBillingCycleSettings = new UpdateBillingCycleSettings()
  const scheduleBreakModal = new ScheduleBreakModal()

  describe('`Active` Engagement', () => {
    beforeEach(() =>
      updateEngagementActionsMocks({
        engagement: {
          status: EngagementStatus.ACTIVE,
          cumulativeStatus: EngagementCumulativeStatus.ACTIVE,

          operations: getEngagementOperations({
            rejectEngagementTrial: enabledOperationMock(),
            revertEngagementTrialToActive: enabledOperationMock(),
            cancelEngagementTrial: enabledOperationMock(),
            reopenExpiredEngagement: enabledOperationMock(),
            terminateEngagement: enabledOperationMock(),
            reactivateEngagement: enabledOperationMock(),
            changeEngagementStartDate: enabledOperationMock(),
            changeEngagementEndDate: enabledOperationMock(),
            sendTop: enabledOperationMock(),
            importTop: enabledOperationMock(),
            importContractAsTop: enabledOperationMock(),
            changeProductBillingFrequency: enabledOperationMock()
          })
        }
      })
    )

    it('opens `Reject Trial` modal', () => {
      jobPage.visit()

      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Reject Trial').click()
      reasonModal.close()
    })

    it('opens `Revert to Trial` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Revert to Trial').click()
      confirmationModal.close()
    })

    it('opens `Cancel Engagement` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Cancel Engagement').click()
      reasonModal.close()
    })

    it('opens `Reopen Engagement and Approve Trial` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown
        .contains('Reopen Engagement and Approve Trial')
        .click()
      reopenModal.close()
    })

    it('opens `Terminate Engagement` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('End Engagement').click()
      terminateEngagementModal.getReasonField().focus()
      terminateEngagementModal.close()
    })

    it('opens `Reactivate Engagement` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Reactivate Engagement').click()

      confirmationModal.comment.type('A')
      confirmationModal.close()
    })

    it('opens `Change Start Date` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Change Start Date').click()
      changeStartDate.getReasonField().focus()
      changeStartDate.close()
    })

    it('opens `Change End Date` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Change End Date').click()
      changeEndDate.getReasonField().focus()
      changeEndDate.close()
    })

    it('opens `Send TOP` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Send TOP').click()
      sendTopModal.clickButton('Cancel')
    })

    it('opens `Import TOP` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Import TOP').click()
      importTopModal.getGuidField().focus()
      importTopModal.close()
    })

    it('opens `Import STA as TOP` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Import STA as TOP').click()
      importContractAsTopModal.clickButton('Cancel')
    })

    it('opens `Update Billing Cycle Settings` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Update Billing Cycle Settings').click()
      updateBillingCycleSettings.clickButton('Close')
    })

    it('opens `Email Company` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Email Company').click()
      sendEmailModal.close()
    })

    it('opens `Email Talent` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Email Talent').click()
      sendEmailModal.close()
    })
  })

  describe('`OnTrial` Engagement', () => {
    beforeEach(() => {
      updateEngagementActionsMocks({
        engagement: {
          status: EngagementStatus.ON_TRIAL,
          cumulativeStatus: EngagementCumulativeStatus.ON_TRIAL,

          operations: getEngagementOperations({
            scheduleEngagementBreak: enabledOperationMock(),
            changeEngagementCommitment: enabledOperationMock(),
            approveEngagementTrial: enabledOperationMock()
          })
        }
      })
    })

    it('opens `Schedule Break` modal', () => {
      jobPage.visit()

      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Schedule Break').click()
      scheduleBreakModal.getSingleDayTab().focus()
      scheduleBreakModal.close()
    })

    it('opens `Change Commitment` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Change Commitment').click()
      //TODO: Implement waiting for skeleton loader to not be displayed
      cy.getByTestId('cancel').click()
    })

    it('opens `Approve Trial` modal', () => {
      hiredTalentSection.getFirstHiredTalentMoreButton().click()
      jobPage.moreDropdown.contains('Approve Trial').click()
      cy.getByTestId('CustomPromptButton-cancel-button').click()
    })
  })
})
