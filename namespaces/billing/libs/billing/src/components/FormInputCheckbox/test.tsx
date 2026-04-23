import React, { ComponentProps } from 'react'

import FormInputCheckbox from '.'
import renderComponent from '../../utils/tests'

const render = (props: ComponentProps<typeof FormInputCheckbox>) =>
  renderComponent(<FormInputCheckbox {...props} />)

describe('FormInputCheckbox', () => {
  it('default render', () => {
    const { container } = render({
      input: {
        checked: false,
        name: 'foo',
        onBlur: jest.fn(),
        onChange: jest.fn(),
        onFocus: jest.fn(),
        value: ''
      },
      meta: { error: undefined, touched: true }
    })

    expect(container).toMatchSnapshot()
  })
})
