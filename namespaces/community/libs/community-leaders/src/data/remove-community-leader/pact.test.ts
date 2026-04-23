import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { REMOVE_COMMUNITY_LEADER } from './remove-community-leader.staff.gql'

disableFragmentWarnings()

const { boolean } = Matchers

const VARIABLES = {
  input: {
    id: 'VjEtQ29tbXVuaXR5TGVhZGVyLTEwMDAwMDA'
  }
}

const RESPONSE_BODY = {
  data: {
    removeCommunityLeader: {
      success: boolean(),
      errors: [],
      __typename: 'RemoveCommunityLeaderPayload'
    }
  }
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Remove Talent Community Leader', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('community leader exists for a know role')
        .uponReceiving('RemoveCommunityLeader')
        .withOperation('RemoveCommunityLeader')
        .withQuery(serializeGQL(REMOVE_COMMUNITY_LEADER))
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
        mutation: REMOVE_COMMUNITY_LEADER,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        removeCommunityLeader: {
          __typename: 'RemoveCommunityLeaderPayload',
          errors: [],
          success: true
        }
      })
    })
  })
})
