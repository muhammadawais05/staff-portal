import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MemorandumListTable from '.'

jest.mock('../MemorandumListRow')
jest.mock('../MemorandumListTableHeader')

const render = (props: ComponentProps<typeof MemorandumListTable>) =>
  renderComponent(<MemorandumListTable {...props} />)

describe('MemorandumListTable', () => {
  it('default render', async () => {
    const { queryByTestId, findAllByTestId } = render({
      memorandums: {
        loading: false,
        initialLoading: false,
        data: fixtures.MockMemorandums
      }
    })

    expect(queryByTestId('MemorandumListTableHeader')).toBeInTheDocument()
    expect(await findAllByTestId('MemorandumListRow')).toHaveLength(3)
  })

  it('no results render', () => {
    const { queryByTestId } = render({
      memorandums: {
        loading: false,
        initialLoading: false,
        data: undefined
      }
    })

    expect(queryByTestId('ListTable-empty')).toBeInTheDocument()
  })
})
