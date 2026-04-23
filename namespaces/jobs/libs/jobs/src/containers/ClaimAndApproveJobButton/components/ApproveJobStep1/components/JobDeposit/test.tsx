import React from 'react'
import { render } from '@testing-library/react'
import { useField } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'

import JobDeposit from './JobDeposit'

const DEPOSIT_FIELD_ID = 'deposit'
const CREATE_DEPOSIT_FIELD_ID = 'createDeposit'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    NumberInput: ({ name }: { name: string }) => <div data-testid={name} />,
    Checkbox: ({ name }: { name: string }) => <div data-testid={name} />
  },
  useField: jest.fn()
}))

const useFieldMock = useField as jest.Mock

const arrangeTest = (jobDepositCanBeIssued?: boolean | null) =>
  render(
    <TestWrapper>
      <JobDeposit jobDepositCanBeIssued={jobDepositCanBeIssued} />
    </TestWrapper>
  )

describe('JobDeposit', () => {
  beforeEach(() => {
    useFieldMock.mockReturnValue({ input: {} })
  })

  it('listens for `createDeposit` field changes', () => {
    arrangeTest()

    expect(useFieldMock).toHaveBeenCalledWith(CREATE_DEPOSIT_FIELD_ID)
  })

  describe('when `jobDepositCanBeIssued` is not present', () => {
    it('does not render fields', () => {
      const { queryByTestId } = arrangeTest()

      expect(queryByTestId(DEPOSIT_FIELD_ID)).not.toBeInTheDocument()
      expect(queryByTestId(CREATE_DEPOSIT_FIELD_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `jobDepositCanBeIssued` is present', () => {
    it('renders `createDeposit` field', () => {
      const { getByTestId } = arrangeTest(true)

      expect(getByTestId(CREATE_DEPOSIT_FIELD_ID)).toBeInTheDocument()
    })

    describe('when `createDeposit` is present', () => {
      it('renders `deposit` field', () => {
        useFieldMock.mockReturnValue({ input: { value: true } })
        const { getByTestId } = arrangeTest(true)

        expect(getByTestId(DEPOSIT_FIELD_ID)).toBeInTheDocument()
      })
    })

    describe('when `createDeposit` is not present', () => {
      it('does not render `deposit` field', () => {
        useFieldMock.mockReturnValue({ input: { value: false } })
        const { queryByTestId } = arrangeTest(true)

        expect(queryByTestId(DEPOSIT_FIELD_ID)).not.toBeInTheDocument()
      })
    })
  })
})
