import {
  StepType,
  StepStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { AssigneeFragment, ActivationStepFragment } from '@staff-portal/talents'

type Options = {
  id?: string
  type?: StepType
  status?: StepStatus
  staff?: AssigneeFragment
  operations?: Partial<ActivationStepFragment['operations']>
}

const HIDDEN_OPERATION = {
  callable: OperationCallableTypes.HIDDEN,
  messages: []
}

export const createStep = ({
  id,
  type = StepType.PROFILE_CREATION,
  status = StepStatus.NEW,
  staff,
  operations
}: Options = {}) => ({
  id: id ?? encodeEntityId('123', 'Test'),
  type,
  status,
  staff,
  operations: {
    assign: operations?.assign ?? HIDDEN_OPERATION,
    approve: operations?.approve ?? HIDDEN_OPERATION,
    reset: operations?.reset ?? HIDDEN_OPERATION,
    reassign: operations?.reassign ?? HIDDEN_OPERATION,
    unassign: operations?.unassign ?? HIDDEN_OPERATION,
    sendIntroductionEmail:
      operations?.sendIntroductionEmail ?? HIDDEN_OPERATION,
    sendRestorationEmail: operations?.sendRestorationEmail ?? HIDDEN_OPERATION,
    sendRescheduleEmail: operations?.sendRescheduleEmail ?? HIDDEN_OPERATION
  }
})
