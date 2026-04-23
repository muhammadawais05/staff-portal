import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { ReorderFeaturedCommunityLeadersDocument } from './feature-community-leaders.staff.gql.types'

disableFragmentWarnings()

const { boolean } = Matchers

const VARIABLES = {
  leaderIds: ['VjEtQ29tbXVuaXR5TGVhZGVyLTEwMDAwMDA']
}

const RESPONSE_BODY = {
  data: {
    reorderFeaturedCommunityLeaders: {
      success: boolean(),
      errors: [],
      __typename: 'ReorderFeaturedCommunityLeadersPayload'
    }
  }
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Sort Featured Community Leaders', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('community leader exists for a know role')
        .uponReceiving('Sort Featured Community Leaders')
        .withOperation('ReorderFeaturedCommunityLeaders')
        .withQuery(serializeGQL(ReorderFeaturedCommunityLeadersDocument))
        .withVariables(VARIABLES)
        .withRequest(gatewayHeaders)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: RESPONSE_BODY
        })

      return provider.addInteraction(graphqlMutation)
    })

    it('returns the correct response', async () => {
      const result = await client.mutate({
        mutation: ReorderFeaturedCommunityLeadersDocument,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        reorderFeaturedCommunityLeaders: {
          __typename: 'ReorderFeaturedCommunityLeadersPayload',
          errors: [],
          success: true
        }
      })
    })
  })
})
