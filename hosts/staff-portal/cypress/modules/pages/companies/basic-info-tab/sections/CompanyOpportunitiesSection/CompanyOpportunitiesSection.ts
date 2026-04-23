import { BasePage } from '~integration/modules/pages'

class CompanyOpportunitiesSection extends BasePage {
  get() {
    return cy.getByTestId('company-opportunities-section')
  }

  getTableRows() {
    return cy.getByTestId('company-opportunities-section-table-row')
  }

  toggleShowSubsidiaryCompaniesCheckbox() {
    cy.getByTestId('company-opportunities-show-subsidiary-companies').click()
  }
}

export default CompanyOpportunitiesSection
