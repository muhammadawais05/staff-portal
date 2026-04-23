import { FieldRenderProps } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MemosListWithHeader from '.'

jest.mock('@toptal/picasso-forms', () => ({
  FinalField: (props: FieldRenderProps) => (
    <div id='Field'>{JSON.stringify(props)}</div>
  )
}))

const render = (props: ComponentProps<typeof MemosListWithHeader>) =>
  renderComponent(
    <table>
      <MemosListWithHeader {...props} />
    </table>
  )

describe('MemosListWithHeader', () => {
  it('default render', () => {
    const memorandums = fixtures.MockClient.unallocatedMemorandums.nodes
    const { container } = render({
      fieldArrayName: 'fieldArrayName',
      header: 'Some header',
      memorandums: [memorandums[0], memorandums[1]]
    })

    expect(container).toMatchSnapshot()
  })
})
