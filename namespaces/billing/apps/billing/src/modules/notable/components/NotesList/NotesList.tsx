import React, { FC, memo, SyntheticEvent, useCallback } from 'react'
import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { getNotableObject } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import { useActionsNote } from '../../utils/useActionsNote'
import NotesContainer from '../NotesContainer'
import { useGetNotes } from '../../data'

const displayName = 'NotesList'

interface Props {
  nodeId: string
}

const NotesList: FC<Props> = memo<Props>(({ nodeId: notableId }) => {
  const { data, refetch } = useGetNotes(notableId)

  const { handleOnDelete, handleOnDeleteAttachment } = useActionsNote()
  const { handleOnOpenModalWithUrlSearch } = useModals()

  const handleOnClick = useCallback(
    ({ currentTarget: { dataset } }: SyntheticEvent<HTMLElement>) => {
      const {
        value: modalName,
        noteId = '',
        noteTitle = '',
        noteAttachmentId = ''
      } = dataset

      const payload =
        modalName === ModalKey.noteEdit
          ? { nodeId: noteId }
          : getNotableObject(notableId)

      switch (modalName) {
        case ModalKey.noteCreate:
        case ModalKey.noteEdit:
          return handleOnOpenModalWithUrlSearch(modalName, payload)

        case 'delete':
          return handleOnDelete(noteId, noteTitle)

        case 'delete-attachment':
          return handleOnDeleteAttachment(noteId, noteAttachmentId)

        default:
          console.warn(`Note action: unknown action: ${modalName}`)

          return null
      }
    },
    [
      handleOnOpenModalWithUrlSearch,
      handleOnDelete,
      handleOnDeleteAttachment,
      notableId
    ]
  )

  useRefetch(
    [
      ApolloContextEvents.noteCreate,
      ApolloContextEvents.noteDelete,
      ApolloContextEvents.noteDeleteAttachment,
      ApolloContextEvents.noteUpdate
    ],
    refetch
  )

  return <NotesContainer notes={data?.notes} handleOnClick={handleOnClick} />
})

NotesList.displayName = displayName

export default NotesList
