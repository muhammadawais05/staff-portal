import React, { ComponentProps, ReactNode } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CommitmentCell from '.'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof CommitmentCell>
) => renderComponent(<CommitmentCell {...props}>{children}</CommitmentCell>)

describe('CommitmentCell', () => {
  it('billing cycle with no commitment change', () => {
    const { queryByTestId } = render(null, {
      actualCommitment: fixtures.MockBillingCycleWithDocs.actualCommitment,
      originalCommitment: fixtures.MockBillingCycleWithDocs.originalCommitment
    })

    expect(queryByTestId('Tooltip-content')).toBeNull()
    expect(queryByTestId('BillingCycleTableRowCommitment')).toContainHTML(
      'Full-time'
    )
  })

  it('billing cycle with commitment change', () => {
    const { queryByTestId } = render(null, {
      actualCommitment: {
        ...fixtures.MockBillingCycleWithDocs.originalCommitment,
        availability: 'part_time',
        availabilityHours: 26,
        companyRate: '4470.0',
        startDate: '2019-07-03',
        talentRate: '3210.0'
      },
      originalCommitment: fixtures.MockBillingCycleWithDocs.originalCommitment
    })

    expect(queryByTestId('BillingCycleTableRowCommitment')).toContainHTML(
      'Part-time'
    )

    const tooltipContent = queryByTestId('Tooltip-content')

    expect(tooltipContent).toContainHTML('Company rate changed from ')
    expect(tooltipContent).toContainHTML(
      'Availability changed from Full Time to Part Time'
    )
    expect(queryByTestId('ExclamationIcon')).toBeInTheDocument()
  })

  it('billing cycle with commitment change (availability & hours only)', () => {
    const { queryByTestId } = render(null, {
      actualCommitment: {
        ...fixtures.MockBillingCycleWithDocs.originalCommitment,
        availability: 'part_time',
        availabilityHours: 26,
        startDate: '2019-07-03'
      },
      originalCommitment: fixtures.MockBillingCycleWithDocs.originalCommitment
    })

    const tooltipContent = queryByTestId('Tooltip-content')

    expect(tooltipContent).toContainHTML(
      'Availability hours changed from 40 to 26'
    )
    expect(tooltipContent).toContainHTML('Commitment change on Jul 3, 2019')
  })

  it('billing cycle with commitment change (rates only)', () => {
    const { queryByTestId } = render(null, {
      actualCommitment: {
        ...fixtures.MockBillingCycleWithDocs.originalCommitment,
        companyRate: '4470.0',
        startDate: '2019-07-03',
        talentRate: '3210.0'
      },
      originalCommitment: fixtures.MockBillingCycleWithDocs.originalCommitment
    })

    const tooltipContent = queryByTestId('Tooltip-content')

    expect(tooltipContent).toContainHTML('Company rate changed from')
    expect(tooltipContent).toContainHTML('$4,470.00')
    expect(tooltipContent).toContainHTML('Talent rate changed from')
    expect(tooltipContent).toContainHTML('$3,210.00')
  })
})
