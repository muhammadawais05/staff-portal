import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTalentOperations, noteMock } from '~integration/mocks/fragments'

export const getTalentNotesResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Euna Conroy',
      prescreeningRecordingUrl: null,
      vertical: {
        id: 'VjEtVmVydGljYWwtMQ',
        __typename: 'Vertical'
      },
      operations: getTalentOperations(),
      activitiesAndNotes: {
        nodes: [noteMock()],
        __typename: 'ActivityOrNoteConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
