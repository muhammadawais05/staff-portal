import {
  JobCandidateOperationsFragment,
  TalentJobPreferencesFragment
} from '@staff-portal/talents'

import { TalentsListItemFragment } from '../data'

export type TalentListItemType = TalentsListItemFragment & {
  operations: TalentsListItemFragment['operations'] &
    Partial<JobCandidateOperationsFragment>
  jobPreferences?: TalentJobPreferencesFragment | null
}
