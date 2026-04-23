import { MatchQualityMetricName } from '@staff-portal/graphql/staff'

export const talentProfileNames = [
  MatchQualityMetricName.PORTFOLIO_COUNT,
  MatchQualityMetricName.HIGH_QUALITY_PHOTO,
  MatchQualityMetricName.EXTERNAL_PROFILES,
  MatchQualityMetricName.EMPLOYMENT_ITEMS
]

export const talentPastPerformanceNames = [
  MatchQualityMetricName.NO_YELLOW_FLAG,
  MatchQualityMetricName.FEEDBACK_SCORE,
  MatchQualityMetricName.NO_CONSECUTIVE_FAILED_ENGAGEMENTS,
  MatchQualityMetricName.FAILED_TRIALS_COUNT
]

export const talentJobMatchNames = [
  MatchQualityMetricName.SKILL_MATCH,
  MatchQualityMetricName.COUNTRY_FIT,
  MatchQualityMetricName.HOURS_OVERLAP,
  MatchQualityMetricName.RATE_MATCH,
  MatchQualityMetricName.INTERVIEW_COUNT,
  MatchQualityMetricName.UNSUCCESSFUL_ENGAGEMENT
]
