import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MemorandumsTable from '.'

jest.mock('../TableRow')

const render = (props: ComponentProps<typeof MemorandumsTable>) =>
  renderComponent(<MemorandumsTable {...props} />)

describe('MemorandumsTable', () => {
  it('renders Associated section', () => {
    const { queryByTestId } = render({
      memorandums: [],
      isAllocated: false
    })

    expect(queryByTestId('MemorandumsTable-section-associated')).toContainHTML(
      'Associated memorandums'
    )
  })

  it('renders Allocated section', () => {
    const { queryByTestId } = render({
      memorandums: [],
      isAllocated: true
    })

    expect(queryByTestId('MemorandumsTable-section-allocated')).toContainHTML(
      'Allocated memorandums'
    )
  })

  it('renders the empty placeholder section when memorandums are empty', () => {
    const { queryByTestId } = render({
      memorandums: []
    })
    const emptyPlaceholder = queryByTestId('MemorandumsTable-empty')

    expect(emptyPlaceholder).toBeInTheDocument()
  })

  it('renders the inner table body when memorandums are valid', () => {
    const { queryByTestId, queryAllByTestId } = render({
      memorandums: [
        { id: '1', number: 1 },
        { id: '2', number: 2 }
      ]
    })
    const emptyPlaceholder = queryByTestId('Empty')
    const tableHead = queryByTestId('MemorandumsTable-head')
    const tableRows = queryAllByTestId('TableRow')

    expect(emptyPlaceholder).not.toBeInTheDocument()
    expect(tableHead).toBeInTheDocument()
    expect(tableRows).toHaveLength(2)
  })
})
