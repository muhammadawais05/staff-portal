import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'
import { SortOption, SortOrder } from '@staff-portal/filters'

import { JobStationSortOption, PostedAtRadioOptionValues } from './types'

export const JOB_LIST_GQL_BATCH_KEY = 'JOB_LIST_GQL_BATCH_KEY'
export const JOBS_STATION_DEFAULT_PAGE_SIZE = 50

export const SORT_OPTIONS: SortOption[] = [
  {
    text: 'Job Title',
    value: JobStationSortOption.TITLE
  },
  {
    text: 'Company',
    value: JobStationSortOption.COMPANY_NAME
  },
  {
    text: 'Post Date',
    value: JobStationSortOption.POSTED_AT,
    defaultSort: SortOrder.ASC
  },
  {
    text: 'Matcher',
    value: JobStationSortOption.MATCHER_NAME
  },
  {
    text: 'Claimer',
    value: JobStationSortOption.CLAIMER_NAME,
    hidden: true
  },
  {
    text: 'Status',
    value: JobStationSortOption.CUMULATIVE_STATUS
  },
  {
    text: 'Commitment',
    value: JobStationSortOption.COMMITMENT
  },
  {
    text: 'Vertical',
    value: JobStationSortOption.VERTICAL
  }
]

export const DEFAULT_SORT = JobStationSortOption.POSTED_AT

export const JOB_POSTED_OPTIONS = [
  {
    label: NOT_SELECTED_PLACEHOLDER,
    value: PostedAtRadioOptionValues.NOT_SELECTED
  },
  { label: 'Today', value: PostedAtRadioOptionValues.TODAY },
  { label: 'Last 7 days', value: PostedAtRadioOptionValues.LAST_7_DAYS },
  { label: 'Last 14 days', value: PostedAtRadioOptionValues.LAST_14_DAYS },
  { label: 'Last 30 days', value: PostedAtRadioOptionValues.LAST_30_DAYS },
  { label: 'Custom', value: PostedAtRadioOptionValues.CUSTOM }
]

export const FIXED_TAG_SELECTOR_FIELDS = [
  {
    text: 'None',
    value: 'none'
  },
  {
    text: 'Me',
    value: 'me'
  }
]

export const teamIds = [
  '1224', // SMB Sales Account Management
  '1201', // SMB Sales Relationship Management

  '1320', // SMB Client Services - AMs
  '1319', // SMB Client Services - West Coast AMs
  '1321', // SMB Client Services - East Coast & EMEA RMs
  '1322', // SMB Client Services - RMs

  '1334', // SMB Account Managers APAC

  '1396', // SMB Design Matching Team 1

  '90033', // Designer Matchers

  '1330', // SMB Inbound Midwest
  '120042', // SMB Inbound Central
  '120043', // SMB Inbound East
  '120044', // SMB Inbound APAC
  '120041', // SMB Inbound EMEA

  '1151', // Developer Matching - SMB Pod 1
  '1149', // Developer Matching - SMB Pod 2
  '1341', // Developer Matching - SMB Pod 3
  '1339', // Developer Matching - SMB Pod 4
  '1398', // Developer Matching - SMB Pod 5

  '1147', // Developer Matching - Enterprise Pod 1
  '1289', // Developer Matching - Enterprise Pod 2
  '1490', // Developer Matching - Enterprise Pod 3

  '120039', // Project Manager Matchers
  '120047', // Product Manager Matchers

  '1421', // Product & Project Management Enterprise Matching
  '1433', // Product & Project Management Matching
  '120047' // Product & Project Management SMB Matching
]
