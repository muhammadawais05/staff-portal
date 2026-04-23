import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { APPROVE_COMMUNITY_LEADER } from './approve-community-leader.staff.gql'

disableFragmentWarnings()

const { boolean } = Matchers

const VARIABLES = {
  id: 'VjEtQ29tbXVuaXR5TGVhZGVyLTEwMDAwMDA',
  comment: 'some text'
}

const RESPONSE_BODY = {
  data: {
    approveCommunityLeaderApplication: {
      success: boolean(),
      errors: [],
      __typename: 'ApproveCommunityLeaderApplicationPayload'
    }
  }
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Approve Talent Community Leader', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('applied community leader exists')
        .uponReceiving('ApproveCommunityLeader')
        .withOperation('ApproveCommunityLeader')
        .withQuery(serializeGQL(APPROVE_COMMUNITY_LEADER))
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
        mutation: APPROVE_COMMUNITY_LEADER,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        approveCommunityLeaderApplication: {
          __typename: 'ApproveCommunityLeaderApplicationPayload',
          errors: [],
          success: true
        }
      })
    })
  })
})
