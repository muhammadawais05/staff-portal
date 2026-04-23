/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useField } from '@toptal/picasso-forms'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { NO_RATE_LIMIT_FIELD } from '../../../../config'
import NoRateLimitCheckbox from './NoRateLimitCheckbox'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    Checkbox: ({ name, disabled }: any) => (
      <input data-testid={`field-${name}`} disabled={disabled} />
    )
  },
  useField: jest.fn(),
  useForm: () => ({ change: () => {} })
}))
const mockUseField = useField as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <NoRateLimitCheckbox />
    </TestWrapper>
  )

describe('NoRateLimitCheckbox', () => {
  beforeEach(() => {
    mockUseField.mockReturnValue({
      input: { value: false }
    })
  })

  it('renders the field', () => {
    arrangeTest()

    expect(
      screen.getByTestId(`field-${NO_RATE_LIMIT_FIELD}`)
    ).toBeInTheDocument()
  })

  describe('when the uncertainOfBudget is true', () => {
    it('disables the field', () => {
      mockUseField.mockReturnValue({
        input: { value: true }
      })

      arrangeTest()

      expect(
        screen.queryByTestId(`field-${NO_RATE_LIMIT_FIELD}`)
      ).toHaveAttribute('disabled')
    })
  })
})
