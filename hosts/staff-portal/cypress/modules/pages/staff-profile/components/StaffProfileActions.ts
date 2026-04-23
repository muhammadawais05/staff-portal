export default class StaffProfileMoreActions {
  get sendEmailMenuOption() {
    return cy.getByTestId('actions-dropdown-operation-SendEmail')
  }

  get restoreMenuOption() {
    return cy.getByTestId('actions-dropdown-operation-Restore')
  }

  get deleteMenuOption() {
    return cy.getByTestId('actions-dropdown-operation-Delete')
  }

  get paymentHistoryMenuOption() {
    return cy.getByTestId('actions-dropdown-operation-PaymentHistory')
  }
}
