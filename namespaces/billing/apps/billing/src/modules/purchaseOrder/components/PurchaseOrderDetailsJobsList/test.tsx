import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import PurchaseOrderDetailsJobsList from '.'
import { useGetJobListQuery } from './data'

jest.mock('./data')
jest.mock('../../../job/components/JobsList')

const render = () =>
  renderComponent(
    <PurchaseOrderDetailsJobsList
      purchaseOrderId={fixtures.MockPurchaseOrders.nodes[0].id}
    />
  )

describe('PurchaseOrderDetailsJobsList', () => {
  it('default render', () => {
    ;(useGetJobListQuery as jest.Mock).mockReturnValue({
      data: null,
      error: undefined
    })
    const { getByTestId } = render()

    expect(getByTestId('JobsList').innerHTML).toBe('{"jobs":[]}')
  })
})
