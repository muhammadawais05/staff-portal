import { BasePage } from '~integration/modules/pages'

class EmailTemplatesPage extends BasePage {
  visit() {
    cy.visit('/email_templates')
  }

  get cloneEmailTemplatesButton() {
    return cy.getByTestId('email-templates-page-clone-button')
  }

  get deleteEmailTemplateButton() {
    return cy.getByTestId('email-templates-list-item-delete-button')
  }
}

export default EmailTemplatesPage
