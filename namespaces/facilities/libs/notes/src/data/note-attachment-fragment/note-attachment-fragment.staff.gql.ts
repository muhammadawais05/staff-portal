import { gql } from '@staff-portal/data-layer-service'

export const NOTE_ATTACHMENT_FRAGMENT = gql`
  fragment NoteAttachmentFragment on NoteAttachment {
    url
    webResource {
      text
      url
    }
  }
`
