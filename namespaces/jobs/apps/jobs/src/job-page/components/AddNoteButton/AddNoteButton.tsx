import React, { RefObject, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { usePersistentFormContext } from '@staff-portal/forms'
import { useActionLoading } from '@staff-portal/utils'
import { CreateNoteForm, getPersistStorageKey } from '@staff-portal/notes'

import { Job } from '../../types'

export interface Props {
  job: Job
  onComplete: () => void
  createNoteOperation?: OperationType
  formContainer: RefObject<HTMLDivElement>
  onOpenNoteForm: () => void
  onCloseNoteForm: () => void
}

const AddNoteButton = ({
  job,
  createNoteOperation,
  onComplete,
  formContainer,
  onOpenNoteForm,
  onCloseNoteForm
}: Props) => {
  const noteType = 'default'
  const persistentStorageKey = getPersistStorageKey(job.id)
  const { actionsLoading } = useActionLoading('note-form')
  const [isOpen, setIsOpen] = useState(false)
  const { checkForm } = usePersistentFormContext()

  useEffect(() => {
    if (isOpen) {
      return
    }

    const shouldOpen = checkForm({
      nodeId: job.id,
      formName: noteType,
      localStorageKey: persistentStorageKey
    })

    if (shouldOpen) {
      setIsOpen(true)
      onOpenNoteForm()
    }
  }, [checkForm, isOpen, persistentStorageKey, job.id, onOpenNoteForm])

  return (
    <>
      <Operation
        operation={createNoteOperation}
        render={disabled => (
          <Button
            disabled={disabled || actionsLoading}
            size='small'
            variant='secondary'
            onClick={() => {
              setIsOpen(true)
              onOpenNoteForm()
            }}
          >
            Add Note
          </Button>
        )}
      />

      {isOpen &&
        formContainer.current &&
        createPortal(
          <CreateNoteForm
            nodeId={job.id}
            notableTitle={job.title}
            onComplete={() => {
              setIsOpen(false)
              onComplete?.()
              onCloseNoteForm()
            }}
            onClose={() => {
              setIsOpen(false)
              onCloseNoteForm()
            }}
          />,
          formContainer.current
        )}
    </>
  )
}

export default AddNoteButton
