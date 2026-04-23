import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentPayModal from '.'
import { useGetPayModalPayment } from '../../data'

jest.mock('../../data')
jest.mock('../PaymentPayModalContent')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = (
  props: Omit<ComponentProps<typeof PaymentPayModal>, 'children'>
) => {
  return renderComponent(<PaymentPayModal {...props} />)
}

const mockGetPayModalPayment = useGetPayModalPayment as jest.Mock

describe('PaymentPayModal', () => {
  it('default render', () => {
    mockGetPayModalPayment.mockReturnValue({
      data: fixtures.MockPayment,
      loading: false,
      initialLoading: false
    })

    const { queryByTestId } = render({
      options: {
        nodeId: fixtures.MockPayment.documentNumber.toString(),
        nodeType: 'payment'
      }
    })

    expect(queryByTestId('PaymentPayModalContent')).toBeInTheDocument()
  })

  it('loading `true` render', () => {
    mockGetPayModalPayment.mockReturnValue({
      data: undefined,
      loading: true,
      initialLoading: true
    })

    const { queryByTestId } = render({
      options: {
        nodeId: fixtures.MockPayment.documentNumber.toString(),
        nodeType: 'payment'
      }
    })

    expect(queryByTestId('ModalSkeleton')).toBeInTheDocument()
    expect(queryByTestId('PaymentPayModalContent')).not.toBeInTheDocument()
  })
})
