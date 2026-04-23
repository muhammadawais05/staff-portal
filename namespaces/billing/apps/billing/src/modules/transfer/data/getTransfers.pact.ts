import { GraphQLInteraction } from '@pact-foundation/pact'
import { boolean, string } from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  ID,
  AMOUNT,
  DATE,
  CALLABLE
} from '@staff-portal/billing/src/_lib/pact'

import { GetTransfersDocument } from './getTransfers.graphql.types'

describe('Transfers Info', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Client Basic Billing Info', () => {
    describe('by node id', () => {
      const nodeId = 'VjEtUGF5bWVudC0xNDM2MTYz'
      const variables = {
        nodeId: nodeId
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('client transfers info is returned')
          .uponReceiving('GetTransfers')
          .withOperation('GetTransfers')
          .withQuery(serializeQuery(GetTransfersDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                node: {
                  id: ID(nodeId),
                  transfers: {
                    nodes: [
                      {
                        amount: AMOUNT(),
                        amountToRefund: AMOUNT(),
                        createdAt: DATE(),
                        description: string(),
                        effectiveDate: DATE(),
                        feesTotalAmount: AMOUNT(),
                        gateway: string(),
                        id: ID(),
                        document: {
                          id: ID()
                        },
                        paymentMethod: string(),
                        refund: boolean(),
                        status: string(),
                        operations: {
                          cancelTransfer: {
                            callable: CALLABLE(),
                            messages: [string()]
                          },
                          claimTransferRefund: {
                            callable: CALLABLE(),
                            messages: [string()]
                          },
                          failTransfer: {
                            callable: CALLABLE(),
                            messages: [string()]
                          },
                          payTransfer: {
                            callable: CALLABLE(),
                            messages: [string()]
                          },
                          postponeTransfer: {
                            callable: CALLABLE(),
                            messages: [string()]
                          }
                        }
                      }
                    ]
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
          query: GetTransfersDocument,
          variables: variables,
          fetchPolicy: 'no-cache'
        })

        expect(results.data.node.id).toEqual(nodeId)
      })
    })
  })
})
