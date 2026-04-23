import { CancelMeetingPostActionName } from '@staff-portal/graphql/staff'

import { MeetingsPage } from '~integration/modules/pages'
import {
  updateMeetingsListCancelMeetingStubs,
  updateMeetingsListDeleteMeetingStubs,
  updateMeetingsListMarkMeetingAsNotCompletedStubs
} from '~integration/mocks/schema-updates/meetings'
import {
  DeleteMeetingModal,
  MarkMeetingAsNotCompletedModal
} from '~integration/modules/pages/meetings/components'
import { MeetingsListSection } from '~integration/modules/pages/meetings/sections'
import { meetingMock } from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks'
import { FormModal, SendEmailModal } from '~integration/modules/modals'
import { ENTER_KEY } from '~integration/utils'

describe('Meeting List -> Item -> Header Actions', () => {
  const page = new MeetingsPage()
  const meetingsListSection = new MeetingsListSection()

  describe('Cancel Meeting', () => {
    const confirmationModal = new FormModal()
    const sendEmailModal = new SendEmailModal()
    const meeting = meetingMock({
      operations: {
        cancelMeeting: enabledOperationMock()
      }
    })

    it('opens and submits `Cancel Meeting` modal', () => {
      updateMeetingsListCancelMeetingStubs({
        meetings: [meeting]
      })

      page.visit()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.cancelButton.click()
      })

      confirmationModal.comment.type('S')
      confirmationModal.submitButton.click()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.status.should('have.text', 'Cancelled')
      })
    })

    it('opens `Send Cancel Meeting Email` modal after meeting cancellation', () => {
      updateMeetingsListCancelMeetingStubs({
        meetings: [meeting],
        nextActionName: CancelMeetingPostActionName.SEND_TO_EMAIL_POST_ACTION
      })

      page.visit()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.cancelButton.click()
      })

      confirmationModal.comment.type('S')
      confirmationModal.submitButton.click()

      sendEmailModal.cancelButton.click()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.status.should('have.text', 'Cancelled')
      })
    })

    it('opens `Send Reschedule Screening Email` modal after meeting cancellation', () => {
      updateMeetingsListCancelMeetingStubs({
        meetings: [meeting],
        nextActionName: CancelMeetingPostActionName.RESCHEDULE_POST_ACTION
      })

      page.visit()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.cancelButton.click()
      })

      confirmationModal.comment.type('S')
      confirmationModal.submitButton.click()

      sendEmailModal.cancelButton.click()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.status.should('have.text', 'Cancelled')
      })
    })

    it('opens `Send Reschedule Review Call Email` modal after meeting cancellation', () => {
      updateMeetingsListCancelMeetingStubs({
        meetings: [meeting],
        nextActionName:
          CancelMeetingPostActionName.TALENT_ACTIVATION_RESCHEDULE_POST_ACTION
      })

      page.visit()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.cancelButton.click()
      })

      confirmationModal.comment.type('S')
      confirmationModal.submitButton.click()

      sendEmailModal.cancelButton.click()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.status.should('have.text', 'Cancelled')
      })
    })
  })

  describe('Delete Meeting', () => {
    const deleteMeetingModal = new DeleteMeetingModal()
    const meeting = meetingMock({
      operations: {
        removeMeeting: enabledOperationMock()
      }
    })

    it('opens and submits `Delete Meeting` modal', () => {
      updateMeetingsListDeleteMeetingStubs([meeting])

      page.visit()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.deleteButton.click()
      })

      updateMeetingsListDeleteMeetingStubs([])
      deleteMeetingModal.submitButton.click()

      meetingsListSection.items.should('not.exist')
    })
  })

  describe('Mark as Not Completed', () => {
    const markMeetingAsNotCompletedModal = new MarkMeetingAsNotCompletedModal()
    const meeting = meetingMock({
      operations: {
        failMeeting: enabledOperationMock()
      }
    })

    it('opens and submits `Delete Meeting` modal', () => {
      updateMeetingsListMarkMeetingAsNotCompletedStubs([meeting])

      page.visit()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.markAsNotCompletedButton.click()
      })

      markMeetingAsNotCompletedModal.outcomeField
        .find('input:last')
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      markMeetingAsNotCompletedModal.commentField.type('C')
      markMeetingAsNotCompletedModal.submitButton.click()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.status.should(
          'have.text',
          'Not Completed'
        )
      })
    })
  })
})
