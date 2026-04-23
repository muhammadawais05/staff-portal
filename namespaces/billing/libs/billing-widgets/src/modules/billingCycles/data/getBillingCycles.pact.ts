import { GraphQLInteraction } from '@pact-foundation/pact'
import { integer, string } from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  URL,
  ID,
  DATE,
  AMOUNT,
  BILLING_CYCLE_GID,
  INVOICE_GID
} from '@staff-portal/billing/src/_lib/pact'

import { GetBillingCyclesDocument } from './getBillingCycles.graphql.types'

describe('Billing Cycles', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Billing Cycles', () => {
    describe('with Engagement Documents', () => {
      const id = 'VjEtRW5nYWdlbWVudC0yNzQ0OTY'
      const variables = {
        id: id,
        engagementGid: 'gid://platform/Engagement/274496'
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('consolidated invoices are returned')
          .uponReceiving('GetBillingCycles')
          .withOperation('GetBillingCycles')
          .withQuery(serializeQuery(GetBillingCyclesDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                node: {
                  id: ID(),
                  billingCycles: {
                    nodes: [
                      {
                        gid: BILLING_CYCLE_GID(),
                        kind: string(),
                        startDate: DATE(),
                        endDate: DATE(),
                        hours: AMOUNT(),
                        chargedHours: AMOUNT(),
                        extraHours: AMOUNT(),
                        status: string(),
                        actualCommitment: {
                          availability: string(),
                          availabilityHours: integer(),
                          companyRate: AMOUNT(),
                          talentRate: AMOUNT(),
                          startDate: DATE()
                        },
                        originalCommitment: {
                          availability: string(),
                          availabilityHours: integer(),
                          companyRate: AMOUNT(),
                          talentRate: AMOUNT(),
                          startDate: DATE()
                        }
                      }
                    ]
                  }
                },
                engagementDocuments: {
                  invoices: [
                    {
                      kind: string(),
                      amount: AMOUNT(),
                      creditedAmount: AMOUNT(),
                      debitedAmount: AMOUNT(),
                      description: string(),
                      documentNumber: integer(),
                      dueDate: DATE(),
                      id: ID(),
                      billingCycleGid: BILLING_CYCLE_GID(),
                      gid: INVOICE_GID(),
                      paidAmount: AMOUNT(),
                      status: string(),
                      url: URL(),
                      subjectObject: {
                        id: ID(),
                        fullName: string()
                      },
                      webResource: {
                        text: string(),
                        url: URL()
                      },
                      consolidatedDocument: {
                        amount: AMOUNT(),
                        creditedAmount: AMOUNT(),
                        debitedAmount: AMOUNT(),
                        description: string(),
                        documentNumber: integer,
                        dueDate: DATE(),
                        id: ID(),
                        billingCycleGid: BILLING_CYCLE_GID(),
                        gid: INVOICE_GID,
                        paidAmount: AMOUNT(),
                        status: string(),
                        url: URL(),
                        subjectObject: {
                          id: ID(),
                          fullName: string()
                        }
                      }
                    }
                  ],
                  payments: [],
                  commissions: []
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
          query: GetBillingCyclesDocument,
          variables: variables,
          fetchPolicy: 'no-cache'
        })

        expect(results.data.node.billingCycles.nodes).toHaveLength(1)
      })
    })
  })
})
