import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction
} from '@staff-portal/pact-utils'

import { GetCommunityLeaderWithNotesDocument } from './get-community-leader-notes.staff.gql.types'
import {
  communityLeaderWithNotesMock,
  communityLeaderWithNotesMockCheck
} from '../../mocks/community-leader-with-notes'

const VARIABLES = { id: 'VjEtQ29tbXVuaXR5TGVhZGVyLTEwMDAwMDA' }

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Community Leader Notes', () => {
    beforeEach(() => {
      const graphqlQuery = new GraphQLInteraction()
        .given('community leader exists for a know role')
        .uponReceiving('GetCommunityLeaderWithNotes')
        .withOperation('GetCommunityLeaderWithNotes')
        .withQuery(serializeGQL(GetCommunityLeaderWithNotesDocument))
        .withVariables(VARIABLES)
        .withRequest(gatewayHeaders)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: communityLeaderWithNotesMock
        })

      return provider.addInteraction(graphqlQuery)
    })

    it('returns the correct response', async () => {
      const result = await client.query({
        query: GetCommunityLeaderWithNotesDocument,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject(communityLeaderWithNotesMockCheck)
    })
  })
})
