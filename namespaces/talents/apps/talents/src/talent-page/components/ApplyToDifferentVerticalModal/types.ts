import {
  ScreeningStep,
  ProfileField,
  ProfileWizardStep,
  ApplyTalentToAnotherVerticalInput,
  Skill
} from '@staff-portal/graphql/staff'

export type ApplyToDifferentVerticalStep =
  | ScreeningStep
  | ProfileField
  | ProfileWizardStep

export type FormValues = Pick<
  ApplyTalentToAnotherVerticalInput,
  'newVerticalId'
> & {
  applicantSkillIds: Skill[]
} & {
  screeningSteps: { [key in ScreeningStep]?: boolean }
  profileFields: { [key in ProfileField]?: boolean }
  profileWizardSteps: { [key in ProfileWizardStep]?: boolean }
}
