import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { GetEventTagsDocument } from './get-event-tags.staff.gql.types'

disableFragmentWarnings()

const { somethingLike } = Matchers

const RESPONSE_BODY = {
  data: {
    talentCommunityEventTags: [
      {
        id: somethingLike('VjEtVGFsZW50Q29tbXVuaXR5RXZlbnRUYWctMQ'),
        title: 'Test title',
        active: true,
        sortOrder: somethingLike(1),
        operations: {
          updateCommunityEventTag: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          removeCommunityEventTag: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'CommunityEventTagOperations'
        },
        __typename: 'TalentCommunityEventTag'
      }
    ]
  }
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Get Event Tags', () => {
    beforeEach(() => {
      const graphqlQuery = new GraphQLInteraction()
        .given('staff can manage events')
        .uponReceiving('Get Event Tags')
        .withOperation('GetEventTags')
        .withQuery(serializeGQL(GetEventTagsDocument))
        .withVariables({})
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
        query: GetEventTagsDocument
      })

      expect(result.data).toMatchObject({
        talentCommunityEventTags: [
          {
            __typename: 'TalentCommunityEventTag'
          }
        ]
      })
    })
  })
})
