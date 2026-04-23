import {
  ReassignActivationStepMutation,
  ReassignActivationStepMutationVariables
} from './reassign-activation-step.staff.gql.types'
import { REASSIGN_ACTIVATION_STEP } from './reassign-activation-step.staff.gql'

type CreateReassignActivationStepMockOptions = {
  variables?: ReassignActivationStepMutationVariables
  partialReassignActivationStepMutation: Partial<ReassignActivationStepMutation>
}

export const createReassignActivationStepMock = ({
  variables,
  partialReassignActivationStepMutation
}: CreateReassignActivationStepMockOptions) => {
  const reassignActivationStepMutationMock = {
    reassignActivationStep: {
      activation: {
        id:
          partialReassignActivationStepMutation?.reassignActivationStep
            ?.activation?.id ?? '123',
        steps: {
          nodes:
            partialReassignActivationStepMutation?.reassignActivationStep
              ?.activation?.steps?.nodes ?? []
        }
      },
      errors:
        partialReassignActivationStepMutation?.reassignActivationStep?.errors ??
        [],
      success:
        partialReassignActivationStepMutation?.reassignActivationStep
          ?.success ?? true
    }
  }

  return {
    request: {
      query: REASSIGN_ACTIVATION_STEP,
      variables: {
        input: {
          staffId: variables?.input.staffId,
          activationStepId: variables?.input.activationStepId ?? '123',
          comment: variables?.input.comment
        }
      }
    },
    result: {
      data: {
        reassignActivationStep: {
          activation: {
            __typename: 'Activation',
            id: reassignActivationStepMutationMock.reassignActivationStep
              .activation.id,
            steps: {
              __typename: 'ActivationStepConnection',
              nodes:
                reassignActivationStepMutationMock.reassignActivationStep.activation.steps.nodes.map(
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
            reassignActivationStepMutationMock.reassignActivationStep.success,
          errors:
            reassignActivationStepMutationMock.reassignActivationStep.errors.map(
              error => ({
                ...error,
                __typename: 'GraniteError'
              })
            ),
          __typename: 'ReassignActivationStepPayload'
        }
      }
    }
  }
}

export const createReassignStepActivationFailedMock = ({
  variables
}: {
  variables: ReassignActivationStepMutationVariables
}) => ({
  request: { query: REASSIGN_ACTIVATION_STEP, variables },
  error: new Error('fake error message')
})
