import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'

export const getTalentLinkSourcingRequestResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Euna Conroy',
      operations: getTalentOperations({
        linkSourcingRequest: enabledOperationMock()
      }),
      ...talent,
      __typename: 'Talent'
    }
  }
})
