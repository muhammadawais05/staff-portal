import { NoteOperations } from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { hiddenOperationMock } from '../hidden-operation-mock'

export const getNoteOperations = (
  operations?: Partial<NoteOperations>
): WithTypename<NoteOperations> => ({
  __typename: 'NoteOperations',
  removeNote: hiddenOperationMock(),
  removeNoteAttachment: hiddenOperationMock(),
  updateNote: hiddenOperationMock(),
  ...operations
})
