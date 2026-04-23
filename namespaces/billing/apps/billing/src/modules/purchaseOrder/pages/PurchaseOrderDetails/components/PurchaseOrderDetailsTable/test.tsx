import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import PurchaseOrderDetailsTable from './PurchaseOrderDetailsTable'
import { useGetPurchaseOrderDetails } from '../../data'

jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('../PurchaseOrderDetailsTableContent')
jest.mock('../../data')
jest.mock('@staff-portal/billing/src/components/ContentLoader')

const purchaseOrder = fixtures.MockPurchaseOrders.nodes[0]
const purchaseOrderId = purchaseOrder.id
const mockedRefetch = jest.fn()

const render = (props: ComponentProps<typeof PurchaseOrderDetailsTable>) =>
  renderComponent(<PurchaseOrderDetailsTable {...props} />)
const useGetPurchaseOrderDetailsMock = useGetPurchaseOrderDetails as jest.Mock

describe('PurchaseOrderDetailsTable', () => {
  it('calls the proper helpers', () => {
    useGetPurchaseOrderDetailsMock.mockReturnValue({
      data: purchaseOrder,
      loading: false,
      refetch: mockedRefetch,
      initialLoading: false
    })

    const { queryByTestId } = render({
      purchaseOrderId,
      poLinesEnabled: false
    })

    expect(useGetPurchaseOrderDetails).toHaveBeenCalledWith(
      'VjEtUHVyY2hhc2VPcmRlci0xNzIy'
    )

    expect(
      queryByTestId('PurchaseOrderDetailsTableContent')
    ).toBeInTheDocument()

    expect(useRefetch).toHaveBeenCalledWith(
      [
        { metaData: 'purchase-order:archive-toggle' },
        { metaData: 'purchase-order:update' }
      ],
      mockedRefetch
    )
  })

  describe('when loading is `false`', () => {
    it('pass the proper props to `ContentLoader`', () => {
      useGetPurchaseOrderDetailsMock.mockReturnValue({
        data: purchaseOrder,
        loading: false,
        refetch: mockedRefetch,
        initialLoading: false
      })
      const { getByTestId } = render({
        purchaseOrderId,
        poLinesEnabled: false
      })

      expect(getByTestId('ContentLoader-loading')).toHaveTextContent('false')
    })
  })

  describe('when loading is `true`', () => {
    it('pass the proper props to `ContentLoader`', () => {
      useGetPurchaseOrderDetailsMock.mockReturnValue({
        data: purchaseOrder,
        loading: true,
        refetch: mockedRefetch,
        initialLoading: true
      })
      const { getByTestId } = render({
        purchaseOrderId,
        poLinesEnabled: false
      })

      expect(getByTestId('PurchaseOrderDetailsTableContent')).toHaveTextContent(
        '{"purchaseOrderId":"VjEtUHVyY2hhc2VPcmRlci0xNzIy"}'
      )
      expect(getByTestId('ContentLoader-loading')).toHaveTextContent('true')
      expect(getByTestId('ContentLoader-showSkeleton')).toHaveTextContent(
        'true'
      )
    })
  })
})
