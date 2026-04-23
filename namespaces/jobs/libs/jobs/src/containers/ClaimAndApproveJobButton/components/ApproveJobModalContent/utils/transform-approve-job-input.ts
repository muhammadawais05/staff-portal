import { JobBudgetDetails } from '@staff-portal/graphql/staff'

import { ApproveJobMutationVariables } from '../../../data'
import { ApproveJobForm } from '../../../types'

const toInt = (value?: string | number | null): number | undefined => {
  if (typeof value === 'number') {
    return value
  }

  return value ? parseInt(value) : undefined
}

const transformSkills = (skills: ApproveJobForm['skills']) =>
  skills?.map(
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

const transformJobQuestions = (
  jobPositionQuestions: ApproveJobForm['jobPositionQuestions']
) =>
  jobPositionQuestions
    ?.filter(({ id, label }) => id || label)
    .map(
      ({
        id,
        label,
        comment,
        required,
        jobPositionQuestionTemplateId,
        destroy
      }) => ({
        id,
        comment,
        required,
        jobPositionQuestionTemplateId,
        // setting label to a random text so backend doesn't throw error
        // when we destroy a pre-filled question
        label: label ?? '',
        destroy: (id && !label) || destroy
      })
    )

const transformRequiredApplicationPitch = (
  jobPositionQuestions: ApproveJobForm['jobPositionQuestions'],
  requiredApplicationPitch: ApproveJobForm['requiredApplicationPitch']
) =>
  jobPositionQuestions?.some(({ destroy }) => !destroy)
    ? requiredApplicationPitch
    : true

const transformBudgetDetails = (
  noRateLimit?: boolean,
  uncertainOfBudget?: boolean
) => {
  if (noRateLimit) {
    return JobBudgetDetails.NO_RATE_LIMIT
  }

  if (uncertainOfBudget) {
    return JobBudgetDetails.UNCERTAIN_OF_BUDGET
  }

  return JobBudgetDetails.RATE_SPECIFIED
}

export const transformApproveJobInput = (
  jobId: string,
  {
    maxHourlyRate,
    noRateLimit,
    uncertainOfBudget,
    expectedWeeklyHours,
    createDeposit,
    deposit,
    skills,
    jobPositionQuestions,
    requiredApplicationPitch,
    // We need to exclude this field in the variables
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    showNoRequiredSkillsConfirmation,
    ...rest
  }: ApproveJobForm
): ApproveJobMutationVariables['input'] => ({
  jobId,
  budgetDetails: transformBudgetDetails(noRateLimit, uncertainOfBudget),
  maxHourlyRate:
    !noRateLimit && !uncertainOfBudget ? toInt(maxHourlyRate) : undefined,
  expectedWeeklyHours: toInt(expectedWeeklyHours),
  deposit: createDeposit && deposit ? deposit : null,
  skillSets: transformSkills(skills),
  jobPositionQuestions: transformJobQuestions(jobPositionQuestions),
  requiredApplicationPitch: transformRequiredApplicationPitch(
    jobPositionQuestions,
    requiredApplicationPitch
  ),
  ...rest
})
