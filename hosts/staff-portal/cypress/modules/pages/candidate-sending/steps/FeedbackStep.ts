class FeedbackStep {
  getFeedbackCellFieldInput(dataTestId: string) {
    return cy.getByTestId(dataTestId).find('textarea:first')
  }

  get submitButton() {
    return cy.getByTestId('candidate-sending-feedback-step-submit-button')
  }
}

export default FeedbackStep
