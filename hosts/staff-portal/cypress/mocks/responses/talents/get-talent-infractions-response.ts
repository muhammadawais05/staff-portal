import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { OperationFragment } from '@staff-portal/operations'

import { getTalentOperations } from '~integration/mocks/fragments'

export const getTalentInfractionsResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      __typename: 'Talent',
      operations: getTalentOperations(
        talent?.operations as unknown as Record<string, OperationFragment>
      ),
      infractions: {
        nodes: [],
        ...talent?.infractions,
        __typename: 'TalentInfractionConnection'
      }
    }
  }
})
