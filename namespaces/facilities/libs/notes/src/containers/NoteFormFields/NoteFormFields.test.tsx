import { render, screen } from '@testing-library/react'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { NoteSoftSkillFragment } from '../../data/note-soft-skill-fragment'
import { AnswerGroupedType } from '../../types'
import NoteFormFields from './NoteFormFields'

jest.mock('./components/NoteFormTitle', () => ({
  __esModule: true,
  default: () => <div data-testid='note-form-title' />
}))
jest.mock('./components/NoteFormAttachment', () => ({
  __esModule: true,
  default: () => <div data-testid='note-form-attachment' />
}))
jest.mock('./components/NoteFormAnswerGroups', () => ({
  __esModule: true,
  default: () => <div data-testid='note-form-answers-groups' />
}))
jest.mock('./components/NoteFormSoftSkills', () => ({
  __esModule: true,
  default: () => <div data-testid='note-form-soft-skills' />
}))
jest.mock('./components/NoteFormComment', () => ({
  __esModule: true,
  default: () => <div data-testid='note-form-comment' />
}))
jest.mock('./components/NoteFormAttachment', () => ({
  __esModule: true,
  default: () => <div data-testid='note-form-attachment' />
}))
jest.mock('./components/HowDidYouHearNoteForm', () => ({
  __esModule: true,
  default: () => <div data-testid='how-did-you-hear-note-form' />
}))
jest.mock('@toptal/picasso-forms', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: () => ({
    subscribe: jest.fn(),
    getState: jest.fn(() => ({ active: null, values: { answers: [] } })),
    change: jest.fn()
  })
}))
jest.mock('../../hooks/use-note-notifications')

const renderComponent = (
  props: Partial<ComponentProps<typeof NoteFormFields>> = {}
) =>
  render(
    <TestWrapper>
      <NoteFormFields notableId='1' {...props} />
    </TestWrapper>
  )

describe('NoteFormFields', () => {
  it('shows the common note fields', () => {
    renderComponent()

    expect(screen.getByTestId('note-form-title')).toBeInTheDocument()
    expect(screen.getByTestId('note-form-comment')).toBeInTheDocument()
    expect(screen.getByTestId('note-form-attachment')).toBeInTheDocument()
  })

  it('does not show Attachment field', () => {
    renderComponent({ displayAttachment: false })

    expect(screen.queryByTestId('note-form-attachment')).not.toBeInTheDocument()
  })

  it('shows the custom note fields', () => {
    const ANSWER = {} as AnswerGroupedType
    const SOFT_SKILL = {} as NoteSoftSkillFragment

    renderComponent({ groupedAnswers: [ANSWER], softSkills: [SOFT_SKILL] })

    expect(screen.getByTestId('note-form-answers-groups')).toBeInTheDocument()
    expect(screen.getByTestId('note-form-soft-skills')).toBeInTheDocument()
  })

  describe('when displayHowDidYouHearNote is truthy', () => {
    it('displays header with how-did-you-hear form', () => {
      renderComponent({ displayHowDidYouHearNote: true })

      expect(screen.getByTestId('note-form-group-header')).toHaveTextContent(
        'Additional Details'
      )
      expect(
        screen.getByTestId('how-did-you-hear-note-form')
      ).toBeInTheDocument()
    })
  })

  describe('when displayHowDidYouHearNote is falsy', () => {
    it('does not display header & how-did-you-hear form', () => {
      renderComponent({ displayHowDidYouHearNote: false })

      expect(
        screen.queryByTestId('note-form-group-header')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('how-did-you-hear-note-form')
      ).not.toBeInTheDocument()
    })
  })

  describe('when hideCommentField is true', () => {
    it('hides the comment field', () => {
      renderComponent({ hideCommentField: true })

      expect(screen.queryByTestId('note-form-comment')).not.toBeInTheDocument()
    })
  })

  describe('when displayAttachment is truthy', () => {
    it('displays note form attachment', () => {
      renderComponent({ displayAttachment: true })

      expect(screen.getByTestId('note-form-attachment')).toBeInTheDocument()
    })
  })

  describe('when displayAttachment is falsy', () => {
    it('does not display note form attachment', () => {
      renderComponent({ displayAttachment: false })

      expect(
        screen.queryByTestId('note-form-attachment')
      ).not.toBeInTheDocument()
    })
  })
})
