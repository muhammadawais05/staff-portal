import { Table } from '@toptal/picasso'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ExpectedCommissionsListTableHeader from '.'

const render = () =>
  renderComponent(
    <Table>
      <ExpectedCommissionsListTableHeader />
    </Table>
  )

describe('ExpectedCommissionsListTableHeader', () => {
  it('renders table header', () => {
    const { queryByTestId } = render()

    expect(
      queryByTestId('ExpectedCommissionsListTableHeader-head')
    ).toBeInTheDocument()
  })
})
