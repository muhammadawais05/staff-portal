import { ColorType } from '@toptal/picasso'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

export const LABEL_COLUMN_WIDTH = 11

export const AVAILABILITY_COLOR_MAPPING: Record<
  EngagementCommitmentEnum,
  ColorType
> = {
  [EngagementCommitmentEnum.HOURLY]: 'yellow',
  [EngagementCommitmentEnum.PART_TIME]: 'yellow',
  [EngagementCommitmentEnum.FULL_TIME]: 'green'
}
