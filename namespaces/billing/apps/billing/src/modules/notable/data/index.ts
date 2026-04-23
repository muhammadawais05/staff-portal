import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetNotesQuery } from './getNotes.graphql.types'
import { useGetNoteQuery } from './getNote.graphql.types'

export const useGetNotes = (nodeId: string) =>
  useGetNode(useGetNotesQuery)({ nodeId })

export const useGetNote = (nodeId: string) =>
  useGetNode(useGetNoteQuery)({ nodeId })
