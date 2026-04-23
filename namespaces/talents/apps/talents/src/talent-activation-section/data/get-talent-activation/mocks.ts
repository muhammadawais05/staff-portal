import {
  OperationCallableTypes,
  StepType,
  StepStatus
} from '@staff-portal/graphql/staff'

import { TalentActivationStepsFragment } from './get-talent-activation.staff.gql.types'
import { ActivationStatus } from '../../types'

const stepTypes = [
  StepType.TALENT_AGREEMENT,
  StepType.TOPTAL_TRAINING,
  StepType.PROFILE_CREATION,
  StepType.PROFILE_APPROVE,
  StepType.PROFILE_EDITING,
  StepType.LEGAL,
  StepType.PAYMENT,
  StepType.TOPTAL_EMAIL
]

export const createGetTalentActivationStepsMock = (
  partialTalentActivationStepsFragment?: Partial<TalentActivationStepsFragment>
) => {
  const {
    id = '123',
    fullName = 'Talent 123',
    activationSectionInProgress = true,
    activationSectionVisible = true,
    activation
  } = partialTalentActivationStepsFragment || {}
  const talentActivationStepFragment: TalentActivationStepsFragment = {
    ...partialTalentActivationStepsFragment,
    id,
    fullName,
    activationSectionInProgress,
    activationSectionVisible,
    activation: {
      id: activation?.id ?? '123',
      status: activation?.status ?? ActivationStatus.InProgress,
      steps: {
        nodes:
          activation?.steps?.nodes ??
          stepTypes.map((type, index) => ({
            id: index.toString(),
            type,
            status: StepStatus.FINISHED,
            staff: {
              id: index.toString(),
              fullName: `TEST_NAME_${index}`
            },
            operations: {
              assign: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              },
              approve: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              },
              reassign: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              },
              reset: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              },
              unassign: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              },
              sendIntroductionEmail: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              },
              sendRescheduleEmail: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              },
              sendRestorationEmail: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              }
            }
          }))
      }
    }
  }

  return {
    ...talentActivationStepFragment,
    activation: {
      ...talentActivationStepFragment.activation,
      steps: {
        nodes: talentActivationStepFragment.activation?.steps?.nodes.map(
          node => ({
            ...node,
            staff: node.staff ? { ...node.staff } : null,
            operations: {
              __typename: 'ActivationStepOperations',
              assign: {
                ...node.operations?.assign
              },
              approve: {
                ...node.operations?.approve
              },
              reassign: {
                ...node.operations?.reassign
              },
              reset: {
                ...node.operations?.reset
              },
              unassign: {
                ...node.operations?.unassign
              },
              sendIntroductionEmail: {
                ...node.operations?.sendIntroductionEmail
              },
              sendRescheduleEmail: {
                ...node.operations?.sendRescheduleEmail
              },
              sendRestorationEmail: {
                ...node.operations?.sendRestorationEmail
              }
            }
          })
        )
      }
    }
  } as TalentActivationStepsFragment
}
