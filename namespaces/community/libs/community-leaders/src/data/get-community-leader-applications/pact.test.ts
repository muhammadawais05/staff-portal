import { CommunityLeaderApplicationStatus } from '@staff-portal/graphql/staff'
import {
  gatewayHeaders,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  pactMatchers,
  Matchers
} from '@staff-portal/pact-utils'

import { GetCommunityLeaderApplicationsDocument } from './get-community-leader-applications.staff.gql.types'

const { string, integer, boolean, somethingLike } = Matchers

const VARIABLES = {
  pagination: { limit: 10, offset: 0 },
  filter: { status: CommunityLeaderApplicationStatus.APPLIED }
}

const RESPONSE_BODY = {
  data: {
    communityLeaderApplications: {
      nodes: [
        {
          id: pactMatchers.id(),
          status: somethingLike('APPLIED'),
          application: {
            id: pactMatchers.id(),
            status: somethingLike('APPLIED'),
            commitment: boolean(true),
            holdComment: null,
            performerComment: null,
            initialIdeas: string('Great ones'),
            slackChannel: string('Special'),
            createdAt: pactMatchers.time(),
            updatedAt: pactMatchers.time(),
            type: somethingLike('ONLINE_LEADER'),
            __typename: 'CommunityLeaderApplication'
          },
          appliedTalentRole: null,
          appliedStaffRole: null,
          operations: {
            rejectCommunityLeaderApplication: {
              callable: string('ENABLED'),
              messages: []
            },
            approveCommunityLeaderApplication: {
              callable: string('ENABLED'),
              messages: []
            },
            holdCommunityLeaderApplication: {
              callable: string('ENABLED'),
              messages: []
            },
            __typename: 'CommunityLeaderOperations'
          },
          __typename: 'CommunityLeaderAccount'
        }
      ],
      totalCount: integer(1),
      __typename: 'CommunityLeaderAccountConnection'
    }
  }
}

describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('query for Get Community Leader Applications', () => {
    beforeEach(() => {
      const graphqlQuery = new GraphQLInteraction()
        .given('applied community leader exists')
        .uponReceiving('Get Community Leader Applications')
        .withOperation('GetCommunityLeaderApplications')
        .withQuery(serializeGQL(GetCommunityLeaderApplicationsDocument))
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
        query: GetCommunityLeaderApplicationsDocument,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        communityLeaderApplications: {
          __typename: 'CommunityLeaderAccountConnection'
        }
      })
    })
  })
})
