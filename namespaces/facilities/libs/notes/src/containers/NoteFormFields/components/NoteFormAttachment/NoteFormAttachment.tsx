import { Button, Container, Tag } from '@toptal/picasso'
import { Form, useField, useForm } from '@toptal/picasso-forms'
import React, { useState } from 'react'
import { LinkWrapper } from '@staff-portal/ui'

import { NoteAttachmentFragment } from '../../../../data/note-attachment-fragment'

export interface NoteFormAttachmentProps {
  attachment?: NoteAttachmentFragment
}

export const NoteFormAttachment = ({ attachment }: NoteFormAttachmentProps) => {
  const hadExistingAttachment = !!attachment

  const {
    input: { value: attachmentValue }
  } = useField('attachment')

  const { change } = useForm()

  const [isDownloadVisible, setIsDownloadVisibility] = useState(
    hadExistingAttachment && !attachmentValue
  )

  const showDownload = () => {
    setIsDownloadVisibility(true)
    change('attachment', undefined)
  }

  const hideDownload = () => setIsDownloadVisibility(false)

  if (isDownloadVisible && attachment) {
    return (
      <>
        <Container top='medium'>
          <Tag>
            <LinkWrapper
              wrapWhen={Boolean(attachment.webResource.url)}
              href={attachment.webResource.url as string}
              target='_blank'
            >
              Download {attachment.webResource.text}
            </LinkWrapper>
          </Tag>
        </Container>
        <Container top='xsmall'>
          <Button variant='secondary' onClick={hideDownload}>
            Upload a new one
          </Button>
        </Container>
      </>
    )
  }

  return (
    <>
      {/* format function is used because useField will defaultFormat undefined to '' and cause tests to fail */}
      <Form.Dropzone
        value={attachmentValue}
        label='Attachment'
        name='attachment'
        dropzoneHint='One file with a maximum size of 25MB'
        multiple={false}
      />
      {hadExistingAttachment && (
        <Container top='xsmall'>
          <Button variant='secondary' onClick={showDownload}>
            Cancel
          </Button>
        </Container>
      )}
    </>
  )
}

export default NoteFormAttachment
