import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

const { string, eachLike, boolean, somethingLike } = Matchers

import { GetCommunityLeaderApplicationsHistoryDocument } from './get-community-leader-applications-history.staff.gql.types'

disableFragmentWarnings()

const VARIABLES = {
  id: 'VjEtVGFsZW50LTM4MDk2NQ'
}

const RESPONSE_BODY = {
  data: {
    communityLeader: {
      id: somethingLike(
        'VjEtVGFsZW50Q29tbXVuaXR5TGVhZGVyRWRnZVR5cGUtMzA1ODkxMw'
      ),
      applicationsHistory: eachLike({
        id: somethingLike(
          'VjEtVGFsZW50Q29tbXVuaXR5Q29tbXVuaXR5TGVhZGVyQXBwbGljYXRpb24tMTY2'
        ),
        createdAt: string('2022-03-18T16:21:58+07:00'),
        updatedAt: string('2022-03-18T16:30:04+07:00'),
        commitment: boolean(true),
        initialIdeas: string('hh'),
        slackChannel: string(''),
        holdComment: null,
        type: string('ONLINE_LEADER'),
        performerComment: string('ds'),
        status: string('REJECTED'),
        __typename: 'CommunityLeaderApplication'
      }),
      __typename: 'CommunityLeaderAccount'
    }
  }
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Get Community Leader Applications', () => {
    beforeEach(() => {
      const graphqlQuery = new GraphQLInteraction()
        .given('rejected community leader exists')
        .uponReceiving(
          'Get CommunityLeader Applications History when rejected community leader exists'
        )
        .withOperation('GetCommunityLeaderApplicationsHistory')
        .withQuery(serializeGQL(GetCommunityLeaderApplicationsHistoryDocument))
        .withVariables(VARIABLES)
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
        query: GetCommunityLeaderApplicationsHistoryDocument,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        communityLeader: {
          applicationsHistory: [
            {
              __typename: 'CommunityLeaderApplication'
            }
          ],
          __typename: 'CommunityLeaderAccount'
        }
      })
    })
  })
})
