import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction
} from '@staff-portal/pact-utils'

import {
  communityLeadersMock,
  communityLeadersMockCheck
} from '../../mocks/community-leaders-pact'
import { GET_COMMUNITY_LEADERS } from './get-community-leaders.staff.gql'

const VARIABLES = {
  filter: '*Laraine T*',
  limit: 10,
  offset: 0,
  status: 'ACTIVE'
}

const RESPONSE_BODY = communityLeadersMock

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('query for CommunityLeaders', () => {
    beforeEach(() => {
      const graphqlQuery = new GraphQLInteraction()
        .given('community leader exists for a know role')
        .uponReceiving('CommunityLeaders')
        .withOperation('CommunityLeaders')
        .withQuery(serializeGQL(GET_COMMUNITY_LEADERS))
        .withVariables(VARIABLES)
        .withRequest(gatewayHeaders)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: RESPONSE_BODY
        })

      return provider.addInteraction(graphqlQuery)
    })

    it('returns the correct response', async () => {
      const result = await client.query({
        query: GET_COMMUNITY_LEADERS,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject(communityLeadersMockCheck)
    })
  })
})
