import { BasePage } from '~integration/modules/pages'

class LinkedCompaniesSection extends BasePage {
  get() {
    return cy.getByTestId('LinkedCompaniesSection')
  }

  get moreButton() {
    return this.get().findByTestId('more-button')
  }

  getTableRows() {
    return cy.getByTestId('LinkedCompaniesSection-table-row')
  }

  toggleBadLeadStatusCheckbox() {
    cy.getByTestId('LinkedCompaniesSection-showBadLeads').click()
  }
}

export default LinkedCompaniesSection
