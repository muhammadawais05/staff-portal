import { talentListPageStubs } from '~integration/mocks/request-stubs'

const updateTalentListPageStubs = () =>
  cy.stubGraphQLRequests({
    ...talentListPageStubs({
      talents: []
    })
  })

export default updateTalentListPageStubs
