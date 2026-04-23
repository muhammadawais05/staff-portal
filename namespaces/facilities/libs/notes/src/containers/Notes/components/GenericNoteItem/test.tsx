import { render, screen } from '@testing-library/react'
import React from 'react'
import { NoteStatus, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { NoteFragment } from '../../../../data/note-fragment'
import GenericNoteItem from './GenericNoteItem'

jest.mock('@staff-portal/ui/src/components/NoteCard/components', () => ({
  ...jest.requireActual('@staff-portal/ui/src/components/NoteCard/components'),
  NoteCardTitle: () => <div data-testid='note-title' />,
  NoteCardActions: () => <div data-testid='note-actions' />,
  NoteCardInfo: () => <div data-testid='note-info' />,
  NoteCardBody: () => <div data-testid='note-body' />
}))

jest.mock('../../../Note/components/NoteAttachment', () => ({
  __esModule: true,
  default: () => <div data-testid='note-attachment' />
}))

const createNoteMock = (note: Partial<NoteFragment> = {}): NoteFragment => ({
  answers: { nodes: [] },
  createdAt: '',
  id: '',
  newSalesCall: false,
  checklistSalesCall: false,
  operations: {
    removeNote: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    removeNoteAttachment: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    updateNote: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  status: NoteStatus.ACTIVE,
  title: '',
  updatedAt: '',
  attachment: {
    url: '',
    webResource: {
      text: '',
      url: ''
    }
  },
  comment: undefined,
  creator: undefined,
  softSkillRatings: { nodes: [] },
  __typename: 'Note',
  ...note
})

const arrangeTest = (note: NoteFragment, hideActions = false) =>
  render(
    <TestWrapper>
      <GenericNoteItem hideActions={hideActions} note={note} />
    </TestWrapper>
  )

describe('GenericNoteItem', () => {
  it('render generic note item', () => {
    arrangeTest(createNoteMock())

    expect(screen.getByTestId('note-title')).toBeInTheDocument()
    expect(screen.getByTestId('note-actions')).toBeInTheDocument()
    expect(screen.getByTestId('note-info')).toBeInTheDocument()
    expect(screen.getByTestId('note-body')).toBeInTheDocument()
    expect(screen.getByTestId('note-attachment')).toBeInTheDocument()
  })

  it('should hide the note actions', () => {
    arrangeTest(createNoteMock(), true)

    expect(screen.queryByTestId('note-actions')).not.toBeInTheDocument()
  })

  it('should hide the attachment', () => {
    arrangeTest(createNoteMock({ attachment: undefined }))

    expect(screen.queryByTestId('note-attachment')).not.toBeInTheDocument()
  })
})
