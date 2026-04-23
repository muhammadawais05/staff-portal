import {
  ResetActivationStepMutation,
  ResetActivationStepMutationVariables
} from './reset-activation-step.staff.gql.types'
import { UNASSIGN_ACTIVATION_STEP } from './reset-activation-step.staff.gql'

type CreateResetActivationStepMockOptions = {
  variables?: ResetActivationStepMutationVariables
  partialResetActivationStepMutation: Partial<ResetActivationStepMutation>
}

export const createResetActivationStepMock = ({
  variables,
  partialResetActivationStepMutation
}: CreateResetActivationStepMockOptions) => {
  const resetActivationStepMutationMock = {
    resetActivationStep: {
      activation: {
        id:
          partialResetActivationStepMutation?.resetActivationStep?.activation
            ?.id ?? '123',
        steps: {
          nodes:
            partialResetActivationStepMutation?.resetActivationStep?.activation
              ?.steps?.nodes ?? []
        }
      },
      errors:
        partialResetActivationStepMutation?.resetActivationStep?.errors ?? [],
      success:
        partialResetActivationStepMutation?.resetActivationStep?.success ?? true
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
        resetActivationStep: {
          activation: {
            __typename: 'Activation',
            id: resetActivationStepMutationMock.resetActivationStep.activation
              .id,
            steps: {
              __typename: 'ActivationStepConnection',
              nodes:
                resetActivationStepMutationMock.resetActivationStep.activation.steps.nodes.map(
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
                      unassign: {
                        ...node.operations?.unassign,
                        __typename: 'Operation'
                      },
                      reset: {
                        ...node.operations?.reset,
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
          success: resetActivationStepMutationMock.resetActivationStep.success,
          errors:
            resetActivationStepMutationMock.resetActivationStep.errors.map(
              error => ({
                ...error,
                __typename: 'GraniteError'
              })
            ),
          __typename: 'ResetActivationStepPayload'
        }
      }
    }
  }
}

export const createResetStepActivationFailedMock = ({
  variables
}: {
  variables: ResetActivationStepMutationVariables
}) => ({
  request: { query: UNASSIGN_ACTIVATION_STEP, variables },
  error: new Error('fake error message')
})
