import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'
import { TaskCardLayoutContentItem } from '@staff-portal/tasks'

import { ACTIVE_CONFIGURATION, APPLIED_CONFIGURATION } from './config'
import { TaskTalentFragment } from '../../../../data'
import { getTalentContentMapping } from '../get-talent-content-mapping/get-talent-content-mapping'

export const getTalentContentItems = (
  talent: TaskTalentFragment,
  timeZone?: string
): TaskCardLayoutContentItem[] => {
  const configurations =
    talent.cumulativeStatus === TalentCumulativeStatus.APPLIED
      ? APPLIED_CONFIGURATION
      : ACTIVE_CONFIGURATION

  const contentMapping = getTalentContentMapping(talent, timeZone)

  return configurations
    .filter(key => contentMapping[key])
    .map(key => ({
      ...(contentMapping[key] as TaskCardLayoutContentItem),
      key
    }))
}
