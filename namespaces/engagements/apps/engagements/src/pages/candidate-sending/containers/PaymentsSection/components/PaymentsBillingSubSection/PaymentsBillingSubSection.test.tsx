import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import { useField } from '@toptal/picasso-forms'
import { BillCycle } from '@staff-portal/graphql/staff'

import PaymentsBillingSubSection, { Props } from './PaymentsBillingSubSection'

const useFieldMock = useField as jest.Mock

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useField: jest.fn()
}))

jest.mock('./components', () => ({
  ClientNetTermsItem: () => <div data-testid='client-net-terms-item' />,
  BillCycleItem: () => <div data-testid='bill-cycle-item' />,
  BillDayItem: () => <div data-testid='bill-day-item' />,
  CommitmentCreateHoursItem: () => (
    <div data-testid='commitment-create-hours-item' />
  ),
  StartDateItem: () => <div data-testid='start-date-item' />,
  TimeZoneNameItem: () => <div data-testid='time-zone-name-item' />,
  BillCycleConfirmationItem: () => (
    <div data-testid='bill-cycle-confirmation-item' />
  )
}))

const renderComponent = (props?: Props) =>
  render(
    <TestWrapper>
      <PaymentsBillingSubSection talentType='developer' {...props} />
    </TestWrapper>
  )

describe('PaymentsBillingSubSection', () => {
  it('renders sub section', () => {
    useFieldMock.mockReturnValue({ input: {} })

    renderComponent()

    expect(screen.getByTestId('client-net-terms-item')).toBeInTheDocument()
    expect(screen.getByTestId('bill-cycle-item')).toBeInTheDocument()
    expect(screen.getByTestId('bill-day-item')).toBeInTheDocument()
    expect(
      screen.getByTestId('commitment-create-hours-item')
    ).toBeInTheDocument()
    expect(screen.getByTestId('start-date-item')).toBeInTheDocument()
    expect(screen.getByTestId('time-zone-name-item')).toBeInTheDocument()
    expect(screen.getByTestId('client-net-terms-item')).toBeInTheDocument()
    expect(
      screen.getByTestId('bill-cycle-confirmation-item')
    ).toBeInTheDocument()
  })

  describe('when `semiMonthlyBilling` is truthy & is not monthly cycle', () => {
    it('renders semi monthly message', () => {
      useFieldMock.mockReturnValue({ input: { value: BillCycle.BI_WEEKLY } })

      renderComponent({ semiMonthlyBilling: true } as Props)

      expect(
        screen.getByText(
          'Semi-monthly billing was set to required in the Job Description.'
        )
      ).toBeInTheDocument()
    })
  })
})
