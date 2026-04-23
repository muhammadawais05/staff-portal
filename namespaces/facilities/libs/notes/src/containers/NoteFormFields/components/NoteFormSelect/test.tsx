import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import NoteFormSelect from './NoteFormSelect'

const OPTIONS = [
  { id: '1', label: 'Option 1', value: 'option_1' },
  { id: '2', label: 'Option 2', value: 'option_2' },
  { id: '3', label: 'Option 3', value: 'option_3' }
]

const arrangeTest = (defaultValue?: string) =>
  render(
    <TestWrapper>
      <Form
        initialValues={{ answers: [{ value: defaultValue }] }}
        onSubmit={() => {}}
      >
        <NoteFormSelect
          index={0}
          placeholder='Select something'
          options={OPTIONS}
        />
      </Form>
    </TestWrapper>
  )

describe('NoteFormSelect', () => {
  it('shows the note form select component', async () => {
    arrangeTest()

    fireEvent.click(screen.getByPlaceholderText('Select something'))

    OPTIONS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('shows default selection', () => {
    arrangeTest('option_2')

    expect(screen.getByPlaceholderText('Select something')).toHaveValue(
      'Option 2'
    )
  })
})
