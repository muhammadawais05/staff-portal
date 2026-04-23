import { Form, FormSpy } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React, { ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import FormCancelButton from './FormCancelButton'

jest.mock('@toptal/picasso-forms', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso-forms'),
  FormSpy: jest.fn()
}))

const mockFormSpy = (submitting = false) => {
  const mock = FormSpy as jest.Mock

  mock.mockImplementation(
    ({
      children
    }: {
      children: (props: { submitting: boolean }) => ReactNode
    }) => <div>{children({ submitting })}</div>
  )
}

const arrangeTest = (onClick: () => void) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <FormCancelButton onClick={onClick} />
      </Form>
    </TestWrapper>
  )

describe('FormCancelButton', () => {
  it('shows enabled button', () => {
    const onSubmit = jest.fn()

    mockFormSpy()
    arrangeTest(onSubmit)

    fireEvent.click(screen.getByText('Cancel'))

    expect(onSubmit).toHaveBeenCalled()
  })

  it('shows disabled button', () => {
    const onSubmit = jest.fn()

    mockFormSpy(true)
    arrangeTest(onSubmit)

    fireEvent.click(screen.getByText('Cancel'))

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
