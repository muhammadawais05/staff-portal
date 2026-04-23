import { StepType } from '@staff-portal/graphql/staff'

const titleByType = {
  [StepType.TALENT_AGREEMENT]: 'Platform Agreement',
  [StepType.TOPTAL_TRAINING]: 'Toptal Training',
  [StepType.PROFILE_CREATION]: 'Profile Creation',
  [StepType.REVIEW_CALL]: 'Review Call',
  [StepType.PROFILE_CHANGES]: 'Profile Changes',
  [StepType.PROFILE_APPROVE]: 'Profile Approval',
  [StepType.PROFILE_EDITING]: 'Profile Editing',
  [StepType.LEGAL]: 'Legal Details',
  [StepType.PAYMENT]: 'Payment Method',
  [StepType.TOPTAL_EMAIL]: 'Toptal Email'
}

export const getStepName = (type: StepType) => titleByType[type]
