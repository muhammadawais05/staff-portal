class BreaksSection {
  editBreakButton() {
    return cy.getByTestId('EditBreakButton-button')
  }

  deleteBreakButton() {
    return cy.getByTestId('DeleteBreakButton-button')
  }

  engagementBreaksItems() {
    return cy.getByTestId('EngagementBreaks-row')
  }
}

export default BreaksSection
