import { render, screen } from '@testing-library/react'
import React from 'react'
import { NoteQuestionKind } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { NoteQuestionWithOptionsFragment } from '../../../../data/note-answer-fragment'
import NoteFormAnswer from './NoteFormAnswer'
import { NoteFormAnswerBuilderType } from '../../../../types'

jest.mock('../NoteFormDatePicker', () => ({
  __esModule: true,
  default: ({ disabled }: NoteFormAnswerBuilderType) => (
    <input data-testid='note-form-date-picker' disabled={disabled} />
  )
}))

jest.mock('../NoteFormMultipleSkills', () => ({
  __esModule: true,
  default: ({ disabled }: NoteFormAnswerBuilderType) => (
    <input data-testid='note-form-multiple-skills' disabled={disabled} />
  )
}))

jest.mock('../NoteFormNumberInput', () => ({
  __esModule: true,
  default: ({ disabled }: NoteFormAnswerBuilderType) => (
    <input data-testid='note-form-number-input' disabled={disabled} />
  )
}))

jest.mock('../NoteFormRadioButtons', () => ({
  __esModule: true,
  default: ({ disabled }: NoteFormAnswerBuilderType) => (
    <input data-testid='note-form-radio-buttons' disabled={disabled} />
  )
}))

jest.mock('../NoteFormSkill', () => ({
  __esModule: true,
  default: ({ disabled }: NoteFormAnswerBuilderType) => (
    <input data-testid='note-form-skill' disabled={disabled} />
  )
}))

jest.mock('../NoteFormTextBox', () => ({
  __esModule: true,
  default: ({ disabled }: NoteFormAnswerBuilderType) => (
    <input data-testid='note-form-textbox' disabled={disabled} />
  )
}))

const arrangeTest = (kind: NoteQuestionKind, disabled?: boolean) =>
  render(
    <TestWrapper>
      <NoteFormAnswer
        question={
          {
            kind,
            activeOptions: { nodes: [] }
          } as unknown as NoteQuestionWithOptionsFragment
        }
        index={1}
        disabled={disabled}
      />
    </TestWrapper>
  )

const cases: [NoteQuestionKind, string][] = [
  [NoteQuestionKind.DATE, 'note-form-date-picker'],
  [NoteQuestionKind.INTEGER, 'note-form-number-input'],
  [NoteQuestionKind.RADIO_BUTTONS, 'note-form-radio-buttons'],
  [NoteQuestionKind.STRING, 'note-form-textbox'],
  [NoteQuestionKind.SKILL, 'note-form-skill'],
  [NoteQuestionKind.FILTERED_SKILL, 'note-form-skill'],
  [NoteQuestionKind.MULTIPLE_SKILLS, 'note-form-multiple-skills'],
  [NoteQuestionKind.TEXTBOX, 'note-form-textbox']
]

describe('NoteFormAnswer', () => {
  describe('when enabled', () => {
    it.each(cases)('returns an enabled %s field', (kind, expected) => {
      arrangeTest(kind)

      expect(screen.getByTestId(expected)).toBeInTheDocument()
      expect(screen.getByTestId(expected)).not.toBeDisabled()
    })
  })

  describe('when disabled', () => {
    it.each(cases)('returns a disabled %s field', (kind, expected) => {
      arrangeTest(kind, true)

      expect(screen.getByTestId(expected)).toBeInTheDocument()
      expect(screen.getByTestId(expected)).toBeDisabled()
    })
  })
})
