import { GraphQLInteraction } from '@pact-foundation/pact'
import { integer } from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  AMOUNT
} from '@staff-portal/billing/src/_lib/pact'

import { GetPaymentsGrandTotalsDocument } from './getGrandTotalsPaymentsList.graphql.types'

describe('Payments Grand Totals List', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Payments Grand Totals List', () => {
    describe('without filters set', () => {
      const variables = {
        pagination: { limit: 1, offset: 0 },
        filter: {}
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('payment grand totals can be returned')
          .uponReceiving('GetPaymentsGrandTotals')
          .withOperation('GetPaymentsGrandTotals')
          .withQuery(serializeQuery(GetPaymentsGrandTotalsDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                payments: {
                  totalCount: integer(2),
                  totals: {
                    debited: AMOUNT(),
                    disputed: AMOUNT(),
                    due: AMOUNT(),
                    onHold: AMOUNT(),
                    outstanding: AMOUNT(),
                    overdue: AMOUNT(),
                    paid: AMOUNT()
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
          query: GetPaymentsGrandTotalsDocument,
          variables: variables
        })

        expect(results.data.payments.totalCount).toBe(2)
      })
    })
  })
})
