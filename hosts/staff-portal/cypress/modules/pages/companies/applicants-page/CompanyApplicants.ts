import BasePage from '../../BasePage'

class CompanyApplicants extends BasePage {
  get actions() {
    return cy.getByTestId('client-card-actions')
  }

  get phoneLink() {
    return cy.getByTestId('PhoneLink')
  }

  get skypeLink() {
    return cy.getByTestId('skype-id')
  }

  visit() {
    cy.visit('/applicants/companies')
  }
}

export default CompanyApplicants
