import {
  pactMatchers,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers,
  graphQLRequest
} from '@staff-portal/pact-utils'

import { RESCHEDULE_TASK } from './reschedule-task.staff.gql'
import { RescheduleTaskMutationVariables } from './reschedule-task.staff.gql.types'

const { boolean, integer, string, eachLike } = Matchers

const VARIABLES: RescheduleTaskMutationVariables = {
  input: {
    taskId: 'VjEtVGFzay04MTAxMDQ1',
    dueDate: '2020-06-30'
  }
}

const RESPONSE_BODY = {
  data: {
    rescheduleTask: {
      success: boolean(),
      errors: [],
      __typename: 'RescheduleTaskPayload',
      task: {
        id: pactMatchers.id(),
        recurringPeriod: integer(),
        description: string('Follow up'),
        dueDate: '2020-06-30',
        relatedTime: pactMatchers.time(),
        status: string('finished'),
        playbookTemplate: {
          id: pactMatchers.id(),
          __typename: 'PlaybookTemplate'
        },
        starred: boolean(),
        relatedTo: {
          id: pactMatchers.id(),
          webResource: {
            text: string('Ferry-Morar BL'),
            url: string(
              'https://staging.toptal.net/platform/staff/companies/406373'
            ),
            __typename: 'Link'
          },
          __typename: 'Client'
        },
        performer: {
          id: pactMatchers.id(),
          __typename: 'Staff',
          fullName: string('Leala Dueno'),
          webResource: {
            text: string('Leala Dueno'),
            url: string(
              'https://staging.toptal.net/platform/staff/staff/315079'
            ),
            __typename: 'Link'
          }
        },
        operations: {
          disputeTask: {
            callable: string('HIDDEN'),
            messages: eachLike(string()),
            __typename: 'Operation'
          },
          cancelTask: {
            callable: string('HIDDEN'),
            messages: eachLike(string()),
            __typename: 'Operation'
          },
          addTaskComment: {
            callable: string('HIDDEN'),
            messages: eachLike(string()),
            __typename: 'Operation'
          },
          changeTaskPriority: {
            callable: string('HIDDEN'),
            messages: eachLike(string()),
            __typename: 'Operation'
          },
          starTask: {
            callable: string('HIDDEN'),
            messages: eachLike(string()),
            __typename: 'Operation'
          },
          reassignTask: {
            callable: string('HIDDEN'),
            messages: eachLike(string()),
            __typename: 'Operation'
          },
          updateTaskDescription: {
            callable: string('HIDDEN'),
            messages: eachLike(string()),
            __typename: 'Operation'
          },
          finishTask: {
            callable: string('HIDDEN'),
            messages: eachLike(string()),
            __typename: 'Operation'
          },
          restartTask: {
            callable: string('HIDDEN'),
            messages: eachLike(string()),
            __typename: 'Operation'
          },
          rescheduleTask: {
            messages: [],
            callable: string('ENABLED'),
            __typename: 'Operation'
          },
          __typename: 'TaskOperations'
        },
        __typename: 'Task'
      }
    }
  }
}

describe('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Reschedule task mutation', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('reschedule task is allowed')
        .uponReceiving('RescheduleTask')
        .withOperation('RescheduleTask')
        .withQuery(serializeGQL(RESCHEDULE_TASK))
        .withVariables(VARIABLES)
        .withRequest(graphQLRequest)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: RESPONSE_BODY
        })

      return provider.addInteraction(graphqlMutation)
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('returns the correct response', async () => {
      const result = await client.mutate({
        mutation: RESCHEDULE_TASK,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        rescheduleTask: {
          success: true,
          errors: [],
          __typename: 'RescheduleTaskPayload',
          task: {
            id: 'VjEtTWVSb2xlLTEyMjc4ODQ',
            dueDate: '2020-06-30',
            __typename: 'Task'
          }
        }
      })
    })
  })
})
