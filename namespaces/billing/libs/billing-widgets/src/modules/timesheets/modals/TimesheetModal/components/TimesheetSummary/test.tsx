import React, { ComponentProps } from 'react'
import { MinimumCommitmentInapplicableReasonEnum } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { BillingCycleItemFragment } from '../../../../../__fragments__/billingCycleItemFragment.graphql.types'
import TimesheetSummary from '.'

const render = (props: ComponentProps<typeof TimesheetSummary>) =>
  renderComponent(<TimesheetSummary {...props} />)

describe('TimesheetSummary', () => {
  it('default render', () => {
    const { container } = render({
      hours: 15,
      minutes: 30,
      timesheet: {
        ...(fixtures.MockBillingCycle as BillingCycleItemFragment),
        timesheetComment: 'Sample comment'
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('renders with minimum commitment', () => {
    const { queryByText, queryByTestId } = render({
      hours: 15,
      minutes: 30,
      timesheet: {
        ...(fixtures.MockBillingCycle as BillingCycleItemFragment),
        minimumCommitment: {
          minimumHours: 20,
          applicable: true
        },
        timesheetSubmitted: true
      }
    })

    expect(queryByText('Total Hours Submitted:')).toBeInTheDocument()
    expect(queryByTestId('totalHours')).toHaveTextContent('15 hrs 30 mins')
    expect(queryByText('Minimum Commitment Applied:')).toBeInTheDocument()
    expect(queryByTestId('minimumHours')).toHaveTextContent('20 hrs')
    expect(queryByText('Total Hours Charged:')).toBeInTheDocument()
    expect(queryByTestId('chargedHours')).toHaveTextContent('20 hrs')
  })

  it('renders with uncharged minimum commitment', () => {
    const { queryByText, queryByTestId } = render({
      hours: 15,
      minutes: 30,
      timesheet: {
        ...(fixtures.MockBillingCycle as BillingCycleItemFragment),
        minimumCommitment: {
          minimumHours: 10,
          applicable: true
        },
        timesheetSubmitted: true
      }
    })

    expect(queryByText('Total Hours Charged:')).toBeInTheDocument()
    expect(queryByText('Total Hours Submitted:')).not.toBeInTheDocument()
    expect(queryByTestId('totalHours')).toHaveTextContent('15 hrs 30 mins')
    expect(queryByText('Minimum Commitment Applied:')).not.toBeInTheDocument()
    expect(queryByTestId('minimumHours')).not.toBeInTheDocument()
    expect(queryByTestId('chargedHours')).not.toBeInTheDocument()
  })

  it('renders without minimum commitment', () => {
    const { queryByText, queryByTestId } = render({
      hours: 15,
      minutes: 30,
      timesheet: {
        ...(fixtures.MockBillingCycle as BillingCycleItemFragment),
        minimumCommitment: undefined,
        timesheetSubmitted: true
      }
    })

    expect(queryByText('Total Hours Charged:')).toBeInTheDocument()
    expect(queryByTestId('totalHours')).toHaveTextContent('15 hrs 30 mins')
    expect(queryByText('Minimum Commitment Applied:')).not.toBeInTheDocument()
    expect(queryByTestId('minimumHours')).not.toBeInTheDocument()
    expect(queryByTestId('chargedHours')).not.toBeInTheDocument()
  })

  it('renders with inapplicable minimum commitment', () => {
    const { queryByText, queryByTestId } = render({
      hours: 15,
      minutes: 30,
      timesheet: {
        ...(fixtures.MockBillingCycle as BillingCycleItemFragment),
        minimumCommitment: {
          minimumHours: 20,
          applicable: false,
          reasonNotApplicable:
            MinimumCommitmentInapplicableReasonEnum.NOT_FULL_LENGTH
        },
        timesheetSubmitted: true
      }
    })

    expect(queryByText('Total Hours Submitted:')).not.toBeInTheDocument()
    expect(queryByTestId('totalHours')).toHaveTextContent('15 hrs 30 mins')
    expect(queryByText('Minimum Commitment Applied:')).not.toBeInTheDocument()
    expect(queryByTestId('minimumHours')).not.toBeInTheDocument()
    expect(queryByText('Total Hours Charged:')).toBeInTheDocument()
    expect(queryByTestId('chargedHours')).not.toBeInTheDocument()
    expect(
      queryByText('Minimum commitment not applied due to short billing cycle.')
    ).toBeInTheDocument()
  })
})
