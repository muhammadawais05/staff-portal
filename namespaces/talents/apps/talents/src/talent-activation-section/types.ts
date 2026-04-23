import { ActivationStepFragment } from '@staff-portal/talents'

export enum StepOperation {
  Assign = 'assign',
  Approve = 'approve',
  Reset = 'reset',
  Reassign = 'reassign',
  Unassign = 'unassign',
  SendIntroductionEmail = 'sendIntroductionEmail',
  SendRescheduleEmail = 'sendRescheduleEmail',
  SendRestorationEmail = 'sendRestorationEmail'
}

export type SecondaryOperation = Exclude<StepOperation, 'assign' | 'approve'>

export enum ActivationStatus {
  Active = 'active',
  InProgress = 'in_progress',
  Paused = 'paused',
  Rejected = 'rejected'
}

export type ActivationStepOperations = NonNullable<
  ActivationStepFragment['operations']
>

export type ApproveActivationStepFormType = {
  comment: string
  reassign?: boolean
  toptalEmail?: string
}
