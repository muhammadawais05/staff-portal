import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import fixtures from '@staff-portal/billing/src/_fixtures'

import PaymentListHeader from '.'

jest.mock('../../data/getPaymentListHeader.graphql.types')
jest.mock('@staff-portal/billing/src/utils/graphql')
jest.mock('@staff-portal/billing/src/components/InlineActionsSkeleton')
jest.mock('../CreatePaymentGroupButton')
jest.mock('../DownloadPayments')
jest.mock('../PayMultipleButton')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const render = (props: ComponentProps<typeof PaymentListHeader> = {}) =>
  renderComponent(<PaymentListHeader {...props} />)

describe('PaymentListHeader', () => {
  describe('for initial loading', () => {
    it('renders a skeleton', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: fixtures.MockGetPaymentListHeaderActions.payments,
        loading: true,
        initialLoading: true
      }))
      const { getByTestId } = render()

      expect(getByTestId('InlineActionsSkeleton')).toBeInTheDocument()
    })
  })

  describe('for subsequent loading', () => {
    it('renders a loader', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: fixtures.MockGetPaymentListHeaderActions.payments,
        loading: true,
        initialLoading: false
      }))
      const { getByTestId } = render()

      expect(getByTestId('LoaderOverlay')).toBeInTheDocument()
    })
  })

  describe('when data is loaded', () => {
    it('renders buttons with margin', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: fixtures.MockGetPaymentListHeaderActions.payments,
        loading: false,
        initialLoading: false
      }))
      const { getByTestId, getAllByTestId } = render()

      expect(getByTestId('PayMultipleButton')).toBeInTheDocument()
      expect(getByTestId('DownloadPayments')).toBeInTheDocument()
      expect(getByTestId('CreatePaymentGroupButton')).toBeInTheDocument()

      expect(getAllByTestId('InlineActionsWrapper-item')?.length).toBe(3)
    })
  })
})
