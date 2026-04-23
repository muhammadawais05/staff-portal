import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderLineJobsTable from '.'

jest.mock('../../../job/components/JobsList')

jest.mock('../../data', () => ({
  useGetPurchaseOrderLineJobs: jest.fn().mockReturnValueOnce({
    data: {},
    loading: false,
    initialLoading: false,
    refetch: jest.fn()
  })
}))

const render = () =>
  renderComponent(<PurchaseOrderLineJobsTable nodeId={'test'} />)

describe('PurchaseOrderLineJobsTable', () => {
  it('renders properly', () => {
    const { queryByTestId } = render()

    expect(queryByTestId('JobsList')).toBeInTheDocument()
  })
})
