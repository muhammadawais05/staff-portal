import {
  JobCandidateOrderField,
  TalentFilterCumulativeStatus,
  TalentBadgesFilter
} from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'
import { Sort } from '@staff-portal/filters'

export const bestMatchTooltipText =
  'Best Match sorting is only available for job oriented search and talents in active status. ' +
  'Please use Search Candidates button or change search filter to make it available.'

type CumulativeStatuses = string[] | TalentFilterCumulativeStatus[] | null

const getSortTarget = (values: QueryParams) => {
  const sort = values?.sort as Sort
  const target = sort?.target || ''

  return target.toUpperCase()
}

export const checkBestMatchQueryEnabled = (values: QueryParams) => {
  return getSortTarget(values) === JobCandidateOrderField.BEST_MATCH_SCORE
}

export const isRelevanceQueryEnabled = (values: QueryParams) => {
  return getSortTarget(values) === JobCandidateOrderField.RELEVANCE
}

const isStatusesOnlyActive = (statuses?: CumulativeStatuses) =>
  !!statuses &&
  statuses.length === 1 &&
  statuses[0].toUpperCase() === TalentFilterCumulativeStatus.ACTIVE

export const matchBestMatchQueryConditions = (values: QueryParams) => {
  const statuses = values?.cumulative_statuses as string[]

  return isStatusesOnlyActive(statuses) && !!values?.job_id
}

export const matchRelevanceQueryConditions = (values: QueryParams) => {
  const badges = values.badges as Omit<TalentBadgesFilter, 'logic'>

  if (!badges) {
    return false
  }

  return Object.values(badges).some(badgeQueryValues =>
    Boolean(badgeQueryValues?.length)
  )
}

export const shouldResetHideTalentsWith = (values: QueryParams) =>
  values.hide_talents_with && !values.job_id

export const shouldResetClientHourlyRate = (values: QueryParams) =>
  values.client_hourly_rate && !values.job_id

export const shouldResetOverlappingHours = (values: QueryParams) =>
  values.overlapping_hours && !values.job_id
