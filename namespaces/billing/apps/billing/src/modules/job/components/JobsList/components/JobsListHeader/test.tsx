import React from 'react'
import { Table } from '@toptal/picasso'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import JobsListHeader from '.'

const render = () =>
  renderComponent(
    <Table>
      <JobsListHeader />
    </Table>
  )

describe('JobListHeader', () => {
  it('default render', () => {
    const { container } = render()

    expect(container).toMatchSnapshot()
  })
})
