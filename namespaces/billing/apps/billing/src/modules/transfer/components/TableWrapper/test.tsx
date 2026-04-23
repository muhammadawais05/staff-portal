import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { useGetTransfers } from '../../data'
import TransfersPage from '.'

jest.mock('../Table')
jest.mock('@staff-portal/billing/src/components/TableSkeleton')
jest.mock('../../data')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const render = (props: ComponentProps<typeof TransfersPage>) =>
  renderComponent(<TransfersPage {...props} />)

describe('TransfersPage', () => {
  describe('when transfers defined', () => {
    it('renders loading state', () => {
      ;(useGetTransfers as jest.Mock).mockReturnValue({
        data: { transfers: fixtures.MockTransfers },
        loading: false,
        initialLoading: false
      })
      const { getByTestId, queryByText } = render({
        nodeId: 'abc123'
      })

      expect(getByTestId('payments-section-title')).toContainHTML('Payments')
      expect(getByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
      expect(getByTestId('Table')).toBeInTheDocument()
      expect(queryByText('There are no payments yet.')).not.toBeInTheDocument()
    })
  })

  describe('when transfers undefined', () => {
    it('renders skeletonLoader', () => {
      ;(useGetTransfers as jest.Mock).mockReturnValue({
        data: undefined,
        loading: false,
        initialLoading: true
      })
      const { getByTestId, queryByText } = render({
        nodeId: 'abc123'
      })

      expect(getByTestId('payments-section-title')).toContainHTML('Payments')
      expect(getByTestId('TableSkeleton')).toBeInTheDocument()
      expect(queryByText('There are no payments yet.')).not.toBeInTheDocument()
    })
  })

  describe('when transfers `[]`', () => {
    it('renders empty state', () => {
      ;(useGetTransfers as jest.Mock).mockReturnValue({
        data: { transfers: { nodes: [] } },
        loading: false,
        initialLoading: false
      })
      const { getByText, getByTestId } = render({
        nodeId: 'abc123'
      })

      expect(getByTestId('payments-section-title')).toContainHTML('Payments')
      expect(getByText('There are no payments yet.')).toBeInTheDocument()
    })
  })
})
