import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderList from '.'

jest.mock('@apollo/client')
jest.mock('@staff-portal/billing/src/components/ListPage')
jest.mock('@staff-portal/billing/src/components/ContentLoader', () =>
  jest
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid='ContentLoader'>{children}</div>
    ))
)
jest.mock('../../data')
jest.mock('../../components/PurchaseOrdersListTableHeader')
jest.mock('../../components/PurchaseOrdersListTableRow')
jest.mock('../../components/PurchaseOrdersListHeader')
jest.mock('../../components/PurchaseOrderListSearch')
jest.mock('@staff-portal/billing/src/components/ListPagination')
jest.mock(
  '@staff-portal/billing/src/data/getExperiments.graphql.types',
  () => ({
    useGetExperimentsQuery: () => [jest.fn()]
  })
)

const render = () => renderComponent(<PurchaseOrderList />)

describe('PurchaseOrderList', () => {
  it('default render', () => {
    const { getByTestId, queryAllByTestId } = render()

    expect(queryAllByTestId('PurchaseOrdersListTableRow')).toHaveLength(0)
    expect(getByTestId('ListPage-title')).toHaveTextContent('Purchase orders')
    expect(getByTestId('PurchaseOrdersListHeader')).toBeInTheDocument()
    expect(getByTestId('ListTable-empty')).toHaveTextContent(
      'There are no purchase orders for this search criteria'
    )
  })
})
