import { disableFragmentWarnings } from 'graphql-tag'
import {
  setupGatewayPactIntegration,
  serializeGQL,
  gatewayHeaders,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'
import { CommunityLeaderType } from '@staff-portal/graphql/staff'

import { APPOINT_COMMUNITY_LEADER } from './appoint-community-leader.staff.gql'

disableFragmentWarnings()

const { boolean, somethingLike } = Matchers

const VARIABLES = {
  input: {
    roleId: 'VjEtU3RhZmYtMzgwOTY1',
    type: CommunityLeaderType.COMMUNITY_LEADER,
    memos: 'Created description'
  }
}

const RESPONSE_BODY = {
  data: {
    appointCommunityLeader: {
      success: boolean(),
      errors: [
        {
          code: somethingLike('leaderExists'),
          key: somethingLike('base'),
          message: somethingLike(
            'Community leader or community leader application already exists.'
          ),
          __typename: 'StandardUserError'
        }
      ],
      __typename: 'AppointCommunityLeaderPayload'
    }
  }
}

describe('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Create Talent Community Leader Application', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('community leader exists for a know role')
        .uponReceiving('AppointCommunityLeader')
        .withOperation('AppointCommunityLeader')
        .withQuery(serializeGQL(APPOINT_COMMUNITY_LEADER))
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
        mutation: APPOINT_COMMUNITY_LEADER,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        appointCommunityLeader: {
          __typename: 'AppointCommunityLeaderPayload',
          success: true
        }
      })
    })
  })
})
