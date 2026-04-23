import { SoftSkillRatingValue } from '@staff-portal/graphql/staff'

const RATING_VALUE_PREFIX = 'RATING_'

export const getRatingNumberValue = (value: SoftSkillRatingValue) =>
  parseInt(value.replace(RATING_VALUE_PREFIX, ''))
