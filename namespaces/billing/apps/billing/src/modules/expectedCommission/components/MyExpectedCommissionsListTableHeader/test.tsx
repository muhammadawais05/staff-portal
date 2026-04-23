import { Table } from '@toptal/picasso'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MyExpectedCommissionsListTableHeader from '.'

const render = () =>
  renderComponent(
    <Table>
      <MyExpectedCommissionsListTableHeader />
    </Table>
  )

describe('MyExpectedCommissionsListTableHeader', () => {
  it('renders table header', () => {
    const { queryByTestId } = render()

    expect(
      queryByTestId('MyExpectedCommissionsListTableHeader-head')
    ).toBeInTheDocument()
  })
})
