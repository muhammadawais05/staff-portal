import { updateRescheduleInterviewStubs } from '~integration/mocks/schema-updates/engagement'
import { Engagement } from '~integration/modules/pages/engagements'
import { daysFromNow, ENTER_KEY } from '~integration/utils'
import { ScheduleInterview } from '~integration/modules/pages/engagements/components'

describe('Engagement page -> More -> Reschedule Interview', () => {
  const page = new Engagement()
  const scheduleInterview = new ScheduleInterview()

  beforeEach(() => {
    updateRescheduleInterviewStubs()
  })

  describe('when `TopScheduler` option is selected and the form information is correct', () => {
    it('reschedules the interview and displays the notification message', () => {
      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Reschedule').click()

      scheduleInterview
        .getSchedulingOption()
        .should('contain.text', 'Use Classic Scheduling')

      scheduleInterview
        .getTimeZoneField()
        .focus()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview
        .getDateField()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview
        .getTimeField()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview
        .getCommunicationField()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview
        .getInitiatorField()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview
        .getInterviewContact()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview
        .getInterviewType()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview.getGoogleCalendarInvitationField().click()
      scheduleInterview.getEventReceiversField().click({ multiple: true })
      scheduleInterview
        .getAdditionalEventReceiversField()
        .type('receiver@toptal.io')
      scheduleInterview.submitButton.click()

      scheduleInterview
        .getConfirmationModal()
        .should(
          'contain.text',
          'Are you sure you want to reschedule this interview?'
        )

      scheduleInterview.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The Interview was successfully rescheduled.'
      )
      cy.getNotification().find('button').click()
    })
  })

  describe('when `Classic Scheduling` option is selected and the form information is correct', () => {
    it('reschedules the interview and displays the notification message', () => {
      page.moreButton().click()
      page.moreDropdown.contains('Reschedule').click()

      scheduleInterview.getSchedulingOption().click()
      scheduleInterview
        .getSchedulingOption()
        .should('contain.text', 'Use TopScheduler Scheduling')

      scheduleInterview
        .getTimeZoneField()
        .focus()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview.getTimeSlotDate().type(daysFromNow(2)).blur()
      scheduleInterview
        .getTimeSlotTime()
        .click()
        // TODO: remove { force: true } in scope of
        // https://toptal-core.atlassian.net/browse/SPB-2967
        .trigger('keydown', { keyCode: ENTER_KEY, force: true })
      scheduleInterview
        .getCommunicationField()
        .focus()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview
        .getInitiatorField()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview
        .getInterviewContact()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview
        .getInterviewType()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview.getAcceptInterviewForTalentCheckbox().should('exist')
      scheduleInterview.getGoogleCalendarInvitationField().click()
      scheduleInterview.getEventReceiversField().click({ multiple: true })
      scheduleInterview
        .getAdditionalEventReceiversField()
        .type('receiver@toptal.io')
      scheduleInterview.submitButton.click()

      scheduleInterview
        .getConfirmationModal()
        .should(
          'contain.text',
          'Are you sure you want to reschedule this interview?'
        )

      scheduleInterview.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The Interview was successfully rescheduled.'
      )
    })
  })
})
