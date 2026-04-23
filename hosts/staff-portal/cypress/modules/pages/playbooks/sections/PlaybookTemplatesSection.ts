class PlaybookTemplatesSection {
  get section() {
    return cy.getByTestId('playbook-content-wrapper-page')
  }

  get items() {
    return this.section.findByTestId('playbook-template-card')
  }

  get firstItem() {
    return this.items.first()
  }

  get editPlaybookTemplateButton() {
    return this.firstItem.getByTestId('edit-playbook-template-button')
  }
}

export default PlaybookTemplatesSection
