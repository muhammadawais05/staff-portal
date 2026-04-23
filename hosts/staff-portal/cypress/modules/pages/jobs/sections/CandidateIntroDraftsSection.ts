class CandidateIntroDraftsSection {
  getSection() {
    return cy.getByTestId('JobCandidateIntroDrafts-section')
  }

  getViewPitchSnippetsButton() {
    return this.getSection().findByTestId('ViewPitchSnippetsButton')
  }

  getCandidateIntroDraftsRow() {
    return cy.getByTestId('CandidateIntroDraftsTable-row')
  }

  getMoreButton() {
    return this.getCandidateIntroDraftsRow().getByTestId('more-button')
  }

  getRejectDraftEngagement() {
    return cy.getByTestId('reject-draft-engagement')
  }
}

export default CandidateIntroDraftsSection
