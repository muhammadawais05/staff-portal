import React, { ComponentProps } from 'react'

import FormInput from '.'
import renderComponent from '../../utils/tests'

const render = (props: ComponentProps<typeof FormInput>) =>
  renderComponent(<FormInput {...props} />)

describe('WrappedInput', () => {
  it('default render', () => {
    const { container } = render({
      input: {
        name: 'foo',
        onBlur: jest.fn(),
        onChange: jest.fn(),
        onFocus: jest.fn(),
        value: ''
      },
      inputProps: { rows: 5 },
      meta: { error: undefined, touched: true }
    })

    expect(container).toMatchSnapshot()
  })
})
