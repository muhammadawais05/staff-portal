import { Button } from '@toptal/picasso'
import React, { RefObject, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Operation, OperationType } from '@staff-portal/operations'
import { usePersistentFormContext } from '@staff-portal/forms'
import { useActionLoading } from '@staff-portal/utils'
import { CreateNoteForm, getPersistStorageKey } from '@staff-portal/notes'

import { CommunityLeaderData } from '../../types'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'

export interface Props {
  communityLeaderId: string
  communityLeader: CommunityLeaderData
  onComplete: () => void
  createNoteOperation?: OperationType
  formContainer: RefObject<HTMLDivElement>
}

const AddNoteButton = ({
  communityLeaderId,
  communityLeader,
  createNoteOperation,
  onComplete,
  formContainer
}: Props) => {
  const noteType = 'default'
  const persistentStorageKey = getPersistStorageKey(communityLeaderId)
  const { actionsLoading } = useActionLoading('note-form')
  const [isOpen, setIsOpen] = useState(false)
  const { checkForm } = usePersistentFormContext()

  useEffect(() => {
    if (isOpen) {
      return
    }

    const shouldOpen = checkForm({
      nodeId: communityLeaderId,
      formName: noteType,
      localStorageKey: persistentStorageKey
    })

    if (shouldOpen) {
      setIsOpen(true)
    }
  }, [checkForm, isOpen, persistentStorageKey, communityLeaderId])

  const role = getCommunityLeaderRole(communityLeader)

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
            nodeId={communityLeaderId}
            notableTitle={role?.fullName ?? ''}
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
