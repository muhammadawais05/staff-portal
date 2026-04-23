import { staffProfilePageStubs } from '~integration/mocks/request-stubs'

export const updateStaffProfileStubs = () => {
  cy.stubGraphQLRequests({
    ...staffProfilePageStubs()
  })
}
