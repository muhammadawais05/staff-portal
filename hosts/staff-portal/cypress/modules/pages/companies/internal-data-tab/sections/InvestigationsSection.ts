import { BasePage } from '~integration/modules/pages'

class InvestigationsSection extends BasePage {
  openStartInvestigationModal() {
    cy.getByTestId('investigation-start-button').click()
  }

  openUpdateInvestigationModal() {
    cy.getByTestId('investigation-update-button').click()
  }

  investigationReasonLabel() {
    return cy.getByTestId('investigation-reason').find('label')
  }

  investigationReasonError() {
    return cy.getFieldError('investigation-reason')
  }

  selectInvestigationReason(value: string) {
    cy.selectMenuOptionByValue({
      field: 'investigation-reason',
      value
    })

    return this
  }

  enterInvestigationComment(value: string) {
    cy.getByTestId('investigation-comment').type(value)
  }

  clearInvestigationComment() {
    cy.getByTestId('investigation-comment').clear()

    return this
  }

  investigationCommentError() {
    return cy.getFieldError('investigation-comment')
  }

  submitInvestigation() {
    cy.get('button[type=submit]').click()
  }

  toggleInvestigationsList() {
    cy.getByTestId('InvestigationsToggleButton').click()
  }

  openResolveInvestigationButton() {
    return cy.getByTestId('investigation-resolve-button')
  }

  openResolveInvestigationModal() {
    this.openResolveInvestigationButton().click()
  }

  submitResolveInvestigation() {
    cy.get('button[type=submit]').click()
  }

  resolveInvestigationResolutionError() {
    return cy.getFieldError('InvestigationResolve-resolution-select')
  }

  resolveInvestigationCommentError() {
    return cy.getFieldError('investigation-resolve-modal-comment')
  }

  resolveInvestigationIssueSourceError() {
    return cy.getFieldError('InvestigationResolveModal-issueSource')
  }

  resolveInvestigationInitialRefund() {
    return cy
      .getByTestId('InvestigationResolveModal-initialRefund')
      .find('input')
  }

  enterResolveInvestigationInitialRefund(value: string) {
    this.resolveInvestigationInitialRefund().type(value)

    return this
  }

  resolveInvestigationInitialRefundError() {
    return cy.getFieldError('InvestigationResolveModal-initialRefund')
  }

  resolveInvestigationRefundProvided() {
    return cy
      .getByTestId('InvestigationResolveModal-refundProvided')
      .find('input')
  }

  enterResolveInvestigationRefundProvided(value: string) {
    this.resolveInvestigationRefundProvided().type(value)

    return this
  }

  resolveInvestigationRefundProvidedError() {
    return cy.getFieldError('InvestigationResolveModal-refundProvided')
  }

  selectResolveInvestigationIssueSource(value: string) {
    cy.selectMenuOptionByValue({
      field: 'InvestigationResolveModal-issueSource',
      value
    })

    return this
  }

  selectResolveInvestigationResolution(value: string) {
    cy.selectMenuOptionByValue({
      field: 'InvestigationResolve-resolution-select',
      value
    })

    return this
  }

  enterResolveInvestigationComment(value: string) {
    cy.getByTestId('investigation-resolve-modal-comment').type(value)

    return this
  }

  formBaseError() {
    return cy.getByTestId('FormBaseErrorContainer-error')
  }
}

export default InvestigationsSection
