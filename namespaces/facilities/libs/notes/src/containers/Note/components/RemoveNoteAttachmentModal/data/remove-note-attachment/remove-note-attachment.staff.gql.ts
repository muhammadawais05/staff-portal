import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { NOTE_ATTACHMENT_FRAGMENT } from '../../../../../../data/note-attachment-fragment'

export default gql`
  mutation RemoveNoteAttachment($input: RemoveNoteAttachmentInput!) {
    removeNoteAttachment(input: $input) {
      ...MutationResultFragment
      note {
        id
        attachment {
          ...NoteAttachmentFragment
        }
      }
    }
  }

  ${NOTE_ATTACHMENT_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
