import { emailMessagesListPageStubs } from '~integration/mocks/request-stubs'

const updateEmailMessagesListPageStubs = () =>
  cy.stubGraphQLRequests({
    ...emailMessagesListPageStubs({
      emailMessages: []
    })
  })

export default updateEmailMessagesListPageStubs
