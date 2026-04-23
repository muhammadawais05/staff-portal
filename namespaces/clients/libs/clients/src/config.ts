import {
  ClientCumulativeStatus,
  NegotiationStatus,
  BusinessTypes,
  ClientTier,
  TopscreenStepType
} from '@staff-portal/graphql/staff'
import { ColorType } from '@toptal/picasso'

export const COMPANY_STATUS_TEXT_MAPPING: Record<
  ClientCumulativeStatus,
  string
> = {
  [ClientCumulativeStatus.ACTIVE]: 'Active',
  [ClientCumulativeStatus.APPLIED]: 'Applied',
  [ClientCumulativeStatus.BAD_LEAD]: 'Bad Lead',
  [ClientCumulativeStatus.BLACK_FLAGGED]: 'Black Flagged',
  [ClientCumulativeStatus.CONTACTED]: 'Contacted (has notes)',
  [ClientCumulativeStatus.HAD_JOB]: 'Active (with ended job)',
  [ClientCumulativeStatus.HAS_ACTIVE_JOB]: 'Active (with current job)',
  [ClientCumulativeStatus.OVERDUE_INVOICES]: 'Overdue Invoices',
  [ClientCumulativeStatus.PAUSED_ACTIVE]: 'Active (paused)',
  [ClientCumulativeStatus.PAUSED_APPLIED]: 'Applied (paused)',
  [ClientCumulativeStatus.PENDING_BILLING_INFO]: 'Pending Billing Info',
  [ClientCumulativeStatus.PENDING_TOS]: 'Pending TOS',
  [ClientCumulativeStatus.REJECTED]: 'Deleted',
  [ClientCumulativeStatus.SOURCED]: 'Sourced'
}

export const COMPANY_STATUS_COLOR_MAPPING: Record<
  ClientCumulativeStatus,
  ColorType
> = {
  [ClientCumulativeStatus.REJECTED]: 'red',
  [ClientCumulativeStatus.BLACK_FLAGGED]: 'red',
  [ClientCumulativeStatus.APPLIED]: 'yellow',
  [ClientCumulativeStatus.BAD_LEAD]: 'yellow',
  [ClientCumulativeStatus.CONTACTED]: 'yellow',
  [ClientCumulativeStatus.OVERDUE_INVOICES]: 'yellow',
  [ClientCumulativeStatus.PAUSED_ACTIVE]: 'yellow',
  [ClientCumulativeStatus.PAUSED_APPLIED]: 'yellow',
  [ClientCumulativeStatus.PENDING_BILLING_INFO]: 'yellow',
  [ClientCumulativeStatus.PENDING_TOS]: 'yellow',
  [ClientCumulativeStatus.SOURCED]: 'yellow',
  [ClientCumulativeStatus.ACTIVE]: 'green',
  [ClientCumulativeStatus.HAD_JOB]: 'green',
  [ClientCumulativeStatus.HAS_ACTIVE_JOB]: 'green'
}

export const NEGOTIATION_STATUS_TEXT_MAPPING: Record<
  NegotiationStatus,
  string
> = {
  [NegotiationStatus.SIGNED]: 'Signed',
  [NegotiationStatus.WAITING_ON_TOPTAL]: 'Waiting on Toptal',
  [NegotiationStatus.WAITING_ON_CLIENT]: 'Waiting on Client',
  [NegotiationStatus.FINISHED_NOT_SIGNED]: 'Finished, Not Signed'
}

export const CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID =
  'CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID'

export const CLIENT_STATUS_OPTIONS = [
  {
    value: ClientCumulativeStatus.ACTIVE,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.ACTIVE]
  },
  {
    value: ClientCumulativeStatus.APPLIED,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.APPLIED]
  },
  {
    value: ClientCumulativeStatus.BAD_LEAD,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.BAD_LEAD]
  },
  {
    value: ClientCumulativeStatus.BLACK_FLAGGED,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.BLACK_FLAGGED]
  },
  {
    value: ClientCumulativeStatus.CONTACTED,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.CONTACTED]
  },
  {
    value: ClientCumulativeStatus.HAD_JOB,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.HAD_JOB]
  },
  {
    value: ClientCumulativeStatus.HAS_ACTIVE_JOB,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.HAS_ACTIVE_JOB]
  },
  {
    value: ClientCumulativeStatus.OVERDUE_INVOICES,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.OVERDUE_INVOICES]
  },
  {
    value: ClientCumulativeStatus.PAUSED_ACTIVE,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.PAUSED_ACTIVE]
  },
  {
    value: ClientCumulativeStatus.PAUSED_APPLIED,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.PAUSED_APPLIED]
  },
  {
    value: ClientCumulativeStatus.PENDING_BILLING_INFO,
    label:
      COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.PENDING_BILLING_INFO]
  },
  {
    value: ClientCumulativeStatus.PENDING_TOS,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.PENDING_TOS]
  },
  {
    value: ClientCumulativeStatus.REJECTED,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.REJECTED]
  },
  {
    value: ClientCumulativeStatus.SOURCED,
    label: COMPANY_STATUS_TEXT_MAPPING[ClientCumulativeStatus.SOURCED]
  }
]

