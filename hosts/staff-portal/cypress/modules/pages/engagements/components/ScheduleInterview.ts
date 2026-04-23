import { FormModal } from '~integration/modules/modals'

class ScheduleInterview extends FormModal {
  getSchedulingOption() {
    return cy.getByTestId(
      'ScheduleInterviewModalHeader-scheduling-toggle-button'
    )
  }

  getTimeZoneField() {
    return cy.getByTestId('ScheduleInterviewForm-time-zone').find('input:last')
  }

  getDateField() {
    return cy.getByTestId('FormInterviewTimeSlotSelect-date').find('input:last')
  }

  getTimeField() {
    return cy.getByTestId('FormInterviewTimeSlotSelect-time').find('input:last')
  }

  getCommunicationField() {
    return cy.getByTestId('FormInterviewCommunicationSelect').find('input:last')
  }

  getInitiatorField() {
    return cy.getByTestId('FormInterviewInitiatorSelect').find('input:last')
  }

  getInterviewContact() {
    return cy.getByTestId('FormInterviewContactsSelect').find('input:last')
  }

  getInterviewType() {
    return cy.getByTestId('FormInterviewTypeSelect').find('input:last')
  }

  getConfirmationModal() {
    return cy.getByTestId('ConfirmationModalContent-confirmation')
  }

  getTimeSlotDate() {
    return cy.getByTestId('FormInterviewTimeSlots-date').find('input:last')
  }

  getTimeSlotTime() {
    return cy.getByTestId('FormInterviewTimeSlots-time').find('input:last')
  }

  getGoogleCalendarInvitationField() {
    return cy
      .getByTestId('ScheduleInterviewForm-send-google-calendar-invitation')
      .find('input:last')
  }

  getAcceptInterviewForTalentCheckbox() {
    return cy.getByTestId('ScheduleInterviewForm-accept-interview-for-talent')
  }

  getEventReceiversField() {
    return cy
      .getByTestId('ScheduleInterviewGoogleForm-event-receivers')
      .find('input:last')
  }

  getAdditionalEventReceiversField() {
    return cy
      .getByTestId('ScheduleInterviewGoogleForm-additional-event-receivers')
      .find('input:last')
  }

  getTalentStatus() {
    return cy.getByTestId('engagement-talent-status')
  }

  getEngagementStatus() {
    return cy.getByTestId('EngagementStatus-default')
  }

  getInterviewStatus() {
    return cy.getByTestId('InterviewStatus')
  }
}

export default ScheduleInterview
