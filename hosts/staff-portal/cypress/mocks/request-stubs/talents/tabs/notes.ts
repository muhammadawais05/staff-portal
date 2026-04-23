import { Talent } from '@staff-portal/graphql/staff'

import { getTalentNotesResponse } from '~integration/mocks/responses'
import { talentsSharedStubs } from '../shared-stubs'

export const talentNotesStubs = (talent?: Partial<Talent>) => ({
  ...talentsSharedStubs(talent),
  GetTalentNotes: getTalentNotesResponse(talent)
})
