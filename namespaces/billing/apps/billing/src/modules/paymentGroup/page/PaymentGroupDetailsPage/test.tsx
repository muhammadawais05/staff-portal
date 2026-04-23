import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupDetailsPage from '.'
import { useGetPaymentGroupDetailsSubjectQuery } from '../../data'

jest.mock('../../components/PaymentGroupDetailsPageHeader')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/paymentGroup/components/PaymentGroupPaymentsTable'
)
jest.mock('../../components/PaymentGroupTotals')
jest.mock('../../data')
jest.mock('@staff-portal/billing/src/components/WebResourceLinkWrapper')

const subject = {
  __typename: 'Staff',
  fullName: 'Carolina Della Corte',
  id: 'VjEtU3RhZmYtMTY2NDI4OA',
  webResource: {
    __typename: 'Link',
    text: 'Carolina Della Corte',
    url: 'http://localhost:3000/platform/staff/staff/1664288'
  }
}

const useGetSubjectQueryMock =
  useGetPaymentGroupDetailsSubjectQuery as jest.Mock

const render = (props: ComponentProps<typeof PaymentGroupDetailsPage>) =>
  renderComponent(<PaymentGroupDetailsPage {...props} />)

describe('PaymentGroupDetailsPage', () => {
  it('renders components', () => {
    useGetSubjectQueryMock.mockReturnValue({
      data: {
        node: {
          subject
        }
      },
      error: false,
      loading: false,
      initialLoading: false
    })

    const { getByTestId } = render({ paymentGroupId: '' })

    expect(getByTestId('content-title')).toContainHTML('Payments for')
    expect(getByTestId('WebResourceLinkWrapper')).toContainHTML(
      'Carolina Della Corte'
    )
  })

  it('renders skeleton', () => {
    useGetSubjectQueryMock.mockReturnValue({
      data: {
        node: {
          subject
        }
      },
      error: false,
      loading: false,
      initialLoading: true
    })

    const { getByTestId } = render({ paymentGroupId: '' })

    expect(getByTestId('content-title')).toBeInTheDocument()
    expect(getByTestId('PaymentGroupTotals')).toBeInTheDocument()
    expect(getByTestId('SkeletonLoader.Typography')).toBeInTheDocument()
  })
})
