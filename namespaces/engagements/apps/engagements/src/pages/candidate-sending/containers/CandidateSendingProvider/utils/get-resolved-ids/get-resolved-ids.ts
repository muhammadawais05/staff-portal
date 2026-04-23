import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import { CandidateSendingStepsAttributesByStep } from '../../../../types'

// Resolved `jobId` and `talentId` values are needed to display some sections and calculate some logic
// These values are based on:
//    1) Values from attributes (if exist), that were received from the query parameters or selected via inputs on `position` step.
//    2) In case when we have only `id` (engagement id) query parameter, we fetch initial `jobId` and `talentId` within initial step data.
//       In this case we don't pass `jobId` and `talentId` as attributes to `newEngagementWizard` query

export const getResolvedJobId = (
  stepsAttributesByStep: CandidateSendingStepsAttributesByStep,
  initialJobId: string | undefined
): string | null =>
  stepsAttributesByStep[NewEngagementWizardStep.POSITION]?.jobId ??
  initialJobId ??
  null

export const getResolvedTalentId = (
  stepsAttributesByStep: CandidateSendingStepsAttributesByStep,
  initialTalentId: string | undefined
): string | null =>
  stepsAttributesByStep[NewEngagementWizardStep.POSITION]?.talentId ??
  initialTalentId ??
  null
