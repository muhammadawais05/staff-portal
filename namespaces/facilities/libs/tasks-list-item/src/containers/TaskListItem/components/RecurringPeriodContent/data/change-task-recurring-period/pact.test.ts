import { TaskPriorityLevel } from '@staff-portal/graphql/staff'
import {
  pactMatchers,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers,
  graphQLRequest
} from '@staff-portal/pact-utils'

import { CHANGE_TASK_RECURRING_PERIOD } from './change-task-recurring-period.staff.gql'

const { boolean, string, eachLike } = Matchers

const VARIABLES = { taskId: 'VjEtVGFzay04MTAxMDQ1', recurringPeriod: 1 }
const RESPONSE_BODY = {
  data: {
    changeTaskRecurringPeriod: {
      success: boolean(),
      errors: [],
      __typename: 'ChangeTaskRecurringPeriodPayload',
      task: {
        id: pactMatchers.id(),
        recurringPeriod: 1,
        description: string('Follow up'),
        dueDate: pactMatchers.date(),
        priority: TaskPriorityLevel.MEDIUM,
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
            messages: eachLike(string()),
            callable: string('HIDDEN'),
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

  describe('Change task recurring period mutation', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('change task recurring period operation is allowed')
        .uponReceiving('ChangeTaskRecurringPeriod')
        .withOperation('ChangeTaskRecurringPeriod')
        .withQuery(serializeGQL(CHANGE_TASK_RECURRING_PERIOD))
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
        mutation: CHANGE_TASK_RECURRING_PERIOD,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        changeTaskRecurringPeriod: {
          success: true,
          errors: [],
          __typename: 'ChangeTaskRecurringPeriodPayload',
          task: {
            id: 'VjEtTWVSb2xlLTEyMjc4ODQ',
            recurringPeriod: 1,
            __typename: 'Task'
          }
        }
      })
    })
  })
})
