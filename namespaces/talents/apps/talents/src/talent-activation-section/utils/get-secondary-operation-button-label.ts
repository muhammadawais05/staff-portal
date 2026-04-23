import { StepOperation, SecondaryOperation } from '../types'

const labelByType = {
  [StepOperation.Reset]: 'Reset Step',
  [StepOperation.Reassign]: 'Reassign Step',
  [StepOperation.Unassign]: 'Unclaim Step',
  [StepOperation.SendIntroductionEmail]: 'Send Email: MBP Invitation',
  [StepOperation.SendRescheduleEmail]: 'Send Email: MBP Reschedule',
  [StepOperation.SendRestorationEmail]: 'Send Email: MBP Restoration'
}

export const getSecondaryOperationButtonLabel = (type: SecondaryOperation) =>
  labelByType[type]
