class CreateClaimerModal {
  get submitButton() {
    return cy.getByTestId('submit-claim-company')
  }
}

export default CreateClaimerModal
