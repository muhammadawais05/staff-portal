import { MeetingsPage } from '~integration/modules/pages'
import { updateMeetingsListAttendeeStubs } from '~integration/mocks/schema-updates/meetings'
import { MeetingsListSection } from '~integration/modules/pages/meetings/sections'
import { meetingMock } from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks'
import { DEBOUNCED_AUTOCOMPLETE, ENTER_KEY } from '~integration/utils'

describe('Meeting List -> Item -> Attendee Actions', () => {
  const page = new MeetingsPage()
  const meetingsListSection = new MeetingsListSection()

  describe('View Attendee Log', () => {
    const meeting = meetingMock({
      conferenceLink: {
        text: 'some text',
        url: 'https://some-url'
      }
    })

    it('views attendee log', () => {
      updateMeetingsListAttendeeStubs(meeting)

      page.visit()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.viewAttendeeLogButton.click()
      })
    })
  })

  describe('Change Attendee', () => {
    const meeting = meetingMock({
      attendee: null,
      operations: {
        assignMeetingAttendee: enabledOperationMock()
      }
    })

    it('changes Attendee', () => {
      updateMeetingsListAttendeeStubs(meeting)
      cy.clock()

      page.visit()

      meetingsListSection.firstItem.within(() => {
        meetingsListSection.meetingItem.attendee.click()
        meetingsListSection.meetingItem.attendeeAutocompleteField
          .click()
          .type('Ma')
          .tick(DEBOUNCED_AUTOCOMPLETE)
        meetingsListSection.meetingItem.attendeeAutocompleteField.trigger(
          'keydown',
          {
            keyCode: ENTER_KEY
          }
        )

        meetingsListSection.meetingItem.attendeeSubmitButton.click()
      })
    })
  })
})
