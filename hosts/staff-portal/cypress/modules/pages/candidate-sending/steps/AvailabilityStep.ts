class AvailabilityStep {
  get trialLength() {
    return cy.get('input[id="trialLength"]')
  }

  get talentAvailabilityCheckbox() {
    return cy.get('input[id="availabilityConfirmed"]')
  }

  get talentCommitmentCheckbox() {
    return cy.get('input[id="talentCommitmentConfirmed"]')
  }
}

export default AvailabilityStep
