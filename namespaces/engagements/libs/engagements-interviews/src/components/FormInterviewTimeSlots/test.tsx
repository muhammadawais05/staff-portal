import { arrayMutators, Form } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import FormInterviewTimeSlots from './FormInterviewTimeSlots'

jest.mock('@toptal/picasso-forms/TimePicker', () => ({
  __esModule: true,
  default: () => <div data-testid='time-picker' />
}))

const arrangeTest = () => {
  return render(
    <TestWrapperWithMocks>
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{ proposedTimeSlots: [] }}
        onSubmit={() => {}}
      >
        <FormInterviewTimeSlots />
      </Form>
    </TestWrapperWithMocks>
  )
}

describe('FormInterviewTimeSlots', () => {
  it('disables the add new option after you three options.', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Add New Time Option'))
    fireEvent.click(screen.getByText('Add New Time Option'))
    fireEvent.click(screen.getByText('Add New Time Option'))

    const button = screen.getByRole('button', {
      name: 'Add New Time Option'
    })

    expect(button).toBeDisabled()
  })

  it('shows or hides the delete time slot option based.', async () => {
    arrangeTest()

    expect(
      screen.queryByTestId('remove-time-slot-option-button')
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Add New Time Option'))
    fireEvent.click(screen.getByText('Add New Time Option'))
    fireEvent.click(screen.getByText('Add New Time Option'))

    let addNewOptionButton = screen.getByRole('button', {
      name: 'Add New Time Option'
    })

    expect(addNewOptionButton).toBeDisabled()

    expect(
      screen.getAllByTestId('remove-time-slot-option-button')
    ).toHaveLength(3)

    fireEvent.click(screen.getAllByTestId('remove-time-slot-option-button')[0])

    addNewOptionButton = screen.getByRole('button', {
      name: 'Add New Time Option'
    })

    expect(addNewOptionButton).not.toBeDisabled()

    fireEvent.click(screen.getAllByTestId('remove-time-slot-option-button')[0])

    expect(
      screen.queryByTestId('remove-time-slot-option-button')
    ).not.toBeInTheDocument()
  })
})
