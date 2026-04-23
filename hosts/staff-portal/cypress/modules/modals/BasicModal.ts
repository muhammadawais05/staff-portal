class BasicModal {
  protected get modal() {
    return cy.get('div[role="dialog"]')
  }

  protected get closeButton() {
    return this.modal.findByTestId('close-modal')
  }

  get self() {
    return this.modal
  }

  close() {
    this.closeButton.click()
  }

  clickButton(text: string) {
    return this.modal.find('button').contains(text).click()
  }
}

export default BasicModal
