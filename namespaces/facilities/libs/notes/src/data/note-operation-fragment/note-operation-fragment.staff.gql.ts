import { gql } from '@staff-portal/data-layer-service'

export const NOTE_OPERATION_FRAGMENT = gql`
  fragment NoteOperationFragment on Operation {
    callable
    messages
  }
`
