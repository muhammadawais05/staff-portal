import {
  EngagementCommitmentEnum,
  JobBudgetDetails
} from '@staff-portal/graphql/staff'
import { Item } from '@toptal/picasso/Autocomplete'
import { JobEditFragment } from '@staff-portal/jobs'

import { JobEditFormValues } from '../../../types'
import { getInitialSkillSets } from './get-initial-skill-sets'

export const mapToOptions = (
  options?: { id: string; name: string }[]
): Item[] =>
  (options || []).map(({ id, name }) => ({
    text: name,
    value: id
  }))

// eslint-disable-next-line complexity
export const getInitialValues = ({
  title,
  description,
  startDate,
  vertical,
  claimer,
  specialization,
  hasPreferredHours,
  workType,
  commitment,
  location,
  noRateLimit,
  skillLongShot,
  nicheLongShot,
  uncertainOfBudgetReason,
  uncertainOfBudgetReasonComment,
  budgetDetails,
  hiddenForTalents,
  timeZonePreference,
  workingTimeFrom,
  industries,
  workingTimeTo,
  hoursOverlapEnum,
  estimatedLength,
  countryRequirements,
  languages,
  timeLengthOnsite,
  maxHourlyRate,
  longshotReasons,
  commitmentSettings,
  expectedWeeklyHours,
  skillSets
}: JobEditFragment): JobEditFormValues => ({
  title,
  startDate,
  jobDescription: description,
  verticalId: vertical?.id,
  specializationId: claimer && specialization?.id,
  hasPreferredHours: hasPreferredHours ? 'YES' : 'NO',
  workType,
  location: location && {
    countryId: location?.country?.id,
    cityName: location?.cityName,
    city: location?.cityName,
    placeId: location?.placeId
  },
  maxHourlyRate,
  noRateLimit:
    budgetDetails === JobBudgetDetails.NO_RATE_LIMIT ||
    (!budgetDetails && noRateLimit),
  uncertainOfBudget: budgetDetails === JobBudgetDetails.UNCERTAIN_OF_BUDGET,
  uncertainOfBudgetReason,
  uncertainOfBudgetReasonComment,
  skillLongShot,
  nicheLongShot,
  hiddenForTalents,
  timeZoneName: timeZonePreference?.value,
  workingTimeFrom: hasPreferredHours ? workingTimeFrom : undefined,
  workingTimeTo: hasPreferredHours ? workingTimeTo : undefined,
  hoursOverlap: hoursOverlapEnum ?? undefined,
  estimatedLength,
  allowedCountryIds: mapToOptions(countryRequirements?.nodes),
  industries: mapToOptions(industries?.nodes),
  languageIds: mapToOptions(languages?.nodes),
  timeLengthOnsite,
  longshotReasons,
  commitment: commitment?.toUpperCase(),
  commitmentMinimumHours:
    commitment?.toUpperCase() === EngagementCommitmentEnum.HOURLY &&
    vertical?.commitmentSettingsApplicable
      ? commitmentSettings?.minimumHours
      : undefined,
  commitmentComment:
    commitment?.toUpperCase() === EngagementCommitmentEnum.HOURLY &&
    vertical?.commitmentSettingsApplicable
      ? commitmentSettings?.lastComment
      : undefined,
  expectedWeeklyHours:
    commitment?.toUpperCase() === EngagementCommitmentEnum.HOURLY
      ? expectedWeeklyHours
      : undefined,
  skillSets: getInitialSkillSets(skillSets)
})
