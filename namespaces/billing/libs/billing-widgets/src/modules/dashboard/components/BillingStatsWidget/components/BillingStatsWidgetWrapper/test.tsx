import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingStatsWidgetWrapper from '.'
import { useGetBillingStatsWidgetQuery } from '../../data/getBillingStatsWidget.graphql.types'

jest.mock('../../data/getBillingStatsWidget.graphql.types')
jest.mock('../BillingStatsWidgetContent')
jest.mock('../../../../../commercialDocument/components/Skeleton', () => ({
  BillingStatsWidgetDashboard: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid='SkeletonLoader'>{children}</div>
    ))
}))

const render = () => renderComponent(<BillingStatsWidgetWrapper />)

describe('BillingStatsWidgetWrapper', () => {
  describe('when loading `true`', () => {
    it('renders Components', () => {
      ;(useGetBillingStatsWidgetQuery as jest.Mock).mockReturnValue({
        data: null,
        loading: true,
        initialLoading: false
      })
      const { getByTestId } = render()

      expect(getByTestId('SkeletonLoader')).toBeInTheDocument()
    })
  })

  describe('when loading `false`', () => {
    it('renders Components', () => {
      ;(useGetBillingStatsWidgetQuery as jest.Mock).mockReturnValue({
        data: { a: 'a' },
        loading: false,
        initialLoading: false
      })
      const { getByTestId } = render()

      expect(getByTestId('BillingStatsWidgetContent')).toBeInTheDocument()
    })
  })

  describe('when initialLoading `true`', () => {
    it('renders Components', () => {
      ;(useGetBillingStatsWidgetQuery as jest.Mock).mockReturnValue({
        data: null,
        loading: false,
        initialLoading: true
      })
      const { getByTestId } = render()

      expect(getByTestId('SkeletonLoader')).toBeInTheDocument()
    })
  })
})
