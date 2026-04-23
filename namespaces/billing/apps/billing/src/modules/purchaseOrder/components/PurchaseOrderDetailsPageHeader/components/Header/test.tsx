import React from 'react'
import { pick } from 'lodash-es'
import { waitFor, fireEvent } from '@toptal/picasso/test-utils'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderDetailsPageHeader from '.'
import { useGetPurchaseOrderArchiveStateQuery } from '../../../../data/getPurchaseOrderArchiveState.graphql.types'
import { useActionsPurchaseOrder } from '../../../../utils/useActionsPurchaseOrder'

const MockPurchaseOrderArchiveStatus = pick(
  fixtures.MockPurchaseOrders.nodes[0],
  [
    'id',
    'archived',
    'operations.archivePurchaseOrder',
    'operations.unarchivePurchaseOrder'
  ]
)

jest.mock('../../../../data/getPurchaseOrderArchiveState.graphql.types')
jest.mock('../../../../utils/useActionsPurchaseOrder', () => ({
  useActionsPurchaseOrder: jest.fn().mockImplementation(() => ({
    handleOnArchivePurchaseOrder: jest.fn()
  }))
}))
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const render = (poLinesEnabled = false) =>
  renderComponent(
    <PurchaseOrderDetailsPageHeader
      purchaseOrderId={MockPurchaseOrderArchiveStatus.id || ''}
      poLinesEnabled={poLinesEnabled}
    />
  )

const mockUseGetPurchaseOrderArchiveStateQuery =
  useGetPurchaseOrderArchiveStateQuery as jest.Mock

describe('PurchaseOrderDetailsPageHeader', () => {
  describe('when data is loaded', () => {
    describe('when purchase order is not archived', () => {
      it('renders Archive button', () => {
        mockUseGetPurchaseOrderArchiveStateQuery.mockReturnValue({
          data: {
            node: {
              ...MockPurchaseOrderArchiveStatus,
              archived: false
            }
          },
          loading: false
        })
        const { getByTestId } = render()
        const button = getByTestId('archive-purchase-order')

        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('Archive')
      })
    })

    describe('when purchase order is archived', () => {
      it('renders Unarchive button', () => {
        mockUseGetPurchaseOrderArchiveStateQuery.mockReturnValue({
          data: {
            node: {
              ...MockPurchaseOrderArchiveStatus,
              archived: true
            }
          },
          loading: false
        })
        const { getByTestId } = render()
        const button = getByTestId('archive-purchase-order')

        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('Unarchive')
      })
    })

    describe('when Archive button is clicked', () => {
      it('calls click handler with appropriate arguments', async () => {
        const archived = true

        mockUseGetPurchaseOrderArchiveStateQuery.mockReturnValue({
          data: {
            node: {
              ...MockPurchaseOrderArchiveStatus,
              archived
            }
          },
          loading: false
        })
        const handleOnArchivePurchaseOrderMock = jest.fn()

        ;(useActionsPurchaseOrder as jest.Mock).mockImplementation(() => ({
          handleOnArchivePurchaseOrder: handleOnArchivePurchaseOrderMock
        }))

        const { getByTestId } = render()

        await waitFor(() => {
          fireEvent.click(getByTestId('archive-purchase-order'))

          expect(handleOnArchivePurchaseOrderMock).toHaveBeenCalledWith(
            MockPurchaseOrderArchiveStatus.id,
            archived
          )
        })
      })
    })
  })

  describe('when it is an initial data load', () => {
    it('renders a skeleton loader', () => {
      mockUseGetPurchaseOrderArchiveStateQuery.mockReturnValue({
        data: undefined,
        initialLoading: true,
        loading: true
      })

      const { getByTestId } = render()

      expect(getByTestId('SkeletonLoader.Button')).toBeInTheDocument()
    })
  })

  describe('when it is a subsequent data load', () => {
    it('renders a loader over a disabled button', () => {
      mockUseGetPurchaseOrderArchiveStateQuery.mockReturnValue({
        data: {
          node: MockPurchaseOrderArchiveStatus
        },
        loading: true,
        initialLoading: false
      })

      const { getByTestId } = render()

      expect(getByTestId('archive-purchase-order')).toBeInTheDocument()
      expect(getByTestId('archive-purchase-order')).toHaveAttribute(
        'aria-disabled',
        'true'
      )
    })
  })

  describe('edit purchase order', () => {
    it('is visible when po lines experiment is enabled', () => {
      const { queryByTestId } = render(true)

      expect(queryByTestId('edit-purchase-order')).toBeInTheDocument()
    })

    it('is hidden when po lines experiment is disabled', () => {
      const { queryByTestId } = render()

      expect(queryByTestId('edit-purchase-order')).not.toBeInTheDocument()
    })
  })
})
