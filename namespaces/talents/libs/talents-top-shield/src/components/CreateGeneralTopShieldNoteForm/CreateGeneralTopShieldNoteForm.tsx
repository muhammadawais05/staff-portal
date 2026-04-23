import React from 'react'
import { CreateNoteForm, NoteFormProps } from '@staff-portal/notes'

import { useAddGeneralTopShieldNote } from './hooks/use-add-general-top-shield-note'

export interface CreateGeneralTopShieldNoteFormProps extends NoteFormProps {
  nodeId: string
}

const CreateGeneralTopShieldNoteForm = ({
  nodeId,
  onComplete,
  onClose
}: CreateGeneralTopShieldNoteFormProps) => {
  const { handleSubmit } = useAddGeneralTopShieldNote(nodeId)

  return (
    <CreateNoteForm
      nodeId={nodeId}
      notableTitle='TopShield Note'
      submitText='Save Note'
      onSubmit={handleSubmit}
      onComplete={onComplete}
      onClose={onClose}
    />
  )
}

export default CreateGeneralTopShieldNoteForm
