import { useCallback } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useLocation } from '@staff-portal/navigation'
import { localStorageService } from '@staff-portal/local-storage-service'
import { useGetCurrentUser } from '@staff-portal/current-user'

import { NoteLinks } from '../types'
import { UNSAVED_NOTES_UPDATED } from '../messages'

const KEY_SLUG = 'unsaved_notes'

type NoteStorageKey = string

const getNoteLinksFromLocalStorage = (
  currentUserNotesKey?: string
): NoteLinks =>
  currentUserNotesKey
    ? localStorageService.getItem(currentUserNotesKey) || {}
    : {}

const useNoteNotifications = (): {
  getNoteLinks: () => NoteLinks
  trackNote: (
    key: NoteStorageKey,
    data: { notableId: string; notableTitle: string }
  ) => void
  untrackNote: (key: NoteStorageKey) => void
  untrackAllNotes: () => void
} => {
  const { hash, pathname } = useLocation()
  const emitMessage = useMessageEmitter()

  const currentUser = useGetCurrentUser()
  const currentUserNotesKey = currentUser
    ? `${KEY_SLUG}_${currentUser.id}`
    : undefined

  const updateNoteLinks = useCallback(
    (newNoteLinks: NoteLinks) => {
      if (!currentUserNotesKey) {
        return
      }

      localStorageService.setItem(currentUserNotesKey, newNoteLinks)
      emitMessage(UNSAVED_NOTES_UPDATED, { links: newNoteLinks })
    },
    [currentUserNotesKey, emitMessage]
  )

  if (!currentUserNotesKey) {
    return {
      getNoteLinks: () => getNoteLinksFromLocalStorage(currentUserNotesKey),
      trackNote: () => {},
      untrackNote: () => {},
      untrackAllNotes: () => {}
    }
  }

  return {
    getNoteLinks: () => getNoteLinksFromLocalStorage(currentUserNotesKey),
    trackNote: (key, { notableId, notableTitle }) => {
      const noteLinks = getNoteLinksFromLocalStorage(currentUserNotesKey)
      const noteLinkData = noteLinks[key]

      const path = `${pathname}${hash}`

      // do not trigger state update if the same data is provided
      if (
        noteLinkData &&
        noteLinkData.notableId === notableId &&
        noteLinkData.notableTitle === notableTitle
      ) {
        return
      }

      updateNoteLinks({
        ...noteLinks,
        [key]: { notableId, notableTitle, path }
      })
    },
    untrackNote: key => {
      const noteLinks = getNoteLinksFromLocalStorage(currentUserNotesKey)
      const { [key]: __, ...newNoteLinks } = noteLinks // eslint-disable-line @typescript-eslint/no-unused-vars

      updateNoteLinks(newNoteLinks)
    },
    untrackAllNotes: () => {
      updateNoteLinks({})
    }
  }
}

export default useNoteNotifications
