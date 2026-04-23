import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { TalentStatusMapping } from '../../../../types'

export const getTalentStatusText = (
  status: TalentCumulativeStatus,
  talentStatusMapping: TalentStatusMapping | undefined
) => (talentStatusMapping ? talentStatusMapping[status].text : status)
