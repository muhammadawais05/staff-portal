import { NewJobWizardAttributes } from '@staff-portal/graphql/staff'

import { JobCreateFormValues } from '../../../types'

const parseSkillSets = (skillSets: JobCreateFormValues['skillSets']) =>
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
  ) ?? []

export const transformCreateJobInput = ({
  companyRepresentativeIds,
  hasPreferredHours,
  hoursOverlap,
  industries,
  languageIds,
  semiMonthlyBilling,
  skillSets,
  allowedCountryIds,
  talentCount,
  ...rest
}: JobCreateFormValues): NewJobWizardAttributes => ({
  companyRepresentativeIds: companyRepresentativeIds?.map(
    ({ value }) => value as string
  ),
  semiMonthlyBilling: semiMonthlyBilling === 'YES',
  hasPreferredHours: hasPreferredHours === 'YES',
  industries: industries?.map(({ value }) => ({
    id: value as string
  })),
  skillSets: parseSkillSets(skillSets),
  languageIds: languageIds?.map(({ value }) => value as string),
  allowedCountryIds: allowedCountryIds?.map(({ value }) => value as string),
  talentCount: parseInt(talentCount),
  hoursOverlap:
    hoursOverlap && hoursOverlap !== 'no_preference' ? hoursOverlap : null,
  ...rest
})
