import React from 'react'

import { NoteContentType } from '../../types'
import NoteNewSalesCallContent from '../NoteNewSalesCallContent'
import NoteQuestionsAndAnswersContent from '../NoteQuestionsAndAnswersContent'

export interface NoteContentProps {
  note: NoteContentType
}

const NoteContent = ({ note }: NoteContentProps) => {
  const { newSalesCall, checklistSalesCall } = note

  if (newSalesCall || checklistSalesCall) {
    return <NoteNewSalesCallContent note={note} />
  }

  return <NoteQuestionsAndAnswersContent note={note} />
}

export default NoteContent
