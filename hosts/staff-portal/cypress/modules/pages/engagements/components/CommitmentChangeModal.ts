import { FormModal } from '~integration/modules/modals'

class CommitmentChangeModal extends FormModal {
  get talentHourlyRateField() {
    return cy.getByTestId('talent-hourly-rate')
  }

  get companyHourlyRateField() {
    return cy.getByTestId('company-hourly-rate')
  }

  get partTimeDiscountField() {
    return cy.getByTestId('partTime-discount')
  }

  get talentPartTimeRateField() {
    return cy.getByTestId('talent-partTime-rate')
  }

  get companyPartTimeRateField() {
    return cy.getByTestId('company-partTime-rate')
  }

  get fullTimeDiscountField() {
    return cy.getByTestId('fullTime-discount')
  }

  get talentFullTimeRateField() {
    return cy.getByTestId('talent-fullTime-rate')
  }

  get companyFullTimeRateField() {
    return cy.getByTestId('company-fullTime-rate')
  }

  get cancelButton() {
    return cy.getByTestId('cancel')
  }
}

export default CommitmentChangeModal
