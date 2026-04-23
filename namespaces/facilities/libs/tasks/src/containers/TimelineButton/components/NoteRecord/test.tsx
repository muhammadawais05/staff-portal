import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { Timeline } from '@toptal/picasso'
import { NoteStatus, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { WebResourceFragment } from '@staff-portal/facilities'
import { NoteFragment } from '@staff-portal/notes'

import { EntryTypeNames } from '../../types'
import NoteRecord, { Props } from './NoteRecord'

jest.mock('@toptal/picasso/Icon', () => {
  const actualPicassoIcon = jest.requireActual('@toptal/picasso/Icon')

  return {
    __esModule: true,
    ...actualPicassoIcon,
    Pencil16: () => <span data-testid='svg-pencil-16' />
  }
})

jest.mock('@staff-portal/notes', () => ({
  ...jest.requireActual('@staff-portal/notes'),
  Note: {
    Author: ({ author }: { author: WebResourceFragment }) => (
      <div data-testid='note-author'>{author.webResource?.text}</div>
    )
  }
}))

jest.mock('../NoteRecordContent', () => ({
  __esModule: true,
  default: () => <div data-testid='note-record-content' />
}))

jest.mock('@staff-portal/chronicles', () => ({
  ...jest.requireActual('@staff-portal/chronicles')
}))

const date = '2020-07-23T20:31:19.768Z'
const noteEntity = {
  id: '11',
  title: 'note title',
  comment: 'note comment',
  createdAt: date,
  updatedAt: date,
  newSalesCall: false,
  checklistSalesCall: false,
  creator: {
    id: 'test',
    webResource: {
      url: 'https://en.wikipedia.org/wiki/Peter_Parker_(Sam_Raimi_film_series)',
      text: 'Peter Parker'
    }
  },
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

const noteRecordProps = {
  entry: {
    type: EntryTypeNames.Note,
    id: '1',
    date,
    entity: noteEntity
  },
  stripeEven: false,
  onExpandClick: () => {}
}

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <Timeline>
        <NoteRecord {...props} />
      </Timeline>
    </TestWrapper>
  )

describe('NoteRecord', () => {
  it('renders HistoryEntryRow', () => {
    const props = {
      ...noteRecordProps,
      expanded: true,
      hasConnector: true
    }

    arrangeTest(props)

    expect(
      within(screen.getByTestId('entry-row-1')).getByTestId('svg-pencil-16')
    ).toBeInTheDocument()
    expect(screen.getByTestId('expandable-content-details')).toHaveTextContent(
      `${noteEntity?.creator?.webResource.text} added a note`
    )
    expect(
      within(screen.getByTestId('expandable-content-text')).getByTestId(
        'note-record-content'
      )
    ).toBeInTheDocument()
  })
})
