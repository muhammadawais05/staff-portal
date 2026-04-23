import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useHistory, useLocation } from '@staff-portal/navigation'

import InvoiceListHeaderReconciliationButton from '.'

jest.mock('@staff-portal/navigation', () => ({
  useHistory: jest.fn(),
  useLocation: jest.fn().mockReturnValue({ search: '?query=test' })
}))

jest.mock('@staff-portal/billing/src/components/ContentLoader', () =>
  //@ts-ignore
  ({ children }) => <div>{children}</div>
)

jest.mock('../../../../contexts/invoiceListContext', () => ({
  useInvoiceListContext: () => ({
    filter: {},
    pagination: {}
  })
}))

jest.mock('@staff-portal/billing/src/utils/graphql', () => ({
  useGetData: () =>
    jest.fn().mockReturnValue({
      refetch: jest.fn(),
      data: {
        operations: {
          reconcileInvoices: {
            callable: 'ENABLED',
            messages: ['']
          }
        }
      },
      loading: false,
      initialLoading: false
    })
}))

const useHistoryMock = useHistory as jest.Mock
const useLocationMock = useLocation as jest.Mock

const render = () => renderComponent(<InvoiceListHeaderReconciliationButton />)

describe('InvoiceListHeaderReconciliationButton', () => {
  it('navigates to reconciliation page', () => {
    const push = jest.fn()

    useHistoryMock.mockReturnValue({
      location: jest.fn(),
      replace: jest.fn(),
      listen: jest.fn(),
      push
    })

    useLocationMock.mockReturnValue({ search: '?query=test' })

    const { getByTestId } = render()
    const button = getByTestId('reconciliation-button')

    expect(button).toBeInTheDocument()
  })
})
