import { Table } from '@toptal/picasso'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ConsolidationDefaultsTableHeader from '.'

const render = () =>
  renderComponent(
    <Table>
      <ConsolidationDefaultsTableHeader />
    </Table>
  )

describe('ConsolidationDefaultsTableHeader', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(
      getByTestId('ConsolidationDefaultsTableHeader-name')
    ).toHaveTextContent('Name')
    expect(
      getByTestId('ConsolidationDefaultsTableHeader-creation-date')
    ).toHaveTextContent('Creation Date')
    expect(
      getByTestId('ConsolidationDefaultsTableHeader-status')
    ).toHaveTextContent('Status')
  })
})
