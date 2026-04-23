import { Talent } from '@staff-portal/graphql/staff'

import { getTalentWorkloadResponse } from '~integration/mocks/responses'
import { talentsSharedStubs } from '../shared-stubs'

export const talentWorkloadStubs = (talent?: Partial<Talent>) => ({
  ...talentsSharedStubs(talent),
  GetTalentWorkload: getTalentWorkloadResponse(talent)
})
