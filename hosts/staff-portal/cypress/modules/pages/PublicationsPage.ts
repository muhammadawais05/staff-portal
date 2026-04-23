import BasePage from './BasePage'

class PublicationsPage extends BasePage {
  visit() {
    return cy.visit('/toptal-publications')
  }

  getRequests() {
    return cy.getByTestId('p2p-request')
  }
}

export default PublicationsPage
