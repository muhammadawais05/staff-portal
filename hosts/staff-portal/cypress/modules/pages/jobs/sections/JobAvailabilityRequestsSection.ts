import WithdrawAvailabilityRequestModal from '../components/WithdrawAvailabilityRequestModal'
import { updateAvailabilityRequestsExpandMocks } from '~integration/mocks/schema-updates/job'

export default class JobAvailabilityRequestsSection {
  withdrawModal = new WithdrawAvailabilityRequestModal()

  getSection() {
    return cy.getByTestId('JobAvailabilityRequest-section')
  }

  getRows() {
    return cy.getByTestId('JobAvailabilityRequest-row')
  }

  getFieldContainer(label: string) {
    return this.getSection().findByTestId(`FiltersField:${label}`)
  }

  selectRadioInput(label: string, value: string) {
    this.getFieldContainer(label)
      .findByTestId('Filters-select-single-choice')
      .get('[type="radio"]')
      .check(value)
  }

  getFirstRow() {
    return cy.getByTestId('JobAvailabilityRequest-row').first()
  }

  expandAvailabilityRequest() {
    this.getFirstRow()
      .findByTestId('JobAvailabilityRequest-expand-button')
      .click()
    updateAvailabilityRequestsExpandMocks()
  }

  getWithdrawButton() {
    return cy.getByTestId('JobAvailabilityRequest-withdraw-button')
  }

  getSendEmailButton() {
    return cy.getByTestId('JobAvailabilityRequest-send-email-button')
  }

  getExpandedContent() {
    return cy.getByTestId('JobAvailabilityRequest-item-content')
  }

  getInputChecked() {
    return cy.get(`input:checked`)
  }
}
