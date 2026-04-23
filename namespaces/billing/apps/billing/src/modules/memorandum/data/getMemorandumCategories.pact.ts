import { GraphQLInteraction } from '@pact-foundation/pact'
import { eachLike } from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  ID,
  MEMO_CATEGORIES
} from '@staff-portal/billing/src/_lib/pact'

import { GetMemorandumCategoriesDocument } from './getMemorandumCategories.graphql.types'

describe('Get Memorandum Categories query', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Memorandum Categories', () => {
    describe('with document type variable', () => {
      const variables = {
        documentType: 'INVOICE'
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('memorandum categories can be returned')
          .uponReceiving('GetMemorandumCategories')
          .withOperation('GetMemorandumCategories')
          .withQuery(serializeQuery(GetMemorandumCategoriesDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                memorandumCategories: {
                  nodes: eachLike(
                    {
                      id: ID(),
                      name: MEMO_CATEGORIES('End date')
                    },
                    { min: 1 }
                  )
                }
              }
            },
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            status: 200
          })

        return provider.addInteraction(graphqlQuery)
      })

      it('returns the correct response', async () => {
        const results = await client.query({
          query: GetMemorandumCategoriesDocument,
          variables: variables,
          fetchPolicy: 'no-cache'
        })

        expect(results.data.memorandumCategories.nodes[0].name).toBe(
          'End date'
        )
      })
    })
  })
})
