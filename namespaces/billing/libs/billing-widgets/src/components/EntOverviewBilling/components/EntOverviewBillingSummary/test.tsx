import { cleanup } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { myBilling as mockData } from '@staff-portal/billing/src/_fixtures/graphql/entOverview/overview'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EntOverviewBillingSummary from './EntOverviewBillingSummary'

jest.mock('../EntOverviewBillingSummaryPeriod')

const render = (props: ComponentProps<typeof EntOverviewBillingSummary>) =>
  renderComponent(<EntOverviewBillingSummary {...props} />)

describe('EntOverviewBillingSummary', () => {
  afterEach(cleanup)

  it('default render', () => {
    const { queryByTestId, queryAllByTestId } = render({
      summary: mockData('2020-01-01').overview.invoicesOverview
    })

    const amountItems = queryAllByTestId('EntOverviewBillingSummaryItem-amount')

    expect(amountItems[0]).toContainHTML('$0.00')
    expect(amountItems[1]).toContainHTML('$0.00')
    expect(amountItems[2]).toContainHTML('$1,128,988.25')
    expect(amountItems[3]).toContainHTML('$315,715.00')
    expect(amountItems).toHaveLength(4)
    expect(queryByTestId('EntOverviewBillingSummary')).toBeInTheDocument()
  })

  it('Without data', () => {
    const { queryByTestId } = render({
      summary: {
        draft: '0',
        inCollections: '0',
        pendingReceipt: '0',
        writtenOff: '0',
        credited: '0',
        disputed: '0',
        outstanding: '0',
        overdue: '0',
        paid: '0'
      }
    })

    expect(queryByTestId('EntOverviewBillingSummary')).not.toBeInTheDocument()
  })
})
