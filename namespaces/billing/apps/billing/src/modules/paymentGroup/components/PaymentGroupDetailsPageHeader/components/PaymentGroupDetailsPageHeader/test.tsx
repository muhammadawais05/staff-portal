import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import DetailsHeader from '../../../../../commercialDocument/components/DetailsHeader'
import PaymentGroupDetailsPageHeader from '.'
import { useGetPaymentGroupDetailsHeaderQuery } from '../../data'

jest.mock('../../data')
jest.mock('@staff-portal/billing/src/components/InlineActionsWrapper')
jest.mock('../../../../../commercialDocument/components/DetailsHeader')
jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals', () => ({
  useModals: () => ({
    handleOnOpenModalWithUrlSearch: jest.fn()
  })
}))
jest.mock('@staff-portal/billing/src/components/InlineActionsSkeleton')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/paymentGroup/utils',
  () => ({
    ...jest.requireActual(
      '@staff-portal/billing-widgets/src/modules/paymentGroup/utils'
    ),
    usePaymentGroupActionHandler: jest.fn().mockReturnValue({
      handleOnActionClick: jest.fn()
    })
  })
)
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const render = () =>
  renderComponent(
    <PaymentGroupDetailsPageHeader
      paymentGroupId={fixtures.MockPaymentGroup.id}
    />
  )

const MockGetPaymentGroupDetailsHeader =
  useGetPaymentGroupDetailsHeaderQuery as jest.Mock

const DetailsHeaderMock = DetailsHeader as jest.Mock

describe('PaymentGroupDetailsPageHeader', () => {
  describe('when initial loading', () => {
    it('does not render the button at all', () => {
      MockGetPaymentGroupDetailsHeader.mockReturnValue({
        data: undefined,
        error: null,
        loading: true
      })
      const { queryByTestId } = render()

      expect(queryByTestId('InlineActionsSkeleton')).not.toBeNull()
      expect(queryByTestId('pay-payment-group')).toBeNull()
      expect(queryByTestId('cancel-payment-group')).toBeNull()
      expect(queryByTestId('DetailsHeader')).toBeNull()
    })
  })

  describe('when loading', () => {
    it('does not render the button at all', () => {
      MockGetPaymentGroupDetailsHeader.mockReturnValue({
        data: { node: fixtures.MockPaymentGroup },
        error: null,
        loading: true
      })
      const { queryByTestId } = render()

      expect(queryByTestId('InlineActionsSkeleton')).not.toBeNull()
      expect(queryByTestId('pay-payment-group')).toBeNull()
      expect(queryByTestId('cancel-payment-group')).toBeNull()
      expect(queryByTestId('DetailsHeader')).toBeNull()
    })
  })

  describe('when data loaded', () => {
    describe('when operation is missing', () => {
      it('does not render the button at all', () => {
        MockGetPaymentGroupDetailsHeader.mockReturnValue({
          data: { node: { ...fixtures.MockPaymentGroup, operations: {} } },
          error: null,
          loading: false
        })
        const { queryByTestId } = render()

        expect(queryByTestId('pay-payment-group')).toBeNull()
        expect(queryByTestId('cancel-payment-group')).toBeNull()
      })
    })

    describe('when the operation is Enabled', () => {
      it('renders the Pay button with proper details', () => {
        MockGetPaymentGroupDetailsHeader.mockReturnValue({
          data: { node: fixtures.MockPaymentGroup },
          error: null,
          loading: false
        })
        const { getByTestId } = render()

        const payButton = getByTestId('pay-payment-group')

        expect(payButton).toBeEnabled()
        expect(payButton).toHaveTextContent('Pay')

        const cancelButton = getByTestId('cancel-payment-group')

        expect(cancelButton).toBeEnabled()
        expect(cancelButton).toHaveTextContent('Cancel Payment')
      })
    })

    describe('when the operation is Disabled', () => {
      it('renders the Pay button as disabled', () => {
        MockGetPaymentGroupDetailsHeader.mockReturnValue({
          data: {
            node: {
              ...fixtures.MockPaymentGroup,
              operations: {
                payPaymentGroup: {
                  callable: OperationCallableTypes.DISABLED,
                  messages: ['']
                },
                cancelPaymentGroup: {
                  callable: OperationCallableTypes.DISABLED,
                  messages: ['']
                }
              }
            }
          },
          error: null,
          loading: false
        })

        const { getByTestId } = render()

        expect(getByTestId('pay-payment-group')).toHaveAttribute(
          'aria-disabled',
          'true'
        )
        expect(getByTestId('cancel-payment-group')).toHaveAttribute(
          'aria-disabled',
          'true'
        )
      })
    })

    describe('when the operation is Hidden', () => {
      it('does not render the button at all', () => {
        MockGetPaymentGroupDetailsHeader.mockReturnValue({
          data: {
            node: {
              ...fixtures.MockPaymentGroup,
              operations: {
                payPaymentGroup: {
                  callable: OperationCallableTypes.HIDDEN,
                  messages: ['']
                },
                cancelPaymentGroup: {
                  callable: OperationCallableTypes.HIDDEN,
                  messages: ['']
                }
              }
            }
          },
          error: null,
          loading: false
        })
        const { queryByTestId } = render()

        expect(queryByTestId('pay-payment-group')).toBeNull()
        expect(queryByTestId('cancel-payment-group')).toBeNull()
      })
    })

    describe('when historyLink link exists', () => {
      it('renders RecentActivityButton', () => {
        MockGetPaymentGroupDetailsHeader.mockReturnValue({
          data: {
            node: fixtures.MockPayment
          },
          error: null,
          loading: false
        })

        render()

        expect(DetailsHeaderMock).toHaveBeenCalledWith(
          expect.objectContaining({ renderRecentActivityButton: true }),
          {}
        )
      })
    })

    describe('when historyLink does not exist', () => {
      it('does not render RecentActivityButton', () => {
        MockGetPaymentGroupDetailsHeader.mockReturnValue({
          data: {
            node: {
              ...fixtures.MockPayment,
              historyLink: undefined
            }
          },
          error: null,
          loading: false
        })

        render()

        expect(DetailsHeaderMock).toHaveBeenCalledWith(
          expect.objectContaining({ renderRecentActivityButton: false }),
          {}
        )
      })
    })
  })
})
