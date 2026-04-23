import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { CreateEventTagDocument } from './create-event-tag.staff.gql.types'

disableFragmentWarnings()

const { boolean } = Matchers

const VARIABLES = {
  input: {
    active: true,
    title: 'A tag'
  }
}

const RESPONSE_BODY = {
  data: {
    createCommunityEventTag: {
      success: boolean(),
      errors: [],
      eventTag: { title: 'A tag' },
      __typename: 'CreateCommunityEventTagPayload'
    }
  }
}

describe('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe.skip('mutation for Create Event Tag', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('staff can manage events')
        .uponReceiving('Create Event Tag')
        .withOperation('CreateEventTag')
        .withQuery(serializeGQL(CreateEventTagDocument))
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
        mutation: CreateEventTagDocument,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        createCommunityEventTag: {
          __typename: 'CreateCommunityEventTagPayload',
          success: true
        }
      })
    })
  })
})
