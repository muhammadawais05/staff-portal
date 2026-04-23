import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetMemorandumsListQuery } from '../../data'
import MemorandumList from '.'

jest.mock('../../data')
jest.mock('@apollo/client')
jest.mock('@staff-portal/billing/src/components/ListPage')
jest.mock('../../components/MemorandumListSearch')
jest.mock('../../components/MemorandumListTableHeader')
jest.mock('../../components/MemorandumListTable')
jest.mock('../../components/MemorandumListHeader')
jest.mock('@staff-portal/billing/src/components/ListPagination')

const render = () => renderComponent(<MemorandumList />)

describe('MemorandumList', () => {
  it('default render', () => {
    ;(useGetMemorandumsListQuery as jest.Mock).mockReturnValue(() => ({
      data: { memorandums: fixtures.MockMemorandums },
      error: false,
      loading: false
    }))

    const { getByTestId } = render()

    expect(getByTestId('ListPage')).toBeInTheDocument()
    expect(getByTestId('ListPagination')).toBeInTheDocument()
    expect(getByTestId('MemorandumListHeader')).toBeInTheDocument()
  })
})
