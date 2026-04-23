import BasePage from './BasePage'

class EmailMessagesPage extends BasePage {
  visit() {
    cy.visit('/email_messages')
  }

  visitFromTalent() {
    cy.visit('/talents/3154665/email_messages')
  }

  get emptyMessage() {
    return cy.getByTestId('no-search-results')
  }

  get sendEmailButton() {
    return cy.getByTestId('send-client-or-role-email-item')
  }

  get emailMessageItem() {
    return cy.getByTestId('email-container')
  }
}

export default EmailMessagesPage
