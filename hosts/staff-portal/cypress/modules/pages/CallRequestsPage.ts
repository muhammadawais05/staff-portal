import BasePage from './BasePage'

class CallRequestsPage extends BasePage {
  visit(path?: string) {
    if (path) {
      cy.visit('/callback_requests' + path)
    } else {
      cy.visit('/callback_requests')
    }
  }

  get emptyMessage() {
    return cy.getByTestId('no-search-results')
  }

  get removeCallRequestButton() {
    return cy.getByTestId('remove-call-request-button')
  }

  get claimCallRequestButton() {
    return cy.getByTestId('claim-call-request-button')
  }

  get requestedTimeText() {
    return cy.getByTestId('requested-time-text')
  }

  get overlappingMeetingsText() {
    return cy.getByTestId('overlapping-meetings-text')
  }

  get callRequestStatus() {
    return cy.getByTestId('call-request-status')
  }
}

export default CallRequestsPage
