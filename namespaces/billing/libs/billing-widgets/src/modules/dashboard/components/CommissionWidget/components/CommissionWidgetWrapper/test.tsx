import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CommissionWidgetWrapper from '.'
import { useGetDashboardCommissionWidgetQuery } from '../../data/getDashboardCommissionWidget.graphql.types'

jest.mock('../../data/getDashboardCommissionWidget.graphql.types')
jest.mock('../CommissionWidgetContent')
jest.mock('../../../../../commercialDocument/components/Skeleton', () => ({
  DashboardItem: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid='SkeletonLoader'>{children}</div>
    ))
}))

const render = () => renderComponent(<CommissionWidgetWrapper />)

describe('CommissionWidgetWrapper', () => {
  describe('when loading `true`', () => {
    it('renders Components', () => {
      ;(useGetDashboardCommissionWidgetQuery as jest.Mock).mockReturnValue({
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
      ;(useGetDashboardCommissionWidgetQuery as jest.Mock).mockReturnValue({
        data: { a: 'a' },
        loading: false,
        initialLoading: false
      })
      const { getByTestId } = render()

      expect(getByTestId('CommissionWidgetContent')).toBeInTheDocument()
    })
  })

  describe('when initialLoading `true`', () => {
    it('renders Components', () => {
      ;(useGetDashboardCommissionWidgetQuery as jest.Mock).mockReturnValue({
        data: null,
        loading: false,
        initialLoading: true
      })
      const { getByTestId } = render()

      expect(getByTestId('SkeletonLoader')).toBeInTheDocument()
    })
  })
})
