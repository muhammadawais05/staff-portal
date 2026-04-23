import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import { useGetPurchaseOrderLinesDetails } from '../../../../data'
import PurchaseOrderLinesTable from './PurchaseOrderLinesTable'

jest.mock('@staff-portal/billing/src/components/ContentLoader')
jest.mock('../../../../data')

const purchaseOrder = fixtures.MockPurchaseOrders.nodes[0]
const purchaseOrderId = purchaseOrder.id

const useGetPurchaseOrderLinesDetailsMock =
  useGetPurchaseOrderLinesDetails as jest.Mock
const render = (props: ComponentProps<typeof PurchaseOrderLinesTable>) =>
  renderComponent(<PurchaseOrderLinesTable {...props} />)

describe('PurchaseOrderLinesTable', () => {
  describe('When po lines is empty', () => {
    it('renders empty section', () => {
      const { queryByTestId } = render({
        purchaseOrderId
      })

      expect(queryByTestId('PurchaseOrderLinesTable-empty')).toBeInTheDocument()
    })
  })

  describe('When po lines exist', () => {
    it('renders PO lines table', () => {
      useGetPurchaseOrderLinesDetailsMock.mockReturnValue({
        data: {
          purchaseOrderLines: {
            nodes: [
              { id: 1, totalAmount: '100.0' },
              { id: 2, archived: true }
            ]
          }
        },
        loading: false,
        initialLoading: false,
        refetch: jest.fn()
      })
      const { queryByTestId, queryAllByTestId } = render({
        purchaseOrderId
      })

      expect(
        queryByTestId('PurchaseOrderLinesTable-empty')
      ).not.toBeInTheDocument()

      expect(queryByTestId('archived')).toBeInTheDocument()
      expect(queryAllByTestId('total-amount')[0]).toHaveTextContent('$100.00')
    })

    describe.each([
      ['when amount is null', null, EMPTY_DATA],
      ['when amount is undefined', undefined, EMPTY_DATA],
      ['when amount is 0', 0, '$0.00'],
      ['when amount is 0', '0', '$0.00']
    ])('%s', (_, totalAmount, expected) => {
      it(`renders ${expected}`, () => {
        useGetPurchaseOrderLinesDetailsMock.mockReturnValue({
          data: {
            purchaseOrderLines: {
              nodes: [{ id: 1, totalAmount }]
            }
          },
          loading: false,
          initialLoading: false,
          refetch: jest.fn()
        })
        const { queryByTestId } = render({
          purchaseOrderId
        })

        expect(queryByTestId('total-amount')).toHaveTextContent(expected)
      })
    })
    describe('when amount is nill', () => {
      it('renders EMPTY_DATA', () => {
        useGetPurchaseOrderLinesDetailsMock.mockReturnValue({
          data: {
            purchaseOrderLines: {
              nodes: [{ id: 1, totalAmount: undefined }]
            }
          },
          loading: false,
          initialLoading: false,
          refetch: jest.fn()
        })
        const { queryByTestId } = render({
          purchaseOrderId
        })

        expect(queryByTestId('total-amount')).toHaveTextContent(EMPTY_DATA)
      })
    })
  })
})
