import { Maybe } from '@toptal/picasso/utils'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { JobType } from '@staff-portal/jobs'

export const isMinCommitmentVisible = ({
  commitment,
  talentType,
  commitmentSettings
}: {
  commitment: EngagementCommitmentEnum
  talentType: string
  commitmentSettings: Maybe<{
    id: string
    minimumHours: number
  }>
}) =>
  commitment === EngagementCommitmentEnum.HOURLY &&
  talentType.toLowerCase() === JobType.DEVELOPER &&
  !!commitmentSettings
