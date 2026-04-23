import { Talent } from '@staff-portal/graphql/staff'

import { getTalentStatusMessagesResponse } from '~integration/mocks/responses'
import { getCoachingEngagementsResponse } from '~integration/mocks/responses/talents/get-coaching-engagements-response'
import { getTalentHealthStatusWithHistoryResponse } from '~integration/mocks/responses/talents/get-talent-healthstatus-with-history-response'
import { getTalentInfractionsResponse } from '~integration/mocks/responses/talents/get-talent-infractions-response'
import { talentsSharedStubs } from '../shared-stubs'

export const talentPerformanceStubs = (talent?: Partial<Talent>) => {
  const performanceTalent = { ...talent, displayPerformanceProfileTab: true }

  return {
    ...talentsSharedStubs(performanceTalent),
    GetTalentHealthStatusWithHistory:
      getTalentHealthStatusWithHistoryResponse(performanceTalent),
    GetTalentInfractions: getTalentInfractionsResponse(performanceTalent),
    GetCoachingEngagementsForTalent: getCoachingEngagementsResponse(),
    GetTalentStatusMessages: getTalentStatusMessagesResponse(talent)
  }
}
