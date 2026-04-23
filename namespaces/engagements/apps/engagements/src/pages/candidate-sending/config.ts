import {
  CommitmentAvailability,
  EngagementCommitmentEnum,
  EngagementStatus,
  NewEngagementWizardStep
} from '@staff-portal/graphql/staff'
import {
  asQueryParam,
  QueryParamsOptions
} from '@staff-portal/query-params-state'
import { gqlIdQueryParam, parseNumericString } from '@staff-portal/filters'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  CandidateSendingPageQueryParams,
  CandidateSendingPageQueryParamsValues,
  CandidateSendingStepConfig
} from './types'
import {
  adjustAvailabilityStepFormValues,
  adjustDetailsStepFormValues,
  adjustPitchStepFormValues,
  adjustSkillsStepFormValues
} from './utils'

export const DEFAULT_ROLE_NAME = 'Talent'

const booleanQueryParam = asQueryParam({
  encode: (value: boolean): string => (value ? 'true' : 'false'),
  decode: (value: string | undefined): boolean => value === 'true'
})

export const candidateSendingEngagementQueryParamsOptions = asQueryParam<
  CandidateSendingPageQueryParamsValues,
  CandidateSendingPageQueryParams
>({
  encode: values => {
    return values as CandidateSendingPageQueryParams
  },
  sanitize: values => {
    const sanitizedValues: CandidateSendingPageQueryParams = {}

    if (values.id) {
      sanitizedValues.id = parseNumericString(values.id)
    }
    if (values.job_id) {
      sanitizedValues.job_id = parseNumericString(values.job_id)
    }
    if (values.talent_id) {
      sanitizedValues.talent_id = parseNumericString(values.talent_id)
    }
    if (values.has_pending_assignment) {
      sanitizedValues.has_pending_assignment = values.has_pending_assignment
    }

    return sanitizedValues
  },
  decode: values => {
    if (!values) {
      return {}
    }

    let id: string | undefined
    let job_id: string | undefined
    let talent_id: string | undefined
    let has_pending_assignment = false

    if (values.id) {
      id = encodeEntityId(values.id, 'Engagement')
    }
    if (values.job_id) {
      job_id = encodeEntityId(values.job_id, 'Job')
    }
    if (values.talent_id) {
      talent_id = encodeEntityId(values.talent_id, 'Talent')
    }
    if (values.has_pending_assignment) {
      has_pending_assignment = values.has_pending_assignment === 'true'
    }

    return {
      id,
      job_id,
      talent_id,
      has_pending_assignment
    }
  }
})

export const CANDIDATE_SENDING_QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  id: gqlIdQueryParam('Engagement', 'V1'),
  talent_id: gqlIdQueryParam('Talent', 'V1'),
  job_id: gqlIdQueryParam('Job', 'V1'),
  has_pending_assignment: booleanQueryParam,
  engagement: candidateSendingEngagementQueryParamsOptions
}

export const CANDIDATE_SENDING_STEPS_CONFIG: {
  [TStep in NewEngagementWizardStep]: CandidateSendingStepConfig<TStep>
} = {
  [NewEngagementWizardStep.AVAILABILITY]: {
    stepperLabel: 'Availability',
    stepButtonLabel: 'Availability',
    adjustFormValuesToAttributes: adjustAvailabilityStepFormValues
  },
  [NewEngagementWizardStep.DETAILS]: {
    stepperLabel: 'Details',
    stepButtonLabel: 'Engagement Details',
    adjustFormValuesToAttributes: adjustDetailsStepFormValues
  },
  [NewEngagementWizardStep.FEEDBACK]: {
    stepperLabel: 'Feedback',
    stepButtonLabel: 'Feedback'
  },
  [NewEngagementWizardStep.NEXT]: {
    stepperLabel: "What's next?"
  },
  [NewEngagementWizardStep.PITCH]: {
    stepperLabel: 'Pitch',
    stepButtonLabel: 'Engagement Pitch',
    adjustFormValuesToAttributes: adjustPitchStepFormValues,
    persistForm: true
  },
  [NewEngagementWizardStep.POSITION]: {
    stepperLabel: "%s's Position",
    stepButtonLabel: 'Position'
  },
  [NewEngagementWizardStep.SKILLS]: {
    stepperLabel: 'Skills',
    stepButtonLabel: 'Skills',
    adjustFormValuesToAttributes: adjustSkillsStepFormValues
  }
}

export const PERSISTED_ENGAGEMENT_INITIAL_STEP = NewEngagementWizardStep.DETAILS

export const COMMITMENT_AVAILABILITY_HOURS_MAPPING: Record<
  CommitmentAvailability,
  number
> = {
  [CommitmentAvailability.hourly]: 5,
  [CommitmentAvailability.part_time]: 20,
  [CommitmentAvailability.full_time]: 40
}

export const ENGAGEMENT_COMMITMENT_MAPPING: Record<
  EngagementCommitmentEnum,
  string
> = {
  [EngagementCommitmentEnum.FULL_TIME]: 'Full time (40+ hours/week)',
  [EngagementCommitmentEnum.PART_TIME]: 'Part time (20+ hours/week)',
  [EngagementCommitmentEnum.HOURLY]: 'Hourly'
}

export const LABEL_COLUMN_WIDTH = 16

export type CandidateSendingDraftType =
  | EngagementCumulativeStatus.PENDING_APPROVAL
  | EngagementCumulativeStatus.READY_TO_SEND

export const CandidateSendingDraftMapping: Record<
  CandidateSendingDraftType,
  EngagementStatus
> = {
  [EngagementCumulativeStatus.PENDING_APPROVAL]:
    EngagementStatus.PENDING_APPROVAL,
  [EngagementCumulativeStatus.READY_TO_SEND]: EngagementStatus.READY_TO_SEND
}
