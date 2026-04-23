import {
  DateRange,
  RateChangeRequestOrderField,
  RateChangeRequestTypeEnum,
  RateChangeRequestStatus
} from '@staff-portal/graphql/staff'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { ColorType } from '@toptal/picasso'
import {
  dateRangeQueryParam,
  PaginationParams,
  enumQueryParam,
  gqlIdQueryParam,
  SortOption,
  SortOrder
} from '@staff-portal/filters'

import { RequestTypeQueryParam } from './pages/RateChangeRequestList/utils'

export const PAGE_SIZE = 10

export const NO_RESULTS_MESSAGE =
  'There are no rate change requests for this search criteria'
export const RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_CONSULTATION =
  'Consultation request has been completed.'
export const RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_FUTURE_ENGAGEMENTS =
  'The rate has been successfully updated and the request has been completed. Talent will receive email confirmation.'
export const RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_CURRENT_ENGAGEMENT =
  'Rate update request has been completed.'
export const RATE_CHANGE_REQUEST_COMPLETE_ERROR_MESSAGE =
  'An error occurred, the request was not completed.'

export const DEFAULT_SORT = RateChangeRequestOrderField.SUBMISSION_AT

export const SORT_OPTIONS: SortOption[] = [
  {
    text: 'Submission date',
    value: RateChangeRequestOrderField.SUBMISSION_AT.toLowerCase(),
    defaultSort: SortOrder.DESC
  }
]

export interface RateChangeRequestListQueryParams extends PaginationParams {
  claimerId?: string
  requestType?: RateChangeRequestTypeEnum
  statuses?: RateChangeRequestStatus[]
  talentName?: string
  submissionDate?: DateRange
}

export const RATE_CHANGE_REQUESTS_QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  claimerId: gqlIdQueryParam('Staff'),
  requestType: RequestTypeQueryParam,
  statuses: enumQueryParam,
  submissionDate: dateRangeQueryParam
}

export const RATE_CHANGE_REQUEST_STATUS_MAPPING: Record<
  RateChangeRequestStatus,
  { text: string; color: ColorType }
> = {
  [RateChangeRequestStatus.PENDING]: {
    text: 'Pending Claim',
    color: 'yellow'
  },
  [RateChangeRequestStatus.CLAIMED]: {
    text: 'Pending Completion',
    color: 'yellow'
  },
  [RateChangeRequestStatus.COMPLETED]: {
    text: 'Completed',
    color: 'green'
  }
}

export const RATE_CHANGE_REQUEST_SUCCESS_NOTIFICATION_MESSAGE_MAPPING: Record<
  RateChangeRequestTypeEnum,
  string
> = {
  [RateChangeRequestTypeEnum.CONSULTATION]:
    RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_CONSULTATION,
  [RateChangeRequestTypeEnum.CURRENT_ENGAGEMENT]:
    RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_CURRENT_ENGAGEMENT,
  [RateChangeRequestTypeEnum.FUTURE_ENGAGEMENTS]:
    RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_FUTURE_ENGAGEMENTS
}
