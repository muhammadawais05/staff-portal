import {
  UnassignActivationStepMutation,
  UnassignActivationStepMutationVariables
} from './unassign-activation-step.staff.gql.types'
import { UNASSIGN_ACTIVATION_STEP } from './unassign-activation-step.staff.gql'

type CreateUnassignActivationStepMockOptions = {
  variables?: UnassignActivationStepMutationVariables
  partialUnassignActivationStepMutation: Partial<UnassignActivationStepMutation>
}

export const createUnassignActivationStepMock = ({
  variables,
  partialUnassignActivationStepMutation
}: CreateUnassignActivationStepMockOptions) => {
  const unassignActivationStepMutationMock = {
    unassignActivationStep: {
      activation: {
        id:
          partialUnassignActivationStepMutation?.unassignActivationStep
            ?.activation?.id ?? '123',
        steps: {
          nodes:
            partialUnassignActivationStepMutation?.unassignActivationStep
              ?.activation?.steps?.nodes ?? []
        }
      },
      errors:
        partialUnassignActivationStepMutation?.unassignActivationStep?.errors ??
        [],
      success:
        partialUnassignActivationStepMutation?.unassignActivationStep
          ?.success ?? true
    }
  }

  return {
    request: {
      query: UNASSIGN_ACTIVATION_STEP,
      variables: {
        input: {
          activationStepId: variables?.input.activationStepId ?? '123',
          comment: variables?.input.comment
        }
      }
    },
    result: {
      data: {
        unassignActivationStep: {
          activation: {
            __typename: 'Activation',
            id: unassignActivationStepMutationMock.unassignActivationStep
              .activation.id,
            steps: {
              __typename: 'ActivationStepConnection',
              nodes:
                unassignActivationStepMutationMock.unassignActivationStep.activation.steps.nodes.map(
                  node => ({
                    __typename: 'ActivationStep',
                    ...node,
                    staff: node.staff
                      ? {
                          ...node.staff,
                          __typename: 'Staff'
                        }
                      : null,
                    operations: {
                      __typename: 'ActivationStepOperations',
                      assign: {
                        ...node.operations?.assign,
                        __typename: 'Operation'
                      },
                      approve: {
                        ...node.operations?.approve,
                        __typename: 'Operation'
                      },
                      reassign: {
                        ...node.operations?.reassign,
                        __typename: 'Operation'
                      },
                      reset: {
                        ...node.operations?.reset,
                        __typename: 'Operation'
                      },
                      unassign: {
                        ...node.operations?.unassign,
                        __typename: 'Operation'
                      },
                      sendIntroductionEmail: {
                        ...node.operations?.sendIntroductionEmail,
                        __typename: 'Operation'
                      },
                      sendRescheduleEmail: {
                        ...node.operations?.sendRescheduleEmail,
                        __typename: 'Operation'
                      },
                      sendRestorationEmail: {
                        ...node.operations?.sendRestorationEmail,
                        __typename: 'Operation'
                      }
                    }
                  })
                )
            }
          },
          success:
            unassignActivationStepMutationMock.unassignActivationStep.success,
          errors:
            unassignActivationStepMutationMock.unassignActivationStep.errors.map(
              error => ({
                ...error,
                __typename: 'GraniteError'
              })
            ),
          __typename: 'UnassignActivationStepPayload'
        }
      }
    }
  }
}

export const createUnassignStepActivationFailedMock = ({
  variables
}: {
  variables: UnassignActivationStepMutationVariables
}) => ({
  request: { query: UNASSIGN_ACTIVATION_STEP, variables },
  error: new Error('fake error message')
})
