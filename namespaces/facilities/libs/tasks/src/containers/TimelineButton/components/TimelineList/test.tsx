import React from 'react'
import { render, screen } from '@testing-library/react'
import { NoteStatus, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { NoteFragment } from '@staff-portal/notes'

import { EntryTypeNames } from '../../types'
import TimelineList, { Props } from './TimelineList'

jest.mock('@staff-portal/chronicles', () => ({
  ...jest.requireActual('@staff-portal/chronicles')
}))
jest.mock('../HistoryActionRecord', () => ({
  __esModule: true,
  default: () => <div data-testid='history-entry' />
}))
jest.mock('../NoteRecord', () => ({
  __esModule: true,
  default: () => <div data-testid='note-entry' />
}))
jest.mock('../CommunicationRecord', () => ({
  __esModule: true,
  default: () => <div data-testid='communication-entry' />
}))

const date = '2020-07-23T20:31:19.768Z'
const noteEntry = {
  type: EntryTypeNames.Note,
  id: '1',
  date,
  entity: {
    id: '1',
    title: '',
    createdAt: date,
    updatedAt: date,
    newSalesCall: false,
    checklistSalesCall: false,
    operations: {
      removeNoteAttachment: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      removeNote: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateNote: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    },
    answers: { nodes: [] },
    softSkillRatings: { nodes: [] },
    status: NoteStatus.ACTIVE,
    __typename: 'Note'
  } as NoteFragment
}
const historyActionEntry = {
  type: EntryTypeNames.HistoryAction,
  id: '2',
  date,
  entity: {
    performedAction: {
      id: '',
      occurredAt: '',
      action: '',
      subjectGID: '',
      subjectName: null,
      performerGID: null,
      payload: '',
      template: '',
      comment: null
    },
    literals: []
  }
}
const communicationEntry = {
  type: EntryTypeNames.Communication,
  id: '3',
  date,
  entity: {
    id: '',
    __typename: 'EmailMessage' as const,
    categories: [],
    sentAt: date,
    from: {
      __typename: 'EmailAddress' as const,
      email: '',
      blacklisted: false
    },
    to: [],
    toUsers: []
  }
}

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <TimelineList {...props} />
    </TestWrapper>
  )

describe('TimelineList', () => {
  it('renders timeline list with Note entry', () => {
    const props = {
      entries: [noteEntry],
      expandedById: {},
      onExpandClick: () => {}
    }

    arrangeTest(props)

    expect(screen.getByTestId('note-entry')).toBeInTheDocument()
  })

  it('renders timeline list with History Action entry', () => {
    const props = {
      entries: [historyActionEntry],
      expandedById: {},
      onExpandClick: () => {}
    }

    arrangeTest(props)

    expect(screen.getByTestId('history-entry')).toBeInTheDocument()
  })

  it('renders timeline list with Communication entry', () => {
    const props = {
      entries: [communicationEntry],
      expandedById: {},
      onExpandClick: () => {}
    }

    arrangeTest(props)

    expect(screen.getByTestId('communication-entry')).toBeInTheDocument()
  })
})
