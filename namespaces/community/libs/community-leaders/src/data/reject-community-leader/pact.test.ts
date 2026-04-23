import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { REJECT_COMMUNITY_LEADER } from './reject-community-leader.staff.gql'

disableFragmentWarnings()

const { boolean } = Matchers

const VARIABLES = {
  id: 'VjEtQ29tbXVuaXR5TGVhZGVyLTEwMDAwMDA',
  comment: 'some text'
}

const RESPONSE_BODY = {
  data: {
    rejectCommunityLeaderApplication: {
      success: boolean(),
      errors: [],
      __typename: 'RejectCommunityLeaderApplicationPayload'
    }
  }
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Reject Talent Community Leader', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('applied community leader exists')
        .uponReceiving('RejectCommunityLeaderApplication')
        .withOperation('RejectCommunityLeaderApplication')
        .withQuery(serializeGQL(REJECT_COMMUNITY_LEADER))
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
        mutation: REJECT_COMMUNITY_LEADER,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        rejectCommunityLeaderApplication: {
          __typename: 'RejectCommunityLeaderApplicationPayload',
          errors: [],
          success: true
        }
      })
    })
  })
})
