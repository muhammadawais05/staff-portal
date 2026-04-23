import { format as formatDate } from '@staff-portal/date-time-utils'
import { LeadProbabilityBucket } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import {
  DAYS_OF_WEEK,
  FEATURE_NAMES,
  NO_YES,
  LEAD_BUCKET_COLORS
} from './consts'

export type Features = { name: string; position: number; value: string }[]
export type ScoreExplanation = {
  negativeFeatures?: Features | null
  positiveFeatures?: Features | null
}

export const formatSeconds = (seconds: number) => {
  // TODO: properly create date without eslint disabling
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const secondsAsDate = new Date(0).setSeconds(seconds)

  if (seconds > 60 * 60 * 24) {
    return '> 24 hours'
  }

  if (seconds > 60 * 60) {
    return formatDate(secondsAsDate, 'hh:mm:ss')
  }

  return formatDate(secondsAsDate, 'mm:ss')
}

export const humanize = (str: string) => str.replace(/_/g, ' ')

export const featureName = (name: string) => FEATURE_NAMES[name] || name

export const featureValue = (name: string, value: string) => {
  if (name.startsWith('skill_')) {
    return NO_YES[Number(value)]
  }

  if (name === 'roles_cr_dow') {
    return DAYS_OF_WEEK[Number(value)]
  }

  if (['ai_applied_after_s', 'tt_finish'].includes(name)) {
    return formatSeconds(Number(value))
  }

  if (name === 'ai_continent_code') {
    return value
  }

  return titleize(humanize(value))
}

export const bucketColor = (bucket: LeadProbabilityBucket) =>
  LEAD_BUCKET_COLORS[bucket]
