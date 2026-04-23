import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useNoteAnswerSuggestions } from './data'
import NoteFormFreelancePlatforms from './NoteFormFreelancePlatforms'

jest.mock('./data', () => ({
  __esModule: true,
  useNoteAnswerSuggestions: jest.fn()
}))

const SUGGESTIONS = ['Suggestion 1', 'Suggestion 2', 'Suggestion 3']

const mockReturnValues = () => {
  const mockUseNoteAnswerSuggestions = useNoteAnswerSuggestions as jest.Mock

  mockUseNoteAnswerSuggestions.mockReturnValue({
    suggestions: SUGGESTIONS,
    loading: false
  })
}

const arrangeTest = (defaultValues?: { text: string; value: string }[]) => {
  mockReturnValues()

  return render(
    <TestWrapper>
      <Form
        initialValues={{ answers: [{ value: defaultValues }] }}
        onSubmit={() => {}}
      >
        <NoteFormFreelancePlatforms
          index={0}
          placeholder='Select freelance platform'
        />
      </Form>
    </TestWrapper>
  )
}

describe('NoteFormFreelancePlatforms', () => {
  it('shows the freelance platforms', () => {
    arrangeTest()

    fireEvent.click(screen.getByPlaceholderText('Select freelance platform'))

    SUGGESTIONS.forEach(suggestion => {
      expect(screen.getByText(suggestion)).toBeInTheDocument()
    })
  })

  it('shows default value', () => {
    arrangeTest([{ text: 'Suggestion 2', value: 'Suggestion 2' }])

    expect(screen.getByText('Suggestion 2')).toBeInTheDocument()
  })
})
