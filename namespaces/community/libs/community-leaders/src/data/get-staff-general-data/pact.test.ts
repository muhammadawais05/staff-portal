import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction
} from '@staff-portal/pact-utils'

import {
  communityLeaderStaffMock,
  communityLeaderStaffMockCheck
} from '../../mocks/community-leader-staff-pact'
import { GetStaffGeneralDataDocument } from './get-staff-general-data.staff.gql.types'

const VARIABLES = { id: 'VjEtU3RhZmYtMzgwOTY1' }

const RESPONSE_BODY = communityLeaderStaffMock

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('query for GetStaffGeneralData', () => {
    beforeEach(() => {
      const graphqlQuery = new GraphQLInteraction()
        .given('community leader exists for a know role')
        .uponReceiving('GetStaffGeneralData')
        .withOperation('GetStaffGeneralData')
        .withQuery(serializeGQL(GetStaffGeneralDataDocument))
        .withVariables(VARIABLES)
        .withRequest(gatewayHeaders)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: RESPONSE_BODY
        })

      return provider.addInteraction(graphqlQuery)
    })

    it('returns the correct response', async () => {
      const result = await client.query({
        query: GetStaffGeneralDataDocument,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject(communityLeaderStaffMockCheck)
    })
  })
})
