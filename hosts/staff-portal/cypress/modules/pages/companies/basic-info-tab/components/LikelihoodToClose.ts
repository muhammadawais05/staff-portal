const modalComponentName = 'LikelihoodToCloseModal'

class LikelihoodToClose {
  getConfirmButton() {
    return cy.getByTestId(`${modalComponentName}-confirm`)
  }

  getFieldViewer() {
    return cy.getByTestId('LikelihoodToClose-viewer')
  }

  getLikelihoodToCloseCommentField() {
    return cy.getByTestId(`${modalComponentName}-comment`)
  }

  getToggleButton() {
    return cy.getByTestId('LikelihoodToClose-toggle-button')
  }

  selectLikelihoodToClose(text: string) {
    return cy.selectMenuOptionByText({
      field: `${modalComponentName}-select`,
      text
    })
  }
}

export default LikelihoodToClose
