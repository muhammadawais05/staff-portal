import { meetingsPageStubs } from '~integration/mocks/request-stubs'

const updateMeetingsPageStubs = () =>
  cy.stubGraphQLRequests({
    ...meetingsPageStubs({
      meetings: []
    })
  })

export default updateMeetingsPageStubs
