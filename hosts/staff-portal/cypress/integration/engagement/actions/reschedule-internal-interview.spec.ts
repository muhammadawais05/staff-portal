import { Engagement } from '~integration/modules/pages/engagements'
import { daysFromNow, ENTER_KEY } from '~integration/utils'
import { updateRescheduleInternalInterviewStubs } from '~integration/mocks/schema-updates/engagement'
import { ScheduleInterview } from '~integration/modules/pages/engagements/components'

describe('Engagement page -> More -> Reschedule Internal Interview', () => {
  const page = new Engagement()
  const scheduleInterview = new ScheduleInterview()

  beforeEach(() => {
    updateRescheduleInternalInterviewStubs()
  })

  describe('when `TopScheduler` option is selected and the form information is correct', () => {
    it('submits the form and updates the engagement status', () => {
      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Reschedule Internal Interview').click()

      scheduleInterview
        .getTimeZoneField()
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

      scheduleInterview.submitButton.click().click()

      cy.getNotification().should(
        'have.text',
        'The Interview was successfully rescheduled.'
      )
      cy.getNotification().find('button').click()
    })
  })

  describe('when `Classic Scheduling` option is selected and the form information is correct', () => {
    it('submits the form and updates the engagement status', () => {
      page.moreButton().click()
      page.moreDropdown.contains('Reschedule Internal Interview').click()

      scheduleInterview.getSchedulingOption().click()

      scheduleInterview
        .getTimeZoneField()
        .focus()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview
        .getTimeSlotDate()
        .type(daysFromNow(7))
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleInterview
        .getTimeSlotTime()
        .click()
        // TODO: remove { force: true } in scope of
        // https://toptal-core.atlassian.net/browse/SPB-2967
        .trigger('keydown', { keyCode: ENTER_KEY, force: true })
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
      scheduleInterview.getAcceptInterviewForTalentCheckbox().click()

      scheduleInterview.submitButton.click().click()

      cy.getNotification().should(
        'have.text',
        'The Interview was successfully rescheduled.'
      )
    })
  })
})
