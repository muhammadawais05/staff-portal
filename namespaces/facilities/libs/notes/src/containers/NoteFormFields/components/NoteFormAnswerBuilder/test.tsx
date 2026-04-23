import { render, screen } from '@testing-library/react'
import React from 'react'
import { NoteQuestionKind } from '@staff-portal/graphql/staff'
import { assertOnTooltipText, TestWrapper } from '@staff-portal/test-utils'

import { NoteQuestionWithOptionsFragment } from '../../../../data/note-answer-fragment'
import NoteFormAnswerBuilder from './NoteFormAnswerBuilder'
import { Props as NoteFormAnswerProps } from '../NoteFormAnswer/NoteFormAnswer'
import { Props as NoteFormAnswerCommentProps } from '../NoteFormAnswerComment/NoteFormAnswerComment'

jest.mock('../NoteFormAnswer', () => ({
  __esModule: true,
  default: ({ disabled }: NoteFormAnswerProps) => (
    <input data-testid='note-form-answer' disabled={disabled} />
  )
}))

jest.mock('../NoteFormAnswerComment', () => ({
  __esModule: true,
  default: ({ value, disabled }: NoteFormAnswerCommentProps) => (
    <input
      data-testid='note-form-answer-comment'
      disabled={disabled}
      defaultValue={value as string}
    />
  )
}))

const arrangeTest = ({
  kind,
  isEditingExisting,
  label = '',
  groupLabel = ''
}: {
  kind: NoteQuestionKind
  isEditingExisting?: boolean
  label?: string
  groupLabel?: string
}) =>
  render(
    <TestWrapper>
      <NoteFormAnswerBuilder
        isEditingExisting={isEditingExisting}
        question={
          {
            kind,
            activeOptions: { nodes: [] },
            label,
            group: { label: groupLabel }
          } as unknown as NoteQuestionWithOptionsFragment
        }
        comment='Comment'
        index={1}
      />
    </TestWrapper>
  )

const cases: NoteQuestionKind[] = [
  NoteQuestionKind.DATE,
  NoteQuestionKind.INTEGER,
  NoteQuestionKind.RADIO_BUTTONS,
  NoteQuestionKind.STRING,
  NoteQuestionKind.SKILL,
  NoteQuestionKind.MULTIPLE_SKILLS,
  NoteQuestionKind.TEXTBOX
]

const expectFields = (expectDisabled?: boolean, expectedTooltip = '') => {
  const noteFormAnswer = screen.getByTestId('note-form-answer')
  const noteFormAnswerComment = screen.getByTestId('note-form-answer-comment')

  expect(noteFormAnswer).toBeInTheDocument()
  expect(noteFormAnswerComment).toBeInTheDocument()

  expect(noteFormAnswerComment).toHaveAttribute('value', 'Comment')

  if (expectDisabled) {
    expect(noteFormAnswer).toBeDisabled()
    expect(noteFormAnswerComment).toBeDisabled()

    assertOnTooltipText(noteFormAnswer, expectedTooltip)
    assertOnTooltipText(noteFormAnswerComment, expectedTooltip)
  } else {
    expect(noteFormAnswer).not.toBeDisabled()
    expect(noteFormAnswerComment).not.toBeDisabled()
  }
}

describe('NoteFormAnswerBuilder', () => {
  describe('when creating a new note', () => {
    describe('basic usage', () => {
      it.each(cases)('%s: renders answer and comment fields enabled', kind => {
        arrangeTest({ kind })
        expectFields()
      })
    })

    describe('when group label is "Future Opportunities"', () => {
      it.each(cases)('%s: renders answer and comment fields enabled', kind => {
        arrangeTest({ kind, groupLabel: 'Future Opportunities' })
        expectFields()
      })
    })

    describe('when label is "Referred By"', () => {
      it.each(cases)('%s: renders answer and comment fields enabled', kind => {
        arrangeTest({ kind, label: 'Referred By' })
        expectFields()
      })
    })
  })

  describe('when editing an existing note', () => {
    describe('basic usage', () => {
      it.each(cases)('%s: renders answer and comment fields enabled', kind => {
        arrangeTest({ kind, isEditingExisting: true })
        expectFields()
      })
    })

    describe('when group label is "Future Opportunities"', () => {
      it.each(cases)('%s: renders answer and comment fields disabled', kind => {
        arrangeTest({
          kind,
          isEditingExisting: true,
          groupLabel: 'Future Opportunities'
        })

        expectFields(
          true,
          'Editing Future Opportunities by updating the Sales Call note is not supported. You can edit the opportunity in the Basic Info'
        )
      })
    })

    describe('when label is "Referred By"', () => {
      it.each(cases)('%s: renders answer and comment fields disabled', kind => {
        arrangeTest({ kind, isEditingExisting: true, label: 'Referred By' })
        expectFields(true, 'This field is not editable in an existing note')
      })
    })

    describe('when label is "Calculated Grade"', () => {
      it.each(cases)('%s: renders answer and comment fields disabled', kind => {
        arrangeTest({
          kind,
          isEditingExisting: true,
          label: 'Calculated Grade'
        })
        expectFields(true, 'This field is not editable in an existing note')
      })
    })
  })
})
