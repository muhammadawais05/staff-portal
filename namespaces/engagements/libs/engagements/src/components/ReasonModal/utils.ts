import { FeedbackReasonActions, Maybe } from '@staff-portal/graphql/staff'

import {
  CancelEngagementMutation,
  useCancelEngagement
} from '../CancelEngagementModal/data'
import {
  CancelEngagementInInterviewMutation,
  useCancelEngagementInInterview
} from '../CancelInterviewModal/data'
import {
  RejectApprovedEngagementTrialMutation,
  RejectEngagementTrialMutation,
  useRejectApprovedEngagementTrial,
  useRejectEngagementTrial
} from '../RejectEngagementTrialModal/data'
import { RejectEngagementOnInterviewMutation, useRejectEngagementCandidate } from '../RejectEngagementCandidateModal/data'
import { RejectDraftEngagementMutation } from '../RejectDraftEngagementModal/data/reject-draft-engagement'
import { useRejectDraftEngagement } from '../RejectDraftEngagementModal/data'
import { CancelEngagementDraftInInterviewMutation, useCancelEngagementDraftInInterview } from '../CancelEngagementDraftModal/data'

export const MUTATION_HOOK_MAPPING = {
  rejectEngagementTrial: useRejectEngagementTrial,
  rejectApprovedEngagementTrial: useRejectApprovedEngagementTrial,
  rejectEngagementOnInterview: useRejectEngagementCandidate,
  cancelEngagementDraftInInterview: useCancelEngagementDraftInInterview,
  cancelEngagementInInterview: useCancelEngagementInInterview,
  cancelEngagementTrial: useCancelEngagement,
  rejectDraftEngagement: useRejectDraftEngagement
}

export type EngagementReasonMutations = keyof typeof MUTATION_HOOK_MAPPING

export type EngagementReasonActions =
  | FeedbackReasonActions.TRIAL_REJECTED
  | FeedbackReasonActions.INTERVIEW_CANCELLED
  | FeedbackReasonActions.CANDIDATE_REJECTED
  | FeedbackReasonActions.ENGAGEMENT_DRAFT_REJECTED

/**
 * via docs: https://toptal-core.atlassian.net/wiki/spaces/GOLD/pages/2010350608/Engagement+Actions
  "Reject Trial": TRIAL_REJECTED,
  "Reject Trial (Approved"): TRIAL_REJECTED,
  "Cancel Interview": INTERVIEW_CANCELLED,
  "Cancel Internal Interview": INTERVIEW_CANCELLED,
  "Cancel Engagement": INTERVIEW_CANCELLED,
  "Reject Candidate": CANDIDATE_REJECTED,
  "Reject with Feedback": ENGAGEMENT_DRAFT_REJECTED,
 */
export const getReasonAction = (
  mutationName: EngagementReasonMutations
): EngagementReasonActions => {
  switch (mutationName) {
    case 'rejectEngagementTrial':
    case 'rejectApprovedEngagementTrial':
      return FeedbackReasonActions.TRIAL_REJECTED
    case 'cancelEngagementInInterview':
    case 'cancelEngagementDraftInInterview':
    case 'cancelEngagementTrial':
      return FeedbackReasonActions.INTERVIEW_CANCELLED
    case 'rejectEngagementOnInterview':
      return FeedbackReasonActions.CANDIDATE_REJECTED
    case 'rejectDraftEngagement':
      return FeedbackReasonActions.ENGAGEMENT_DRAFT_REJECTED
  }
}

export const getMutationResult = ({
  mutationName,
  data
}: {
  mutationName: EngagementReasonMutations
  data?: Maybe<
    | RejectEngagementTrialMutation
    | RejectApprovedEngagementTrialMutation
    | RejectEngagementOnInterviewMutation
    | CancelEngagementDraftInInterviewMutation
    | CancelEngagementInInterviewMutation
    | CancelEngagementMutation
    | RejectDraftEngagementMutation
  >
}) => {
  if (!data) {
    return undefined
  }

  switch (mutationName) {
    case 'rejectEngagementTrial':
      return (data as RejectEngagementTrialMutation)?.rejectEngagementTrial
    case 'rejectApprovedEngagementTrial':
      return (data as RejectApprovedEngagementTrialMutation)
        ?.rejectApprovedEngagementTrial
    case 'rejectEngagementOnInterview':
      return (data as RejectEngagementOnInterviewMutation)
        ?.rejectEngagementOnInterview
    case 'cancelEngagementDraftInInterview':
      return (data as CancelEngagementDraftInInterviewMutation)
        ?.cancelEngagementDraftInInterview
    case 'cancelEngagementInInterview':
      return (data as CancelEngagementInInterviewMutation)
        ?.cancelEngagementInInterview
    case 'cancelEngagementTrial':
      return (data as CancelEngagementMutation)?.cancelEngagementTrial
    case 'rejectDraftEngagement':
      return (data as RejectDraftEngagementMutation)?.rejectDraftEngagement
    default:
      return undefined
  }
}
