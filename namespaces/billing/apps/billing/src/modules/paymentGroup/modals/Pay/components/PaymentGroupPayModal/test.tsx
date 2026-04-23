import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupPayModal from '.'
import { useGetPaymentGroupPayModalQuery } from '../../data'

jest.mock('../../data')
jest.mock('../PaymentGroupPayModalContent')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = (
  props: Omit<ComponentProps<typeof PaymentGroupPayModal>, 'children'>
) => {
  return renderComponent(<PaymentGroupPayModal {...props} />)
}

const MockGetPaymentGroupPayModalQuery =
  useGetPaymentGroupPayModalQuery as jest.Mock

describe('PaymentPayModal', () => {
  it('default render', () => {
    MockGetPaymentGroupPayModalQuery.mockReturnValue({
      data: {
        node: fixtures.MockPaymentGroup
      },
      loading: false,
      initialLoading: false
    })

    const { queryByTestId } = render({
      options: {
        nodeId: fixtures.MockPaymentGroup.number.toString(),
        nodeType: 'paymentGroup'
      }
    })

    expect(queryByTestId('PaymentGroupPayModalContent')).toBeInTheDocument()
  })

  it('loading `true` render', () => {
    MockGetPaymentGroupPayModalQuery.mockReturnValue({
      data: undefined,
      loading: true,
      initialLoading: true
    })

    const { queryByTestId } = render({
      options: {
        nodeId: fixtures.MockPaymentGroup.number.toString(),
        nodeType: 'paymentGroup'
      }
    })

    expect(queryByTestId('ModalSkeleton')).toBeInTheDocument()
    expect(queryByTestId('PaymentPayModalContent')).not.toBeInTheDocument()
  })
})
