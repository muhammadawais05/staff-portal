import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTalentOperations } from '~integration/mocks/fragments'

export const getTalentSpecializationApplicationsResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Euna Conroy',
      eligibleForRestoration: false,
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
