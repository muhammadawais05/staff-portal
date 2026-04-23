import {
  setupGatewayPactIntegration,
  graphQLRequest,
  serializeGQL,
  pactMatchers,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { GET_CALL_REQUESTS_LIST } from '.'

const { term, string, boolean, integer, eachLike } = Matchers

const VARIABLES = { filter: {}, pagination: { limit: 10, offset: 0 } }
const RESPONSE_BODY = {
  data: {
    callbackRequests: {
      nodes: [
        {
          __typename: 'CallbackRequest',
          claimedAt: pactMatchers.time(),
          createdAt: pactMatchers.time(),
          purpose: string('Sales'),
          requestedStartTime: pactMatchers.time(),
          id: pactMatchers.id(),
          name: string('Michael Judkins'),
          status: string('claimed'),
          type: string('instant'),
          claimer: {
            __typename: 'Staff',
            id: pactMatchers.id(),
            fullName: string('Silvestre E Ramos')
          },
          late: boolean(false),
          inWorkingHours: boolean(true),
          overlappingMeetings: {
            nodes: [
              {
                name: string('Foobar'),
                scheduledAt: pactMatchers.time(),
                __typename: 'CallbackRequestOverlappingMeeting'
              }
            ],
            __typename: 'CallbackRequestOverlappingMeetingConnection'
          },
          operations: {
            claimCallbackRequest: {
              callable: 'HIDDEN',
              messages: eachLike(string()),
              __typename: 'Operation'
            },
            removeCallbackRequest: {
              callable: 'HIDDEN',
              messages: eachLike(string()),
              __typename: 'Operation'
            },
            __typename: 'CallbackRequestOperations'
          },
          client: {
            id: pactMatchers.id(),
            claimer: {
              id: pactMatchers.id(),
              __typename: 'Staff'
            },
            roleFlags: {
              nodes: [
                {
                  id: pactMatchers.id(),
                  comment: null,
                  flaggedBy: null,
                  updatedAt: pactMatchers.time(),
                  createdAt: pactMatchers.time(),
                  flag: {
                    id: pactMatchers.id(),
                    color: null,
                    title: string('VIP'),
                    __typename: 'Flag'
                  },
                  __typename: 'RoleFlag'
                }
              ],
              __typename: 'RoleFlagConnection'
            },
            contact: {
              id: pactMatchers.id(),
              fullName: string('Kandi Raynor'),
              __typename: 'CompanyRepresentative'
            },
            createdAt: pactMatchers.time(),
            timeZone: {
              name: term({
                generate: '(UTC-05:00) America - Chicago',
                matcher: '^\\([^)]+\\).*'
              }),
              __typename: 'TimeZone'
            },
            fullName: string('Emard-Wilkinson CX'),
            netTerms: integer(10),
            country: {
              name: string('United States'),
              id: pactMatchers.id(),
              __typename: 'Country'
            },
            __typename: 'Client'
          }
        }
      ],
      __typename: 'CallbackRequestConnection',
      totalCount: 1
    },
    __typename: 'Query'
  }
}

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('query for Callback Requests', () => {
    beforeEach(() => {
      const graphqlQuery = new GraphQLInteraction()
        .given('callback requests are created')
        .uponReceiving('GetCallbackRequests')
        .withOperation('GetCallbackRequests')
        .withQuery(serializeGQL(GET_CALL_REQUESTS_LIST))
        .withVariables(VARIABLES)
        .withRequest(graphQLRequest)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: RESPONSE_BODY
        })

      return provider.addInteraction(graphqlQuery)
    })

    it('returns the correct response', async () => {
      const result = await client.query({
        query: GET_CALL_REQUESTS_LIST,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        callbackRequests: {
          nodes: [
            {
              id: 'VjEtTWVSb2xlLTEyMjc4ODQ',
              __typename: 'CallbackRequest'
            }
          ],
          __typename: 'CallbackRequestConnection',
          totalCount: 1
        },
        __typename: 'Query'
      })
    })
  })
})
