import { UpdateJobInput, JobBudgetDetails } from '@staff-portal/graphql/staff'

import { JobEditFormValues } from '../../../types'

const toInt = (value?: string | number | null): number | undefined => {
  if (typeof value === 'number') {
    return value
  }

  return value ? parseInt(value) : undefined
}

const parseBudgetDetails = ({
  noRateLimit,
  uncertainOfBudget
}: Pick<JobEditFormValues, 'noRateLimit' | 'uncertainOfBudget'>) => {
  if (noRateLimit) {
    return JobBudgetDetails.NO_RATE_LIMIT
  }

  if (uncertainOfBudget) {
    return JobBudgetDetails.UNCERTAIN_OF_BUDGET
  }

  return JobBudgetDetails.RATE_SPECIFIED
}

const parseMaxHourlyRate = ({
  noRateLimit,
  uncertainOfBudget,
  maxHourlyRate
}: Pick<
  JobEditFormValues,
  'noRateLimit' | 'uncertainOfBudget' | 'maxHourlyRate'
>) => (!noRateLimit && !uncertainOfBudget ? toInt(maxHourlyRate) : undefined)

const parseSkillSets = (skillSets: JobEditFormValues['skillSets']) =>
  skillSets?.map(
    ({
      id,
      destroy,
      main,
      rating,
      niceToHave,
      skill: {
        name,
        category: { id: categoryId }
      }
    }) => ({
      id,
      destroy,
      main,
      rating,
      niceToHave,
      skill: { categoryId, name }
    })
  )

export const transformJobEditInput = (
  jobId: string,
  {
    commitment,
    allowedCountryIds,
    languageIds,
    estimatedLength,
    hasPreferredHours,
    hoursOverlap,
    industries,
    skillSets,
    maxHourlyRate,
    noRateLimit,
    uncertainOfBudget,
    expectedWeeklyHours,
    location,
    ...rest
  }: JobEditFormValues
): UpdateJobInput => ({
  ...rest,
  jobId,
  expectedWeeklyHours: toInt(expectedWeeklyHours),
  commitment: commitment?.toLowerCase(),
  allowedCountryIds: allowedCountryIds.map(country => country.value as string),
  languageIds: languageIds.map(language => language.value as string),
  estimatedLengthEnum: estimatedLength,
  hasPreferredHours: hasPreferredHours === 'YES',
  hoursOverlap:
    hoursOverlap && hoursOverlap !== 'no_preference' ? hoursOverlap : null,
  industries: industries?.map(industry => ({ id: industry.value as string })),
  budgetDetails: parseBudgetDetails({ noRateLimit, uncertainOfBudget }),
  maxHourlyRate: parseMaxHourlyRate({
    noRateLimit,
    uncertainOfBudget,
    maxHourlyRate
  }),
  location: location
    ? {
        countryId: location.countryId ?? null,
        city: location.city ?? null,
        cityName: location.cityName ?? null,
        placeId: location.placeId ?? null
      }
    : null,
  skillSets: parseSkillSets(skillSets)
})
