import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentListHeader from '.'

const render = (props: ComponentProps<typeof PaymentListHeader> = {}) =>
  renderComponent(
    <Table>
      <PaymentListHeader {...props} />
    </Table>
  )

describe('Header', () => {
  it('default render', () => {
    const { container } = render()

    expect(container).toMatchSnapshot()
  })
})
