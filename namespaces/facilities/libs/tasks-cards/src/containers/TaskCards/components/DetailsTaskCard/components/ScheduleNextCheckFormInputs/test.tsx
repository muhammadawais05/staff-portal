import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import ScheduleNextCheckFormInputs from './ScheduleNextCheckFormInputs'

const arrangeTest = () =>
  render(
    <TestWrapperWithMocks>
      <Form onSubmit={jest.fn()}>
        <ScheduleNextCheckFormInputs />
      </Form>
    </TestWrapperWithMocks>
  )

describe('ScheduleNextCheckFormInputs', () => {
  beforeEach(() => {
    arrangeTest()
  })

  describe('when action needed radio is set to "No"', () => {
    it('shows action needed and Next Check Date fields', () => {
      fireEvent.click(
        screen.getByRole('radio', {
          name: /no/i
        })
      )

      expect(
        screen.getByText(/do we need to take any action\?/i)
      ).toBeInTheDocument()
      expect(screen.getByText('Next Check Date')).toBeInTheDocument()
    })

    it('hides other fields', () => {
      fireEvent.click(
        screen.getByRole('radio', {
          name: /no/i
        })
      )

      expect(
        screen.queryByText(/Who is responsible for the next action/i)
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('select-action-input')
      ).not.toBeInTheDocument()
    })
  })

  describe('when action needed radio is set to "Yes" after "No"', () => {
    it('shows all fields', async () => {
      await waitFor(() => {
        fireEvent.click(
          screen.getByRole('radio', {
            name: /no/i
          })
        )
        fireEvent.click(
          screen.getByRole('radio', {
            name: /yes/i
          })
        )

        expect(
          screen.getByText(/do we need to take any action\?/i)
        ).toBeInTheDocument()
        expect(screen.getByText('Next Check Date')).toBeInTheDocument()
        expect(
          screen.getByText(/Who is responsible for the next action/i)
        ).toBeInTheDocument()
        expect(screen.getByLabelText(/Action/)).toBeInTheDocument()
      })
    })
  })

  describe('when Action=Other is selected', () => {
    it('shows comment', () => {
      fireEvent.click(screen.getByLabelText(/Action/))
      fireEvent.click(screen.getByText('Other'))

      expect(screen.getByLabelText(/Comment/)).toBeInTheDocument()
    })
  })

  describe('when responsible role changes', () => {
    it('clears action input', () => {
      // Select an responsible role.
      fireEvent.click(screen.getByLabelText(/Staff/))
      // Select an action.
      fireEvent.click(screen.getByLabelText(/Action/))
      fireEvent.click(screen.getByText('Review profile'))
      // Change Responbile Role.
      fireEvent.click(screen.getByText('Talent'))
      // Verify action is not selected anymore.
      expect(screen.queryByText('Review profile')).not.toBeInTheDocument()
    })
  })
})
