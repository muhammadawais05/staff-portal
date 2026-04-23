import { ColorType } from '@toptal/picasso'
import {
  TopShieldApplicationStatus,
  TopShieldApplicationOutreachStage,
  TopShieldApplicationOutreachStatus
} from '@staff-portal/graphql/staff'

export const TOP_SHIELD_STATUS_MAPPING: Record<
  TopShieldApplicationStatus,
  { text: string; color: ColorType }
> = {
  [TopShieldApplicationStatus.ACTIVE]: {
    text: 'Active',
    color: 'green'
  },
  [TopShieldApplicationStatus.PROSPECTIVE_CANDIDATE]: {
    text: 'Prospective Candidate',
    color: 'yellow'
  },
  [TopShieldApplicationStatus.FORMER]: {
    text: 'Former',
    color: 'inherit'
  },
  [TopShieldApplicationStatus.PENDING_START]: {
    text: 'Pending start',
    color: 'green'
  },
  [TopShieldApplicationStatus.NOT_A_FIT]: {
    text: 'Not a fit',
    color: 'red'
  }
}

export const TOP_SHIELD_SEGMENTS = [
  'Screening T1 - completed',
  'Screening T2 - completed',
  'Newcomer',
  'Talent in Play',
  'Sideline'
]

export const TOP_SHIELD_SKILLS = ['React']

export const TOP_SHIELD_OUTREACH_STAGES: Record<
  TopShieldApplicationOutreachStage,
  string
> = {
  [TopShieldApplicationOutreachStage.REVIEW]: 'Review',
  [TopShieldApplicationOutreachStage.INITIAL_CONTACT]: 'Initial contact',
  [TopShieldApplicationOutreachStage.CALL_SCHEDULED]: 'Call scheduled',
  [TopShieldApplicationOutreachStage.CALL_COMPLETED]: 'Call completed',
  [TopShieldApplicationOutreachStage.CONTRACT_SIGNED]: 'Contract signed'
}

export const TOP_SHIELD_OUTREACH_STATUS: Record<
  TopShieldApplicationOutreachStatus,
  string
> = {
  [TopShieldApplicationOutreachStatus.DECLINED]: 'Declined',
  [TopShieldApplicationOutreachStatus.DECLINED_FUTURE_FIT]:
    'Declined (future fit)',
  [TopShieldApplicationOutreachStatus.DECLINED_INACTIVE]: 'Declined (inactive)',
  [TopShieldApplicationOutreachStatus.NOT_A_FIT]: 'Not a fit',
  [TopShieldApplicationOutreachStatus.T2_FAILED]: 'T2 failed',
  [TopShieldApplicationOutreachStatus.T2_FAILED_INACTIVE]:
    'T2 failed (inactive)',
  [TopShieldApplicationOutreachStatus.TALENT_HIRED_PT]: 'Talent hired PT',
  [TopShieldApplicationOutreachStatus.WAITING_FOR_RESPONSE]:
    'Waiting for response',
  [TopShieldApplicationOutreachStatus.LEFT_TOP_SHIELD]: 'Left TopShield',
  [TopShieldApplicationOutreachStatus.CONTRACT_SIGNED]: 'Contract signed'
}
