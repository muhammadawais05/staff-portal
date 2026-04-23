import {
  Talent,
  OfacStatus,
  TalentCumulativeStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTalentOperations } from '~integration/mocks/fragments'

export const getTalentOfacStatusDataResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Euna Conroy',
      talentCumulativeStatus: TalentCumulativeStatus.REJECTED,
      ofacStatus: OfacStatus.NORMAL,
      ofacStatusChanges: {
        nodes: [],
        __typename: 'OfacStatusChangeConnection'
      },
      talentAssociatedRoles: {
        nodes: [],
        __typename: 'RoleOrClientConnection'
      },
      operations: getTalentOperations(),
      ...talent,
      __typename: 'Talent'
    }
  }
})
