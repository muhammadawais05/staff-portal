import { arrayMutators, Form } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { ContactType } from '../../types'
import FormInterviewContactsSelect from './FormInterviewContactsSelect'

const OPTIONS: ContactType[] = [
  { id: '1', fullName: 'Contact 1' },
  { id: '2', fullName: 'Contact 2' },
  { id: '3', fullName: 'Contact 3' }
]

const arrangeTest = () =>
  render(
    <TestWrapper>
      <Form
        initialValues={{ interviewContacts: [] }}
        onSubmit={() => {}}
        mutators={{ ...arrayMutators }}
      >
        <FormInterviewContactsSelect availableContacts={OPTIONS} />
      </Form>
    </TestWrapper>
  )

describe('FormInterviewContactsSelect', () => {
  it('shows and filter options', async () => {
    arrangeTest()

    fireEvent.click(screen.getByPlaceholderText('Search interview contact'))

    expect(await screen.findByText('Contact 1')).toBeInTheDocument()
    expect(screen.getByText('Contact 2')).toBeInTheDocument()
    expect(screen.getByText('Contact 3')).toBeInTheDocument()

    fireEvent.click(await screen.findByText('Contact 1'))

    fireEvent.click(screen.getByPlaceholderText('Search interview contact'))

    expect(await screen.findByText('Contact 2')).toBeInTheDocument()
    expect(screen.getByText('Contact 3')).toBeInTheDocument()
    expect(screen.queryByText('Contact 1')).not.toBeInTheDocument()
  })
})
