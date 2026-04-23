import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  pactMatchers,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { GET_TASKS_LIST } from './get-tasks-list.staff.gql'
disableFragmentWarnings()

const { boolean, integer, somethingLike } = Matchers

const VARIABLES = {
  filter: {},
  loadCounters: true,
  loadDisputeOperations: false,
  pagination: { offset: 0, limit: 1 }
}
const RESPONSE_BODY = {
  data: {
    tasks: {
      counters: {
        total: somethingLike(13),
        pending: somethingLike(13),
        today: somethingLike(13),
        thisWeek: somethingLike(13),
        playbook: somethingLike(13),
        __typename: 'TaskConnectionCounters'
      },
      edges: [
        {
          group: {
            id: pactMatchers.id(),
            name: somethingLike('Starred'),
            __typename: 'TaskGroup'
          },
          node: {
            id: somethingLike('VjEtVGFzay0x'),
            activity: null,
            clientEmailMessagingDefaultEmailTemplate: null,
            description: somethingLike('Follow up'),
            dueDate: pactMatchers.date(),
            priority: somethingLike('HIGH'),
            relatedTime: pactMatchers.time(),
            recurringPeriod: null,
            status: somethingLike('finished'),
            disputed: somethingLike(false),
            finishedWithChildTask: somethingLike(false),
            commentCount: 1,
            completer: null,
            source: 'AM_TASKS_SUGGESTION_GUIDELINE',
            engagedSubjects: {
              totalCount: somethingLike(0),
              __typename: 'RoleOrClientConnection'
            },
            playbookTemplate: {
              id: pactMatchers.id(),
              identifier: somethingLike('task_1'),
              finishDisabled: false,
              webResource: {
                text: somethingLike('Staff'),
                url: null,
                __typename: 'Link'
              },
              __typename: 'PlaybookTemplate'
            },
            starred: boolean(),
            relatedTo: {
              id: pactMatchers.id(),
              webResource: {
                text: somethingLike('Ferry-Morar BL'),
                url: somethingLike(
                  'https://localhost:3000/platform/staff/companies/100002'
                ),
                __typename: 'Link'
              },
              __typename: 'Client'
            },
            subjects: {
              nodes: [
                {
                  id: somethingLike('VjEtQ2xpZW50LTE'),
                  __typename: 'Client',
                  fullName: somethingLike('Company')
                }
              ],
              __typename: 'SubjectConnection'
            },
            performer: {
              id: pactMatchers.id(),
              __typename: 'Staff',
              fullName: somethingLike('Leala Dueno'),
              webResource: {
                text: somethingLike('Leala Dueno'),
                url: somethingLike(
                  'https://localhost:3000/platform/staff/staff/100003'
                ),
                __typename: 'Link'
              }
            },
            operations: {
              __typename: 'TaskOperations'
            },
            __typename: 'Task'
          },
          __typename: 'TaskConnectionEdge'
        }
      ],
      totalCount: integer(),
      __typename: 'TaskConnection'
    }
  }
}

// eslint-disable-next-line jest/no-disabled-tests
describe('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('query for tasks', () => {
    beforeEach(() => {
      const graphqlQuery = new GraphQLInteraction()
        .given('tasks are created')
        .uponReceiving('GetTasksList')
        .withOperation('GetTasksList')
        .withQuery(serializeGQL(GET_TASKS_LIST))
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
        query: GET_TASKS_LIST,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        tasks: {
          edges: [
            {
              __typename: 'TaskConnectionEdge'
            }
          ],
          __typename: 'TaskConnection'
        }
      })
    })
  })
})
