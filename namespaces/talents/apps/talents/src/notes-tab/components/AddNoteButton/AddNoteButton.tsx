import { Button } from '@toptal/picasso'
import React, { RefObject, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { usePersistentFormContext } from '@staff-portal/forms'
import { useActionLoading } from '@staff-portal/utils'
import { CreateNoteForm, getPersistStorageKey } from '@staff-portal/notes'

import { Talent } from '../../types'

export interface Props {
  talent: Talent
  onComplete: () => void
  createNoteOperation?: OperationType
  formContainer: RefObject<HTMLDivElement>
}

const AddNoteButton = ({
  talent,
  createNoteOperation,
  onComplete,
  formContainer
}: Props) => {
  const noteType = 'default'
  const persistentStorageKey = getPersistStorageKey(talent.id)
  const { actionsLoading } = useActionLoading('note-form')
  const [isOpen, setIsOpen] = useState(false)
  const { checkForm } = usePersistentFormContext()

  useEffect(() => {
    if (isOpen) {
      return
    }

    const shouldOpen = checkForm({
      nodeId: talent.id,
      formName: noteType,
      localStorageKey: persistentStorageKey
    })

    if (shouldOpen) {
      setIsOpen(true)
    }
  }, [checkForm, isOpen, persistentStorageKey, talent.id])

  return (
    <>
      <Operation
        operation={createNoteOperation}
        render={disabled => (
          <Button
            disabled={disabled || actionsLoading}
            size='small'
            variant='secondary'
            onClick={() => setIsOpen(true)}
          >
            Add Note
          </Button>
        )}
      />

      {isOpen &&
        formContainer.current &&
        createPortal(
          <CreateNoteForm
            nodeId={talent.id}
            notableTitle={talent.fullName}
            onComplete={() => {
              setIsOpen(false)
              onComplete?.()
            }}
            onClose={() => setIsOpen(false)}
          />,
          formContainer.current
        )}
    </>
  )
}

export default AddNoteButton
