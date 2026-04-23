import React from 'react'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'
import { LinkWrapper } from '@staff-portal/ui'
import {
  Button,
  CloseMinor16,
  Container,
  TypographyOverflow
} from '@toptal/picasso'

import { NoteAttachmentFragment } from '../../../../data/note-attachment-fragment'
import RemoveNoteAttachmentModal from '../RemoveNoteAttachmentModal/RemoveNoteAttachmentModal'

export interface NoteAttachmentProps {
  noteId: string
  attachment: NoteAttachmentFragment
  removeNoteAttachmentOperation?: OperationType
}

const NoteAttachment = ({
  noteId,
  attachment: {
    webResource: { text, url }
  },
  removeNoteAttachmentOperation
}: NoteAttachmentProps) => {
  const { showModal } = useModal(RemoveNoteAttachmentModal, {
    noteId,
    fileName: text
  })

  const content = `Download ${text}`

  return (
    <>
      <Container top='small' flex align='center'>
        <LinkWrapper
          wrapWhen={Boolean(url)}
          href={url as string}
          target='_blank'
        >
          <TypographyOverflow
            noWrap
            as='span'
            color='inherit'
            tooltipContent={content}
          >
            {content}
          </TypographyOverflow>
        </LinkWrapper>

        <Operation
          operation={removeNoteAttachmentOperation}
          render={disabled => (
            <Button.Circular
              data-testid='note-attachment-delete-button'
              disabled={disabled}
              variant='flat'
              icon={<CloseMinor16 />}
              onClick={showModal}
            />
          )}
        />
      </Container>
    </>
  )
}

export default NoteAttachment
