import { GraphQLInteraction, Matchers } from '@pact-foundation/pact'
import { integer, string } from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  URL,
  ID,
  DATE,
  AMOUNT,
  CALLABLE
} from '@staff-portal/billing/src/_lib/pact'

import { GetPaymentGroupsListDocument } from './getPaymentGroupsList.graphql.types'

const { somethingLike } = Matchers

describe('Payment Groups List', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Payment Groups List', () => {
    describe('without filters set', () => {
      const variables = {
        pagination: { limit: 1, offset: 0 },
        filter: {}
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('payment groups list can be returned')
          .uponReceiving('GetPaymentGroupsList')
          .withOperation('GetPaymentGroupsList')
          .withQuery(serializeQuery(GetPaymentGroupsListDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                paymentGroupsNullable: {
                  totalCount: somethingLike(77053),
                  nodes: [
                    {
                      amount: AMOUNT(),
                      createdOn: DATE(),
                      id: ID(),
                      number: integer(),
                      status: string(),
                      operations: {
                        payPaymentGroup: {
                          callable: CALLABLE(),
                          messages: []
                        }
                      },
                      subject: {
                        id: ID(),
                        webResource: {
                          text: string(),
                          url: URL(
                            'https://staging.toptal.net/platform/staff/talents/1000001'
                          )
                        }
                      },
                      webResource: {
                        text: somethingLike('Payment Group #1000001'),
                        url: URL(
                          'https://staging.toptal.net/platform/staff/payment_groups/1000001'
                        )
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
          query: GetPaymentGroupsListDocument,
          variables: variables
        })

        expect(results.data.paymentGroupsNullable.nodes).toHaveLength(1)
      })
    })
  })
})
