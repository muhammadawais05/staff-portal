import { FormModal } from '~integration/modules/modals'

class EditInterviewDetails extends FormModal {
  getTitleField() {
    return cy
      .getByTestId('ScheduleInterviewGoogleForm-event-title')
      .find('input:last')
  }

  getDescriptionField() {
    return cy.getByTestId('ScheduleInterviewEventDescriptionField-input')
  }

  getReceiversField() {
    return cy
      .getByTestId('ScheduleInterviewGoogleForm-additional-event-receivers')
      .find('input:last')
  }

  getEventReceiversGroup() {
    return cy.get('input[type=checkbox]')
  }
}

export default EditInterviewDetails
