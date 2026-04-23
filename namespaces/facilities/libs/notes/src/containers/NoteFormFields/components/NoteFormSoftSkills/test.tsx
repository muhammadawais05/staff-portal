import { render, screen } from '@testing-library/react'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { NoteFormSoftSkill, NoteFormType } from '../../../../types'
import NoteFormSoftSkills from './NoteFormSoftSkills'

jest.mock('../NoteFormSoftSkillsRating', () => ({
  __esModule: true,
  default: () => <div data-testid='note-form-skill-rating' />
}))

const arrangeTest = (softSkills?: NoteFormSoftSkill[]) => {
  const initialValues: NoteFormType = {
    comment: '',
    noteTitle: '',
    softSkills
  }

  return render(
    <TestWrapper>
      <Form<NoteFormType>
        initialValues={initialValues}
        onSubmit={() => {}}
        mutators={{ ...arrayMutators }}
      >
        <NoteFormSoftSkills />
      </Form>
    </TestWrapper>
  )
}

describe('NoteFormSoftSkills', () => {
  it('does not show soft skills fields', () => {
    arrangeTest()

    expect(
      screen.queryByTestId('note-form-skill-rating')
    ).not.toBeInTheDocument()
  })

  it('shows the soft skills fields', () => {
    arrangeTest([
      {
        softSkill: { id: 'id-1', name: 'Soft Skill Name', ratingHints: [] },
        comment: 'Test comment'
      },
      {
        softSkill: {
          id: 'id-2',
          name: 'Another Soft Skill Name',
          ratingHints: []
        },
        comment: 'Test comment'
      }
    ])

    expect(screen.getByText('1. Soft Skill Name')).toBeInTheDocument()
    expect(screen.getByText('2. Another Soft Skill Name')).toBeInTheDocument()
    expect(screen.getAllByTestId('note-form-skill-rating')).toHaveLength(2)
  })
})
