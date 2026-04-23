import { hierarchyPageStubs } from '~integration/mocks/request-stubs'

const updateHierarchyPageStubs = () =>
  cy.stubGraphQLRequests({
    ...hierarchyPageStubs()
  })

export default updateHierarchyPageStubs
