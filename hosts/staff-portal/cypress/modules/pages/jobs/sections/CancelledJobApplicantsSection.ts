class CancelledJobApplicantsSection {
  get skeletonLoader() {
    return cy.getByTestId('CancelledJobApplicantsSection-table-skeleton')
  }

  get section() {
    return cy.getByTestId('CancelledJobApplicantsSection')
  }

  get rows() {
    return cy.getByTestId('cancelled-job-applicant-row')
  }

  get firstRow() {
    return cy.getByTestId('cancelled-job-applicant-row').first()
  }

  get emailApplicantButton() {
    return cy.getByTestId('email-talent-button')
  }
}

export default CancelledJobApplicantsSection
