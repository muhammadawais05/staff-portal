import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import PurchaseOrderLineDetailsTable from './PurchaseOrderLineDetailsTable'
import { useGetPurchaseOrderLineDetails } from '../../data'

jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('../PurchaseOrderLineDetailsTableContent')
jest.mock('../../data')
jest.mock('@staff-portal/billing/src/components/ContentLoader')

const purchaseOrder = fixtures.MockPurchaseOrders.nodes[0]
const purchaseOrderLineId = 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMw'
const mockedRefetch = jest.fn()

const render = (props: ComponentProps<typeof PurchaseOrderLineDetailsTable>) =>
  renderComponent(<PurchaseOrderLineDetailsTable {...props} />)
const useGetPurchaseOrderLineDetailsMock =
  useGetPurchaseOrderLineDetails as jest.Mock

describe('PurchaseOrderLineDetailsTable', () => {
  it('calls the proper helpers', () => {
    useGetPurchaseOrderLineDetailsMock.mockReturnValue({
      data: purchaseOrder,
      loading: false,
      refetch: mockedRefetch,
      initialLoading: false
    })

    const { queryByTestId } = render({
      purchaseOrderLineId
    })

    expect(useGetPurchaseOrderLineDetails).toHaveBeenCalledWith(
      'VjEtUHVyY2hhc2VPcmRlckxpbmUtMw'
    )

    expect(
      queryByTestId('PurchaseOrderLineDetailsTableContent')
    ).toBeInTheDocument()

    expect(useRefetch).toHaveBeenCalledWith(
      [
        { metaData: 'purchase-order-line:archive-toggle' },
        { metaData: 'purchase-order:update' }
      ],
      mockedRefetch
    )
  })

  describe('when loading is `false`', () => {
    it('pass the proper props to `ContentLoader`', () => {
      useGetPurchaseOrderLineDetailsMock.mockReturnValue({
        data: purchaseOrder,
        loading: false,
        refetch: mockedRefetch,
        initialLoading: false
      })
      const { getByTestId } = render({
        purchaseOrderLineId
      })

      expect(getByTestId('ContentLoader-loading')).toHaveTextContent('false')
    })
  })

  describe('when loading is `true`', () => {
    it('pass the proper props to `ContentLoader`', () => {
      useGetPurchaseOrderLineDetailsMock.mockReturnValue({
        data: purchaseOrder,
        loading: true,
        refetch: mockedRefetch,
        initialLoading: true
      })
      const { getByTestId } = render({
        purchaseOrderLineId
      })

      expect(getByTestId('ContentLoader-loading')).toHaveTextContent('true')
      expect(getByTestId('ContentLoader-showSkeleton')).toHaveTextContent(
        'true'
      )
    })
  })
})
