import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import fixtures from '@staff-portal/billing/src/_fixtures'

import PaymentGroupListHeader from '.'

jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('@staff-portal/billing/src/utils/graphql')
jest.mock('@staff-portal/billing/src/components/InlineActionsSkeleton')
jest.mock('../../data/getPaymentGroupListHeader.graphql.types')
jest.mock('../PayMultipleButton')

const render = (props: ComponentProps<typeof PaymentGroupListHeader> = {}) =>
  renderComponent(<PaymentGroupListHeader {...props} />)

describe('PaymentGroupListHeader', () => {
  describe('for initial loading', () => {
    it('renders a skeleton', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: fixtures.MockGetPaymentGroupListHeaderActions.paymentGroups,
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
        data: fixtures.MockGetPaymentGroupListHeaderActions.paymentGroups,
        loading: true,
        initialLoading: false
      }))
      const { getByTestId } = render()

      expect(getByTestId('LoaderOverlay')).toBeInTheDocument()
    })
  })

  describe('when data is loaded', () => {
    it('renders buttons', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: fixtures.MockGetPaymentGroupListHeaderActions.paymentGroups,
        loading: false,
        initialLoading: false
      }))
      const { getByTestId } = render()

      expect(getByTestId('PayMultipleButton')).toBeInTheDocument()
    })
  })
})
