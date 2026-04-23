import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetUnsubmitModalForm from '.'

const render = (props: ComponentProps<typeof TimesheetUnsubmitModalForm>) =>
  renderComponent(<TimesheetUnsubmitModalForm {...props} />)

const commonProps = {
  billingCycle: fixtures.MockBillingCyclesWithTimesheet[0],
  initialValues: {
    billingCycleId: fixtures.MockBillingCyclesWithTimesheet[0].gid,
    comment: ''
  },
  handleOnSubmit: jest.fn()
}

describe('TimesheetUnsubmitModalForm', () => {
  it('renders Components', () => {
    const { getByTestId } = render(commonProps)

    expect(getByTestId('TimesheetModalTitle-header')).toHaveTextContent(
      'Unsubmit timesheet (Apr 22, 2019 - May 5, 2019)'
    )
    expect(getByTestId('TimesheetStatus')).toHaveTextContent('(Not submitted)')
    expect(getByTestId('comment')).toBeInTheDocument()
    expect(getByTestId('ModalFooter')).toBeInTheDocument()
    expect(getByTestId('cancel')).toHaveTextContent('Close')
    expect(getByTestId('submit')).toHaveTextContent('Unsubmit')
  })
  it('renders a different message depending on timesheetExtraHours', () => {
    const { getByRole } = render(commonProps)

    expect(getByRole('alert')).toHaveTextContent(
      'When you remove this timesheet, all related invoices, payments, and commissions will be sent to the Finance team for review and updated accordingly upon timesheet re-submission.'
    )

    const { container } = render({
      ...commonProps,
      billingCycle: {
        ...commonProps.billingCycle,
        timesheetExtraHours: true
      }
    })

    expect(container).toHaveTextContent(
      'When you remove this timesheet, all related invoices, payments, and commissions will be sent to the Finance team for review and updated accordingly.'
    )
  })
})
