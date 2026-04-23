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
  ID,
  AMOUNT,
  DATE,
  URL
} from '@staff-portal/billing/src/_lib/pact'

import { GetConsolidatedInvoicesDocument } from './getConsolidatedInvoices.graphql.types'

describe('Get Consolidated Invoices', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Client Basic Billing Info', () => {
    describe('by client id', () => {
      const invoiceId = 'VjEtSW52b2ljZS0y'
      const variables = {
        invoiceId: invoiceId
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('consolidated invoices are returned')
          .uponReceiving('GetConsolidatedInvoices')
          .withOperation('GetConsolidatedInvoices')
          .withQuery(serializeQuery(GetConsolidatedInvoicesDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                node: {
                  id: ID(invoiceId),
                  unconsolidated: boolean(),
                  originalInvoices: {
                    nodes: [
                      {
                        amount: AMOUNT(),
                        listedAmount: AMOUNT(),
                        cleanOutstandingAmount: AMOUNT(),
                        description: string(),
                        documentNumber: integer(),
                        id: ID(),
                        invoiceKind: string(),
                        unconsolidated: boolean(),
                        issueDate: DATE(),
                        dueDate: DATE(),
                        webResource: {
                          text: string(),
                          url: URL()
                        },
                        subjectObject: {
                          id: ID(),
                          webResource: {
                            text: string(),
                            url: URL()
                          }
                        },
                        talent: {
                          id: ID(),
                          webResource: {
                            text: string(),
                            url: URL()
                          }
                        },
                        job: {
                          id: ID(),
                          webResource: {
                            text: string(),
                            url: URL()
                          }
                        }
                      }
                    ]
                  },
                  formerOriginalInvoices: {
                    nodes: []
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
          query: GetConsolidatedInvoicesDocument,
          variables: variables,
          fetchPolicy: 'no-cache'
        })

        expect(results.data.node.id).toEqual(invoiceId)
      })
    })
  })
})
