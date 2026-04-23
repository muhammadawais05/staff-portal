import { disableFragmentWarnings } from 'graphql-tag'
import { TaskPriorityLevel } from '@staff-portal/graphql/staff'
import {
  gatewayHeaders,
  pactMatchers,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { CHANGE_TASK_PRIORITY } from './change-task-priority.staff.gql'

disableFragmentWarnings()

const { boolean, somethingLike } = Matchers

const VARIABLES = {
  taskId: 'VjEtVGFzay04MTAxMDQ1',
  priority: TaskPriorityLevel.MEDIUM
}

const RESPONSE_BODY = {
  data: {
    changeTaskPriority: {
      success: boolean(),
      errors: [],
      __typename: 'ChangeTaskPriorityPayload',
      task: {
        id: pactMatchers.id(),
        priority: TaskPriorityLevel.MEDIUM,
        clientEmailMessagingDefaultEmailTemplate: null,
        commentCount: somethingLike(0),
        completer: null,
        description: somethingLike('Mark meetings'),
        disputed: somethingLike(false),
        dueDate: somethingLike('2016-12-07'),
        engagedSubjects: {
          totalCount: somethingLike(0),
          __typename: somethingLike('RoleOrClientSimpleConnection')
        },
        performer: {
          fullName: somethingLike('Alexander Danilenko'),
          id: somethingLike('VjEtU3RhZmYtMTAwMDEw'),
          webResource: {
            text: somethingLike('Alexander Danilenko'),
            url: null,
            __typename: 'Link'
          },
          __typename: 'Staff'
        },
        playbookTemplate: {
          finishDisabled: false,
          id: somethingLike('VjEtUGxheWJvb2tUZW1wbGF0ZS05MDEzNw'),
          identifier: somethingLike('resolve_meeting'),
          webResource: {
            text: somethingLike('Staff'),
            url: null,
            __typename: 'Link'
          },
          __typename: 'PlaybookTemplate'
        },
        operations: {
          addTaskComment: {
            callable: somethingLike('ENABLED'),
            messages: [],
            __typename: 'Operation'
          },
          cancelTask: {
            callable: somethingLike('HIDDEN'),
            messages: [],
            __typename: 'Operation'
          },
          cancelTaskDispute: {
            callable: somethingLike('HIDDEN'),
            messages: [],
            __typename: 'Operation'
          },
          changeTaskPriority: {
            callable: somethingLike('ENABLED'),
            messages: [],
            __typename: 'Operation'
          },
          createActivity: {
            callable: somethingLike('ENABLED'),
            messages: [],
            __typename: 'Operation'
          },
          disputeTask: {
            callable: somethingLike('ENABLED'),
            messages: [
              somethingLike(
                'You can only dispute pending or completed task from playbook with maintainer'
              )
            ],
            __typename: 'Operation'
          },
          reassignTask: {
            callable: somethingLike('ENABLED'),
            messages: [],
            __typename: 'Operation'
          },
          rescheduleTask: {
            callable: somethingLike('HIDDEN'),
            messages: [somethingLike('Reschedule action disabled')],
            __typename: 'Operation'
          },
          scheduleTaskNextCheck: {
            callable: somethingLike('HIDDEN'),
            messages: [],
            __typename: 'Operation'
          },
          updateTaskDescription: {
            callable: somethingLike('ENABLED'),
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'TaskOperations'
        },
        finishedWithChildTask: somethingLike(false),
        recurringPeriod: null,
        relatedTime: null,
        status: somethingLike('pending'),
        starred: somethingLike(false),
        relatedTo: {
          id: somethingLike('VjEtTWVldGluZy0yMzU0NDg'),
          webResource: {
            text: somethingLike('Some text'),
            url: null,
            __typename: 'Link'
          },
          __typename: 'Meeting'
        },
        source: somethingLike('AM_TASKS_SUGGESTION_GUIDELINE'),
        __typename: 'Task'
      }
    }
  }
}

describe('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Change task priority mutation', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('Change task priority operation is allowed')
        .uponReceiving('ChangeTaskPriority')
        .withOperation('ChangeTaskPriority')
        .withQuery(serializeGQL(CHANGE_TASK_PRIORITY))
        .withVariables(VARIABLES)
        .withRequest(gatewayHeaders)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: RESPONSE_BODY
        })

      return provider.addInteraction(graphqlMutation)
    })

    it('returns the correct response', async () => {
      const result = await client.mutate({
        mutation: CHANGE_TASK_PRIORITY,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        changeTaskPriority: {
          success: true,
          errors: [],
          __typename: 'ChangeTaskPriorityPayload',
          task: {
            id: 'VjEtTWVSb2xlLTEyMjc4ODQ',
            priority: TaskPriorityLevel.MEDIUM,
            __typename: 'Task'
          }
        }
      })
    })
  })
})
