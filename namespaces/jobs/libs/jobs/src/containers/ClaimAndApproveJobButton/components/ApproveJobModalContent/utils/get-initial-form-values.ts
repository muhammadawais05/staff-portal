import { JobBudgetDetails } from '@staff-portal/graphql/staff'

import { JobDetails, ApproveJobForm } from '../../../types'
import { GetApproveJobDetailsQuery } from '../../../data'

const HOURLY_COMMITMENT = 'hourly'

const getInitialBudgetInfo = ({
  canManageJobMaxHourlyRate,
  budgetDetails,
  noRateLimit,
  uncertainOfBudgetReason,
  uncertainOfBudgetReasonComment,
  maxHourlyRate
}: Pick<
  JobDetails,
  | 'budgetDetails'
  | 'noRateLimit'
  | 'uncertainOfBudgetReason'
  | 'uncertainOfBudgetReasonComment'
  | 'maxHourlyRate'
> & { canManageJobMaxHourlyRate: boolean }) => {
  if (!canManageJobMaxHourlyRate) {
    return
  }

  if (!budgetDetails) {
    return noRateLimit ? { noRateLimit: true } : { maxHourlyRate }
  }

  switch (budgetDetails) {
    case JobBudgetDetails.NO_RATE_LIMIT:
      return { noRateLimit: true }
    case JobBudgetDetails.UNCERTAIN_OF_BUDGET:
      return {
        uncertainOfBudget: true,
        uncertainOfBudgetReason,
        uncertainOfBudgetReasonComment
      }
    case JobBudgetDetails.RATE_SPECIFIED:
      return { maxHourlyRate }
  }
}

const getInitialJobPositionQuestions = (
  jobPositionQuestions: JobDetails['positionQuestions'],
  activeJobPositionQuestionTemplates: GetApproveJobDetailsQuery['activeJobPositionQuestionTemplates']['nodes']
) => [
  ...activeJobPositionQuestionTemplates
    .filter(
      ({ sticky, id }) =>
        sticky &&
        !jobPositionQuestions?.nodes.some(({ template }) => template?.id === id)
    )
    .map(({ id: jobPositionQuestionTemplateId, question: label, sticky }) => ({
      label,
      jobPositionQuestionTemplateId,
      sticky,
      required: true
    })),
  ...(jobPositionQuestions?.nodes
    ?.map(({ template, ...rest }) => ({
      ...rest,
      jobPositionQuestionTemplateId: template?.id,
      sticky: template?.sticky
    }))
    ?.sort(
      ({ sticky: sticky1 }, { sticky: sticky2 }) =>
        Number(!!sticky2) - Number(!!sticky1)
    ) || [])
]

export const getInitialFormValues = ({
  job: {
    categories,
    claimer,
    availableSpecializations,
    client: { depositInvoices, jobDepositCanBeIssued },
    budgetDetails,
    noRateLimit,
    uncertainOfBudgetReason,
    uncertainOfBudgetReasonComment,
    maxHourlyRate,
    longshotReasons,
    commitment,
    expectedWeeklyHours,
    hiddenForTalents,
    possiblyRelatedMeetings,

    positionQuestions,
    requiredApplicationPitch
  },
  inTalentMatchers,
  canManageJobMaxHourlyRate,
  activeJobPositionQuestionTemplates
}: {
  job: JobDetails
  inTalentMatchers: boolean
  canManageJobMaxHourlyRate: boolean
  activeJobPositionQuestionTemplates: GetApproveJobDetailsQuery['activeJobPositionQuestionTemplates']['nodes']
}): ApproveJobForm => {
  const budgetInfo = getInitialBudgetInfo({
    canManageJobMaxHourlyRate,
    budgetDetails,
    noRateLimit,
    uncertainOfBudgetReason,
    uncertainOfBudgetReasonComment,
    maxHourlyRate
  })
  const createDeposit = jobDepositCanBeIssued
    ? !depositInvoices?.nodes.length
    : undefined

  return {
    skipSkillsChecks: true,
    skipQualityChecks: true,
    showNoRequiredSkillsConfirmation: true,

    specializationId:
      availableSpecializations?.nodes.length === 1
        ? availableSpecializations.nodes[0].id
        : undefined,
    categoryIds: categories?.nodes.map(({ id }) => id) ?? [],
    claimerId: inTalentMatchers ? claimer?.id : undefined,
    meetingId:
      possiblyRelatedMeetings?.nodes.length === 1
        ? possiblyRelatedMeetings.nodes[0].id
        : undefined,
    createDeposit,
    deposit: jobDepositCanBeIssued && createDeposit ? '500' : undefined,
    ...budgetInfo,
    longshotReasons,
    expectedWeeklyHours:
      commitment === HOURLY_COMMITMENT ? expectedWeeklyHours : undefined,
    hiddenForTalents,

    jobPositionQuestions: getInitialJobPositionQuestions(
      positionQuestions,
      activeJobPositionQuestionTemplates
    ),
    requiredApplicationPitch
  }
}
