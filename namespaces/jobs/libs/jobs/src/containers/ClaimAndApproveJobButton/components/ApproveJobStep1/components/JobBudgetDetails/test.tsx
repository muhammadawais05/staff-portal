import React from 'react'
import { render } from '@testing-library/react'
import { useForm, useFormState } from '@toptal/picasso-forms'

import JobBudgetDetails from './JobBudgetDetails'

const MAX_HOURLY_RATE_FIELD_ID = 'maxHourlyRate'
const NO_RATE_LIMIT_FIELD_ID = 'noRateLimit'
const UNCERTAIN_OF_BUDGET_FIELD_ID = 'uncertainOfBudget'
const UNCERTAIN_OF_BUDGET_REASON_FIELD_ID = 'uncertainOfBudgetReason'
const UNCERTAIN_OF_BUDGET_REASON_COMMENT_FIELD_ID =
  'uncertainOfBudgetReasonComment'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    Input: ({ name }: { name: string }) => <div data-testid={name} />,
    NumberInput: ({
      name,
      disabled,
      required
    }: {
      name: string
      disabled?: boolean
      required?: boolean
    }) => <input data-testid={name} disabled={disabled} required={required} />,
    Select: ({ name }: { name: string }) => <div data-testid={name} />,
    Checkbox: ({ name, disabled }: { name: string; disabled?: boolean }) => (
      <input data-testid={name} disabled={disabled} />
    )
  },
  useFormState: jest.fn(),
  useForm: jest.fn()
}))

const useFormStateMock = useFormState as jest.Mock
const useFormMock = useForm as jest.Mock

const arrangeTest = () =>
  render(<JobBudgetDetails jobUncertainOfBudgetReasons={[]} />)

