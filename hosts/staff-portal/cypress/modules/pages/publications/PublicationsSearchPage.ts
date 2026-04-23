import BasePage from '../BasePage'

class PublicationsSearchPage extends BasePage {
  visit(requestId: string) {
    return cy.visit('/gig_candidates?request_id=' + requestId)
  }

  get numberOfCandidates() {
    return cy.getByTestId('content-title')
  }

  get sendReachOutButton() {
    return cy.getByTestId('reach-out-send-button')
  }

  get submitReachOutButton() {
    return cy.getByTestId('send-request-modal-confirm')
  }

  get requestDescription() {
    return cy.getByTestId('gig-skills-filter-request-description')
  }
}

export default PublicationsSearchPage
