import { talentListPageStubs } from '~integration/mocks/request-stubs'

const updateNavigateTalentListItemTabsStubs = () =>
  cy.stubGraphQLRequests({
    ...talentListPageStubs()
  })

export default updateNavigateTalentListItemTabsStubs
