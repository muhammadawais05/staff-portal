import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  pactMatchers,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { REASSIGN_TASK } from './reassign-task.staff.gql'
disableFragmentWarnings()

const { boolean, somethingLike } = Matchers

const VARIABLES = {
  taskId: 'VjEtVGFzay04MTAxMDQ1',
  roleId: 'VjEtU3RhZmYtMTgxNjk0Nw'
}
const RESPONSE_BODY = {
  data: {
    reassignTask: {
      success: boolean(),
      errors: [],
      __typename: 'ReassignTaskPayload',
      task: {
        id: pactMatchers.id(),
        priority: somethingLike('MEDIUM'),
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
        playbookTemplate: null,
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
            messages: [],
            __typename: 'Operation'
          },
          reassignTask: {
            callable: somethingLike('ENABLED'),
            messages: [],
            __typename: 'Operation'
          },
          rescheduleTask: {
            callable: somethingLike('HIDDEN'),
            messages: [],
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
        relatedTo: null,
        source: somethingLike('AM_TASKS_SUGGESTION_GUIDELINE'),
        __typename: 'Task'
      }
    }
  }
}

describe('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Reassign Task mutation', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('Reassign task operation is allowed')
        .uponReceiving('ReassignTask')
        .withOperation('ReassignTask')
        .withQuery(serializeGQL(REASSIGN_TASK))
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
        mutation: REASSIGN_TASK,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        reassignTask: {
          success: true,
          errors: [],
          __typename: 'ReassignTaskPayload',
          task: {
            id: 'VjEtTWVSb2xlLTEyMjc4ODQ',
            performer: {
              id: 'VjEtU3RhZmYtMTAwMDEw',
              __typename: 'Staff'
            },
            __typename: 'Task'
          }
        }
      })
    })
  })
})
