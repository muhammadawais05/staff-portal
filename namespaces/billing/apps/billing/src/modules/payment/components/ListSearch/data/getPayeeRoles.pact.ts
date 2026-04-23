import { GraphQLInteraction } from '@pact-foundation/pact'
import { somethingLike } from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration
} from '@staff-portal/billing/src/_lib/pact'

import { GetRolesDocument } from './getPayeeRoles.graphql.types'

describe('Get Roles query', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Payee Roles', () => {
    describe('without variables', () => {
      const variables = {}

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('payee roles can be returned')
          .uponReceiving('GetRoles')
          .withOperation('GetRoles')
          .withQuery(serializeQuery(GetRolesDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                payeeRoles: somethingLike([
                  'REFERRAL_PARTNER',
                  'COMPANY',
                  'TALENT_PARTNER',
                  'LEADER',
                  'STAFF',
                  'COMPANY_REPRESENTATIVE',
                  'DEVELOPER',
                  'DESIGNER',
                  'FINANCE_EXPERT',
                  'PROJECT_MANAGER',
                  'PRODUCT_MANAGER'
                ])
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
          query: GetRolesDocument,
          variables: variables,
          fetchPolicy: 'no-cache'
        })

        expect(results.data.payeeRoles).toHaveLength(11)
      })
    })
  })
})
