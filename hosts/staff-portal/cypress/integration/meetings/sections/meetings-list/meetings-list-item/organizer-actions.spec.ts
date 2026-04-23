import { MeetingsPage } from '~integration/modules/pages'
import {
  updateMeetingsListBecomeMeetingOrganizerStubs,
  updateMeetingsListTransferMeetingOrganizerStubs
} from '~integration/mocks/schema-updates/meetings'
import { MeetingsListSection } from '~integration/modules/pages/meetings/sections'
import { meetingMock } from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks'
import {
  BecomeMeetingOrganizerModal,
  TransferMeetingModal
} from '~integration/modules/pages/meetings/components'
import { ENTER_KEY } from '~integration/utils'

describe('Meeting List -> Item -> Organizer Actions', () => {
  const page = new MeetingsPage()
  const meetingsListSection = new MeetingsListSection()

  describe('Assign Self as Organizer', () => {
    const becomeMeetingOrganizerModal = new BecomeMeetingOrganizerModal()
    const meeting = meetingMock({
      operations: {
        becomeMeetingOrganizer: enabledOperationMock()
      }
    })

    it('opens and submits `Assign Self as Organizer` modal', () => {
      updateMeetingsListBecomeMeetingOrganizerStubs(meeting)

      page.visit()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.becomeOrganizerButton.click()
      })

      becomeMeetingOrganizerModal.submitButton.click()
      becomeMeetingOrganizerModal.pickAnotherOrganizerButton.click()
      becomeMeetingOrganizerModal.submitButton.click()
      becomeMeetingOrganizerModal.confirmButton.click()
    })
  })

  describe('Change Organizer', () => {
    const transferMeetingModal = new TransferMeetingModal()
    const meeting = meetingMock({
      operations: {
        transferMeeting: enabledOperationMock()
      }
    })

    it('opens and submits `Change Organizer` modal', () => {
      updateMeetingsListTransferMeetingOrganizerStubs(meeting)

      page.visit()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.changeOrganizerButton.click()
      })

      transferMeetingModal.organizerSchedulerFieldLastOption
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      transferMeetingModal.submitButton.click()
      transferMeetingModal.pickAnotherOrganizerButton.click()
      transferMeetingModal.organizerSchedulerFieldLastOption
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      transferMeetingModal.submitButton.click()
      transferMeetingModal.confirmButton.click()
    })
  })
})
