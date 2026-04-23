import { GraphQLInteraction } from '@pact-foundation/pact'
import {
  boolean,
  integer,
  string
} from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  URL,
  ID,
  AMOUNT,
  CALLABLE,
  DATE
} from '@staff-portal/billing/src/_lib/pact'

import { GetCommercialDocumentMemorandumsDocument } from './getCommercialDocumentMemorandums.graphql.types'

describe('Commercial Document Memorandums', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Commercial Document Memorandums', () => {
    describe('by node id', () => {
      const nodeId = 'VjEtUGF5bWVudC0xNDM2MTYz'
      const variables = {
        nodeId: nodeId
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('commercial document memorandums are returned')
          .uponReceiving('GetCommercialDocumentMemorandums')
          .withOperation('GetCommercialDocumentMemorandums')
          .withQuery(serializeQuery(GetCommercialDocumentMemorandumsDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                node: {
                  id: ID(nodeId),
                  memorandums: {
                    nodes: [
                      {
                        allocated: boolean(),
                        allocatedAt: DATE(),
                        amount: AMOUNT(),
                        amountDue: AMOUNT(),
                        balance: string(),
                        category: {
                          credit: string(),
                          debit: string(),
                          id: ID(),
                          name: string()
                        },
                        depositCorrection: boolean(),
                        description: string(),
                        document: {
                          id: ID(),
                          documentNumber: integer(),
                          webResource: {
                            text: string(),
                            url: URL()
                          }
                        },
                        downloadHtmlUrl: URL(),
                        downloadPdfUrl: URL(),
                        id: ID(),
                        number: integer(),
                        operations: {
                          revertInvoicePrepayments: {
                            callable: CALLABLE(),
                            messages: []
                          },
                          revertCommercialDocumentMemorandum: {
                            callable: CALLABLE(),
                            messages: []
                          },
                          revertRoleMemorandum: {
                            callable: CALLABLE(),
                            messages: []
                          }
                        },
                        portions: []
                      }
                    ]
                  },
                  associatedMemorandums: {
                    nodes: [
                      {
                        allocated: true,
                        allocatedAt: DATE(),
                        amount: AMOUNT(),
                        amountDue: AMOUNT(),
                        balance: string(),
                        category: {
                          credit: string(),
                          debit: string(),
                          id: ID(),
                          name: string()
                        },
                        depositCorrection: boolean(),
                        description: string(),
                        document: {
                          id: ID(),
                          documentNumber: integer(),
                          webResource: {
                            text: string(),
                            url: URL()
                          }
                        },
                        downloadHtmlUrl: URL(),
                        downloadPdfUrl: URL(),
                        id: ID(),
                        number: integer(),
                        operations: {
                          revertInvoicePrepayments: {
                            callable: CALLABLE(),
                            messages: []
                          },
                          revertCommercialDocumentMemorandum: {
                            callable: CALLABLE(),
                            messages: []
                          },
                          revertRoleMemorandum: {
                            callable: CALLABLE(),
                            messages: []
                          }
                        },
                        portions: []
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
          query: GetCommercialDocumentMemorandumsDocument,
          variables: variables,
          fetchPolicy: 'no-cache'
        })

        expect(results.data.node.id).toEqual(nodeId)
      })
    })
  })
})
