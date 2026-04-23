import {
  JobEstimatedLengths,
  Maybe,
  UpdateJobInput,
  JobHoursOverlap
} from '@staff-portal/graphql/staff'
import { JobSkillSet } from '@staff-portal/jobs'
import { Item } from '@toptal/picasso/TagSelector'

export interface JobEditFormValues
  extends Omit<
    UpdateJobInput,
    | 'jobId'
    | 'clientMutationId'
    | 'estimatedLength'
    | 'hasPreferredHours'
    | 'hoursOverlap'
    | 'industries'
    | 'skillSets'
    | 'languageIds'
    | 'allowedCountryIds'
    | 'expectedWeeklyHours'
  > {
  hoursOverlap?: Maybe<JobHoursOverlap> | 'no_preference'
  hasPreferredHours: 'YES' | 'NO'
  uncertainOfBudget?: boolean
  allowedCountryIds: Item[]
  industries: Item[]
  languageIds: Item[]
  estimatedLength?: Maybe<JobEstimatedLengths>
  skillSets?: JobSkillSet[] | null
  expectedWeeklyHours?: number | string | null
}
