import { isString } from '@toptal/picasso/utils'
import {
  ConvertTalentToSourcingFlowInput,
  TalentApplicationAnswerInput
} from '@staff-portal/graphql/staff'
import { CountryFragment } from '@staff-portal/facilities'

import { DefaultApplicationAnswersFragment } from './data/get-convert-to-sourcing-flow'
import { AnswerFormValue, FormValues } from './types'

export const getCountryId = (
  countries: CountryFragment[],
  key: keyof CountryFragment,
  target?: string | null
) => countries.find(country => country[key] === target)?.id || ''

export const getInitialAnswers = (
  defaultApplicationAnswers: DefaultApplicationAnswersFragment[]
) =>
  defaultApplicationAnswers.reduce((acc, answer) => {
    acc[answer.question.id] = answer.answers[0]

    return acc
  }, {} as AnswerFormValue)

export const formValuesToMutationInput = (
  values: FormValues,
  talentId: string
): ConvertTalentToSourcingFlowInput => {
  const applicantSkillIds: string[] = []
  const newApplicantSkillNames: string[] = []

  values.skills.forEach(skill => {
    if (!skill) {
      return
    }

    if (isString(skill)) {
      newApplicantSkillNames.push(skill)

      return
    }

    applicantSkillIds.push(skill.id)
  })

  const applicationAnswers: TalentApplicationAnswerInput[] = []

  if (values.answers) {
    Object.keys(values.answers).forEach(questionId => {
      applicationAnswers.push({
        questionId,
        answers: [(values.answers as AnswerFormValue)[questionId]]
      })
    })
  }

  return {
    email: values.email,
    fullName: values.fullName,
    countryId: values.countryId,
    citizenshipId: values.citizenshipId,
    ...(newApplicantSkillNames.length ? { newApplicantSkillNames } : {}),
    applicantSkillIds,
    placeId: values.city.placeId,
    city: values.city.name,
    applicationAnswers,
    talentId
  }
}
