import { BasePage } from '~integration/modules/pages'
import { StaffProfileActions } from './components'
import { RoleFlags } from '~integration/modules/components'

class StaffProfilePage extends BasePage {
  actions = new StaffProfileActions()
  roleFlags = new RoleFlags()

  visit() {
    cy.visit('/staff/123')
  }

  get showHistory() {
    return cy.getByTestId('history-button')
  }

  get moreButton() {
    return cy.getByTestId('more-button')
  }

  get changeOfacStatusButton() {
    return cy.getByTestId('change-ofac-status-button')
  }

  get billingNotesButton() {
    return cy.getByTestId('EditableField-toggle-button-billingNotes')
  }

  get billingNotesTextArea() {
    return cy.getByTestId('EditableTextarea-input')
  }

  get billingNotesLabel() {
    return cy.getByTestId('EditableField-billingNotes')
  }

  get billingNotesSubmitButton() {
    return cy.getByTestId('EditableField-billingNotes-editor-submit')
  }

  get paymentsEmployeeTypeButton() {
    return cy.getByTestId('EditableField-toggle-button-paymentsEmployeeType')
  }

  get paymentsEmployeeTypeLabel() {
    return cy.getByTestId('EditableField-paymentsEmployeeType')
  }

  get paymentsEmployeeTypeSelect() {
    return cy.getByTestId('EditableField-paymentsEmployeeType-editor')
  }

  get paymentsFrequencyButton() {
    return cy.getByTestId('EditableField-toggle-button-paymentsFrequency')
  }

  get paymentsFrequencySelect() {
    return cy.getByTestId('EditableField-paymentsFrequency-editor')
  }

  get calendarIncrease() {
    return cy.getByTestId('calendar-skeleton-actions-increase')
  }

  get paymentsFrequencyLabel() {
    return cy.getByTestId('EditableField-paymentsFrequency')
  }

  getDayOffCalendarContainer(day: number) {
    return cy.getByTestId(`day-off-calendar-day-date-container-${day}`)
  }
}

export default StaffProfilePage
