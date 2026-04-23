import React from 'react'
import { waitFor, fireEvent } from '@toptal/picasso/test-utils'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderLineDetailsPageHeader from '.'
import { useGetPurchaseOrderLineArchiveStateQuery } from '../../data/getPurchaseOrderLineArchiveState.graphql.types'
import { useActionsPurchaseOrderLine } from '../../utils/useActionsPurchaseOrderLine'

const MockPurchaseOrderLineArchiveStatus = {
  id: '123',
  archived: true,
  operations: {
    archivePurchaseOrderLine: {
      callable: 'ENABLED'
    },
    unarchivePurchaseOrderLine: {
      callable: 'ENABLED'
    }
  }
}

jest.mock('../../data/getPurchaseOrderLineArchiveState.graphql.types')
jest.mock('../../utils/useActionsPurchaseOrderLine', () => ({
  useActionsPurchaseOrderLine: jest.fn().mockReturnValue({
    handleOnArchivePurchaseOrderLine: jest.fn()
  })
}))
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const render = () =>
  renderComponent(
    <PurchaseOrderLineDetailsPageHeader
      purchaseOrderLineId={MockPurchaseOrderLineArchiveStatus.id || ''}
    />
  )

const mockArchiveQuery = useGetPurchaseOrderLineArchiveStateQuery as jest.Mock
const mockActions = useActionsPurchaseOrderLine as jest.Mock

describe('PurchaseOrderLineDetailsPageHeader', () => {
  describe('when data is loaded', () => {
    describe('when purchase order line is not archived', () => {
      it('renders Archive button', () => {
        mockArchiveQuery.mockReturnValue({
          data: {
            node: {
              ...MockPurchaseOrderLineArchiveStatus,
              archived: false
            }
          },
          loading: false
        })
        const { getByTestId } = render()
        const button = getByTestId('archive-purchase-order-line')

        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('Archive')
      })
    })

    describe('when purchase order line is archived', () => {
      it('renders Unarchive button', () => {
        mockArchiveQuery.mockReturnValue({
          data: {
            node: MockPurchaseOrderLineArchiveStatus
          },
          loading: false
        })
        const { getByTestId } = render()
        const button = getByTestId('archive-purchase-order-line')

        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('Unarchive')
      })
    })

    describe('when Archive button is clicked', () => {
      it('calls click handler with appropriate arguments', async () => {
        const archived = true

        mockArchiveQuery.mockReturnValue({
          data: {
            node: MockPurchaseOrderLineArchiveStatus
          },
          loading: false
        })
        const handleOnArchivePurchaseOrderLineMock = jest.fn()

        mockActions.mockReturnValue({
          handleOnArchivePurchaseOrderLine: handleOnArchivePurchaseOrderLineMock
        })

        const { getByTestId } = render()

        await waitFor(() => {
          fireEvent.click(getByTestId('archive-purchase-order-line'))

          expect(handleOnArchivePurchaseOrderLineMock).toHaveBeenCalledWith(
            MockPurchaseOrderLineArchiveStatus.id,
            archived
          )
        })
      })
    })
  })

  describe('when it is an initial data load', () => {
    it('renders a skeleton loader', () => {
      mockArchiveQuery.mockReturnValue({
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
      mockArchiveQuery.mockReturnValue({
        data: {
          node: MockPurchaseOrderLineArchiveStatus
        },
        loading: true,
        initialLoading: false
      })

      const { getByTestId } = render()

      expect(getByTestId('archive-purchase-order-line')).toBeInTheDocument()
      expect(getByTestId('archive-purchase-order-line')).toHaveAttribute(
        'aria-disabled',
        'true'
      )
    })
  })
})
