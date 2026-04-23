import { LinkSourcingRequestModal } from './components'

class SourcingRequests {
  linkSourcingRequestModal = new LinkSourcingRequestModal()

  protected get section() {
    return cy.getByTestId('talent-sourcing-requests-section')
  }

  get linkSourcingRequest() {
    return this.section.find('button').contains('Link Sourcing Request')
  }
}

export default SourcingRequests
