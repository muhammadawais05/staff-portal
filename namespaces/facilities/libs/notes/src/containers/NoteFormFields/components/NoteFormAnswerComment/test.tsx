import { render, screen } from '@testing-library/react'
import React from 'react'
import { Form } from '@toptal/picasso-forms'
import {
  NoteQuestionKind,
  NoteQuestionCommentType
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { NoteQuestionWithOptionsFragment } from '../../../../data/note-answer-fragment'
import NoteFormAnswerComment from './NoteFormAnswerComment'

jest.mock('../NoteFormSkill', () => ({
  __esModule: true,
  default: () => <div data-testid='note-form-skill' />
}))

const arrangeTest = (
  kind: NoteQuestionKind,
  commentType?: NoteQuestionCommentType,
  disabled?: boolean
) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <NoteFormAnswerComment
          value='comment field'
          question={
            {
              kind,
              commentType,
              activeOptions: { nodes: [] }
            } as unknown as NoteQuestionWithOptionsFragment
          }
          index={1}
          disabled={disabled}
        />
      </Form>
    </TestWrapper>
  )

const cases: [NoteQuestionKind, string][] = [
  [NoteQuestionKind.DATE, 'note-form-date-picker'],
  [NoteQuestionKind.INTEGER, 'note-form-number-input'],
  [NoteQuestionKind.RADIO_BUTTONS, 'note-form-radio-buttons'],
  [NoteQuestionKind.STRING, 'note-form-textbox'],
  [NoteQuestionKind.SKILL, 'note-form-skill'],
  [NoteQuestionKind.MULTIPLE_SKILLS, 'note-form-multiple-skills'],
  [NoteQuestionKind.TEXTBOX, 'note-form-textbox']
]

describe('NoteFormAnswerComment', () => {
  describe('no `commentType` specified for question', () => {
    it.each(cases)('%s: renders nothing', kind => {
      arrangeTest(kind)
      expect(screen.queryByDisplayValue('comment field')).toBeNull()
      expect(screen.queryByTestId('note-form-skill')).toBeNull()
    })
  })

  describe('short `commentType` is specified for question', () => {
    it.each(cases)('%s: renders text field enabled', kind => {
      arrangeTest(kind, NoteQuestionCommentType.SHORT)
      expect(screen.getByDisplayValue('comment field')).toBeInTheDocument()
      expect(screen.getByDisplayValue('comment field')).not.toBeDisabled()
      expect(screen.queryByTestId('note-form-skill')).toBeNull()
    })
  })

  describe('long `commentType` is specified for question', () => {
    it.each(cases)('%s: renders text field enabled', kind => {
      arrangeTest(kind, NoteQuestionCommentType.LONG)
      expect(screen.getByDisplayValue('comment field')).toBeInTheDocument()
      expect(screen.getByDisplayValue('comment field')).not.toBeDisabled()
      expect(screen.queryByTestId('note-form-skill')).toBeNull()
    })
  })

  describe('when disabled', () => {
    it.each(cases)('%s: renders text field disabled', kind => {
      arrangeTest(kind, NoteQuestionCommentType.SHORT, true)
      expect(screen.getByDisplayValue('comment field')).toBeInTheDocument()
      expect(screen.getByDisplayValue('comment field')).toBeDisabled()
    })
  })
})
