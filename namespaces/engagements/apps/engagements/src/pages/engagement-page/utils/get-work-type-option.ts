import { JobWorkType } from '@staff-portal/graphql/staff'
import { WORK_TYPE_OPTIONS } from '@staff-portal/engagements'
import { NO_VALUE } from '@staff-portal/config'

export const getWorkTypeOption = (workType?: JobWorkType | null) =>
  WORK_TYPE_OPTIONS.find(({ value }) => value === workType)?.text || NO_VALUE
