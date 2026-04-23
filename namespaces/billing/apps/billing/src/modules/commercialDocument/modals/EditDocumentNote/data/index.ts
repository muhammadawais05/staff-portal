import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetDocumentNoteQuery } from './getDocumentNote.graphql.types'

export const useGetDocumentNote = (nodeId: string) =>
  useGetNode(useGetDocumentNoteQuery)({ nodeId })
