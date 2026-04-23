import { JobEstimatedLengths, Maybe } from '@staff-portal/graphql/staff'
import { ESTIMATED_LENGTH_MAPPING } from '@staff-portal/jobs'

export const formatEstimatedLength = (length?: Maybe<JobEstimatedLengths>) =>
  length ? ESTIMATED_LENGTH_MAPPING[length] : null
