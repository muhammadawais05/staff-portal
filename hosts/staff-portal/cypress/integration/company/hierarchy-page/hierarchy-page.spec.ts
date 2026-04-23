import ClientHierarchyPage from '~integration/modules/pages/companies/client-hierarchy/ClientHierarchyPage'
import { updateHierarchyPageStubs } from '~integration/mocks/schema-updates/client-hierarchy'

describe('ClientHierarchy', () => {
  const page = new ClientHierarchyPage()

  beforeEach(() => {
    updateHierarchyPageStubs()
    page.visit()
  })

  describe('Client Hierarchy Page', () => {
    it('shows all clients returned from query', () => {
      cy.contains('Beahan, Klocko and Larson').should('exist')
      cy.contains('Huel-Schuster PW').should('exist')
      cy.contains('Rau, Daniel and Dicki').should('exist')
    })
  })
})
