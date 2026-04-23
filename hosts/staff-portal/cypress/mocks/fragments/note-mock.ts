import { NoteStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { NoteFragment } from '@staff-portal/notes'

import { WithTypename } from '~integration/types'
import { enabledOperationMock } from '../enabled-operation-mock'
import { webResourceMock } from './web-resource-mock'

export const noteMock = (
  note?: Partial<NoteFragment>
): WithTypename<NoteFragment> => ({
  __typename: 'Note',
  id: encodeEntityId('123', 'Note'),
  comment: 'This part was obfuscated, some content was here.',
  createdAt: '2020-07-20T14:39:11+03:00',
  newSalesCall: false,
  checklistSalesCall: false,
  status: NoteStatus.ACTIVE,
  title: 'Send away averted',
  updatedAt: '2020-07-20T14:39:11+03:00',
  attachment: null,
  creator: {
    id: 'VjEtU3RhZmYtNDE5MzEx',
    ...webResourceMock()
  },
  operations: {
    removeNote: enabledOperationMock(),
    removeNoteAttachment: enabledOperationMock(),
    updateNote: enabledOperationMock()
  },
  answers: {
    nodes: []
  },
  softSkillRatings: {
    nodes: []
  },
  ...note
})
