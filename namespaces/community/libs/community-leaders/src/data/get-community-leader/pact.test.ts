import { disableFragmentWarnings } from 'graphql-tag'
import {
  setupGatewayPactIntegration,
  serializeGQL,
  gatewayHeaders,
  GraphQLInteraction
} from '@staff-portal/pact-utils'

import { GetCommunityLeaderDocument } from './get-community-leader.staff.gql.types'
import {
  communityLeaderMock,
  communityLeaderMockCheck
} from '../../mocks/community-leader-pact'

disableFragmentWarnings()

const VARIABLES = {
  id: 'VjEtVGFsZW50LTM4MDk2NQ'
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('query for GetCommunityLeader', () => {
    beforeEach(() => {
      const graphqlQuery = new GraphQLInteraction()
        .given('community leader exists for a know role')
        .uponReceiving('Get Community Leader')
        .withOperation('GetCommunityLeader')
        .withQuery(serializeGQL(GetCommunityLeaderDocument))
        .withVariables(VARIABLES)
        .withRequest(gatewayHeaders)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: communityLeaderMock
        })

      return provider.addInteraction(graphqlQuery)
    })

    it('returns the correct response', async () => {
      const result = await client.query({
        query: GetCommunityLeaderDocument,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject(communityLeaderMockCheck)
    })
  })
})
