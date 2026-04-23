import { BasePage } from '~integration/modules/pages'

class JobListPage extends BasePage {
  visit() {
    cy.visit('/jobs')
  }

  get addNewJobButton() {
    return cy.getByTestId('add-job-button')
  }

  get firstEditInvoiceButton() {
    return cy.getByTestId('update-invoice-note-modal-edit-button').eq(0)
  }

  get firstClaimAndApproveJobButton() {
    return cy.getByTestId('claim-and-approve-job-button').eq(0)
  }
}

export default JobListPage
