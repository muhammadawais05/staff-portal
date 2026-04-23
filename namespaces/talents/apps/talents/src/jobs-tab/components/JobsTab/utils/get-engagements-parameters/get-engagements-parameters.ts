import {
  TalentEngagementFilter,
  TalentEngagementOrder,
  TalentEngagementScope
} from '@staff-portal/graphql/staff'

import { JobsFilterType } from '../../../../enums'

const talentEngagementScopeByJobFilterTypeMap: Record<
  JobsFilterType,
  TalentEngagementScope
> = {
  [JobsFilterType.WORKING]: TalentEngagementScope.WORKING,
  [JobsFilterType.IN_EVALUATION]: TalentEngagementScope.IN_INTERVIEW,
  [JobsFilterType.TERMINAL]: TalentEngagementScope.TERMINAL
}

export const getEngagementsParameters = (jobsFilter?: JobsFilterType[]) => {
  let order: TalentEngagementOrder | undefined
  let filter: TalentEngagementFilter | undefined

  if (!jobsFilter) {
    return { order, filter }
  }

  return {
    order,
    filter: {
      scopes: jobsFilter
        .map(filterItem => talentEngagementScopeByJobFilterTypeMap[filterItem])
        .filter(Boolean)
    }
  }
}
