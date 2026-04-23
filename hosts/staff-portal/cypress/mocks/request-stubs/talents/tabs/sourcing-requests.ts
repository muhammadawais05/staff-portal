import { Talent } from '@staff-portal/graphql/staff'

import {
  getTalentLinkSourcingRequestResponse,
  getTalentTouchCounterResponse,
  getTalentSourcingRequestsResponse
} from '~integration/mocks/responses'
import { talentsSharedStubs } from '../shared-stubs'

export const talentSourcingRequestsStubs = (talent?: Partial<Talent>) => ({
  ...talentsSharedStubs(talent),
  GetTalentLinkSourcingRequest: getTalentLinkSourcingRequestResponse(talent),
  TouchCounter: getTalentTouchCounterResponse(),
  GetTalentSourcingRequests: getTalentSourcingRequestsResponse(talent)
})
