import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { NoteContentType } from '../../types'
import NoteContent from './NoteContent'

jest.mock('../NoteNewSalesCallContent', () => ({
  __esModule: true,
  default: () => <div data-testid='note-new-sales-call-content' />
}))

jest.mock('../NoteQuestionsAndAnswersContent', () => ({
  __esModule: true,
  default: () => <div data-testid='note-questions-and-answers-content' />
}))

const arrangeTest = (note: Partial<NoteContentType>) =>
  render(
    <TestWrapper>
      <NoteContent
        note={
          {
            answers: { nodes: [] },
            ...note
          } as unknown as NoteContentType
        }
      />
    </TestWrapper>
  )

describe('NoteItem', () => {
  it('should display questions and answers content', () => {
    arrangeTest({ comment: 'some comment' })

    expect(
      screen.queryByTestId('note-new-sales-call-content')
    ).not.toBeInTheDocument()

    expect(
      screen.getByTestId('note-questions-and-answers-content')
    ).toBeInTheDocument()
  })

  it('should display new sales call content', () => {
    arrangeTest({ newSalesCall: true })

    expect(
      screen.getByTestId('note-new-sales-call-content')
    ).toBeInTheDocument()

    expect(
      screen.queryByTestId('note-questions-and-answers-content')
    ).not.toBeInTheDocument()
  })

  it('should display check list sales call', () => {
    arrangeTest({ checklistSalesCall: true })

    expect(
      screen.getByTestId('note-new-sales-call-content')
    ).toBeInTheDocument()

    expect(
      screen.queryByTestId('note-questions-and-answers-content')
    ).not.toBeInTheDocument()
  })
})
