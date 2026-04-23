import {
  ProfileField,
  ProfileWizardStep,
  ScreeningStep
} from '@staff-portal/graphql/staff'

export const SCREENING_STEPS = [
  ScreeningStep.ONBOARDING_QUESTIONS,
  ScreeningStep.ENGLISH
]

export const PROFILE_WIZARD_STEPS = [
  ProfileWizardStep.PAYMENT_METHODS,
  ProfileWizardStep.LEGAL,
  ProfileWizardStep.TOPTAL_EMAIL,
  ProfileWizardStep.EMPLOYMENT_HISTORY,
  ProfileWizardStep.EDUCATION,
  ProfileWizardStep.CERTIFICATIONS,
  ProfileWizardStep.WORKING_HOURS
]

export const PROFILE_STEPS = [ProfileField.RESUME]

export const TOOLTIP_MAPPING: Record<
  ScreeningStep | ProfileWizardStep | ProfileField,
  string
> = {
  [ScreeningStep.ONBOARDING_QUESTIONS]: 'Copies all onboarding answers',
  [ScreeningStep.ENGLISH]:
    'Approves English screening step and copies all notes from claimer of this step',
  [ProfileWizardStep.PAYMENT_METHODS]:
    'Copies all payment information to new profile to execute Toptal payments',
  [ProfileWizardStep.LEGAL]:
    'Approves Legal step and imports all existing signed contracts',
  [ProfileWizardStep.TOPTAL_EMAIL]:
    'Approves Email step and creates new Toptal email by appending the vertical to the original email',
  [ProfileWizardStep.EMPLOYMENT_HISTORY]:
    'Copies employment information to the new profile',
  [ProfileWizardStep.EDUCATION]:
    'Copies education information to the new profile',
  [ProfileWizardStep.CERTIFICATIONS]:
    'Copies certification information to the new profile',
  [ProfileWizardStep.WORKING_HOURS]: 'Copies working hours to the new profile',
  [ProfileField.RESUME]: 'Copies all resume files to the new profile'
}

export const SKIP_ENGLISH_STEP_WARNING_MESSAGE_ID = 'skip-english-step-warning'
