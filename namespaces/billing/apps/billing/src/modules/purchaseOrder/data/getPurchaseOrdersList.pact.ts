import { GraphQLInteraction, Matchers } from '@pact-foundation/pact'
import { boolean, string } from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  URL,
  ID,
  AMOUNT,
  CALLABLE
} from '@staff-portal/billing/src/_lib/pact'

import { GetPurchaseOrdersListDocument } from './getPurchaseOrdersList.graphql.types'

const { somethingLike } = Matchers

describe('Purchase Orders List', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Purchase Orders List', () => {
    describe('without filters set', () => {
      const variables = {
        pagination: { limit: 1, offset: 0 },
        filter: {}
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('purchase orders list can be returned') // provider state
          .uponReceiving('GetPurchaseOrdersList')
          .withOperation('GetPurchaseOrdersList')
          .withQuery(serializeQuery(GetPurchaseOrdersListDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                purchaseOrders: {
                  totalCount: somethingLike(2),
                  operations: {
                    createPurchaseOrder: {
                      callable: CALLABLE(),
                      messages: []
                    }
                  },
                  nodes: [
                    {
                      archived: boolean(),
                      budgetLeft: AMOUNT(),
                      budgetSpent: boolean(),
                      client: {
                        webResource: {
                          text: string(),
                          url: URL()
                        }
                      },
                      id: ID(),
                      invoicedAmount: AMOUNT(),
                      poNumber: string(),
                      threshold: AMOUNT(),
                      totalAmount: AMOUNT(),
                      webResource: {
                        text: string(),
                        url: URL()
                      }
                    }
                  ]
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
          query: GetPurchaseOrdersListDocument,
          variables: variables
        })

        expect(results.data.purchaseOrders.nodes).toHaveLength(1)
      })
    })
  })
})
