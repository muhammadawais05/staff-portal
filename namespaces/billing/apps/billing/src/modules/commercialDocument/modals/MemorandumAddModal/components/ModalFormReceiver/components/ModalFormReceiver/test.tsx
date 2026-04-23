import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ModalFormReceiver from '.'

jest.mock(
  '@staff-portal/billing/src/components/FormInputAutocompleteRoleOption',
  () =>
    jest.fn().mockImplementation(props => <div>{JSON.stringify(props)}</div>)
)

const render = (props: ComponentProps<typeof ModalFormReceiver>) =>
  renderComponent(
    <Form onSubmit={jest.fn()}>
      <ModalFormReceiver {...props} />
    </Form>
  )

describe('render', () => {
  it('default render', () => {
    const name = 'foo'
    const onChange = jest.fn()

    const { container } = render({ name, onChange })

    expect(container).toMatchSnapshot()
  })
})
