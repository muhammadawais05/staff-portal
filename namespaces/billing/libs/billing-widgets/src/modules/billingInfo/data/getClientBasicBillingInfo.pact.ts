import { GraphQLInteraction } from '@pact-foundation/pact'
import { string } from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  URL,
  ID,
  AMOUNT,
  CALLABLE
} from '@staff-portal/billing/src/_lib/pact'

import { GetClientBasicBillingInfoDocument } from './getClientBasicBillingInfo.graphql.types'

describe('Client Basic Billing Info', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Client Basic Billing Info', () => {
    describe('by client id', () => {
      const clientId = 'VjEtQ2xpZW50LTIyNDA2MQ'
      const variables = {
        clientId: clientId
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('client basic billing info is returned')
          .uponReceiving('GetClientBasicBillingInfo')
          .withOperation('GetClientBasicBillingInfo')
          .withQuery(serializeQuery(GetClientBasicBillingInfoDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                node: {
                  id: ID(clientId),
                  availablePrepaymentBalanceNullable: AMOUNT(),
                  operations: {
                    refundClientCreditBalance: {
                      callable: CALLABLE(),
                      messages: []
                    }
                  },
                  paymentOptions: {
                    viewLink: {
                      text: string(),
                      url: URL()
                    }
                  },
                  unallocatedMemorandums: {
                    totalAmount: AMOUNT(),
                    webResource: {
                      text: string(),
                      url: URL()
                    }
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
          query: GetClientBasicBillingInfoDocument,
          variables: variables,
          fetchPolicy: 'no-cache'
        })

        expect(results.data.node.id).toEqual(clientId)
      })
    })
  })
})
