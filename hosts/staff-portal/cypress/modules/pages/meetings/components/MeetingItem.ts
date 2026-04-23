export default class MeetingItem {
  get becomeOrganizerButton() {
    return cy.getByTestId('become-meeting-organizer-button')
  }

  get changeOrganizerButton() {
    return cy.getByTestId('meeting-change-organizer-button')
  }

  get attendeeAutocompleteField() {
    return cy.getByTestId('autocomplete')
  }

  get attendeeSubmitButton() {
    return cy.getByTestId('meeting-attendee-field-submit-button')
  }

  get cancelButton() {
    return cy.getByTestId('MeetingCancelButton')
  }

  get deleteButton() {
    return cy.getByTestId('meeting-delete-button')
  }

  get markAsNotCompletedButton() {
    return cy.getByTestId('meeting-mark-as-not-completed-button')
  }

  get viewAttendeeLogButton() {
    return cy.getByTestId('meeting-with-field-button')
  }

  get attendee() {
    return cy
      .getByTestId('item-field: Attendee')
      .findByTestId('item-field-value')
      .find('button')
  }

  get status() {
    return cy.getByTestId('item-field: Status').findByTestId('item-field-value')
  }
}
