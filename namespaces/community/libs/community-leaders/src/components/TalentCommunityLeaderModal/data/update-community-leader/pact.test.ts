import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'
import { CommunityLeaderType } from '@staff-portal/graphql/staff'

import { UPDATE_COMMUNITY_LEADER } from './update-community-leader.staff.gql'

disableFragmentWarnings()

const { boolean } = Matchers

const VARIABLES = {
  input: {
    id: 'VjEtQ29tbXVuaXR5TGVhZGVyLTEwMDAwMDA',
    type: CommunityLeaderType.COMMUNITY_LEADER,
    memos: 'Updated description'
  }
}

const RESPONSE_BODY = {
  data: {
    updateCommunityLeader: {
      success: boolean(),
      errors: [],
      __typename: 'UpdateCommunityLeaderPayload'
    }
  }
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Update Community Leader', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('community leader exists for a know role')
        .uponReceiving('UpdateCommunityLeader')
        .withOperation('UpdateCommunityLeader')
        .withQuery(serializeGQL(UPDATE_COMMUNITY_LEADER))
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
        mutation: UPDATE_COMMUNITY_LEADER,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        updateCommunityLeader: {
          __typename: 'UpdateCommunityLeaderPayload',
          success: true
        }
      })
    })
  })
})
