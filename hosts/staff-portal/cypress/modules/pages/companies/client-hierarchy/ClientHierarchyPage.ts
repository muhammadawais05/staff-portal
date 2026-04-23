import { BasePage } from '~integration/modules/pages'

class ClientHierarchyPage extends BasePage {
  visit() {
    cy.visit('/clients/307753/hierarchy')
  }
}

export default ClientHierarchyPage
