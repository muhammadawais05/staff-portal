import {
  NewEngagementWizardAttributes,
  NewEngagementWizardStep
} from '@staff-portal/graphql/staff'
import { Item } from '@toptal/picasso/TagSelector'

type CandidateSendingBasePageQueryParams = {
  id?: string
  talent_id?: string
  job_id?: string
}

export type CandidateSendingPageQueryParamsValues =
  CandidateSendingBasePageQueryParams & {
    has_pending_assignment?: boolean
    engagement?: CandidateSendingBasePageQueryParams & {
      has_pending_assignment?: boolean
    }
  }

export type CandidateSendingPageQueryParams =
  CandidateSendingBasePageQueryParams & {
    has_pending_assignment?: string
    engagement?: CandidateSendingBasePageQueryParams & {
      has_pending_assignment?: string
    }
  }

export type CandidateSendingDetailsStepAttributes = Pick<
  NewEngagementWizardAttributes,
  | 'companyNetTerms'
  | 'billCycle'
  | 'billDay'
  | 'commitmentCreateHours'
  | 'commitmentComment'
  | 'startDate'
  | 'timeZoneName'
  | 'rateMethod'
  | 'rateOverrideReason'
  | 'talentHourlyRate'
  | 'companyHourlyRate'
  | 'talentPartTimeRate'
  | 'companyPartTimeRate'
  | 'talentFullTimeRate'
  | 'companyFullTimeRate'
  | 'partTimeDiscount'
  | 'fullTimeDiscount'
> & {
  billCycleConfirmed?: boolean
  markup?: string | null
}

export type CandidateSendingPitchStepAttributes = Pick<
  NewEngagementWizardAttributes,
  | 'senderId'
  | 'title'
  | 'pitchText'
  | 'showContactDetails'
  | 'contactDetailsText'
  | 'showBillRate'
  | 'billRateText'
  | 'showCustomClosing'
  | 'showScheduleInterview'
  | 'customClosing'
  | 'pitchData'
> & {
  ccAdditional?: Item[]
  ccSuggested?: string[]
  ccExternal?: Item[]
  to?: string
}

export type CandidateSendingStepConfig<TStep extends NewEngagementWizardStep> =
  {
    stepperLabel: string
    stepButtonLabel?: string
    adjustFormValuesToAttributes?: TStep extends keyof CandidateSendingStepsAttributesByStep
      ? (
          formValues: NonNullable<CandidateSendingStepAttributes<TStep>>
        ) => Partial<NewEngagementWizardAttributes>
      : never
    persistForm?: boolean
  }

export type CandidateSendingStepsAttributesByStep = {
  [NewEngagementWizardStep.POSITION]: Pick<
    NewEngagementWizardAttributes,
    'jobId' | 'talentId' | 'engagementId'
  > | null
  [NewEngagementWizardStep.SKILLS]: Pick<
    NewEngagementWizardAttributes,
    'skillVettingResult' | 'skillVettingComment'
  > | null
  [NewEngagementWizardStep.AVAILABILITY]:
    | (Pick<
        NewEngagementWizardAttributes,
        | 'availabilityConfirmed'
        | 'acceptLowerCommitment'
        | 'commitment'
        | 'hasPendingAssignment'
        | 'highPriorityLockAcquired'
        | 'lockOverrideReason'
        | 'trialLength'
      > & {
        engagementEndDatesConfirmed?: boolean
        lockOverrideConfirmed?: boolean
        sendCandidateConfirmed?: boolean
        talentCommitmentConfirmed?: boolean
      })
    | null
  [NewEngagementWizardStep.DETAILS]: CandidateSendingDetailsStepAttributes | null
  [NewEngagementWizardStep.PITCH]: CandidateSendingPitchStepAttributes | null
  [NewEngagementWizardStep.FEEDBACK]: {} | null
}

export type CandidateSendingStepAttributes<
  TStep extends keyof CandidateSendingStepsAttributesByStep
> = CandidateSendingStepsAttributesByStep[TStep]

export type CandidateSendingPersistedStepsAttributesByStep =
  Partial<CandidateSendingStepsAttributesByStep>
