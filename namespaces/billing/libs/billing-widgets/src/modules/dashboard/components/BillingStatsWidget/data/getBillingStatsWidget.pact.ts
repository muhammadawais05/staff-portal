import { GraphQLInteraction } from '@pact-foundation/pact'
import {
  eachLike,
  integer,
  string
} from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  AMOUNT
} from '@staff-portal/billing/src/_lib/pact'

import { GetBillingStatsWidgetDocument } from './getBillingStatsWidget.graphql.types'

describe('Client Basic Billing Info', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()
  const variables = {}

  describe('Get Billing Stats Widget', () => {
    describe('without variables', () => {
      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('billing statistics widget returned')
          .uponReceiving('GetBillingStatsWidget')
          .withOperation('GetBillingStatsWidget')
          .withQuery(serializeQuery(GetBillingStatsWidgetDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                widgets: {
                  billingStats: {
                    invoicesTotals: eachLike(
                      {
                        amount: AMOUNT(),
                        category: string()
                      },
                      { min: 1 }
                    ),
                    paymentsTotals: eachLike(
                      {
                        amount: AMOUNT(),
                        category: string()
                      },
                      { min: 1 }
                    ),
                    billingMethods: eachLike(
                      {
                        count: integer(),
                        billingMethod: string()
                      },
                      { min: 1 }
                    )
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
          query: GetBillingStatsWidgetDocument,
          variables: variables,
          fetchPolicy: 'no-cache'
        })

        expect(results.data.widgets.billingStats.invoicesTotals).toBeTruthy()
        expect(results.data.widgets.billingStats.paymentsTotals).toBeTruthy()
        expect(results.data.widgets.billingStats.billingMethods).toBeTruthy()
      })
    })
  })
})
