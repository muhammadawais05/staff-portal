import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import DetailsHeader from '../../../../commercialDocument/components/DetailsHeader'
import PaymentDetailsPageHeader from '.'
import { useGetPaymentDetailsHeader } from '../data'

jest.mock('../data')
jest.mock('@staff-portal/billing/src/components/Actions')
jest.mock('../../../../commercialDocument/components/DetailsHeader')
jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals', () => ({
  useModals: () => ({
    handleOnOpenModalWithUrlSearch: jest.fn()
  })
}))
jest.mock('@staff-portal/billing/src/components/InlineActionsSkeleton')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const render = () =>
  renderComponent(
    <PaymentDetailsPageHeader paymentId={fixtures.MockPayment.id} />
  )

const DetailsHeaderMock = DetailsHeader as jest.Mock

describe('PaymentDetailsPageHeader', () => {
  describe('when initial loading', () => {
    it('does not render the button at all', () => {
      useGetPaymentDetailsHeader.mockReturnValue({
        data: fixtures.MockPayment,
        initialLoading: true
      })
      const { queryByTestId } = render()

      expect(queryByTestId('InlineActionsSkeleton')).not.toBeNull()
      expect(queryByTestId('add-payment')).toBeNull()
      expect(queryByTestId('DetailsHeader')).toBeNull()
    })
  })

  describe('when loading', () => {
    it('does not render the button at all', () => {
      useGetPaymentDetailsHeader.mockReturnValue({
        data: fixtures.MockPayment,
        loading: true
      })
      const { queryByTestId } = render()

      expect(queryByTestId('InlineActionsSkeleton')).not.toBeNull()
      expect(queryByTestId('add-payment')).toBeNull()
      expect(queryByTestId('DetailsHeader')).toBeNull()
    })
  })

  describe('when data loaded', () => {
    describe('when operation is missing', () => {
      it('does not render the button at all', () => {
        useGetPaymentDetailsHeader.mockReturnValue({
          data: { ...fixtures.MockPayment, operations: {} }
        })
        const { queryByTestId } = render()
        const button = queryByTestId('add-payment')

        expect(button).toBeNull()
      })
    })

    describe('when the operation is Enabled', () => {
      it('renders the Pay button with proper details', () => {
        useGetPaymentDetailsHeader.mockReturnValue({
          data: fixtures.MockPayment
        })
        const { getByTestId } = render()
        const button = getByTestId('add-payment')

        expect(button).toBeEnabled()
        expect(button).toContainHTML('Pay')
      })
    })

    describe('when the operation is Disabled', () => {
      it('renders the Pay button as disabled', () => {
        useGetPaymentDetailsHeader.mockReturnValue({
          data: {
            ...fixtures.MockPayment,
            operations: {
              payPayment: {
                callable: OperationCallableTypes.DISABLED,
                messages: ['']
              }
            }
          }
        })
        const { getByTestId } = render()
        const button = getByTestId('add-payment')

        expect(button).toHaveAttribute('aria-disabled', 'true')
      })
    })

    describe('when the operation is Hidden', () => {
      it('does not render the button at all', () => {
        useGetPaymentDetailsHeader.mockReturnValue({
          data: {
            ...fixtures.MockPayment,
            operations: {
              payPayment: {
                callable: OperationCallableTypes.HIDDEN,
                messages: ['']
              }
            }
          }
        })
        const { queryByTestId } = render()
        const button = queryByTestId('add-payment')

        expect(button).toBeNull()
      })
    })
  })

  it('renders Actions', () => {
    useGetPaymentDetailsHeader.mockReturnValue({
      data: fixtures.MockPayment
    })
    const { queryByTestId } = render()

    expect(queryByTestId('Actions')).not.toBeNull()
  })

  describe('when historyLink link exists', () => {
    it('renders RecentActivityButton', () => {
      useGetPaymentDetailsHeader.mockReturnValue({
        data: fixtures.MockPayment
      })
      render()

      expect(DetailsHeaderMock).toHaveBeenCalledWith(
        expect.objectContaining({ renderRecentActivityButton: true }),
        {}
      )
    })
  })

  describe('when historyLink link does not exist', () => {
    it('does not RecentActivityButton', () => {
      useGetPaymentDetailsHeader.mockReturnValue({
        data: {
          ...fixtures.MockPayment,
          historyLink: undefined
        }
      })
      render()

      expect(DetailsHeaderMock).toHaveBeenCalledWith(
        expect.objectContaining({ renderRecentActivityButton: false }),
        {}
      )
    })
  })
})
