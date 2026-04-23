import { disableFragmentWarnings } from 'graphql-tag'
import {
  gatewayHeaders,
  pactMatchers,
  serializeGQL,
  setupGatewayPactIntegration,
  GraphQLInteraction,
  Matchers
} from '@staff-portal/pact-utils'

import { UpdateTaskDescriptionDocument } from './update-task-description.staff.gql.types'

disableFragmentWarnings()

const { boolean, somethingLike } = Matchers

const VARIABLES = {
  input: { taskId: 'VjEtVGFzay04MTAxMDQ1', description: 'new task' }
}

const RESPONSE_BODY = {
  data: {
    updateTaskDescription: {
      success: boolean(),
      errors: [],
      __typename: 'UpdateTaskDescriptionPayload',
      task: {
        id: pactMatchers.id(),
        priority: somethingLike('MEDIUM'),
        clientEmailMessagingDefaultEmailTemplate: null,
        commentCount: null,
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

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('Pact contract with Staff Portal GraphQL API', () => {
  const { provider, client } = setupGatewayPactIntegration()

  describe('Update task description mutation', () => {
    beforeEach(() => {
      const graphqlMutation = new GraphQLInteraction()
        .given('Update task description operation is allowed')
        .uponReceiving('UpdateTaskDescription')
        .withOperation('UpdateTaskDescription')
        .withQuery(serializeGQL(UpdateTaskDescriptionDocument))
        .withVariables(VARIABLES)
        .withRequest(gatewayHeaders)
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: RESPONSE_BODY
        })

      return provider.addInteraction(graphqlMutation)
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it('returns the correct response', async () => {
      const result = await client.mutate({
        mutation: UpdateTaskDescriptionDocument,
        variables: VARIABLES
      })

      expect(result.data).toMatchObject({
        updateTaskDescription: {
          success: true,
          errors: [],
          __typename: 'UpdateTaskDescriptionPayload',
          task: {
            id: 'VjEtTWVSb2xlLTEyMjc4ODQ',
            description: 'Mark meetings',
            __typename: 'Task'
          }
        }
      })
    })
  })
})
