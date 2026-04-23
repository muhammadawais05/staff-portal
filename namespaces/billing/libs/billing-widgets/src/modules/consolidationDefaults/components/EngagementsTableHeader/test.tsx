import { Table } from '@toptal/picasso'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EngagementsTableHeader from '.'

const render = () =>
  renderComponent(
    <Table>
      <EngagementsTableHeader />
    </Table>
  )

describe('EngagementsTableHeader', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('EngagementsTableHeader-company')).toHaveTextContent(
      'Company'
    )
    expect(getByTestId('EngagementsTableHeader-job')).toHaveTextContent('Job')
    expect(getByTestId('EngagementsTableHeader-talent')).toHaveTextContent(
      'Talent'
    )

    expect(getByTestId('EngagementsTableHeader-po-number')).toHaveTextContent(
      'PO Number'
    )
  })
})
