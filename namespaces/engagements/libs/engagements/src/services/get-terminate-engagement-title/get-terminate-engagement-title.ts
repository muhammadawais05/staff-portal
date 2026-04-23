import { Maybe } from '@toptal/picasso/utils'

export const getTerminateEngagementTitle = (talentCount?: Maybe<number>) =>
  Number(talentCount) > 1 ? 'End Engagement' : 'End Job'
