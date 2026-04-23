import {
  ApproveActivationStepMutation,
  ApproveActivationStepMutationVariables
} from './approve-activation-step.staff.gql.types'
import { APPROVE_ACTIVATION_STEP } from './approve-activation-step.staff.gql'

type CreateApproveActivationStepMockOptions = {
  variables?: ApproveActivationStepMutationVariables
  partialApproveActivationStepMutation: Partial<ApproveActivationStepMutation>
}

export const createApproveActivationStepMock = ({
  variables,
  partialApproveActivationStepMutation
}: CreateApproveActivationStepMockOptions) => {
  const approveActivationStepMutationMock: ApproveActivationStepMutation = {
    approveActivationStep: {
      activation: {
        id:
          partialApproveActivationStepMutation?.approveActivationStep
            ?.activation?.id ?? '123',
        steps: {
          nodes:
            partialApproveActivationStepMutation?.approveActivationStep
              ?.activation?.steps?.nodes ?? []
        }
      },
      errors:
        partialApproveActivationStepMutation?.approveActivationStep?.errors ??
        [],
      success:
        partialApproveActivationStepMutation?.approveActivationStep?.success ??
        true
    }
  }

  return {
    request: {
      query: APPROVE_ACTIVATION_STEP,
      variables: {
        input: {
          activationStepId: variables?.input.activationStepId ?? '123',
          comment: variables?.input.comment,
          reassign: variables?.input.reassign,
          toptalEmail: variables?.input.toptalEmail
        }
      }
    },
    result: {
      data: {
        approveActivationStep: {
          activation: {
            __typename: 'Activation',
            id: approveActivationStepMutationMock.approveActivationStep
              ?.activation?.id,
            steps: {
              __typename: 'ActivationStepConnection',
              nodes:
                approveActivationStepMutationMock.approveActivationStep?.activation?.steps.nodes.map(
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
            approveActivationStepMutationMock.approveActivationStep?.success,
          errors:
            approveActivationStepMutationMock.approveActivationStep?.errors.map(
              error => ({
                ...error,
                __typename: 'GraniteError'
              })
            ),
          __typename: 'ApproveActivationStepPayload'
        }
      }
    }
  }
}

export const createApproveActivationStepFailedMock = ({
  variables
}: {
  variables: ApproveActivationStepMutationVariables
}) => ({
  request: { query: APPROVE_ACTIVATION_STEP, variables },
  error: new Error('fake error message')
})
