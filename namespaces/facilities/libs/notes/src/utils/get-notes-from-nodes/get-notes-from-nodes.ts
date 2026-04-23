import { ActivityFragment } from '@staff-portal/activities'

import { NoteFragment } from '../../data/note-fragment'

export const getNotesFromNodes = (nodes: (ActivityFragment | NoteFragment)[]) =>
  nodes.reduce((result, node) => {
    if (node.__typename === 'Activity') {
      return [...result, node]
    }

    if (node.__typename === 'Note') {
      return [
        ...result,
        { ...node, answers: { nodes: [...node.answers.nodes] } }
      ]
    }

    return result
  }, [] as (ActivityFragment | NoteFragment)[])
