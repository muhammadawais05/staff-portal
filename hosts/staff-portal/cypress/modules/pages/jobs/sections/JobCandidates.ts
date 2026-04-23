class JobCandidates {
  get section() {
    return cy.getByTestId('JobCandidatesSection')
  }

  get expandAllButton() {
    return cy.getByTestId('CandidatesTableItemActions-toggle-all-button')
  }

  get rows() {
    return cy.getByTestId('CandidatesTableItem-row')
  }

  get firstCandidateCard() {
    return cy.getByTestId('CandidatesTableItem-row')
  }

  get firstCandidateCardMoreButton() {
    return this.firstCandidateCard.findByTestId('more-button')
  }

  openEditTrialLengthModal() {
    cy.getByTestId('TrialLengthEdit-button').click()
  }

  toggleFirstCandidateCard() {
    this.rows
      .getByTestId('CandidatesTableItemActions-expand-button')
      .first()
      .click()
  }

  toggleAllCandidateCards() {
    this.rows
      .getByTestId('CandidatesTableItemActions-toggle-all-button')
      .click()
  }
}

export default JobCandidates