describe('JobBudgetDetails', () => {
  beforeEach(() => {
    useFormMock.mockReturnValue({})
    useFormStateMock.mockReturnValue({ values: {} })
  })

  it('listens for form changes', () => {
    arrangeTest()

    expect(useFormMock).toHaveBeenCalled()
    expect(useFormStateMock).toHaveBeenCalledWith({
      subscription: { values: true }
    })
  })

  it('renders `maxHourlyRate` field', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(MAX_HOURLY_RATE_FIELD_ID)).toBeInTheDocument()
  })

  it('renders `noRateLimit` field', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(NO_RATE_LIMIT_FIELD_ID)).toBeInTheDocument()
  })

  it('renders `uncertainOfBudget` field', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(UNCERTAIN_OF_BUDGET_FIELD_ID)).toBeInTheDocument()
  })

  describe('when `noRateLimit` and `uncertainOfBudget` are not present', () => {
    beforeEach(() => {
      useFormStateMock.mockReturnValue({
        values: { noRateLimit: false, uncertainOfBudget: false }
      })
    })

    it('renders `maxHourlyRate` as not disabled and required', () => {
      const { getByTestId } = arrangeTest()

      expect(getByTestId(MAX_HOURLY_RATE_FIELD_ID)).toBeInTheDocument()
      expect(getByTestId(MAX_HOURLY_RATE_FIELD_ID)).toHaveAttribute('required')
      expect(getByTestId(MAX_HOURLY_RATE_FIELD_ID)).not.toHaveAttribute(
        'disabled'
      )
    })

    it('does not render `uncertainOfBudgetReason` field', () => {
      const { queryByTestId } = arrangeTest()

      expect(
        queryByTestId(UNCERTAIN_OF_BUDGET_REASON_FIELD_ID)
      ).not.toBeInTheDocument()
    })

    it('does not renders `uncertainOfBudgetReasonComment` field', () => {
      const { queryByTestId } = arrangeTest()

      expect(
        queryByTestId(UNCERTAIN_OF_BUDGET_REASON_COMMENT_FIELD_ID)
      ).not.toBeInTheDocument()
    })
  })

  describe('when `uncertainOfBudget` is present', () => {
    beforeEach(() => {
      useFormStateMock.mockReturnValue({ values: { uncertainOfBudget: true } })
    })

    it('renders `maxHourlyRate` as disabled and not required', () => {
      const { getByTestId } = arrangeTest()

      expect(getByTestId(MAX_HOURLY_RATE_FIELD_ID)).toBeInTheDocument()
      expect(getByTestId(MAX_HOURLY_RATE_FIELD_ID)).toHaveAttribute('disabled')
      expect(getByTestId(MAX_HOURLY_RATE_FIELD_ID)).not.toHaveAttribute(
        'required'
      )
    })

    it('renders `noRateLimit` as disabled', () => {
      const { getByTestId } = arrangeTest()

      expect(getByTestId(NO_RATE_LIMIT_FIELD_ID)).toBeInTheDocument()
      expect(getByTestId(NO_RATE_LIMIT_FIELD_ID)).toHaveAttribute('disabled')
    })

    it('renders `uncertainOfBudgetReason` field', () => {
      const { getByTestId } = arrangeTest()

      expect(
        getByTestId(UNCERTAIN_OF_BUDGET_REASON_FIELD_ID)
      ).toBeInTheDocument()
    })

    describe('when `uncertainOfBudgetReason` is `Other`', () => {
      beforeEach(() => {
        useFormStateMock.mockReturnValue({
          values: { uncertainOfBudget: true, uncertainOfBudgetReason: 'Other' }
        })
      })

      it('renders `uncertainOfBudgetReasonComment` field', () => {
        const { getByTestId } = arrangeTest()

        expect(
          getByTestId(UNCERTAIN_OF_BUDGET_REASON_COMMENT_FIELD_ID)
        ).toBeInTheDocument()
      })
    })

    describe('when `uncertainOfBudgetReason` is not `Other`', () => {
      beforeEach(() => {
        useFormStateMock.mockReturnValue({
          values: {
            noRateLimit: true,
            uncertainOfBudgetReason: 'Random reason'
          }
        })
      })

      it('does not render `uncertainOfBudgetReasonComment` field', () => {
        const { queryByTestId } = arrangeTest()

        expect(
          queryByTestId(UNCERTAIN_OF_BUDGET_REASON_COMMENT_FIELD_ID)
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('when `noRateLimit` is present', () => {
    beforeEach(() => {
      useFormStateMock.mockReturnValue({ values: { noRateLimit: true } })
    })

    it('renders `maxHourlyRate` as disabled and not required', () => {
      const { getByTestId } = arrangeTest()

      expect(getByTestId(MAX_HOURLY_RATE_FIELD_ID)).toBeInTheDocument()
      expect(getByTestId(MAX_HOURLY_RATE_FIELD_ID)).toHaveAttribute('disabled')
      expect(getByTestId(MAX_HOURLY_RATE_FIELD_ID)).not.toHaveAttribute(
        'required'
      )
    })

    it('renders `uncertainOfBudget` as disabled', () => {
      const { getByTestId } = arrangeTest()

      expect(getByTestId(UNCERTAIN_OF_BUDGET_FIELD_ID)).toBeInTheDocument()
      expect(getByTestId(UNCERTAIN_OF_BUDGET_FIELD_ID)).toHaveAttribute(
        'disabled'
      )
    })

    it('does not render `uncertainOfBudgetReason` field', () => {
      const { queryByTestId } = arrangeTest()

      expect(
        queryByTestId(UNCERTAIN_OF_BUDGET_REASON_FIELD_ID)
      ).not.toBeInTheDocument()
    })

    it('does not renders `uncertainOfBudgetReasonComment` field', () => {
      const { queryByTestId } = arrangeTest()

      expect(
        queryByTestId(UNCERTAIN_OF_BUDGET_REASON_COMMENT_FIELD_ID)
      ).not.toBeInTheDocument()
    })
  })
})
