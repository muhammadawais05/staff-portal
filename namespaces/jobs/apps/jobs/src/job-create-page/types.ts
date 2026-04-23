import {
  CreateClaimableJobInput,
  JobEstimatedLengths,
  JobHoursOverlap,
  Maybe,
  NewJobWizardStep
} from '@staff-portal/graphql/staff'
import { JobSkillSet } from '@staff-portal/jobs'
import { Item } from '@toptal/picasso/TagSelector'

export enum JobCreateWizardSteps {
  BASIC_INFO,
  DETAILS,
  SKILLS_AND_INDUSTRIES
}

export const JobStepByCurrentWizardStepMapping: Record<
  JobCreateWizardSteps,
  NewJobWizardStep
> = {
  [JobCreateWizardSteps.BASIC_INFO]: NewJobWizardStep.BASIC_INFO,
  [JobCreateWizardSteps.DETAILS]: NewJobWizardStep.DETAILS,
  [JobCreateWizardSteps.SKILLS_AND_INDUSTRIES]:
    NewJobWizardStep.SKILLS_AND_INDUSTRIES
}

export interface JobCreateFormValues
  extends Omit<
    CreateClaimableJobInput,
    | 'clientMutationId'
    | 'companyRepresentativeIds'
    | 'semiMonthlyBilling'
    | 'hasPreferredHours'
    | 'languageIds'
    | 'hoursOverlap'
    | 'allowedCountryIds'
    | 'industries'
    | 'skillSets'
    | 'talentCount'
  > {
  companyRepresentativeIds?: Item[]
  languageIds?: Item[]
  semiMonthlyBilling: 'YES' | 'NO'
  hasPreferredHours: 'YES' | 'NO'
  hoursOverlap?: Maybe<JobHoursOverlap> | 'no_preference'
  industries?: Item[]
  allowedCountryIds?: Item[]
  estimatedLength?: Maybe<JobEstimatedLengths>
  skillSets?: JobSkillSet[] | null
  talentCount: string
}
