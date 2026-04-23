class CommitmentChangeRequestSection {
  getSection() {
    return cy.getByTestId('CommitmentChangeRequestSection')
  }

  getApproveButton() {
    return cy.getByTestId('ApproveCommitmentChangeRequestButton')
  }

  getApproveModal() {
    return cy.getByTestId('ApproveCommitmentChangeRequestModal')
  }

  getRejectButton() {
    return cy.getByTestId('RejectCommitmentChangeRequestButton')
  }
}

export default CommitmentChangeRequestSection
