import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { UnfeatureCommunityLeaderDocument } from './remove-featured-community-leader.staff.gql.types'

disableFragmentWarnings()

const { boolean } = Matchers

const VARIABLES = {
  input: {
    id: 'VjEtQ29tbXVuaXR5TGVhZGVyLTEwMDAwMDA'
  }
}

const RESPONSE_BODY = {
  data: {
    unfeatureCommunityLeader: {
      success: boolean(),
      errors: [],
      __typename: 'UnfeatureCommunityLeaderPayload'
    }
  }
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('mutation for Unfeature Community Leader', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('community leader exists for a know role')
        .uponReceiving('Unfeature Community Leader')
        .withOperation('UnfeatureCommunityLeader')
        .withQuery(serializeGQL(UnfeatureCommunityLeaderDocument))
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
        mutation: UnfeatureCommunityLeaderDocument,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        unfeatureCommunityLeader: {
          __typename: 'UnfeatureCommunityLeaderPayload',
          errors: [],
          success: true
        }
      })
    })
  })
})
