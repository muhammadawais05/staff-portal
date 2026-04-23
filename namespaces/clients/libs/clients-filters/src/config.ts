import {
  BUSINESS_TYPE_OPTIONS,
  CLIENT_TIER_OPTIONS
} from '@staff-portal/clients'
import { stringListToOptions } from '@staff-portal/filters'
import {
  ClientContract,
  ClientHierarchies,
  ClientJobStatus,
  ClientContact,
  ClientSalesCallPriority,
  ClientClaimerCategory,
  ClientPartnerCategory
} from '@staff-portal/graphql/staff'

export const CLIENT_STAFF_BATCH_KEY = 'CLIENT_STAFF_BATCH_KEY'
export const CLIENT_MATCHERS_BATCH_KEY = 'CLIENT_MATCHERS_BATCH_KEY'

export enum ME_NONE_SET {
  me = 'ME',
  none = 'NONE',
  ME = 'me',
  NONE = 'none'
}

export const EXTRA_USER_OPTIONS = [
  { label: 'Not Claimed', value: ME_NONE_SET.none },
  { label: 'Claimed by Me', value: ME_NONE_SET.me }
]
export const EXTRA_CLIENT_PARTNER_OPTIONS = [
  { label: 'No enterprise client partner', value: ME_NONE_SET.none },
  { label: 'Me', value: ME_NONE_SET.me }
]
export const EXTRA_STAFF_OPTIONS = [
  { label: 'None', value: ME_NONE_SET.none },
  { label: 'Me', value: ME_NONE_SET.me }
]

export const INVOICING_TYPE = ['Unanswered', 'Platform', 'Custom']
export const CLIENT_CONTRACT_OPTIONS = [
  { value: ClientContract.CLICKABLE_CONTRACTS, label: 'Clickable contracts' }
]
export const CLIENT_HIERARCHY_OPTIONS = [
  { value: ClientHierarchies.TOP_LEVEL_COMPANY, label: 'Top level company' }
]

export const BOOLEAN_SELECTOR_OPTIONS = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' }
]

export const RATINGS_OPTIONS = [
  { value: '0', label: 'Not rated' },
  { value: '1', label: '1 - Bad Lead' },
  { value: '2', label: '2 - Potential Lead' },
  { value: '3', label: '3 - Normal Lead' },
  { value: '4', label: '4 - Good Lead' },
  { value: '5', label: '5 - Excellent Lead' }
]

export const CLIENT_JOB_STATUS_OPTIONS = [
  {
    label: 'No jobs',
    value: ClientJobStatus.NO_JOBS
  },
  {
    label: 'Pending claim',
    value: ClientJobStatus.PENDING_CLAIM
  },
  {
    label: 'Pending engineer',
    value: ClientJobStatus.PENDING_ENGINEER
  },
  {
    label: 'Pending start',
    value: ClientJobStatus.PENDING_START
  },
  {
    label: 'On trial',
    value: ClientJobStatus.ON_TRIAL
  },
  {
    label: 'On hold',
    value: ClientJobStatus.ON_HOLD
  },
  {
    label: 'Active',
    value: ClientJobStatus.ACTIVE
  },
  {
    label: 'On break',
    value: ClientJobStatus.ON_BREAK
  },
  {
    label: 'End scheduled',
    value: ClientJobStatus.END_SCHEDULED
  },
  {
    label: 'Closed',
    value: ClientJobStatus.CLOSED
  },
  {
    label: 'Postponed',
    value: ClientJobStatus.POSTPONED
  },
  {
    label: 'Deleted',
    value: ClientJobStatus.REMOVED
  },
  {
    label: 'Rejected',
    value: ClientJobStatus.REJECTED
  },
  {
    label: 'Sending away',
    value: ClientJobStatus.SENDING_AWAY
  }
]

export const LEAD_PRIORITIES_OPTIONS = [
  { label: 'Low', value: '1' },
  { label: 'Ambiguous', value: '2' },
  { label: 'High', value: '3' }
]

export const LEAD_INTENT_OPTIONS = [
  { label: 'No Intent', value: '0' },
  { label: 'Low', value: '1' },
  { label: 'Medium', value: '2' },
  { label: 'High', value: '3' }
]

export const CLIENT_CONTACT_OPTIONS = [
  { label: 'None', value: ClientContact.NONE },
  { label: 'Phone', value: ClientContact.PHONE },
  { label: 'Skype', value: ClientContact.SKYPE },
  { label: 'Phone and Skype', value: ClientContact.PHONE_AND_SKYPE }
]

export const SALES_CALL_PRIORITY_OPTIONS = [
  // in the platform this value is omitted ClientSalesCallPriority.ANY
  { label: 'Any', value: '' },
  { label: 'High', value: ClientSalesCallPriority.HIGH }
]

export const CLAIMER_CATEGORY_OPTIONS = [
  { label: 'Prospect', value: ClientClaimerCategory.PROSPECT },
  { label: 'Secondary', value: ClientClaimerCategory.SECONDARY },
  { label: 'Priority', value: ClientClaimerCategory.PRIORITY },
  { label: 'Core', value: ClientClaimerCategory.CORE }
]
export const CLIENT_PARTNER_CATEGORY_OPTIONS = [
  { label: 'Prospect', value: ClientPartnerCategory.PROSPECT },
  { label: 'Core', value: ClientPartnerCategory.CORE },
  { label: 'Support', value: ClientPartnerCategory.SUPPORT }
]
export const INVOICING_TYPE_FILTER_OPTIONS = stringListToOptions(INVOICING_TYPE)
export const BUSINESS_TYPE_FILTER_OPTIONS = BUSINESS_TYPE_OPTIONS.map(
  ({ text }) => ({
    label: text,
    value: text
  })
)
export const CLIENT_PARTNER_CATEGORY_ITEMS =
  CLIENT_PARTNER_CATEGORY_OPTIONS.map(({ label }) => ({
    label,
    value: label
  }))

export const CLIENT_TIER_ITEMS = CLIENT_TIER_OPTIONS.map(({ label }) => ({
  label,
  value: label
}))
