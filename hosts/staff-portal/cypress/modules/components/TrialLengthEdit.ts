/// <reference types="cypress" />

const componentName = 'TrialLengthEditModal'

class TrialLengthEdit {
  getTrialLengthEditModal() {
    return cy.getByTestId('TrialLengthEdit-modal')
  }

  getLengthSelector() {
    return this.getTrialLengthEditModal()
      .getByTestId(`${componentName}-trial-length`)
      .find('input:last')
  }

  getTrialLengthEditComment() {
    return this.getTrialLengthEditModal().findByTestId(
      `${componentName}-comment`
    )
  }

  getTrialLengthEditSubmitButton() {
    return this.getTrialLengthEditModal().findByTestId(
      `${componentName}-submit-button`
    )
  }
}

export default TrialLengthEdit
