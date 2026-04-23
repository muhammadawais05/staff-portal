import React, { ComponentProps, ReactNode } from 'react'
import { DetailedList } from '@staff-portal/ui'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetClientBillingDetailsQuery } from '../../data/getClientBillingDetails.graphql.types'
import BillingAddressItem from '../BillingAddressItem/BillingAddressItem'
import BillingDetailsAddress from '.'

jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

jest.mock('@staff-portal/ui', () => {
  const DetailedListMock = jest.fn() as unknown as {
    Row: Function
    Item: Function
  }

  DetailedListMock.Row = jest.fn()
  DetailedListMock.Item = jest.fn()

  return {
    DetailedList: DetailedListMock,
    SectionWithDetailedListSkeleton: () => <>SectionWithDetailedListSkeleton</>,
    LoaderOverlay: ({ children }: { children: ReactNode }) => <>{children}</>
  }
})
jest.mock('../../data/getClientBillingDetails.graphql.types')
jest.mock('../BillingAddressItem/BillingAddressItem', () => ({
  __esModule: true,
  default: jest.fn()
}))

const render = (props: ComponentProps<typeof BillingDetailsAddress>) =>
  renderComponent(<BillingDetailsAddress {...props} />)

const mockedRefetch = jest.fn()
const mockedUseQuery = useGetClientBillingDetailsQuery as jest.Mock
const mockedDetailedList = DetailedList as unknown as jest.Mock
const mockedDetailedListRow = DetailedList.Row as unknown as jest.Mock
const mockedDetailedListItem = DetailedList.Item as unknown as jest.Mock
const mockedBillingAddressItem = BillingAddressItem as jest.Mock

describe('BillingDetailsAddress', () => {
  it('renders content', () => {
    mockedDetailedList.mockImplementationOnce(({ children }) => children)
    mockedDetailedListRow.mockImplementationOnce(({ children }) => children)
    mockedDetailedListItem.mockImplementationOnce(({ children }) => children)
    mockedBillingAddressItem.mockReturnValueOnce(null)
    mockedUseQuery.mockReturnValueOnce({
      data: {
        node: fixtures.MockClient
      },
      error: null,
      loading: false,
      refetch: mockedRefetch
    })

    const { getByTestId } = render({
      companyId: 'VjEtQ2xpZW50LTIxNzM4OQ'
    })

    expect(useRefetch).toHaveBeenCalledTimes(1)
    expect(useRefetch).toHaveBeenCalledWith(
      { metaData: 'billingAddress:edit' },
      mockedRefetch
    )

    expect(getByTestId('Section-title').textContent).toBe('Billing Address')
    expect(mockedDetailedList).toHaveBeenCalledTimes(1)
    expect(mockedDetailedListRow).toHaveBeenCalledTimes(1)
    expect(mockedDetailedListItem).toHaveBeenCalledTimes(1)
    expect(mockedBillingAddressItem).toHaveBeenCalledTimes(1)
    expect(mockedBillingAddressItem).toHaveBeenCalledWith(
      {
        client: fixtures.MockClient,
        enableEdit: true
      },
      {}
    )
  })
})
