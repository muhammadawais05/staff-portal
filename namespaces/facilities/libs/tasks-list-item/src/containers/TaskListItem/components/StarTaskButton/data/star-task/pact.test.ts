import { disableFragmentWarnings } from 'graphql-tag'
import {
  pactMatchers,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers,
  gatewayHeaders
} from '@staff-portal/pact-utils'

import { STAR_TASK } from './star-task.staff.gql'
disableFragmentWarnings()

const { boolean } = Matchers

const VARIABLES = { taskId: 'VjEtVGFzay04MTAxMDQ1', starred: true }
const RESPONSE_BODY = {
  data: {
    starTask: {
      success: boolean(),
      errors: [],
      __typename: 'StarTaskPayload',
      task: {
        id: pactMatchers.id(),
        starred: boolean(),
        __typename: 'Task'
      }
    }
  }
}

describe('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Star Task mutation', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('Star task operation is allowed')
        .uponReceiving('StarTask')
        .withOperation('StarTask')
        .withQuery(serializeGQL(STAR_TASK))
        .withVariables(VARIABLES)
        .withRequest(gatewayHeaders)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: RESPONSE_BODY
        })

      return provider.addInteraction(graphqlMutation)
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it('returns the correct response', async () => {
      const result = await client.mutate({
        mutation: STAR_TASK,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        starTask: {
          success: true,
          errors: [],
          __typename: 'StarTaskPayload',
          task: {
            id: 'VjEtTWVSb2xlLTEyMjc4ODQ',
            starred: true,
            __typename: 'Task'
          }
        }
      })
    })
  })
})
