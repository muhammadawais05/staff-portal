import BasePage from '../BasePage'

class PublicationsDetailsPage extends BasePage {
  visit(requestId: string) {
    return cy.visit('/toptal-publications/' + requestId)
  }

  get claimButton() {
    return cy.getByTestId('claimButton')
  }

  get claimedByField() {
    return cy.getByTestId('claimed-by')
  }

  get searchCandidatesButton() {
    return cy.getByTestId('search-candidates').first()
  }

  get closeButton() {
    return cy.getByTestId('CloseButton')
  }

  get closeReasonField() {
    return cy.getByTestId('CloseRequest-closingReason')
  }

  get submitCloseReasonButton() {
    return cy.getByTestId('CloseRequest-confirm')
  }

  get markAsFullfilledButton() {
    return cy.getByTestId('complete-action')
  }

  get requestStatus() {
    return cy.getByTestId('request-status')
  }

  get reachOutStatusField() {
    return cy.get('[data-testid="reach-out-status"]')
  }

  get showMoreLink() {
    return cy.getByTestId('showMoreOptions')
  }
}

export default PublicationsDetailsPage
