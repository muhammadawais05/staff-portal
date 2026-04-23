import { Maybe } from '@toptal/picasso/utils'
import { titleize, compareAlphabetically } from '@staff-portal/string'
import { TalentVerticalFragment } from '@staff-portal/talents'

import { TalentCompletedStepsFragment } from '../../data/get-apply-to-different-vertical-steps'
import {
  PROFILE_STEPS,
  PROFILE_WIZARD_STEPS,
  SCREENING_STEPS
} from '../../constants'
import { ApplyToDifferentVerticalStep, FormValues } from '../../types'

const getStepValues = <T extends ApplyToDifferentVerticalStep>(
  allSteps: T[],
  data: Maybe<T[]> | undefined
): { [key in T]?: boolean } => {
  if (!data) {
    return {}
  }

  return allSteps.reduce((acc, cur) => {
    acc[cur] = data.includes(cur)

    return acc
  }, {} as { [key in T]: boolean })
}

export const getStepsInitialValues = (
  steps: TalentCompletedStepsFragment
): FormValues => ({
  screeningSteps: getStepValues(
    SCREENING_STEPS,
    steps?.completedScreeningSteps
  ),
  profileFields: getStepValues(PROFILE_STEPS, steps?.completedProfileFields),
  profileWizardSteps: getStepValues(
    PROFILE_WIZARD_STEPS,
    steps?.completedProfileWizardSteps
  ),
  applicantSkillIds: [],
  newVerticalId: ''
})

export const prepareFieldsForMutation = <
  T extends ApplyToDifferentVerticalStep
>(step: { [key in T]?: boolean }) =>
  Object.entries(step).reduce((acc, [key, value]) => {
    if (value) {
      acc.push(key as T)
    }

    return acc
  }, [] as T[])

export const getVerticalOptions = (verticals: TalentVerticalFragment[]) =>
  verticals
    .map(({ id, talentType }) => ({
      text: titleize(talentType),
      value: id
    }))
    .sort((first, second) => compareAlphabetically(first.text, second.text))
