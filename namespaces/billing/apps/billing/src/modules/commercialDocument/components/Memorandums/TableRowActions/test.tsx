import React from 'react'
import { Memorandum } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TableRowActions from '.'

jest.mock('@staff-portal/billing/src/components/Actions')
jest.mock('@staff-portal/billing/src/components/OperationFetcherForActions')

const render = (memorandum: Partial<Memorandum> = {}) =>
  renderComponent(
    <TableRowActions
      memorandum={{ ...fixtures.MockMemorandum, ...memorandum }}
      handleClick={jest.fn()}
    />
  )

describe('TableRowActions', () => {
  it('renders dropdown menu when at least one menu item is present', () => {
    const { container } = render({
      downloadHtmlUrl: 'http://example.com',
      downloadPdfUrl: 'http://example.com/pdf'
    })

    expect(container).toMatchSnapshot()
  })
})
