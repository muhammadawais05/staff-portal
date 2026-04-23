import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderDetailsTableContent from './PurchaseOrderDetailsTableContent'
import { useGetPurchaseOrderArchiveStateQuery } from '../../../../data/getPurchaseOrderArchiveState.graphql.types'

jest.mock('../../../../data/getPurchaseOrderArchiveState.graphql.types')

jest.mock('../utils', () => () => [{ label: 'a', value: 'b' }])

const purchaseOrder = fixtures.MockPurchaseOrders.nodes[0]

const render = (
  props: ComponentProps<typeof PurchaseOrderDetailsTableContent>
) => renderComponent(<PurchaseOrderDetailsTableContent {...props} />)

describe('PurchaseOrderDetailsTableContent', () => {
  it('renders component', () => {
    ;(useGetPurchaseOrderArchiveStateQuery as jest.Mock).mockReturnValue({
      data: {
        node: {
          archived: false
        }
      },
      loading: false
    })

    const { getByTestId } = render({
      purchaseOrder
    })

    expect(getByTestId('PurchaseOrderDetailsTable')).toBeInTheDocument()
    expect(getByTestId('PurchaseOrderDetailsTable-title')).toContainHTML(
      'Details'
    )
    expect(getByTestId('DetailedList')).toBeInTheDocument()
    expect(getByTestId('DetailedList-columns')).toContainHTML('2')
    expect(getByTestId('DetailedList-items')).toContainHTML('ab')
    expect(getByTestId('DetailedList-striped')).toContainHTML('true')
  })
})
