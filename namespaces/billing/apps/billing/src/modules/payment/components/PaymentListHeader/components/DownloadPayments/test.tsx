import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import DownloadPayments from '.'

const mockData = fixtures.MockGetPaymentListHeaderActions.payments

jest.mock('../../data/downloadPaymentsFromSearch.graphql.types', () => ({
  useDownloadPaymentsFromSearchMutation: () => [jest.fn()]
}))

const render = (props: ComponentProps<typeof DownloadPayments>) =>
  renderComponent(<DownloadPayments {...props} />)

describe('DownloadPayments', () => {
  describe('when operation is missing', () => {
    it('does not render the button at all', () => {
      const { queryByTestId } = render({
        operation: undefined
      })
      const button = queryByTestId('DownloadPayments')

      expect(button).toBeNull()
    })
  })

  describe('when the operation is Enabled', () => {
    it('renders the DownloadPayments button with proper details', () => {
      const { getByTestId } = render({
        operation: mockData.operations.downloadPaymentsFromSearch,
        totalCount: mockData.totalCount,
        alreadyDownloadedCount: mockData.alreadyDownloadedCount
      })

      const button = getByTestId('DownloadPayments')

      expect(button).toBeEnabled()
      expect(button).toContainHTML('Download Payments')
    })
  })

  describe('when the operation is Disabled', () => {
    it('renders the Pay button as disabled', () => {
      const { getByTestId } = render({
        operation: {
          ...mockData.operations.downloadPaymentsFromSearch,
          callable: OperationCallableTypes.DISABLED
        },
        totalCount: mockData.totalCount,
        alreadyDownloadedCount: mockData.alreadyDownloadedCount
      })

      const button = getByTestId('DownloadPayments')

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('when the operation is Hidden', () => {
    it('does not render the button at all', () => {
      const { queryByTestId } = render({
        operation: {
          ...mockData.operations.downloadPaymentsFromSearch,
          callable: OperationCallableTypes.HIDDEN
        },
        totalCount: mockData.totalCount,
        alreadyDownloadedCount: mockData.alreadyDownloadedCount
      })

      const button = queryByTestId('DownloadPayments')

      expect(button).toBeNull()
    })
  })
})
