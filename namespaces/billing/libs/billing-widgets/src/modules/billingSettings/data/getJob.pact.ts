import { GraphQLInteraction } from '@pact-foundation/pact'
import { boolean, string } from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  URL,
  ID
} from '@staff-portal/billing/src/_lib/pact'

import { GetJobDocument } from './getJob.graphql.types'

describe('Get Job', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Job details', () => {
    describe('by Job id', () => {
      const variables = {
        jobId: 'VjEtSm9iLTIxOTgyMw'
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('job details can be returned')
          .uponReceiving('GetJob')
          .withOperation('GetJob')
          .withQuery(serializeQuery(GetJobDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                node: {
                  id: ID(),
                  title: string(),
                  invoiceNote: string(),
                  autoConsolidationEnabled: boolean(false),
                  attachTimesheetsToInvoices: null,
                  purchaseOrder: {
                    id: ID(),
                    poNumber: string(),
                    webResource: {
                      text: string(),
                      url: URL()
                    }
                  },
                  client: {
                    purchaseOrdersNullable: {
                      nodes: [
                        {
                          id: ID(),
                          client: {
                            fullName: string()
                          },
                          webResource: {
                            text: string(),
                            url: URL()
                          }
                        },
                        {
                          id: ID(),
                          client: {
                            fullName: string()
                          },
                          webResource: {
                            text: string(),
                            url: URL()
                          }
                        }
                      ]
                    }
                  },
                  nextPurchaseOrder: {
                    id: ID(),
                    poNumber: string(),
                    webResource: {
                      text: string(),
                      url: URL()
                    }
                  },
                  commitment: string(),
                  engagements: {
                    nodes: [
                      {
                        id: ID(),
                        talent: {
                          fullName: string()
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
          query: GetJobDocument,
          variables: variables,
          fetchPolicy: 'no-cache'
        })

        expect(
          results.data.node.client.purchaseOrdersNullable.nodes
        ).toHaveLength(2)
      })
    })
  })
})
