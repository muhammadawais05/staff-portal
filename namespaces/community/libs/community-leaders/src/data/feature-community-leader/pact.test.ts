import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { FeatureCommunityLeaderDocument } from './feature-community-leader.staff.gql.types'

disableFragmentWarnings()

const { boolean } = Matchers

const VARIABLES = {
  input: {
    id: 'VjEtQ29tbXVuaXR5TGVhZGVyLTEwMDAwMDA'
  }
}

const RESPONSE_BODY = {
  data: {
    featureCommunityLeader: {
      success: boolean(),
      errors: [],
      __typename: 'FeatureCommunityLeaderPayload'
    }
  }
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Feature Talent Community Leader', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('community leader exists when unfeatured')
        .uponReceiving('Feature Community Leader')
        .withOperation('FeatureCommunityLeader')
        .withQuery(serializeGQL(FeatureCommunityLeaderDocument))
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
        mutation: FeatureCommunityLeaderDocument,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        featureCommunityLeader: {
          __typename: 'FeatureCommunityLeaderPayload',
          errors: [],
          success: true
        }
      })
    })
  })
})
