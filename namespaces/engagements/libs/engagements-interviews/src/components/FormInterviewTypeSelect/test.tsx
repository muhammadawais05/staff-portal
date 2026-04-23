import { Form } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import FormInterviewTypeSelect from './FormInterviewTypeSelect'

const OPTIONS = ['General', 'Behavioral', 'Technical', 'Case']

const arrangeTest = () =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <FormInterviewTypeSelect name='interview' label='Interview' />
      </Form>
    </TestWrapper>
  )

describe('FormInterviewTypeSelect', () => {
  it.each(OPTIONS)('shows the %s type option', async expected => {
    arrangeTest()

    fireEvent.click(screen.getByLabelText('Interview'))

    expect(await screen.findByText(expected)).toBeInTheDocument()
  })
})
