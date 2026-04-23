class SkillsStep {
  get lowerConfidenceRadioButton() {
    return cy.get('input[value="NO"]')
  }

  get commentField() {
    return cy.getByTestId('candidate-sending-skills-step-form-comment')
  }
}

export default SkillsStep
