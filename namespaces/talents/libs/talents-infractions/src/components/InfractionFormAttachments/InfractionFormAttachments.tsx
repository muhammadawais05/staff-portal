import React from 'react'
import { Container, FileInput, Typography } from '@toptal/picasso'
import { useFieldArray } from '@toptal/picasso-forms'
import {
  TalentInfractionAttachmentConnection,
  TalentInfractionAttachment
} from '@staff-portal/graphql/staff'

interface Props {
  attachments?: TalentInfractionAttachmentConnection
}

interface DisplayAttachment {
  id?: string
  name: string
  file: File
}

const getDisplayAttachments = ({
  attachments = [],
  addAttachments = [],
  removeAttachments = []
}: {
  attachments?: TalentInfractionAttachment[]
  addAttachments?: File[]
  removeAttachments?: string[]
}): DisplayAttachment[] => {
  const keepAttachments = attachments
    .filter(({ id }) => !removeAttachments.includes(id))
    .map(attachment => ({
      id: attachment.id,
      name: attachment.webResource.text,
      file: new File([attachment.webResource.text], attachment.webResource.text)
    }))
  const newAttachments = addAttachments.map(file => ({
    name: file.name,
    file
  }))

  return [...keepAttachments, ...newAttachments]
}

export const InfractionFormAttachments = ({ attachments }: Props) => {
  const {
    fields: { value: removeAttachments, push: pushAttachmentToRemove }
  } = useFieldArray<string>('removeAttachments')

  const {
    fields: {
      value: addAttachments,
      push: pushAttachmentToAdd,
      remove: removeAttachmentToAdd
    }
  } = useFieldArray<File>('addAttachments')

  const handleRemoveAttachment = (fileName: string, fileIndex: number) => {
    const existingFile = displayAttachments[fileIndex]

    if (existingFile.id) {
      pushAttachmentToRemove(existingFile.id)
    } else {
      const addedAttachmentIndex = addAttachments.findIndex(
        ({ name }) => name === fileName
      )

      removeAttachmentToAdd(addedAttachmentIndex)
    }
  }

  const handleAddAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files?.length) {
      return null
    }

    const newFile = event.target.files[0]

    pushAttachmentToAdd(newFile)
  }

  const displayAttachments = getDisplayAttachments({
    attachments: attachments?.nodes,
    addAttachments,
    removeAttachments
  })

  return (
    <Container top='small'>
      <Container bottom='xsmall'>
        <Typography size='medium'>Attachments</Typography>
      </Container>
      <Container bottom='xsmall'>
        <FileInput
          value={displayAttachments}
          maxFiles={5}
          onChange={handleAddAttachment}
          onRemove={handleRemoveAttachment}
        />
      </Container>
    </Container>
  )
}

export default InfractionFormAttachments
