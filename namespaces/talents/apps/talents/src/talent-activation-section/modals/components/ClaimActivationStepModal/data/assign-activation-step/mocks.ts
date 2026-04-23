import {
  AssignActivationStepMutation,
  AssignActivationStepMutationVariables
} from './assign-activation-step.staff.gql.types'
import { ASSIGN_ACTIVATION_STEP } from './assign-activation-step.staff.gql'

type CreateAssignActivationStepMockOptions = {
  variables?: AssignActivationStepMutationVariables
  partialAssignActivationStepMutation: Partial<AssignActivationStepMutation>
}

export const createAssignActivationStepMock = ({
  variables,
  partialAssignActivationStepMutation
}: CreateAssignActivationStepMockOptions) => {
  const assignActivationStepMutationMock = {
    assignActivationStep: {
      activation: {
        id:
          partialAssignActivationStepMutation?.assignActivationStep?.activation
            ?.id ?? '123',
        steps: {
          nodes:
            partialAssignActivationStepMutation?.assignActivationStep
              ?.activation?.steps?.nodes ?? []
        }
      },
      errors:
        partialAssignActivationStepMutation?.assignActivationStep?.errors ?? [],
      success:
        partialAssignActivationStepMutation?.assignActivationStep?.success ??
        true
    }
  }

  return {
    request: {
      query: ASSIGN_ACTIVATION_STEP,
      variables: {
        input: {
          staffId: variables?.input.staffId ?? '123',
          activationStepId: variables?.input.activationStepId ?? '123'
        }
      }
    },
    result: {
      data: {
        assignActivationStep: {
          activation: {
            __typename: 'Activation',
            id: assignActivationStepMutationMock.assignActivationStep.activation
              .id,
            steps: {
              __typename: 'ActivationStepConnection',
              nodes:
                assignActivationStepMutationMock.assignActivationStep.activation.steps.nodes.map(
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
            assignActivationStepMutationMock.assignActivationStep.success,
          errors:
            assignActivationStepMutationMock.assignActivationStep.errors.map(
              error => ({
                ...error,
                __typename: 'GraniteError'
              })
            ),
          __typename: 'AssignActivationStepPayload'
        }
      }
    }
  }
}

export const createAssignStepActivationFailedMock = ({
  variables
}: {
  variables: AssignActivationStepMutationVariables
}) => ({
  request: { query: ASSIGN_ACTIVATION_STEP, variables },
  error: new Error('fake error message')
})
