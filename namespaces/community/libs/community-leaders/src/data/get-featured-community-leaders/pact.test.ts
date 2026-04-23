import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction
} from '@staff-portal/pact-utils'

import {
  featuredCommunityLeadersMock,
  featuredCommunityLeadersMockCheck
} from '../../mocks/featured-community-leaders-pact'
import { GetFeaturedCommunityLeadersDocument } from './get-featured-community-leaders.staff.gql.types'

const RESPONSE_BODY = featuredCommunityLeadersMock

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('query for GetFeaturedCommunityLeaders', () => {
    beforeEach(() => {
      const graphqlQuery = new GraphQLInteraction()
        .given('community leader exists for a know role')
        .uponReceiving('Get Featured Community Leaders')
        .withOperation('GetFeaturedCommunityLeaders')
        .withQuery(serializeGQL(GetFeaturedCommunityLeadersDocument))
        .withVariables({})
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
        query: GetFeaturedCommunityLeadersDocument
      })

      expect(result.data).toMatchObject(featuredCommunityLeadersMockCheck)
    })
  })
})
