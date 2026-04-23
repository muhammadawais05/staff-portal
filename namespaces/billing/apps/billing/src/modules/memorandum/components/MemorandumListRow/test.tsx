import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useListTableRowExpandState } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import MemorandumListRow from '.'

jest.mock('@staff-portal/billing/src/components/OperationFetcherForActions')
jest.mock('../MemorandumRowAction')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'
)
jest.mock('@staff-portal/billing-widgets/src/modules/commercialDocument/utils')

const render = (props: ComponentProps<typeof MemorandumListRow>) =>
  renderComponent(
    <Table>
      <Table.Body>
        <MemorandumListRow {...props} />
      </Table.Body>
    </Table>
  )

const mockUseListTableRowExpandState = useListTableRowExpandState as jest.Mock

describe('MemorandumListRow', () => {
  it('default render', () => {
    mockUseListTableRowExpandState.mockReturnValue({
      isExpanded: jest.fn().mockReturnValue(false),
      handleOnExpandClick: jest.fn()
    })

    const { queryByTestId } = render({
      handleOnActionClick: jest.fn(),
      handleOnExpandClick: jest.fn(),
      memorandum: fixtures.MockMemorandum
    })

    expect(
      queryByTestId('MemorandumListRow-collapsed-description')
    ).toBeInTheDocument()
    expect(
      queryByTestId('MemorandumListRow-expanded-description')
    ).not.toBeInTheDocument()

    expect(queryByTestId('MemorandumListRow-memorandum-id')).toHaveTextContent(
      '165326'
    )
    expect(queryByTestId('MemorandumListRow-balance')).toContainHTML('Credit')
    expect(queryByTestId('MemorandumListRow-receiver')).toContainHTML(
      'Samella Smitham'
    )
    expect(queryByTestId('MemorandumListRow-amount')).toContainHTML('$250.00')
    expect(queryByTestId('MemorandumListRow-created-on-date')).toContainHTML(
      'Jun 8, 2020'
    )
    expect(
      queryByTestId('MemorandumListRow-collapsed-description')
    ).toContainHTML('test')
  })

  it('expanded render', () => {
    mockUseListTableRowExpandState.mockReturnValue({
      isExpanded: jest.fn().mockReturnValue(true),
      handleOnExpandClick: jest.fn()
    })

    const { queryByTestId } = render({
      handleOnActionClick: jest.fn(),
      handleOnExpandClick: jest.fn(),
      memorandum: fixtures.MockMemorandum,
      isExpanded: true
    })

    expect(
      queryByTestId('MemorandumListRow-collapsed-description')
    ).not.toBeInTheDocument()
    expect(
      queryByTestId('MemorandumListRow-expanded-description')
    ).toBeInTheDocument()
    expect(
      queryByTestId('MemorandumListRow-expanded-description')
    ).toContainHTML('test')
  })
})
