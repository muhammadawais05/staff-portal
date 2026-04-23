class OfacComplianceSection {
  get section() {
    return cy.getByTestId('talent-ofac-compliance-section')
  }

  get changeOfacStatusButton() {
    return this.section.findByTestId('change-ofac-status-button')
  }
}

export default OfacComplianceSection
