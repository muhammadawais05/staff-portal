import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { RESTORE_COMMUNITY_LEADER } from './restore-community-leader.staff.gql'

disableFragmentWarnings()

const { somethingLike, boolean } = Matchers

const VARIABLES = {
  input: {
    id: 'VjEtQ29tbXVuaXR5TGVhZGVyLTEwMDAwMDA'
  }
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Restore Talent Community Leader', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('removed community leader exists')
        .uponReceiving('RestoreCommunityLeader')
        .withOperation('RestoreCommunityLeader')
        .withQuery(serializeGQL(RESTORE_COMMUNITY_LEADER))
        .withVariables(VARIABLES)
        .withRequest(gatewayHeaders)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: {
            data: {
              restoreCommunityLeader: {
                success: boolean(),
                errors: [],
                __typename: 'RestoreCommunityLeaderPayload'
              }
            }
          }
        })

      return provider.addInteraction(graphqlMutation)
    })

    it('returns the correct response', async () => {
      const result = await client.mutate({
        mutation: RESTORE_COMMUNITY_LEADER,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        restoreCommunityLeader: {
          __typename: 'RestoreCommunityLeaderPayload',
          errors: [],
          success: true
        }
      })
    })
  })

  describe('Restore already existing Talent Community Leader', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('community leader exists for a know role')
        .uponReceiving(
          'RestoreCommunityLeader when CommunityLeader already exists'
        )
        .withOperation('RestoreCommunityLeader')
        .withQuery(serializeGQL(RESTORE_COMMUNITY_LEADER))
        .withVariables(VARIABLES)
        .withRequest(gatewayHeaders)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: {
            data: {
              restoreCommunityLeader: {
                errors: [
                  {
                    code: somethingLike('leaderNotRemoved'),
                    message: somethingLike(
                      'Only removed Community Leaders can be restored.'
                    ),
                    __typename: 'StandardUserError'
                  }
                ],
                success: false
              }
            }
          }
        })

      return provider.addInteraction(graphqlMutation)
    })

    it('returns error response', async () => {
      const result = await client.mutate({
        mutation: RESTORE_COMMUNITY_LEADER,
        variables: VARIABLES
      })

      expect(result.data).toStrictEqual({
        restoreCommunityLeader: {
          errors: [
            {
              code: 'leaderNotRemoved',
              message: 'Only removed Community Leaders can be restored.',
              __typename: 'StandardUserError'
            }
          ],
          success: false
        }
      })
    })
  })
})
