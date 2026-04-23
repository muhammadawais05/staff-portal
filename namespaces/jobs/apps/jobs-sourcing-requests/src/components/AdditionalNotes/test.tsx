import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'

import AdditionalNotes from './AdditionalNotes'

type FormValues = {
  additionalNotes?: string
}

const arrangeTest = (formValues?: FormValues) =>
  render(
    <Form onSubmit={jest.fn()} initialValues={formValues}>
      <AdditionalNotes />
    </Form>
  )

describe('BudgetDetails', () => {
  it('renders fields without initial values', () => {
    arrangeTest()

    expect(screen.getByText('Additional Notes')).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Additional Notes' })
    ).toHaveValue('')
  })

  it('renders fields with initial values', () => {
    arrangeTest({ additionalNotes: 'Some note here' })

    expect(
      screen.getByRole('textbox', { name: 'Additional Notes' })
    ).toHaveValue('Some note here')
  })
})
