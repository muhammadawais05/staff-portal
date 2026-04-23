import {
  OfacStatus,
  Talent,
  TalentCumulativeStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTalentOperations } from '~integration/mocks/fragments'

export const getTalentRejectForInactivityResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      cumulativeStatus: TalentCumulativeStatus.REJECTED,
      ofacStatus: OfacStatus.NORMAL,
      inactivityRejectionDeadlines: {
        nodes: [],
        __typename: 'TalentInactivityRejectionDeadlineConnection'
      },
      activation: null,
      specializationApplications: {
        nodes: [],
        __typename: 'SpecializationApplicationConnection'
      },
      operations: getTalentOperations(),
      ...talent,
      __typename: 'Talent'
    }
  }
})
