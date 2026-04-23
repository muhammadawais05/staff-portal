export default class EmailMessageItem {
  get emailAddress() {
    return cy.getByTestId('email-address')
  }
  get unknownEmail() {
    return cy.getByTestId('email-unknown')
  }

  get associateUserButton() {
    return cy.getByTestId('associate-user')
  }

  get blacklistEmailButton() {
    return cy.getByTestId('blacklist-email')
  }
}
