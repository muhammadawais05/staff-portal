import { GraphQLInteraction } from '@pact-foundation/pact'
import { boolean } from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  CALLABLE
} from '@staff-portal/billing/src/_lib/pact'

import { GetReceivedPaymentsListHeaderDocument } from './getReceivedPaymentsListHeader.graphql.types'

describe('Purchase Orders List', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Received Payments List Header', () => {
    describe('without variables', () => {
      const variables = {}

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('received payments list details can be returned')
          .uponReceiving('GetReceivedPaymentsListHeader')
          .withOperation('GetReceivedPaymentsListHeader')
          .withQuery(serializeQuery(GetReceivedPaymentsListHeaderDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                viewer: {
                  me: {
                    operations: {
                      downloadRolePaymentHistory: {
                        callable: CALLABLE('DISABLED'),
                        messages: ['No payments history to download']
                      }
                    }
                  },
                  operations: {
                    downloadCommissions: {
                      callable: CALLABLE('DISABLED'),
                      messages: []
                    }
                  },
                  projectedCommissions: {
                    available: boolean()
                  }
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
          query: GetReceivedPaymentsListHeaderDocument,
          variables: variables
        })

        expect(
          results.data.viewer.me.operations.downloadRolePaymentHistory.callable
        ).toBe('DISABLED')
      })
    })
  })
})
