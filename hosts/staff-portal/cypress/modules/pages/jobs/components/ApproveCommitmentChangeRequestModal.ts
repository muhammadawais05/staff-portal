import { FormModal } from '~integration/modules/modals'

class ApproveCommitmentChangeRequestModal extends FormModal {
  getChangeDateField() {
    return cy.getByTestId('ApproveCommitmentChangeRequestForm-change-date')
  }

  getTalentRateField() {
    return cy.getByTestId('ApproveCommitmentChangeRequestForm-talent-rate')
  }

  getCompanyRateField() {
    return cy.getByTestId('ApproveCommitmentChangeRequestForm-company-rate')
  }
}

export default ApproveCommitmentChangeRequestModal
