import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ModalFormRoleContext from '.'

jest.mock('../../../../data', () => ({
  useSetAddMemorandumToRoleMutation: jest.fn(() => ['exampleSubmit'])
}))

const render = (
  props: Omit<ComponentProps<typeof ModalFormRoleContext>, 'children'> = {}
) =>
  renderComponent(
    <ModalFormRoleContext {...props}>
      {childrenProps => <div id='test'>{JSON.stringify(childrenProps)}</div>}
    </ModalFormRoleContext>
  )

describe('render', () => {
  it('default render', () => {
    const { container } = render()

    expect(container).toMatchSnapshot()
  })
})