export const BUSINESS_TYPE_ITEMS: {
  [key in BusinessTypes]: {
    text: string
    value: key
  }
} = {
  [BusinessTypes.INDIVIDUAL]: {
    text: 'Individual',
    value: BusinessTypes.INDIVIDUAL
  },
  [BusinessTypes.START_UP]: {
    text: 'Start-up',
    value: BusinessTypes.START_UP
  },
  [BusinessTypes.NON_PROFIT]: {
    text: 'Non profit',
    value: BusinessTypes.NON_PROFIT
  },
  [BusinessTypes.DEV_SHOP_OR_AGENCY]: {
    text: 'Dev shop or Agency',
    value: BusinessTypes.DEV_SHOP_OR_AGENCY
  },
  [BusinessTypes.SMALL_BUSINESS]: {
    text: 'Small business',
    value: BusinessTypes.SMALL_BUSINESS
  },
  [BusinessTypes.MEDIUM_BUSINESS]: {
    text: 'Medium business',
    value: BusinessTypes.MEDIUM_BUSINESS
  },
  [BusinessTypes.ENTERPRISE_BUSINESS]: {
    text: 'Enterprise business',
    value: BusinessTypes.ENTERPRISE_BUSINESS
  },
  [BusinessTypes.GOVERNMENT]: {
    text: 'Government',
    value: BusinessTypes.GOVERNMENT
  }
}

export const BUSINESS_TYPE_OPTIONS = Object.values(BUSINESS_TYPE_ITEMS)
export const BUSINESS_TYPE_FILTER_OPTIONS = Object.values(
  BUSINESS_TYPE_ITEMS
).map(({ text, value }) => ({ label: text, value }))

export const CLIENT_TIER_MAP: {
  [key in ClientTier]: string
} = {
  [ClientTier.TIER_1]: 'Tier 1',
  [ClientTier.MID_TIER]: 'Mid-tier'
}

export const CLIENT_TIER_OPTIONS = [
  {
    value: ClientTier.TIER_1,
    label: CLIENT_TIER_MAP[ClientTier.TIER_1]
  },
  {
    value: ClientTier.MID_TIER,
    label: CLIENT_TIER_MAP[ClientTier.MID_TIER]
  }
]

export const TOPSCREEN_STEP_TYPE_TEXT_MAPPING: Record<
  TopscreenStepType,
  string
> = {
  [TopscreenStepType.ENGLISH]: 'English',
  [TopscreenStepType.ONLINE_TEST]: 'Online test',
  [TopscreenStepType.TECHNICAL_ONE]: 'Technical one',
  [TopscreenStepType.TECHNICAL_TWO]: 'Technical two'
}

export const TOPSCREEN_STEP_TYPE_OPTIONS = [
  {
    value: TopscreenStepType.ENGLISH,
    label: TOPSCREEN_STEP_TYPE_TEXT_MAPPING[TopscreenStepType.ENGLISH]
  },
  {
    value: TopscreenStepType.ONLINE_TEST,
    label: TOPSCREEN_STEP_TYPE_TEXT_MAPPING[TopscreenStepType.ONLINE_TEST]
  },
  {
    value: TopscreenStepType.TECHNICAL_ONE,
    label: TOPSCREEN_STEP_TYPE_TEXT_MAPPING[TopscreenStepType.TECHNICAL_ONE]
  },
  {
    value: TopscreenStepType.TECHNICAL_TWO,
    label: TOPSCREEN_STEP_TYPE_TEXT_MAPPING[TopscreenStepType.TECHNICAL_TWO]
  }
]
