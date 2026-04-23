/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react'
import { useField } from '@toptal/picasso-forms'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobMaximumHourlyRateInput from './JobMaximumHourlyRateInput'
import { MAX_HOURLY_RATE_FIELD } from '../../../../config'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    NumberInput: ({ name, required, disabled }: any) => (
      <input
        name={name}
        required={required}
        disabled={disabled}
        data-testid={`field-${name}`}
      />
    )
  },
  useField: jest.fn(),
  useForm: () => ({ change: () => {} })
}))

jest.mock(
  '@staff-portal/jobs/src/components/JobMaxHourlyRateWidgets/data/get-max-hourly-rate-enabled/get-max-hourly-rate-enabled.staff.gql.ts',
  () => ({
    useGetMaxHourlyRateEnhancementsExperiments: () => ({
      experiments: {},
      loading: false
    })
  })
)

jest.mock(
  '@staff-portal/jobs/src/components/JobMaxHourlyRateWidgets/data/get-aggregated-talent-client-hourly-rates/get-aggregated-talent-client-hourly-rates.staff.gql.ts',
  () => ({
    useGetAggregatedTalentClientHourlyRates: () => ({
      data: {
        rates1: [],
        rates5: []
      },
      loading: false
    })
  })
)

const mockUseField = useField as jest.Mock

const arrangeTest = (fieldOptions?: ReactNode) =>
  render(
    <TestWrapper>
      <JobMaximumHourlyRateInput fieldOptions={fieldOptions} />
    </TestWrapper>
  )

describe('JobMaximumHourlyRateInput', () => {
  beforeEach(() => {
    mockUseField.mockReturnValue({ input: { value: null } })
  })

  it('renders the field', () => {
    arrangeTest()

    expect(
      screen.getByTestId(`field-${MAX_HOURLY_RATE_FIELD}`)
    ).toBeInTheDocument()
  })

  it('renders children', () => {
    arrangeTest(<div data-testid='test'>Here we put checkboxes</div>)

    expect(screen.getByTestId('test')).toHaveTextContent(
      'Here we put checkboxes'
    )
  })

  describe('when the noRateLimit is false', () => {
    it('shows as required field', () => {
      const noRateLimit = false

      mockUseField.mockReturnValueOnce({ input: { value: noRateLimit } })

      arrangeTest()

      expect(
        screen.getByTestId(`field-${MAX_HOURLY_RATE_FIELD}`)
      ).toHaveAttribute('required')
    })
  })

  describe('when the noRateLimit is true', () => {
    it('shows as disabled field', () => {
      const noRateLimit = true

      mockUseField.mockReturnValueOnce({ input: { value: noRateLimit } })

      arrangeTest()

      expect(
        screen.getByTestId(`field-${MAX_HOURLY_RATE_FIELD}`)
      ).toHaveAttribute('disabled')
    })
  })

  describe('when the uncertainOfBudget is false', () => {
    it('shows as required field', () => {
      const noRateLimit = false
      const uncertainOfBudget = false

      mockUseField.mockReturnValueOnce({ input: { value: noRateLimit } })
      mockUseField.mockReturnValueOnce({ input: { value: uncertainOfBudget } })

      arrangeTest()

      expect(
        screen.getByTestId(`field-${MAX_HOURLY_RATE_FIELD}`)
      ).toHaveAttribute('required')
    })
  })

  describe('when the uncertainOfBudget is true', () => {
    it('shows as disabled field', () => {
      const noRateLimit = false
      const uncertainOfBudget = true

      mockUseField.mockReturnValueOnce({ input: { value: noRateLimit } })
      mockUseField.mockReturnValueOnce({ input: { value: uncertainOfBudget } })

      arrangeTest()

      expect(
        screen.getByTestId(`field-${MAX_HOURLY_RATE_FIELD}`)
      ).toHaveAttribute('disabled')
    })
  })
})
